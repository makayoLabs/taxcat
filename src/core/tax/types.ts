import Decimal from 'decimal.js';
import { DecimalType } from '../types/decimal';

export type TaxYear = number;

export type ProvinceCode =
  | 'AB'
  | 'BC'
  | 'MB'
  | 'NB'
  | 'NL'
  | 'NS'
  | 'NT'
  | 'NU'
  | 'ON'
  | 'PE'
  | 'QC'
  | 'SK'
  | 'YT';

export type MaritalStatus =
  | 'SINGLE'
  | 'MARRIED'
  | 'COMMON_LAW'
  | 'SEPARATED'
  | 'DIVORCED'
  | 'WIDOWED';

export type ResidencyStatus = 'RESIDENT' | 'NON_RESIDENT' | 'DEEMED_RESIDENT' | 'FACTUAL_RESIDENT';

export interface TaxPayer {
  id: string;
  sin: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  maritalStatus: MaritalStatus;
  residencyStatus: ResidencyStatus;
  province: ProvinceCode;
  address: Address;
  dependents: Dependent[];
  spouse?: Spouse;
  language: 'EN' | 'FR';
  email: string;
}

export interface Address {
  street: string;
  city: string;
  province: ProvinceCode;
  postalCode: string;
  country: string;
}

export interface Dependent {
  name: string;
  sin?: string;
  relationship: string;
  dateOfBirth: Date;
  income: DecimalType;
  disability: boolean;
}

export interface Spouse {
  name: string;
  sin: string;
  netIncome: DecimalType;
  disability: boolean;
}

export interface Income {
  employment: EmploymentIncome[];
  business: BusinessIncome[];
  investment: InvestmentIncome;
  pension: PensionIncome;
  other: OtherIncome;
}

export interface EmploymentIncome {
  employer: string;
  t4: {
    income: DecimalType;
    tax: DecimalType;
    cpp: DecimalType;
    ei: DecimalType;
    rpp: DecimalType;
    union: DecimalType;
  };
}

export interface BusinessIncome {
  name: string;
  type: string;
  revenue: DecimalType;
  expenses: Record<string, DecimalType>;
  useOfHome?: UseOfHome;
  vehicle?: VehicleExpenses;
}

export interface UseOfHome {
  totalArea: number;
  businessArea: number;
  expenses: {
    heat: DecimalType;
    electricity: DecimalType;
    insurance: DecimalType;
    maintenance: DecimalType;
    mortgage: DecimalType;
    propertyTax: DecimalType;
  };
}

export interface VehicleExpenses {
  totalKm: number;
  businessKm: number;
  expenses: {
    fuel: DecimalType;
    insurance: DecimalType;
    maintenance: DecimalType;
    lease: DecimalType;
    loan: DecimalType;
  };
}

export interface InvestmentIncome {
  dividends: {
    eligible: DecimalType;
    nonEligible: DecimalType;
    foreign: DecimalType;
  };
  interest: DecimalType;
  capitalGains: DecimalType;
  rentalIncome: DecimalType;
}

export interface PensionIncome {
  cpp: DecimalType;
  oas: DecimalType;
  other: DecimalType;
}

export interface OtherIncome {
  ei: DecimalType;
  wsib: DecimalType;
  social: DecimalType;
  foreign: DecimalType;
  other: Record<string, DecimalType>;
}

export interface Deductions {
  rrsp: {
    contributions: DecimalType;
    prpp: DecimalType;
    spousalContributions: DecimalType;
  };
  employment: {
    union: DecimalType;
    professional: DecimalType;
    other: DecimalType;
  };
  other: {
    movingExpenses: DecimalType;
    supportPayments: DecimalType;
    carryingCharges: DecimalType;
  };
}

export interface Credits {
  basic: DecimalType;
  age: DecimalType;
  spouse: DecimalType;
  dependent: DecimalType;
  disability: DecimalType;
  medical: DecimalType;
  donations: DecimalType;
  other: Record<string, DecimalType>;
}

export interface TaxCalculations {
  income: {
    employment: DecimalType;
    business: DecimalType;
    investment: DecimalType;
    taxable: DecimalType;
    net: DecimalType;
  };
  deductions: {
    total: DecimalType;
    nonRefundable: DecimalType;
    refundable: DecimalType;
  };
  tax: {
    federal: DecimalType;
    provincial: DecimalType;
    total: DecimalType;
  };
  credits: {
    nonRefundable: DecimalType;
    refundable: DecimalType;
    total: DecimalType;
  };
  contributions: {
    cpp: DecimalType;
    ei: DecimalType;
    qpp: DecimalType;
  };
  balance: {
    owing: DecimalType;
    refund: DecimalType;
  };
}

