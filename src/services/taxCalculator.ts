import { TaxReturnData, TaxCalculation } from '@/types/tax';

enum BusinessType {
  SOLE_PROPRIETORSHIP = 'SOLE_PROPRIETORSHIP',
  CORPORATION = 'CORPORATION',
  PARTNERSHIP = 'PARTNERSHIP',
  TRUST = 'TRUST',
  NON_PROFIT = 'NON_PROFIT',
  CHARITY = 'CHARITY',
}

enum TaxReturnType {
  T1_GENERAL = 'T1_GENERAL',
  T2_CORPORATION = 'T2_CORPORATION',
  T3_TRUST = 'T3_TRUST',
  T5013_PARTNERSHIP = 'T5013_PARTNERSHIP',
  T4_SUMMARY = 'T4_SUMMARY',
  GST_HST = 'GST_HST',
  T2125_BUSINESS = 'T2125_BUSINESS',
  T776_RENTAL = 'T776_RENTAL',
  T1135_FOREIGN = 'T1135_FOREIGN',
  T1_DECEASED = 'T1_DECEASED',
  T1_BANKRUPTCY = 'T1_BANKRUPTCY',
}

interface Income {
  employment: number;
  selfEmployment: number;
  investments: {
    eligibleDividends: number;
    nonEligibleDividends: number;
    interest: number;
    capitalGains: number;
  };
  rental: number;
  pension: number;
  foreign: {
    employment: number;
    business: number;
    investment: number;
    taxPaid: number;
    countries: string[];
  };
  other: number;
}

interface BusinessIncome {
  revenue: number;
  costOfGoods: number;
  expenses: {
    advertising: number;
    vehicleExpenses: number;
    insurance: number;
    interest: number;
    maintenance: number;
    officeExpenses: number;
    supplies: number;
    professionalFees: number;
    rent: number;
    salariesWages: number;
    travel: number;
    utilities: number;
    other: number;
  };
  capitalCost: {
    equipment: number;
    vehicles: number;
    buildings: number;
    other: number;
  };
  useOfHomeExpenses: {
    heat: number;
    electricity: number;
    insurance: number;
    maintenance: number;
    mortgage: number;
    propertyTax: number;
    other: number;
    businessUsePercentage: number;
  };
}

interface TrustIncome {
  investment: number;
  business: number;
  rental: number;
  capitalGains: number;
  distributions: number;
  other: number;
}

interface Deductions {
  rrspContributions: number;
  unionDues: number;
  movingExpenses: number;
  childcareExpenses: number;
  medicalExpenses: number;
  charitableDonations: number;
  studentLoanInterest: number;
  foreignTuition: number;
  homeOffice: number;
  selfEmploymentExpenses: number;
  other: number;
}

interface TaxCredits {
  basicPersonalAmount: number;
  spouseAmount: number;
  canadaCaregiver: number;
  ageAmount: number;
  pensionIncome: number;
  disabilityAmount: number;
  medicalExpenses: number;
  charitableDonations: number;
  foreignTaxCredit: number;
  other: number;
}

interface Province {
  code: string;
  name: string;
  taxBrackets: Array<{
    min: number;
    max: number;
    rate: number;
  }>;
  personalAmount: number;
  smallBusinessRate?: number;
  corporateRate?: number;
}

interface TaxCalculationOptions {
  isIndigenous: boolean;
  indigenousIncomeExempt: number;
  hasForeignIncome: boolean;
  businessType?: BusinessType;
  isBankruptcy?: boolean;
  bankruptcyDate?: Date;
}

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

interface ProvincialRates {
  [key: string]: TaxBracket[];
}

// 2024 Federal Tax Brackets
const FEDERAL_TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 55867, rate: 0.15 },
  { min: 55867, max: 111733, rate: 0.205 },
  { min: 111733, max: 173205, rate: 0.26 },
  { min: 173205, max: 246752, rate: 0.29 },
  { min: 246752, max: Infinity, rate: 0.33 },
];

