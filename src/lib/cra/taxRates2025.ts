/**
 * Canadian Tax Rates for 2025
 * Source: Canada Revenue Agency
 * Last Updated: January 2025
 * 
 * This file contains all federal and provincial tax rates, brackets,
 * and constants needed for tax calculations.
 */

export const TAX_YEAR = 2025;

// ============================================================================
// FEDERAL TAX RATES
// ============================================================================

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
  name?: string;
}

export const FEDERAL_TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 55867, rate: 0.15, name: "15% bracket" },
  { min: 55867, max: 111733, rate: 0.205, name: "20.5% bracket" },
  { min: 111733, max: 173205, rate: 0.26, name: "26% bracket" },
  { min: 173205, max: 246752, rate: 0.29, name: "29% bracket" },
  { min: 246752, max: Infinity, rate: 0.33, name: "33% bracket" }
];

// ============================================================================
// PROVINCIAL TAX RATES
// ============================================================================

export const PROVINCIAL_TAX_BRACKETS: Record<string, TaxBracket[]> = {
  // Ontario
  ON: [
    { min: 0, max: 51446, rate: 0.0505, name: "5.05% bracket" },
    { min: 51446, max: 102894, rate: 0.0915, name: "9.15% bracket" },
    { min: 102894, max: 150000, rate: 0.1116, name: "11.16% bracket" },
    { min: 150000, max: 220000, rate: 0.1216, name: "12.16% bracket" },
    { min: 220000, max: Infinity, rate: 0.1316, name: "13.16% bracket" }
  ],

  // British Columbia
  BC: [
    { min: 0, max: 47937, rate: 0.0506, name: "5.06% bracket" },
    { min: 47937, max: 95875, rate: 0.077, name: "7.7% bracket" },
    { min: 95875, max: 110076, rate: 0.105, name: "10.5% bracket" },
    { min: 110076, max: 133664, rate: 0.1229, name: "12.29% bracket" },
    { min: 133664, max: 181232, rate: 0.147, name: "14.7% bracket" },
    { min: 181232, max: 252752, rate: 0.168, name: "16.8% bracket" },
    { min: 252752, max: Infinity, rate: 0.205, name: "20.5% bracket" }
  ],

  // Alberta
  AB: [
    { min: 0, max: 148269, rate: 0.10, name: "10% bracket" },
    { min: 148269, max: 177922, rate: 0.12, name: "12% bracket" },
    { min: 177922, max: 237230, rate: 0.13, name: "13% bracket" },
    { min: 237230, max: 355845, rate: 0.14, name: "14% bracket" },
    { min: 355845, max: Infinity, rate: 0.15, name: "15% bracket" }
  ],

  // Saskatchewan
  SK: [
    { min: 0, max: 52057, rate: 0.105, name: "10.5% bracket" },
    { min: 52057, max: 148734, rate: 0.125, name: "12.5% bracket" },
    { min: 148734, max: Infinity, rate: 0.145, name: "14.5% bracket" }
  ],

  // Manitoba
  MB: [
    { min: 0, max: 47000, rate: 0.108, name: "10.8% bracket" },
    { min: 47000, max: 100000, rate: 0.1275, name: "12.75% bracket" },
    { min: 100000, max: Infinity, rate: 0.174, name: "17.4% bracket" }
  ],

  // Quebec
  QC: [
    { min: 0, max: 51780, rate: 0.14, name: "14% bracket" },
    { min: 51780, max: 103545, rate: 0.19, name: "19% bracket" },
    { min: 103545, max: 126000, rate: 0.24, name: "24% bracket" },
    { min: 126000, max: Infinity, rate: 0.2575, name: "25.75% bracket" }
  ],

  // New Brunswick
  NB: [
    { min: 0, max: 49958, rate: 0.094, name: "9.4% bracket" },
    { min: 49958, max: 99916, rate: 0.14, name: "14% bracket" },
    { min: 99916, max: 185064, rate: 0.16, name: "16% bracket" },
    { min: 185064, max: Infinity, rate: 0.195, name: "19.5% bracket" }
  ],

  // Nova Scotia
  NS: [
    { min: 0, max: 29590, rate: 0.0879, name: "8.79% bracket" },
    { min: 29590, max: 59180, rate: 0.1495, name: "14.95% bracket" },
    { min: 59180, max: 93000, rate: 0.1667, name: "16.67% bracket" },
    { min: 93000, max: 150000, rate: 0.175, name: "17.5% bracket" },
    { min: 150000, max: Infinity, rate: 0.21, name: "21% bracket" }
  ],

  // Prince Edward Island
  PE: [
    { min: 0, max: 32656, rate: 0.098, name: "9.8% bracket" },
    { min: 32656, max: 64313, rate: 0.138, name: "13.8% bracket" },
    { min: 64313, max: 105000, rate: 0.167, name: "16.7% bracket" },
    { min: 105000, max: Infinity, rate: 0.187, name: "18.7% bracket" }
  ],

  // Newfoundland and Labrador
  NL: [
    { min: 0, max: 43198, rate: 0.087, name: "8.7% bracket" },
    { min: 43198, max: 86395, rate: 0.145, name: "14.5% bracket" },
    { min: 86395, max: 154244, rate: 0.158, name: "15.8% bracket" },
    { min: 154244, max: 215943, rate: 0.173, name: "17.3% bracket" },
    { min: 215943, max: Infinity, rate: 0.183, name: "18.3% bracket" }
  ],

  // Yukon
  YT: [
    { min: 0, max: 55867, rate: 0.064, name: "6.4% bracket" },
    { min: 55867, max: 111733, rate: 0.09, name: "9% bracket" },
    { min: 111733, max: 173205, rate: 0.109, name: "10.9% bracket" },
    { min: 173205, max: 500000, rate: 0.128, name: "12.8% bracket" },
    { min: 500000, max: Infinity, rate: 0.15, name: "15% bracket" }
  ],

  // Northwest Territories
  NT: [
    { min: 0, max: 50597, rate: 0.059, name: "5.9% bracket" },
    { min: 50597, max: 101198, rate: 0.086, name: "8.6% bracket" },
    { min: 101198, max: 164525, rate: 0.122, name: "12.2% bracket" },
    { min: 164525, max: Infinity, rate: 0.1405, name: "14.05% bracket" }
  ],

  // Nunavut
  NU: [
    { min: 0, max: 53268, rate: 0.04, name: "4% bracket" },
    { min: 53268, max: 106537, rate: 0.07, name: "7% bracket" },
    { min: 106537, max: 173205, rate: 0.09, name: "9% bracket" },
    { min: 173205, max: Infinity, rate: 0.115, name: "11.5% bracket" }
  ]
};

