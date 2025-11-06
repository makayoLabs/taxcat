import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import axios from 'axios';
import { captureError, captureMessage } from '../monitoring/sentry';

interface CRACredentials {
  eservicesNumber: string;
  password: string;
  environment: 'TEST' | 'PRODUCTION';
}

interface TaxReturn {
  type: 'T1' | 'T2' | 'T3' | 'T5013';
  year: number;
  data: Record<string, any>;
}

interface EFileResponse {
  confirmationNumber: string;
  timestamp: string;
  status: 'ACCEPTED' | 'REJECTED';
  errors?: string[];
}

const CRA_ENDPOINTS = {
  TEST: 'https://test-services.cra-arc.gc.ca/efile/v1',
  PRODUCTION: 'https://services.cra-arc.gc.ca/efile/v1',
};

const XML_OPTIONS = {
  ignoreAttributes: false,
  format: true,
  indentBy: '  ',
};

export class CRAEFileService {
  private credentials: CRACredentials;
  private xmlBuilder: XMLBuilder;
  private xmlParser: XMLParser;
  private baseUrl: string;

  constructor(credentials: CRACredentials) =>
    this.credentials = credentials;
    this.xmlBuilder = new XMLBuilder(XML_OPTIONS);
    this.xmlParser = new XMLParser();
    this.baseUrl = CRA_ENDPOINTS[credentials.environment];
  }

  private async authenticate(): Promise<string> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth`, {
        eservicesNumber: this.credentials.eservicesNumber,
        password: this.credentials.password,
      });

      return response.data.token;
    } catch (error) {
      captureError(error as Error, { service: 'CRA_AUTH' });
      throw new Error('Failed to authenticate with CRA');
    }
  }

  private generateXML(taxReturn: TaxReturn): string {
    try {
      const returnData = {
        Return: {
          '@_xmlns': 'http://www.cra-arc.gc.ca/xmlns/efile/v1',
          '@_type': taxReturn.type,
          '@_year': taxReturn.year,
          ...taxReturn.data,
        },
      };

      return this.xmlBuilder.build(returnData);
    } catch (error) {
      captureError(error as Error, {
        service: 'CRA_XML_GENERATION',
        returnType: taxReturn.type,
        year: taxReturn.year,
      });
      throw new Error('Failed to generate XML');
    }
  }

  private validateXML(xml: string, type: string, year: number): boolean {
    // TODO: Implement XML schema validation
    // This would validate against CRA's XSD schemas
    return true;
  }

  public async submitReturn(taxReturn: TaxReturn): Promise<EFileResponse> {
    try {
      // Generate and validate XML
      const xml = this.generateXML(taxReturn);
      const isValid = this.validateXML(xml, taxReturn.type, taxReturn.year);

      if (!isValid) {
        throw new Error('Invalid tax return data');
      }

      // Authenticate and submit
      const token = await this.authenticate();
      const response = await axios.post(
        `${this.baseUrl}/submit`,
        { xml },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/xml',
          },
        }
      );

      const result = this.xmlParser.parse(response.data);

      captureMessage('Tax return submitted successfully', 'info');

      return {
        confirmationNumber: result.Response.ConfirmationNumber,
        timestamp: result.Response.Timestamp,
        status: result.Response.Status,
        errors: result.Response.Errors?.Error || [],
      };
    } catch (error) {
      captureError(error as Error, {
        service: 'CRA_SUBMIT',
        returnType: taxReturn.type,
        year: taxReturn.year,
      });
      throw new Error('Failed to submit tax return');
    }
  }

  public async checkStatus(confirmationNumber: string): Promise<string> {
    try {
      const token = await this.authenticate();
      const response = await axios.get(`${this.baseUrl}/status/${confirmationNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.status;
    } catch (error) {
      captureError(error as Error, {
        service: 'CRA_STATUS_CHECK',
        confirmationNumber,
      });
      throw new Error('Failed to check return status');
    }
  }

  public async downloadReceipt(confirmationNumber: string): Promise<Buffer> {
    try {
      const token = await this.authenticate();
      const response = await axios.get(`${this.baseUrl}/receipt/${confirmationNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'arraybuffer',
      });

      return response.data;
    } catch (error) {
      captureError(error as Error, {
        service: 'CRA_RECEIPT_DOWNLOAD',
        confirmationNumber,
      });
      throw new Error('Failed to download receipt');
    }
  }
}
