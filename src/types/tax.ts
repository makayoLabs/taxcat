export interface TaxableIncome {
  employment: number;
  selfEmployment: number;
  investment: number;
  rental: number;
  pension: number;
  rrsp: number;
  foreign: number;
  other: number;
}

export interface Deductions {
  rrspContributions: number;
  unionDues: number;
  movingExpenses: number;
  childcareExpenses: number;
  medicalExpenses: number;
  charitableDonations: number;
  studentLoanInterest: number;
  homeOffice: number;
  selfEmploymentExpenses: number;
  mortgageInterest: number;
  propertyTax: number;
  foreignTuition: number;
  childcare: number;
  workFromHome: number;
  capitalLosses: number;
  carryForwardLosses: number;
  other: number;
}

export interface Credits {
  basicPersonal: number;
  age: number;
  spouse: number;
  eligible_dependant: number;
  caregiver_amount: number;
  caregiver: number;
  pension: number;
  disability: number;
  education: number;
  tuition: number;
  medical: number;
  donations: number;
  other: number;
}

export interface TaxCalculationResult {
  totalIncome: number;
  taxableIncome: number;
  federalTax: number;
  provincialTax: number;
  cpp: number;
  ei: number;
  totalTax: number;
  totalCredits: number;
  netTax: number;
  effectiveRate: number;
}

export type TaxReturnType =
  | 'T1_GENERAL'
  | 'T2_CORPORATION'
  | 'T3_TRUST'
  | 'T5013_PARTNERSHIP'
  | 'T2125_BUSINESS'
  | 'T776_RENTAL'
  | 'T1_BANKRUPTCY';

export interface TaxCalculationOptions {
  isIndigenous?: boolean;
  indigenousIncomeExempt?: number;
  hasForeignIncome?: boolean;
  bankruptcyDate?: Date;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  ssn: string;
  filingStatus:
    | 'single'
    | 'married_joint'
    | 'married_separate'
    | 'head_household'
    | 'qualifying_widow';
  dateOfBirth: string;
  occupation: string;
}

export interface Income {
  wages: number;
  interest: number;
  dividends: number;
  otherIncome: number;
}

export interface Deductions {
  standardDeduction: number;
  itemizedDeductions: number;
  otherDeductions: number;
}

export interface Credits {
  childTaxCredit: number;
  earnedIncomeCredit: number;
  otherCredits: number;
}

export interface TaxReturnData {
  personalInfo: PersonalInfo;
  income: Income;
  deductions: Deductions;
  credits: Credits;
}

export interface TaxCalculation {
  totalIncome: number;
  totalDeductions: number;
  totalCredits: number;
  taxableIncome: number;
  totalTax: number;
  refundAmount?: number;
  amountDue?: number;
}