// ============================================================================
// TAX CREDITS AND DEDUCTIONS
// ============================================================================

export const BASIC_PERSONAL_AMOUNT = 15705;
export const SPOUSE_AMOUNT = 15705;
export const ELIGIBLE_DEPENDANT_AMOUNT = 15705;
export const CANADA_EMPLOYMENT_AMOUNT = 1368;
export const AGE_AMOUNT = 8790; // For seniors 65+
export const DISABILITY_AMOUNT = 9428;

// ============================================================================
// CPP (Canada Pension Plan) RATES
// ============================================================================

export const CPP_BASIC_EXEMPTION = 3500;
export const CPP_MAX_PENSIONABLE_EARNINGS = 68500;
export const CPP_CONTRIBUTION_RATE = 0.0595; // 5.95%
export const CPP_SELF_EMPLOYED_RATE = 0.119; // 11.9% (double)

export function calculateCPPContribution(income: number, selfEmployed: boolean = false): number {
  const pensionableEarnings = Math.min(income, CPP_MAX_PENSIONABLE_EARNINGS) - CPP_BASIC_EXEMPTION;
  const maxContribution = pensionableEarnings > 0 ? pensionableEarnings : 0;
  const rate = selfEmployed ? CPP_SELF_EMPLOYED_RATE : CPP_CONTRIBUTION_RATE;
  return maxContribution * rate;
}

// ============================================================================
// EI (Employment Insurance) RATES
// ============================================================================

export const EI_MAX_INSURABLE_EARNINGS = 63200;
export const EI_PREMIUM_RATE = 0.0163; // 1.63%
export const EI_SELF_EMPLOYED_RATE = 0.0163; // Same for self-employed (optional)

// Quebec has different EI rates
export const EI_PREMIUM_RATE_QC = 0.0127; // 1.27%

export function calculateEIContribution(income: number, province: string = 'ON'): number {
  const insurableEarnings = Math.min(income, EI_MAX_INSURABLE_EARNINGS);
  const rate = province === 'QC' ? EI_PREMIUM_RATE_QC : EI_PREMIUM_RATE;
  return insurableEarnings * rate;
}

// ============================================================================
// GST/HST RATES
// ============================================================================

export const GST_RATE = 0.05; // 5% federal

