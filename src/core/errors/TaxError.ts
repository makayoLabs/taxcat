export enum TaxErrorCode {
  // Validation Errors
  INVALID_SIN = 'INVALID_SIN',
  INVALID_NAME = 'INVALID_NAME',
  INVALID_DATE = 'INVALID_DATE',
  INVALID_POSTAL_CODE = 'INVALID_POSTAL_CODE',
  INVALID_AMOUNT = 'INVALID_AMOUNT',
  INVALID_TAX_YEAR = 'INVALID_TAX_YEAR',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_BUSINESS_NUMBER = 'INVALID_BUSINESS_NUMBER',
  INVALID_PERCENTAGE = 'INVALID_PERCENTAGE',

  // Calculation Errors
  NEGATIVE_INCOME = 'NEGATIVE_INCOME',
  EXCEEDED_CONTRIBUTION_LIMIT = 'EXCEEDED_CONTRIBUTION_LIMIT',
  INVALID_DEDUCTION = 'INVALID_DEDUCTION',
  INVALID_CREDIT = 'INVALID_CREDIT',

  // Business Logic Errors
  UNSUPPORTED_TAX_YEAR = 'UNSUPPORTED_TAX_YEAR',
  UNSUPPORTED_PROVINCE = 'UNSUPPORTED_PROVINCE',
  INVALID_FILING_STATUS = 'INVALID_FILING_STATUS',
  DUPLICATE_SUBMISSION = 'DUPLICATE_SUBMISSION',

  // System Errors
  CALCULATION_ERROR = 'CALCULATION_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',

  // E-File Errors
  EFILE_VALIDATION_ERROR = 'EFILE_VALIDATION_ERROR',
  EFILE_SUBMISSION_ERROR = 'EFILE_SUBMISSION_ERROR',
  EFILE_SYSTEM_ERROR = 'EFILE_SYSTEM_ERROR',

  // Newly added from the code block
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
}

export enum TaxErrorSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

export class TaxError extends Error {
  constructor(
    public code: TaxErrorCode,
    message: string,
    public severity: TaxErrorSeverity,
    public field?: string,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'TaxError';
  }

  public toJSON() {
    return {
      code: this.code,
      message: this.message,
      severity: this.severity,
      field: this.field,
      context: this.context,
    };
  }

  public static fromJSON(json: any): TaxError {
    return new TaxError(json.code, json.message, json.severity, json.field, json.context);
  }
}
