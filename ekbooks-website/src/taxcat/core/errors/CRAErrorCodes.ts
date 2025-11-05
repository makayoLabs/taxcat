import { TaxErrorCode } from './TaxError';

export enum CRAErrorCode {
  // Authentication Errors (1000-1099)
  INVALID_CREDENTIALS = 'CRA_1000',
  SESSION_EXPIRED = 'CRA_1001',
  UNAUTHORIZED_ACCESS = 'CRA_1002',
  INVALID_ESERVICES_NUMBER = 'CRA_1003',
  ACCOUNT_LOCKED = 'CRA_1004',
  INVALID_SECURITY_ANSWERS = 'CRA_1005',

  // Validation Errors (1100-1199)
  INVALID_SIN = 'CRA_1100',
  INVALID_DATE_OF_BIRTH = 'CRA_1101',
  INVALID_POSTAL_CODE = 'CRA_1102',
  INVALID_PROVINCE_CODE = 'CRA_1103',
  INVALID_PHONE_NUMBER = 'CRA_1104',
  INVALID_EMAIL = 'CRA_1105',
  INVALID_ADDRESS = 'CRA_1106',
  INVALID_BUSINESS_NUMBER = 'CRA_1107',
  INVALID_TRUST_NUMBER = 'CRA_1108',
  INVALID_CHARITY_NUMBER = 'CRA_1109',

  // Filing Errors (1200-1299)
  DUPLICATE_SUBMISSION = 'CRA_1200',
  LATE_FILING = 'CRA_1201',
  INCOMPLETE_FILING = 'CRA_1202',
  INVALID_TAX_YEAR = 'CRA_1203',
  AMENDED_RETURN_NOT_ALLOWED = 'CRA_1204',
  PREVIOUS_RETURN_REQUIRED = 'CRA_1205',
  FILING_DEADLINE_PASSED = 'CRA_1206',
  INVALID_FILING_STATUS = 'CRA_1207',
  MULTIPLE_RETURNS_SAME_YEAR = 'CRA_1208',
  INVALID_RETURN_TYPE = 'CRA_1209',

  // Calculation Errors (1300-1399)
  INCOME_EXCEEDS_LIMIT = 'CRA_1300',
  NEGATIVE_INCOME = 'CRA_1301',
  INVALID_DEDUCTION = 'CRA_1302',
  INVALID_CREDIT = 'CRA_1303',
  RRSP_OVER_LIMIT = 'CRA_1304',
  TFSA_OVER_LIMIT = 'CRA_1305',
  INVALID_CARRYFORWARD = 'CRA_1306',
  INVALID_LOSS_APPLICATION = 'CRA_1307',
  INVALID_FOREIGN_CREDIT = 'CRA_1308',
  INVALID_DIVIDEND_CREDIT = 'CRA_1309',

  // Document Errors (1400-1499)
  MISSING_T4 = 'CRA_1400',
  MISSING_T5 = 'CRA_1401',
  MISSING_T3 = 'CRA_1402',
  MISSING_T5013 = 'CRA_1403',
  MISSING_T2202 = 'CRA_1404',
  MISSING_RECEIPTS = 'CRA_1405',
  INVALID_SLIP_FORMAT = 'CRA_1406',
  DUPLICATE_SLIP = 'CRA_1407',
  SLIP_MISMATCH = 'CRA_1408',
  MISSING_SCHEDULE = 'CRA_1409',

  // XML Errors (1500-1599)
  INVALID_XML_FORMAT = 'CRA_1500',
  SCHEMA_VALIDATION_FAILED = 'CRA_1501',
  MISSING_REQUIRED_ELEMENT = 'CRA_1502',
  INVALID_ELEMENT_VALUE = 'CRA_1503',
  INVALID_ENUMERATION = 'CRA_1504',
  INVALID_DATE_FORMAT = 'CRA_1505',
  INVALID_NUMERIC_FORMAT = 'CRA_1506',
  INVALID_BOOLEAN_FORMAT = 'CRA_1507',
  INVALID_CURRENCY_FORMAT = 'CRA_1508',
  XML_VERSION_MISMATCH = 'CRA_1509',

  // System Errors (1600-1699)
  SERVICE_UNAVAILABLE = 'CRA_1600',
  TIMEOUT = 'CRA_1601',
  RATE_LIMIT_EXCEEDED = 'CRA_1602',
  INTERNAL_ERROR = 'CRA_1603',
  DATABASE_ERROR = 'CRA_1604',
  NETWORK_ERROR = 'CRA_1605',
  MAINTENANCE_MODE = 'CRA_1606',
  VERSION_UNSUPPORTED = 'CRA_1607',
  SYSTEM_OVERLOAD = 'CRA_1608',
  UNEXPECTED_RESPONSE = 'CRA_1609',