export const PROVINCIAL_SALES_TAX: Record<string, { gst: number; pst: number; hst: number; name: string }> = {
  ON: { gst: 0, pst: 0, hst: 0.13, name: "HST" },
  BC: { gst: 0.05, pst: 0.07, hst: 0, name: "GST + PST" },
  AB: { gst: 0.05, pst: 0, hst: 0, name: "GST only" },
  SK: { gst: 0.05, pst: 0.06, hst: 0, name: "GST + PST" },
  MB: { gst: 0.05, pst: 0.07, hst: 0, name: "GST + PST" },
  QC: { gst: 0.05, pst: 0.09975, hst: 0, name: "GST + QST" },
  NB: { gst: 0, pst: 0, hst: 0.15, name: "HST" },
  NS: { gst: 0, pst: 0, hst: 0.15, name: "HST" },
  PE: { gst: 0, pst: 0, hst: 0.15, name: "HST" },
  NL: { gst: 0, pst: 0, hst: 0.15, name: "HST" },
  YT: { gst: 0.05, pst: 0, hst: 0, name: "GST only" },
  NT: { gst: 0.05, pst: 0, hst: 0, name: "GST only" },
  NU: { gst: 0.05, pst: 0, hst: 0, name: "GST only" }
};

export function calculateSalesTax(amount: number, province: string): { gst: number; pst: number; hst: number; total: number } {
  const rates = PROVINCIAL_SALES_TAX[province] || PROVINCIAL_SALES_TAX.ON;
  
  return {
    gst: amount * rates.gst,
    pst: amount * rates.pst,
    hst: amount * rates.hst,
    total: amount * (rates.gst + rates.pst + rates.hst)
  };
}

// ============================================================================
// TAX CALCULATION FUNCTIONS
// ============================================================================

/**
 * Calculate tax based on income and tax brackets
 */
export function calculateTax(income: number, brackets: TaxBracket[]): number {
  let tax = 0;
  let previousMax = 0;

  for (const bracket of brackets) {
    const taxableInBracket = Math.min(
      Math.max(income - previousMax, 0),
      bracket.max - previousMax
    );
    
    if (taxableInBracket > 0) {
      tax += taxableInBracket * bracket.rate;
    }
    
    previousMax = bracket.max;
    
    if (income <= bracket.max) break;
  }

  return tax;
}

/**
 * Get the marginal tax rate for a given income
 */
export function getMarginalRate(income: number, brackets: TaxBracket[]): number {
  for (const bracket of brackets) {
    if (income <= bracket.max) {
      return bracket.rate;
    }
  }
  return brackets[brackets.length - 1].rate;
}

/**
 * Get the average (effective) tax rate
 */
export function getAverageRate(income: number, brackets: TaxBracket[]): number {
  if (income === 0) return 0;
  const tax = calculateTax(income, brackets);
  return tax / income;
}

/**
 * Get the tax bracket for a given income
 */
export function getTaxBracket(income: number, brackets: TaxBracket[]): TaxBracket | null {
  for (const bracket of brackets) {
    if (income <= bracket.max) {
      return bracket;
    }
  }
  return brackets[brackets.length - 1];
}

/**
 * Calculate combined federal and provincial tax
 */
export function calculateTotalTax(income: number, province: string): {
  federalTax: number;
  provincialTax: number;
  totalTax: number;
  federalMarginalRate: number;
  provincialMarginalRate: number;
  combinedMarginalRate: number;
  averageRate: number;
} {
  const provincialBrackets = PROVINCIAL_TAX_BRACKETS[province] || PROVINCIAL_TAX_BRACKETS.ON;
  
  const federalTax = calculateTax(income, FEDERAL_TAX_BRACKETS);
  const provincialTax = calculateTax(income, provincialBrackets);
  const totalTax = federalTax + provincialTax;
  
  const federalMarginalRate = getMarginalRate(income, FEDERAL_TAX_BRACKETS);
  const provincialMarginalRate = getMarginalRate(income, provincialBrackets);
  const combinedMarginalRate = federalMarginalRate + provincialMarginalRate;
  
  const averageRate = income > 0 ? totalTax / income : 0;
  
  return {
    federalTax,
    provincialTax,
    totalTax,
    federalMarginalRate,
    provincialMarginalRate,
    combinedMarginalRate,
    averageRate
  };
}

// ============================================================================
// PROVINCE NAMES
// ============================================================================

export const PROVINCE_NAMES: Record<string, string> = {
  ON: "Ontario",
  BC: "British Columbia",
  AB: "Alberta",
  SK: "Saskatchewan",
  MB: "Manitoba",
  QC: "Quebec",
  NB: "New Brunswick",
  NS: "Nova Scotia",
  PE: "Prince Edward Island",
  NL: "Newfoundland and Labrador",
  YT: "Yukon",
  NT: "Northwest Territories",
  NU: "Nunavut"
};

export const PROVINCES = Object.keys(PROVINCE_NAMES);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(rate: number, decimals: number = 2): string {
  return `${(rate * 100).toFixed(decimals)}%`;
}

/**
 * Round to 2 decimal places
 */
export function roundCurrency(amount: number): number {
  return Math.round(amount * 100) / 100;
}