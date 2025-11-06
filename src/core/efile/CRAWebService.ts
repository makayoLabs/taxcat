import axios, { AxiosInstance } from 'axios';
import { TaxLogger } from '../logging/TaxLogger';
import { TaxError, TaxErrorCode, TaxErrorSeverity } from '../errors/TaxError';
import { CRAErrorCode, CRAErrorDetails, getCRAErrorDetails } from './CRAErrorCodes';
import { PerformanceMonitor } from '../monitoring/PerformanceMonitor';

export interface CRACredentials {
  eservicesNumber: string;
  password: string;
  environment: 'TEST' | 'PRODUCTION';
}

export interface CRASubmissionResult {
  accepted: boolean;
  confirmationNumber?: string;
  errors?: CRAErrorDetails[];
  warnings?: CRAErrorDetails[];
  timestamp: Date;
}

export interface CRAStatusResult {
  status: 'RECEIVED' | 'PROCESSING' | 'ACCEPTED' | 'REJECTED' | 'ASSESSED';
  confirmationNumber: string;
  errors?: CRAErrorDetails[];
  warnings?: CRAErrorDetails[];
  assessmentDate?: Date;
  noticeOfAssessment?: {
    referenceNumber: string;
    issueDate: Date;
    amount: number;
  };
}

export class CRAWebService {
  private static instance: CRAWebService;
  private client: AxiosInstance;
  private logger: TaxLogger;
  private performanceMonitor: PerformanceMonitor;
  private credentials?: CRACredentials;
  private token?: string;
  private tokenExpiry?: Date;

  private readonly BASE_URLS = {
    TEST: 'https://test-services.cra-arc.gc.ca/efile/v2023',
    PRODUCTION: 'https://services.cra-arc.gc.ca/efile/v2023',
  } as const;

  private constructor() {
    this.logger = TaxLogger.getInstance();
    this.performanceMonitor = PerformanceMonitor.getInstance();

    this.client = axios.create({
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/xml',
        Accept: 'application/xml',
      },
    });

    // Add request interceptor for authentication
    this.client.interceptors.request.use(
      async (config) => {
        if (this.needsNewToken()) {
          await this.authenticate();
        }
        if (this.token) {
          config.headers['Authorization'] = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const craError = this.handleCRAError(error.response);
          return Promise.reject(craError);
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): CRAWebService {
    if (!CRAWebService.instance) {
      CRAWebService.instance = new CRAWebService();
    }
    return CRAWebService.instance;
  }

  public setCredentials(credentials: CRACredentials): void {
    this.credentials = credentials;
    this.client.defaults.baseURL = this.BASE_URLS[credentials.environment];

    this.logger.info('CRA_SERVICE', 'Credentials set', {
      eservicesNumber: credentials.eservicesNumber,
      environment: credentials.environment,
    });
  }

  public async authenticate(): Promise<void> {
    if (!this.credentials) {
      throw new TaxError(
        TaxErrorCode.AUTHENTICATION_ERROR,
        'No credentials provided',
        TaxErrorSeverity.ERROR
      );
    }

    const operationId = this.performanceMonitor.startOperation('CRA_AUTHENTICATE');

    try {
      const response = await this.client.post('/auth', {
        eservicesNumber: this.credentials.eservicesNumber,
        password: this.credentials.password,
      });

      this.token = response.data.token;
      this.tokenExpiry = new Date(response.data.expiry);

      this.logger.info('CRA_SERVICE', 'Authentication successful');
      this.performanceMonitor.endOperation(operationId, true);
    } catch (error) {
      this.performanceMonitor.endOperation(operationId, false, { error });
      throw error;
    }
  }

  public async submitReturn(xml: string): Promise<CRASubmissionResult> {
    const operationId = this.performanceMonitor.startOperation('CRA_SUBMIT');

    try {
      const response = await this.client.post('/submit', xml);

      const result: CRASubmissionResult = {
        accepted: response.data.accepted,
        confirmationNumber: response.data.confirmationNumber,
        errors: response.data.errors?.map(this.mapToCRAError),
        warnings: response.data.warnings?.map(this.mapToCRAError),
        timestamp: new Date(),
      };

      this.logger.info('CRA_SERVICE', 'Return submitted', {
        accepted: result.accepted,
        confirmationNumber: result.confirmationNumber,
      });

      this.performanceMonitor.endOperation(operationId, true);
      return result;
    } catch (error) {
      this.performanceMonitor.endOperation(operationId, false, { error });
      throw error;
    }
  }

  public async checkStatus(confirmationNumber: string): Promise<CRAStatusResult> {
    const operationId = this.performanceMonitor.startOperation('CRA_CHECK_STATUS');

    try {
      const response = await this.client.get(`/status/${confirmationNumber}`);

      const result: CRAStatusResult = {
        status: response.data.status,
        confirmationNumber,
        errors: response.data.errors?.map(this.mapToCRAError),
        warnings: response.data.warnings?.map(this.mapToCRAError),
        assessmentDate: response.data.assessmentDate
          ? new Date(response.data.assessmentDate)
          : undefined,
        noticeOfAssessment: response.data.noticeOfAssessment
          ? {
              referenceNumber: response.data.noticeOfAssessment.referenceNumber,
              issueDate: new Date(response.data.noticeOfAssessment.issueDate),
              amount: response.data.noticeOfAssessment.amount,
            }
          : undefined,
      };

      this.logger.info('CRA_SERVICE', 'Status checked', {
        confirmationNumber,
        status: result.status,
        assessmentDate: result.assessmentDate,
      });

      this.performanceMonitor.endOperation(operationId, true);
      return result;
    } catch (error) {
      this.performanceMonitor.endOperation(operationId, false, { error });
      throw error;
    }
  }

  private needsNewToken(): boolean {
    if (!this.token || !this.tokenExpiry) {
      return true;
    }

    // Renew token if it expires in less than 5 minutes
    const fiveMinutes = 5 * 60 * 1000;
    return this.tokenExpiry.getTime() - Date.now() < fiveMinutes;
  }

  private handleCRAError(response: any): TaxError {
    let errorCode = CRAErrorCode.INTERNAL_ERROR;
    let errorMessage = 'An unexpected error occurred';
    let severity = TaxErrorSeverity.ERROR;

    if (response.data?.error) {
      const craError = response.data.error;
      if (typeof craError.code === 'string' && craError.code.startsWith('CRA_')) {
        errorCode = craError.code as CRAErrorCode;
        const errorDetails = getCRAErrorDetails(errorCode);
        errorMessage = errorDetails.message;
        severity =
          errorDetails.severity === 'CRITICAL' ? TaxErrorSeverity.CRITICAL : TaxErrorSeverity.ERROR;
      }
    }

    return new TaxError(TaxErrorCode.CRA_SERVICE_ERROR, errorMessage, severity, undefined, {
      craErrorCode: errorCode,
      statusCode: response.status,
      statusText: response.statusText,
    });
  }

  private mapToCRAError(error: any): CRAErrorDetails {
    if (typeof error.code === 'string' && error.code.startsWith('CRA_')) {
      return getCRAErrorDetails(error.code as CRAErrorCode);
    }

    return {
      code: CRAErrorCode.INTERNAL_ERROR,
      message: error.message || 'Unknown error',
      severity: 'ERROR',
      category: 'SYSTEM',
    };
  }
}