// 2024 Provincial Tax Brackets
const PROVINCIAL_TAX_BRACKETS: ProvincialRates = {
  ON: [
    { min: 0, max: 51446, rate: 0.0505 },
    { min: 51446, max: 102894, rate: 0.0915 },
    { min: 102894, max: 150000, rate: 0.1116 },
    { min: 150000, max: 220000, rate: 0.1216 },
    { min: 220000, max: Infinity, rate: 0.1316 },
  ],
  BC: [
    { min: 0, max: 45654, rate: 0.0506 },
    { min: 45654, max: 91310, rate: 0.077 },
    { min: 91310, max: 104835, rate: 0.105 },
    { min: 104835, max: 127299, rate: 0.1229 },
    { min: 127299, max: 172602, rate: 0.147 },
    { min: 172602, max: 240716, rate: 0.168 },
    { min: 240716, max: Infinity, rate: 0.205 },
  ],
  AB: [
    { min: 0, max: 142292, rate: 0.1 },
    { min: 142292, max: 170751, rate: 0.12 },
    { min: 170751, max: 227668, rate: 0.13 },
    { min: 227668, max: 341502, rate: 0.14 },
    { min: 341502, max: Infinity, rate: 0.15 },
  ],
  SK: [
    { min: 0, max: 49720, rate: 0.105 },
    { min: 49720, max: 142058, rate: 0.125 },
    { min: 142058, max: Infinity, rate: 0.145 },
  ],
  MB: [
    { min: 0, max: 36842, rate: 0.108 },
    { min: 36842, max: 79625, rate: 0.1275 },
    { min: 79625, max: Infinity, rate: 0.174 },
  ],
  QC: [
    { min: 0, max: 49275, rate: 0.15 },
    { min: 49275, max: 98540, rate: 0.2 },
    { min: 98540, max: 119910, rate: 0.24 },
    { min: 119910, max: Infinity, rate: 0.2575 },
  ],
  NB: [
    { min: 0, max: 47715, rate: 0.094 },
    { min: 47715, max: 95431, rate: 0.14 },
    { min: 95431, max: 176756, rate: 0.16 },
    { min: 176756, max: Infinity, rate: 0.195 },
  ],
  NS: [
    { min: 0, max: 29590, rate: 0.0879 },
    { min: 29590, max: 59180, rate: 0.1495 },
    { min: 59180, max: 93000, rate: 0.1667 },
    { min: 93000, max: 150000, rate: 0.175 },
    { min: 150000, max: Infinity, rate: 0.21 },
  ],
  PE: [
    { min: 0, max: 31984, rate: 0.098 },
    { min: 31984, max: 63969, rate: 0.138 },
    { min: 63969, max: Infinity, rate: 0.167 },
  ],
  NL: [
    { min: 0, max: 41457, rate: 0.087 },
    { min: 41457, max: 82913, rate: 0.145 },
    { min: 82913, max: 148027, rate: 0.158 },
    { min: 148027, max: 207239, rate: 0.178 },
    { min: 207239, max: 264750, rate: 0.198 },
    { min: 264750, max: Infinity, rate: 0.218 },
  ],
  YT: [
    { min: 0, max: 53359, rate: 0.064 },
    { min: 53359, max: 106717, rate: 0.09 },
    { min: 106717, max: 165430, rate: 0.109 },
    { min: 165430, max: 500000, rate: 0.128 },
    { min: 500000, max: Infinity, rate: 0.15 },
  ],
  NT: [
    { min: 0, max: 48326, rate: 0.059 },
    { min: 48326, max: 96655, rate: 0.086 },
    { min: 96655, max: 157139, rate: 0.122 },
    { min: 157139, max: Infinity, rate: 0.1405 },
  ],
  NU: [
    { min: 0, max: 47862, rate: 0.04 },
    { min: 47862, max: 95724, rate: 0.07 },
    { min: 95724, max: 155625, rate: 0.09 },
    { min: 155625, max: Infinity, rate: 0.115 },
  ],
};

// 2024 CPP/EI Rates
const CPP_RATE = 0.0595;
const CPP_MAX_PENSIONABLE = 68500;
const CPP_BASIC_EXEMPTION = 3500;

const EI_RATE = 0.0163;
const EI_MAX_INSURABLE = 63200;

interface TaxableIncome {
  employment: number;
  selfEmployment: number;
  investment: number;
  rental: number;
  pension: number;
  foreign: number;
  rrsp: number;
  other: number;
}