export interface TaxReturn {
  id: string;
  taxpayerId: string;
  year: TaxYear;
  type: TaxReturnType;
  status: TaxReturnStatus;
  filingType: FilingType;
  income: Income;
  deductions: Deductions;
  credits: Credits;
  calculations: TaxCalculations;
  documents: Document[];
  slips: TaxSlip[];
  elections: Election[];
  foreignReporting: ForeignReporting;
  timestamp: {
    created: Date;
    modified: Date;
    filed?: Date;
    assessed?: Date;
  };
}

export type TaxReturnType =
  | 'T1_GENERAL'
  | 'T1_SPECIAL'
  | 'T2_CORPORATION'
  | 'T3_TRUST'
  | 'T5013_PARTNERSHIP'
  | 'T2125_BUSINESS'
  | 'T776_RENTAL'
  | 'GST_HST'
  | 'T1135_FOREIGN'
  | 'T1_DECEASED'
  | 'T1_BANKRUPTCY';

export type TaxReturnStatus =
  | 'DRAFT'
  | 'IN_PROGRESS'
  | 'REVIEW_NEEDED'
  | 'READY_TO_FILE'
  | 'FILED'
  | 'ASSESSED'
  | 'REASSESSED'
  | 'AMENDED'
  | 'ARCHIVED';

export type FilingType = 'EFILE' | 'PAPER' | 'ReFILE' | 'ADJUSTMENT';

export interface TaxSlip {
  id: string;
  type: TaxSlipType;
  year: TaxYear;
  data: Record<string, any>;
  issuer: {
    name: string;
    number?: string;
  };
  recipient: {
    sin: string;
    name: string;
  };
}

export type TaxSlipType =
  | 'T4'
  | 'T4A'
  | 'T4E'
  | 'T4RSP'
  | 'T4RIF'
  | 'T3'
  | 'T5'
  | 'T5008'
  | 'T5013'
  | 'T2202'
  | 'T2200'
  | 'T2201'
  | 'RRSP'
  | 'OTHER';

export interface Election {
  id: string;
  type: ElectionType;
  description: string;
  amount?: DecimalType;
  details: Record<string, any>;
}

export type ElectionType =
  | 'PENSION_SPLIT'
  | 'FOREIGN_TAX'
  | 'CAPITAL_GAINS'
  | 'STOCK_OPTIONS'
  | 'OTHER';

export interface ForeignReporting {
  t1135Required: boolean;
  t1134Required: boolean;
  t1141Required: boolean;
  t1142Required: boolean;
  foreignProperty: {
    cost: DecimalType;
    income: DecimalType;
    gain: DecimalType;
  };
  foreignAffiliates?: {
    name: string;
    country: string;
    ownership: number;
  }[];
  foreignTrusts?: {
    name: string;
    country: string;
    contribution: DecimalType;
  }[];
}

export interface RentalExpenses {
  advertising: DecimalType;
  insurance: DecimalType;
  interest: DecimalType;
  maintenance: DecimalType;
  management: DecimalType;
  mortgage: DecimalType;
  officeExpenses: DecimalType;
  propertyTax: DecimalType;
  utilities: DecimalType;
  wages: DecimalType;
  other: Record<string, DecimalType>;
}

export interface CapitalCostAllowance {
  class: string;
  description: string;
  openingBalance: DecimalType;
  additions: DecimalType;
  dispositions: DecimalType;
  rate: number;
  recapture?: DecimalType;
  terminalLoss?: DecimalType;
}

export interface TaxBracket {
  threshold: DecimalType;
  rate: DecimalType;
}

export interface ProvincialRates {
  brackets: TaxBracket[];
  basicPersonalAmount: DecimalType;
  surtax?: {
    thresholds: DecimalType[];
    rates: DecimalType[];
  };
}

export interface TaxRates {
  basicPersonalAmount: DecimalType;
  federalBrackets: TaxBracket[];
  provincialRates: Record<string, ProvincialRates>;
  inflation: {
    rate: number;
    indexationFactor: number;
  };
}

export interface TaxYearConfig {
  federalBrackets: TaxBracket[];
  provincialRates: Record<string, ProvincialRates>;
  basicPersonalAmount: DecimalType;
  ageAmount: DecimalType;
  ageThreshold: DecimalType;
  rrspDeductionLimit: DecimalType;
  tfsaContributionLimit: DecimalType;
  cpp: {
    rate: number;
    maxPensionable: DecimalType;
    basicExemption: DecimalType;
  };
  ei: {
    rate: number;
    maxInsurable: DecimalType;
  };
  qpp?: {
    rate: number;
    maxPensionable: DecimalType;
    basicExemption: DecimalType;
  };
  inflation: {
    rate: number;
    indexationFactor: number;
  };
}

// ... More interfaces will be added for other income types, deductions, credits, etc.
