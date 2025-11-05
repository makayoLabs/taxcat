import { Decimal } from 'decimal.js';

// Canadian Tax Brackets for 2024
export const FEDERAL_TAX_BRACKETS_2024 = [
  [0.15, 55887], // First $55,887 at 15%
  [0.205, 111780],  // Next $55,893 ($55,887 to $111,780) at 20.5%
  [0.26, 173205],   // Next $61,425 ($111,780 to $173,205) at 26%
  [0.29, 246752],   // Next $73,547 ($173,205 to $246,752) at 29%
  [0.33, Number.MAX_SAFE_INTEGER], // Over $246,752 at 33%
];

export const PROVINCIAL_TAX_BRACKETS_2024: Record<string, number[][]> = {
  'ON': [ // Ontario
    [0.0505, 51443],
    [0.0915, 102887],
    [0.1116, 150000],
    [0.1216, 220000],
    [0.1316, Number.MAX_SAFE_INTEGER],
  ],
  'BC': [ // British Columbia
    [0.0506, 47937],
    [0.0777, 95875],
    [0.1050, 110000],
    [0.1229, 133000],
    [0.1470, 181232],
    [0.1680, 252752],
    [0.2050, Number.MAX_SAFE_INTEGER],
  ],
  'AB': [ // Alberta
    [0.1, 148780],
    [0.12, 177920],
    [0.13, 237206],
    [0.14, 355841],
    [0.15, Number.MAX_SAFE_INTEGER],
  ],
  // Add more provinces as needed
};

export class TaxCalculator {
  private static calculateTax(income: number, brackets: number[][]): number {
    let totalTax = 0;
    let remainingIncome = income;

    for (const [rate, bracket] of brackets) {
      if (remainingIncome <= 0) break;

      const taxableInThisBracket = Math.min(remainingIncome, bracket);
      const taxInThisBracket = new Decimal(taxableInThisBracket).mul(rate).toNumber();
      
      totalTax += taxInThisBracket;
      remainingIncome -= taxableInThisBracket;
    }

    return totalTax;
  }

  static calculateFederalTax(taxableIncome: number): number {
    return this.calculateTax(taxableIncome, FEDERAL_TAX_BRACKETS_2024);
  }

  static calculateProvincialTax(taxableIncome: number, province: string): number {
    const brackets = PROVINCIAL_TAX_BRACKETS_2024[province];
    if (!brackets) {
      throw new Error(`Provincial tax brackets not found for province: ${province}`);
    }
    return this.calculateTax(taxableIncome, brackets);
  }

  static calculateTotalTax(taxableIncome: number, province: string = 'ON'): {
    federal: number;
    provincial: number;
    total: number;
  } {
    const federal = this.calculateFederalTax(taxableIncome);
    const provincial = this.calculateProvincialTax(taxableIncome, province);
    const total = federal + provincial;

    return {
      federal: Math.round(federal * 100) / 100,
      provincial: Math.round(provincial * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  }

  static calculateTaxableIncome(grossIncome: number, deductions: number): number {
    return Math.max(0, grossIncome - deductions);
  }

  static calculateBasicPersonalAmount(income: number, province: string = 'ON'): number {
    // Basic personal amount (varies by province)
    const federalBasicAmount = 15500; // 2024 federal basic personal amount
    
    // Provincial basic amounts
    const provincialBasicAmount: Record<string, number> = {
      'ON': 11865,
      'BC': 12078,
      'AB': 22101,
      'QC': 17995,
    };

    const provincialAmount = provincialBasicAmount[province] || 10000;
    
    return {
      federal: Math.min(federalBasicAmount, income),
      provincial: Math.min(provincialAmount, income),
    };
  }

  static calculateCPP(employmentIncome: number): number {
    const contributionRate = 0.0619; // 6.19% for 2024
    const maximumContributableEarnings = 74200; // 2024 maximum
    const maximumContribution = 4835; // 2024 maximum
    
    const contributableEarnings = Math.min(employmentIncome, maximumContributableEarnings);
    const contribution = contributableEarnings * contributionRate;
    
    return Math.min(contribution, maximumContribution);
  }

  static calculateEI(employmentIncome: number): number {
    const contributionRate = 0.0166; // 1.66% for 2024
    const maximumInsurableEarnings = 65000; // 2024 maximum
    const maximumPremium = 1080; // 2024 maximum
    
    const insurableEarnings = Math.min(employmentIncome, maximumInsurableEarnings);
    const premium = insurableEarnings * contributionRate;
    
    return Math.min(premium, maximumPremium);
  }
}