interface Deductions {
  rrspContributions: number;
  unionDues: number;
  childcare: number;
  movingExpenses: number;
  workFromHome: number;
  capitalLosses: number;
  carryForwardLosses: number;
  other: number;
}

interface Credits {
  basicPersonal: number;
  age: number;
  spouse: number;
  eligible_dependant: number;
  caregiver: number;
  pension: number;
  disability: number;
  tuition: number;
  medical: number;
  donations: number;
  other: number;
}

interface TaxCalculationResult {
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

export class TaxCalculator {
  private readonly TAX_BRACKETS_2023: TaxBracket[] = [
    { min: 0, max: 53359, rate: 0.15 },
    { min: 53359, max: 106717, rate: 0.205 },
    { min: 106717, max: 165430, rate: 0.26 },
    { min: 165430, max: 235675, rate: 0.29 },
    { min: 235675, max: Infinity, rate: 0.33 },
  ];

  private readonly FEDERAL_CORPORATE_RATES = {
    SMALL_BUSINESS: 0.09,
    GENERAL: 0.15,
  };

  private readonly PROVINCES: Record<string, Province> = {
    ON: {
      code: 'ON',
      name: 'Ontario',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.ON,
      personalAmount: 11865,
      smallBusinessRate: 0.035,
      corporateRate: 0.115,
    },
    BC: {
      code: 'BC',
      name: 'British Columbia',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.BC,
      personalAmount: 11981,
      smallBusinessRate: 0.02,
      corporateRate: 0.12,
    },
    AB: {
      code: 'AB',
      name: 'Alberta',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.AB,
      personalAmount: 21003,
      smallBusinessRate: 0.02,
      corporateRate: 0.08,
    },
    SK: {
      code: 'SK',
      name: 'Saskatchewan',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.SK,
      personalAmount: 17661,
      smallBusinessRate: 0.01,
      corporateRate: 0.12,
    },
    MB: {
      code: 'MB',
      name: 'Manitoba',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.MB,
      personalAmount: 10855,
      smallBusinessRate: 0.0,
      corporateRate: 0.12,
    },
    QC: {
      code: 'QC',
      name: 'Quebec',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.QC,
      personalAmount: 17183,
      smallBusinessRate: 0.03,
      corporateRate: 0.117,
    },
    NB: {
      code: 'NB',
      name: 'New Brunswick',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.NB,
      personalAmount: 12458,
      smallBusinessRate: 0.025,
      corporateRate: 0.14,
    },
    NS: {
      code: 'NS',
      name: 'Nova Scotia',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.NS,
      personalAmount: 11481,
      smallBusinessRate: 0.025,
      corporateRate: 0.14,
    },
    PE: {
      code: 'PE',
      name: 'Prince Edward Island',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.PE,
      personalAmount: 12000,
      smallBusinessRate: 0.01,
      corporateRate: 0.16,
    },
    NL: {
      code: 'NL',
      name: 'Newfoundland and Labrador',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.NL,
      personalAmount: 10382,
      smallBusinessRate: 0.03,
      corporateRate: 0.15,
    },
    YT: {
      code: 'YT',
      name: 'Yukon',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.YT,
      personalAmount: 15000,
      smallBusinessRate: 0.0,
      corporateRate: 0.12,
    },
    NT: {
      code: 'NT',
      name: 'Northwest Territories',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.NT,
      personalAmount: 16593,
      smallBusinessRate: 0.02,
      corporateRate: 0.115,
    },
    NU: {
      code: 'NU',
      name: 'Nunavut',
      taxBrackets: PROVINCIAL_TAX_BRACKETS.NU,
      personalAmount: 17925,
      smallBusinessRate: 0.03,
      corporateRate: 0.12,
    },
  };

  private calculateTaxForBrackets(income: number, brackets: TaxBracket[]): number {
    let remainingIncome = income;
    let totalTax = 0;

    for (const bracket of ___brackets) =>
      const taxableInBracket = bracket.max
        ? Math.min(Math.max(0, remainingIncome), bracket.max - bracket.min)
        : remainingIncome;

      totalTax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;

      if (remainingIncome <= 0) {
        break;
      }
    }

    return totalTax;
  }

