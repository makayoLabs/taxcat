/**
 * CRA Tax Library - Main Export
 *
 * This file exports all tax-related functions and constants
 * for easy importing throughout the application.
 */

export * from './taxRates2025';
export * from './tfsaRates';

// Re-export commonly used items for convenience
export {
  TAX_YEAR,
  FEDERAL_TAX_BRACKETS,
  PROVINCIAL_TAX_BRACKETS,
  PROVINCE_NAMES,
  PROVINCES,
  calculateTax,
  calculateTotalTax,
  getMarginalRate,
  getAverageRate,
  getTaxBracket,
  calculateCPPContribution,
  calculateEIContribution,
  calculateSalesTax,
  formatCurrency,
  formatPercentage,
  roundCurrency
} from './taxRates2025';

export {
  TFSA_CONTRIBUTION_LIMITS,
  TFSA_START_YEAR,
  TFSA_MINIMUM_AGE,
  calculateTotalContributionRoom,
  calculateCurrentContributionRoom,
  calculateOverContributionPenalty,
  projectTFSAGrowth,
  getContributionLimit,
  getAllContributionLimits
} from './tfsaRates';