/**
 * TFSA (Tax-Free Savings Account) Contribution Limits
 * Source: Canada Revenue Agency
 * 
 * Historical contribution limits from 2009 to present
 */

export const TFSA_CONTRIBUTION_LIMITS: Record<number, number> = {
  2009: 5000,
  2010: 5000,
  2011: 5000,
  2012: 5000,
  2013: 5500,
  2014: 5500,
  2015: 10000,
  2016: 5500,
  2017: 5500,
  2018: 5500,
  2019: 6000,
  2020: 6000,
  2021: 6000,
  2022: 6000,
  2023: 6500,
  2024: 7000,
  2025: 7000
};

export const TFSA_START_YEAR = 2009;
export const TFSA_MINIMUM_AGE = 18;

/**
 * Calculate total TFSA contribution room from a given year
 */
export function calculateTotalContributionRoom(birthYear: number, currentYear: number = 2025): number {
  const age = currentYear - birthYear;
  
  // Must be 18 or older
  if (age < TFSA_MINIMUM_AGE) {
    return 0;
  }
  
  // Year turned 18
  const yearTurned18 = birthYear + TFSA_MINIMUM_AGE;
  
  // Start accumulating from the later of: year turned 18 or TFSA start year
  const startYear = Math.max(yearTurned18, TFSA_START_YEAR);
  
  let totalRoom = 0;
  for (let year = startYear; year <= currentYear; year++) {
    totalRoom += TFSA_CONTRIBUTION_LIMITS[year] || 0;
  }
  
  return totalRoom;
}

/**
 * Calculate current TFSA contribution room
 */
export function calculateCurrentContributionRoom(
  birthYear: number,
  totalContributions: number,
  totalWithdrawals: number,
  currentYear: number = 2025
): {
  totalRoom: number;
  used: number;
  withdrawn: number;
  available: number;
  overContribution: number;
} {
  const totalRoom = calculateTotalContributionRoom(birthYear, currentYear);
  const used = totalContributions;
  const withdrawn = totalWithdrawals;
  const available = totalRoom - used + withdrawn;
  const overContribution = available < 0 ? Math.abs(available) : 0;
  
  return {
    totalRoom,
    used,
    withdrawn,
    available: Math.max(available, 0),
    overContribution
  };
}

/**
 * Calculate over-contribution penalty
 * 1% per month on the highest excess amount
 */
export function calculateOverContributionPenalty(overContribution: number, months: number = 1): number {
  return overContribution * 0.01 * months;
}

/**
 * Project TFSA growth
 */
export function projectTFSAGrowth(
  currentBalance: number,
  annualReturn: number,
  years: number,
  annualContribution: number = 0
): Array<{ year: number; balance: number; contributions: number; growth: number }> {
  const projections = [];
  let balance = currentBalance;
  let totalContributions = 0;
  
  for (let year = 1; year <= years; year++) {
    // Add annual contribution at start of year
    balance += annualContribution;
    totalContributions += annualContribution;
    
    // Calculate growth for the year
    const yearGrowth = balance * annualReturn;
    balance += yearGrowth;
    
    projections.push({
      year,
      balance,
      contributions: totalContributions,
      growth: balance - currentBalance - totalContributions
    });
  }
  
  return projections;
}

/**
 * Get contribution limit for a specific year
 */
export function getContributionLimit(year: number): number {
  return TFSA_CONTRIBUTION_LIMITS[year] || 0;
}

/**
 * Get all contribution limits as array
 */
export function getAllContributionLimits(): Array<{ year: number; limit: number }> {
  return Object.entries(TFSA_CONTRIBUTION_LIMITS)
    .map(([year, limit]) => ({ year: parseInt(year), limit }))
    .sort((a, b) => b.year - a.year); // Most recent first
}