  private calculateCPP(employmentIncome: number): number {
    if (employmentIncome <= CPP_BASIC_EXEMPTION) {
      return 0;
    }
    const pensionableEarnings =
      Math.min(employmentIncome, CPP_MAX_PENSIONABLE) - CPP_BASIC_EXEMPTION;
    return pensionableEarnings * CPP_RATE;
  }

  private calculateEI(employmentIncome: number): number {
    const insurable = Math.min(employmentIncome, EI_MAX_INSURABLE);
    return insurable * EI_RATE;
  }

  public calculateTax(
    income: Income | BusinessIncome | TrustIncome,
    deductions: Deductions,
    credits: TaxCredits,
    province: string,
    returnType: TaxReturnType,
    options: TaxCalculationOptions = {
      isIndigenous: false,
      indigenousIncomeExempt: 0,
      hasForeignIncome: false,
    }
  ) {
    switch (___returnType) =>
      case 'T1_GENERAL':
        return this.calculatePersonalTax(income as Income, deductions, credits, province, options);
      case 'T2_CORPORATION':
        return this.calculateCorporateTax(income as BusinessIncome, province, options);
      case 'T3_TRUST':
        return this.calculateTrustTax(income as TrustIncome, province);
      case 'T5013_PARTNERSHIP':
        return this.calculatePartnershipTax(income as BusinessIncome, province);
      case 'T2125_BUSINESS':
        return this.calculateSelfEmployedTax(
          income as BusinessIncome,
          deductions,
          credits,
          province,
          options
        );
      case 'T776_RENTAL':
        return this.calculateRentalTax(income as Income, deductions, credits, province, options);
      case 'T1_BANKRUPTCY':
        return this.calculateBankruptcyTax(
          income as Income,
          deductions,
          credits,
          province,
          options
        );
      default:
        throw new Error(`Unsupported return type: ${returnType}`);
    }
  }

  private calculatePersonalTax(
    income: Income,
    deductions: Deductions,
    credits: TaxCredits,
    province: string,
    options: TaxCalculationOptions
  ) {
    // Calculate total income
    const totalIncome = this.calculateTotalIncome(income);

    // Apply indigenous income exemption if applicable
    const taxableIncome = options.isIndigenous
      ? Math.max(0, totalIncome - options.indigenousIncomeExempt)
      : totalIncome;

    // Calculate net income after deductions
    const netIncome = this.calculateNetIncome(taxableIncome, deductions);

    // Calculate federal tax
    const federalTax = this.calculateFederalTax(netIncome);

    // Calculate provincial tax
    const provincialTax = this.calculateProvincialTax(netIncome, province);

    // Calculate foreign tax credit
    const foreignTaxCredit = this.calculateForeignTaxCredit(
      income.foreign.taxPaid,
      federalTax + provincialTax,
      income.foreign.employment + income.foreign.business + income.foreign.investment,
      totalIncome
    );

    // Calculate CPP contributions
    const cppContributions = this.calculateCPP(
      income.employment +
        income.selfEmployment -
        (options.isIndigenous ? options.indigenousIncomeExempt : 0)
    );

    // Calculate EI premiums
    const eiPremiums = this.calculateEI(
      income.employment - (options.isIndigenous ? options.indigenousIncomeExempt : 0)
    );

    // Calculate tax credits
    const totalCredits = this.calculateTaxCredits(credits, federalTax + provincialTax);

    return {
      totalIncome,
      taxableIncome,
      netIncome,
      federalTax,
      provincialTax,
      foreignTaxCredit,
      cppContributions,
      eiPremiums,
      totalCredits,
      totalTaxPayable: Math.max(0, federalTax + provincialTax - totalCredits - foreignTaxCredit),
    };
  }

  private calculateCorporateTax(
    income: BusinessIncome,
    province: string,
    options: TaxCalculationOptions
  ) {
    const netIncome =
      income.revenue -
      income.costOfGoods -
      Object.values(income.expenses).reduce((sum, ___exp) => sum + exp, 0);

    const federalRate =
      netIncome <= 500000
        ? this.FEDERAL_CORPORATE_RATES.SMALL_BUSINESS
        : this.FEDERAL_CORPORATE_RATES.GENERAL;

    const provinceInfo = this.PROVINCES[province];
    const provincialRate =
      netIncome <= 500000 ? provinceInfo.smallBusinessRate! : provinceInfo.corporateRate!;

    const federalTax = netIncome * federalRate;
    const provincialTax = netIncome * provincialRate;

    return {
      netIncome,
      federalTax,
      provincialTax,
      totalTaxPayable: federalTax + provincialTax,
    };
  }

  private calculateTrustTax(income: TrustIncome, province: string) {
    const totalIncome =
      income.investment +
      income.business +
      income.rental +
      income.capitalGains * 0.5 + // Only 50% of capital gains are taxable
      income.other;

    const taxableIncome = totalIncome - income.distributions; // Distributions are deductible

    const federalTax = this.calculateFederalTax(taxableIncome);
    const provincialTax = this.calculateProvincialTax(taxableIncome, province);

    return {
      totalIncome,
      taxableIncome,
      federalTax,
      provincialTax,
      totalTaxPayable: federalTax + provincialTax,
    };
  }

  private calculatePartnershipTax(income: BusinessIncome, province: string) {
    // Partnerships themselves don't pay tax, but calculate income to be allocated
    const netIncome =
      income.revenue -
      income.costOfGoods -
      Object.values(income.expenses).reduce((sum, ___exp) => sum + exp, 0);

    return {
      netIncome,
      // Partnership income flows through to partners
      federalTax: 0,
      provincialTax: 0,
      totalTaxPayable: 0,
    };
  }

  private calculateSelfEmployedTax(
    income: BusinessIncome,
    deductions: Deductions,
    credits: TaxCredits,
    province: string,
    options: TaxCalculationOptions
  ) {
    const businessIncome =
      income.revenue -
      income.costOfGoods -
      Object.values(income.expenses).reduce((sum, ___exp) => sum + exp, 0);

    // Convert to personal income format
    const personalIncome: Income = {
      employment: 0,
      selfEmployment: businessIncome,
      investments: { eligibleDividends: 0, nonEligibleDividends: 0, interest: 0, capitalGains: 0 },
      rental: 0,
      pension: 0,
      foreign: { employment: 0, business: 0, investment: 0, taxPaid: 0, countries: [] },
      other: 0,
    };

    return this.calculatePersonalTax(personalIncome, deductions, credits, province, options);
  }

  private calculateRentalTax(
    income: Income,
    deductions: Deductions,
    credits: TaxCredits,
    province: string,
    options: TaxCalculationOptions
  ) {
    // Rental income is treated as personal income
    return this.calculatePersonalTax(income, deductions, credits, province, options);
  }

  private calculateBankruptcyTax(
    income: Income,
    deductions: Deductions,
    credits: TaxCredits,
    province: string,
    options: TaxCalculationOptions
  ) {
    if (!options.bankruptcyDate) {
      throw new Error('Bankruptcy date is required for bankruptcy returns');
    }

    // Split income into pre and post bankruptcy periods
    const daysInYear = 365;
    const bankruptcyDay = options.bankruptcyDate.getDate();
    const preRatio = bankruptcyDay / daysInYear;
    const postRatio = (daysInYear - bankruptcyDay) / daysInYear;

    // Calculate pre-bankruptcy income
    const preIncome: Income = {
      employment: income.employment * preRatio,
      selfEmployment: income.selfEmployment * preRatio,
      investments: {
        eligibleDividends: income.investments.eligibleDividends * preRatio,
        nonEligibleDividends: income.investments.nonEligibleDividends * preRatio,
        interest: income.investments.interest * preRatio,
        capitalGains: income.investments.capitalGains * preRatio,
      },
      rental: income.rental * preRatio,
      pension: income.pension * preRatio,
      foreign: {
        employment: income.foreign.employment * preRatio,
        business: income.foreign.business * preRatio,
        investment: income.foreign.investment * preRatio,
        taxPaid: income.foreign.taxPaid * preRatio,
        countries: income.foreign.countries,
      },
      other: income.other * preRatio,
    };

    // Calculate post-bankruptcy income
    const postIncome: Income = {
      employment: income.employment * postRatio,
      selfEmployment: income.selfEmployment * postRatio,
      investments: {
        eligibleDividends: income.investments.eligibleDividends * postRatio,
        nonEligibleDividends: income.investments.nonEligibleDividends * postRatio,
        interest: income.investments.interest * postRatio,
        capitalGains: income.investments.capitalGains * postRatio,
      },
      rental: income.rental * postRatio,
      pension: income.pension * postRatio,
      foreign: {
        employment: income.foreign.employment * postRatio,
        business: income.foreign.business * postRatio,
        investment: income.foreign.investment * postRatio,
        taxPaid: income.foreign.taxPaid * postRatio,
        countries: income.foreign.countries,
      },
      other: income.other * postRatio,
    };

    // Calculate tax for both periods
    const preTax = this.calculatePersonalTax(preIncome, deductions, credits, province, options);
    const postTax = this.calculatePersonalTax(postIncome, deductions, credits, province, options);

    return {
      preBankruptcy: preTax,
      postBankruptcy: postTax,
      totalTaxPayable: preTax.totalTaxPayable + postTax.totalTaxPayable,
    };
  }

  private calculateTotalIncome(income: Income): number {
    const domesticIncome =
      income.employment +
      income.selfEmployment +
      income.investments.eligibleDividends * 1.38 + // Gross-up eligible dividends
      income.investments.nonEligibleDividends * 1.15 + // Gross-up non-eligible dividends
      income.investments.interest +
      income.investments.capitalGains * 0.5 + // Only 50% of capital gains are taxable
      income.rental +
      income.pension +
      income.other;

    const foreignIncome =
      income.foreign.employment + income.foreign.business + income.foreign.investment;

    return domesticIncome + foreignIncome;
  }

  private calculateNetIncome(totalIncome: number, deductions: Deductions): number {
    const totalDeductions =
      deductions.rrspContributions +
      deductions.unionDues +
      deductions.movingExpenses +
      deductions.childcareExpenses +
      deductions.medicalExpenses +
      deductions.charitableDonations +
      deductions.studentLoanInterest +
      deductions.homeOffice +
      deductions.selfEmploymentExpenses +
      deductions.other;

    return Math.max(0, totalIncome - totalDeductions);
  }

  private calculateFederalTax(netIncome: number): number {
    let tax = 0;
    let remainingIncome = netIncome;

    for (let i = 0; i < FEDERAL_TAX_BRACKETS.length; i++) {
      const currentBracket = FEDERAL_TAX_BRACKETS[i];
      const nextBracket = FEDERAL_TAX_BRACKETS[i + 1];
      const bracketIncome = nextBracket
        ? Math.min(remainingIncome, nextBracket.min - currentBracket.min)
        : remainingIncome;

      tax += bracketIncome * currentBracket.rate;
      remainingIncome -= bracketIncome;

      if (remainingIncome <= 0) {
        break;
      }
    }

    return tax;
  }

  private calculateProvincialTax(netIncome: number, provinceCode: string): number {
    const province = this.PROVINCES[provinceCode];
    if (!province) {
      throw new Error(`Province ${provinceCode} not supported`);
    }

    let tax = 0;
    let remainingIncome = netIncome;

    for (let i = 0; i < province.taxBrackets.length; i++) {
      const currentBracket = province.taxBrackets[i];
      const nextBracket = province.taxBrackets[i + 1];
      const bracketIncome = nextBracket
        ? Math.min(remainingIncome, nextBracket.min - currentBracket.min)
        : remainingIncome;

      tax += bracketIncome * currentBracket.rate;
      remainingIncome -= bracketIncome;

      if (remainingIncome <= 0) {
        break;
      }
    }

    return tax;
  }

  private calculateTaxCredits(credits: TaxCredits, totalTax: number): number {
    const totalCredits =
      credits.basicPersonalAmount +
      credits.spouseAmount +
      credits.canadaCaregiver +
      credits.ageAmount +
      credits.pensionIncome +
      credits.disabilityAmount +
      credits.medicalExpenses +
      credits.charitableDonations +
      credits.foreignTaxCredit +
      credits.other;

    return Math.min(totalCredits, totalTax);
  }

  private calculateForeignTaxCredit(
    foreignTaxPaid: number,
    canadianTax: number,
    foreignIncome: number,
    totalIncome: number
  ): number {
    // Calculate the foreign tax credit limit
    const limit = (canadianTax * foreignIncome) / totalIncome;

    // Foreign tax credit is the lesser of foreign tax paid and the limit
    return Math.min(foreignTaxPaid, limit);
  }
}