  // Business Rules Errors (1700-1799)
  INVALID_MARITAL_STATUS = 'CRA_1700',
  INVALID_DEPENDANT_INFO = 'CRA_1701',
  INVALID_RESIDENCY_STATUS = 'CRA_1702',
  INVALID_TAX_TREATY = 'CRA_1703',
  INVALID_ELECTION = 'CRA_1704',
  INVALID_ROLLOVER = 'CRA_1705',
  INVALID_ATTRIBUTION = 'CRA_1706',
  INVALID_SPLIT_PENSION = 'CRA_1707',
  INVALID_FOREIGN_PROPERTY = 'CRA_1708',
  INVALID_BUSINESS_ACTIVITY = 'CRA_1709',

  // Quebec-Specific Errors (1800-1899)
  QPP_OVER_LIMIT = 'CRA_1800',
  QPIP_OVER_LIMIT = 'CRA_1801',
  INVALID_RL_SLIP = 'CRA_1802',
  INVALID_QC_RESIDENCY = 'CRA_1803',
  INVALID_QC_CREDIT = 'CRA_1804',
  INVALID_QC_DEDUCTION = 'CRA_1805',
  MISSING_RL1 = 'CRA_1806',
  MISSING_RL2 = 'CRA_1807',
  MISSING_RL3 = 'CRA_1808',
  INVALID_QC_CALCULATION = 'CRA_1809',

  // Transmission Errors (1900-1999)
  TRANSMISSION_FAILED = 'CRA_1900',
  INVALID_TRANSMISSION_ID = 'CRA_1901',
  DUPLICATE_TRANSMISSION = 'CRA_1902',
  TRANSMISSION_TIMEOUT = 'CRA_1903',
  INVALID_BATCH_SIZE = 'CRA_1904',
  BATCH_PROCESSING_ERROR = 'CRA_1905',
  TRANSMISSION_REJECTED = 'CRA_1906',
  INVALID_SEQUENCE = 'CRA_1907',
  CHECKSUM_MISMATCH = 'CRA_1908',
  ENCRYPTION_ERROR = 'CRA_1909',
}

export interface CRAErrorDetails {
  code: CRAErrorCode;
  message: string;
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  category:
    | 'AUTHENTICATION'
    | 'VALIDATION'
    | 'FILING'
    | 'CALCULATION'
    | 'DOCUMENT'
    | 'XML'
    | 'SYSTEM'
    | 'BUSINESS'
    | 'QUEBEC'
    | 'TRANSMISSION';
  remediation?: string;
  reference?: string;
}

export const CRA_ERROR_DETAILS: Record<CRAErrorCode, CRAErrorDetails> = {
  [CRAErrorCode.INVALID_CREDENTIALS]: {
    code: CRAErrorCode.INVALID_CREDENTIALS,
    message: 'Invalid eServices credentials provided',
    severity: 'ERROR',
    category: 'AUTHENTICATION',
    remediation: 'Verify your eServices number and password',
    reference:
      'https://www.canada.ca/en/revenue-agency/services/e-services/e-services-businesses/business-account.html',
  },
  // Add details for all other error codes...
  [CRAErrorCode.TRANSMISSION_ERROR]: {
    code: CRAErrorCode.TRANSMISSION_ERROR,
    message: 'Error during transmission to CRA',
    severity: 'ERROR',
    category: 'TRANSMISSION',
    remediation: 'Check network connection and retry transmission',
    reference:
      'https://www.canada.ca/en/revenue-agency/services/e-services/e-services-businesses/efile/efile-technical-specifications.html',
  },
} as const;

export function isCRAError(code: string): code is CRAErrorCode {
  return Object.values(CRAErrorCode).includes(code as CRAErrorCode);
}

export function getCRAErrorDetails(code: CRAErrorCode): CRAErrorDetails {
  return CRA_ERROR_DETAILS[code];
}

export function mapToTaxErrorCode(craCode: CRAErrorCode): TaxErrorCode {
  const categoryMap: Partial<Record<CRAErrorDetails['category'], TaxErrorCode>> = {
    AUTHENTICATION: TaxErrorCode.AUTHENTICATION_ERROR,
    VALIDATION: TaxErrorCode.VALIDATION_ERROR,
    FILING: TaxErrorCode.FILING_ERROR,
    CALCULATION: TaxErrorCode.CALCULATION_ERROR,
    DOCUMENT: TaxErrorCode.DOCUMENT_ERROR,
    XML: TaxErrorCode.XML_GENERATION_ERROR,
    SYSTEM: TaxErrorCode.SYSTEM_ERROR,
    BUSINESS: TaxErrorCode.BUSINESS_RULE_ERROR,
    QUEBEC: TaxErrorCode.PROVINCIAL_ERROR,
    TRANSMISSION: TaxErrorCode.TRANSMISSION_ERROR,
  };

  const details = getCRAErrorDetails(craCode);
  return categoryMap[details.category] || TaxErrorCode.UNKNOWN_ERROR;
}
