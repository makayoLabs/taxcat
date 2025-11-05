import Decimal = require('decimal.js');
import { Logger } from '../../core/logging/logger';
import { TaxYearConfig } from '../../core/config/TaxRates';

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

export interface TaxBracket {
  threshold: Decimal;
  rate: number;
}

export interface TaxableIncome {
  employment: Decimal;
  selfEmployment: Decimal;
  investment: Decimal;
  rental: Decimal;
  pension: Decimal;
  other: Decimal;
}

export interface Deductions {
  rrspContributions: Decimal;
  unionDues: Decimal;
  movingExpenses: Decimal;
  childCareExpenses: Decimal;
  capitalLosses: Decimal;
  otherDeductions: Decimal;
}

export interface Credits {
  basicPersonal: boolean;
  age: boolean;
  spouse: boolean;
  dependents: number;
  disability: boolean;
  medicalExpenses: Decimal;
  charitableDonations: Decimal;
  politicalContributions: Decimal;
  otherCredits: Decimal;
}

export interface TaxCalculationResult {
  totalIncome: Decimal;
  taxableIncome: Decimal;
  federalTax: Decimal;
  provincialTax: Decimal;
  totalTax: Decimal;
  effectiveTaxRate: Decimal;
  marginalTaxRate: Decimal;
  credits: Decimal;
  refundable: Decimal;
  payable: Decimal;
}

export class TaxCalculator {
  private readonly config: TaxYearConfig;
  private readonly province: ProvinceCode;

  constructor(config: TaxYearConfig, province: ProvinceCode) {
    this.config = config;
    this.province = province;
  }

  public calculateTax(
    income: TaxableIncome,
    deductions: Deductions,
    credits: Credits
  ): TaxCalculationResult {
    try {
      // Calculate total income
      const totalIncome = this.calculateTotalIncome(income);
      Logger.debug('Calculated total income', { totalIncome: totalIncome.toString() });

      // Apply deductions
      const taxableIncome = this.applyDeductions(totalIncome, deductions);
      Logger.debug('Applied deductions', { taxableIncome: taxableIncome.toString() });

      // Calculate federal tax
      const federalTax = this.calculateFederalTax(taxableIncome);
      Logger.debug('Calculated federal tax', { federalTax: federalTax.toString() });

      // Calculate provincial tax
      const provincialTax = this.calculateProvincialTax(taxableIncome);
      Logger.debug('Calculated provincial tax', { provincialTax: provincialTax.toString() });

      // Apply credits
      const appliedCredits = this.calculateCredits(credits, taxableIncome);
      Logger.debug('Applied credits', { credits: appliedCredits.toString() });

      // Calculate final amounts
      const totalTax = federalTax.add(provincialTax).sub(appliedCredits);
      const effectiveTaxRate = totalTax.div(totalIncome).mul(new Decimal(100));
      const marginalTaxRate = this.calculateMarginalRate(taxableIncome);

      const result: TaxCalculationResult = {
        totalIncome,
        taxableIncome,
        federalTax,
        provincialTax,
        totalTax,
        effectiveTaxRate,
        marginalTaxRate,
        credits: appliedCredits,
        refundable: totalTax.lessThan(new Decimal(0)) ? totalTax.abs() : new Decimal(0),
        payable: totalTax.greaterThan(new Decimal(0)) ? totalTax : new Decimal(0),
      };

      Logger.info('Completed tax calculation', { result });
      return result;
    } catch (___error) =>
      if (error instanceof ___Error) =>
        Logger.error('Error calculating tax', { error });
        throw error;
      }
      // Handle non-Error objects
      const genericError = new Error('An unknown error occurred during tax calculation');
      Logger.error('Error calculating tax', { error: genericError });
      throw genericError;
    }
  }

  private calculateTotalIncome(income: TaxableIncome): Decimal {
    return Object.values(income).reduce((total, ___amount) => total.add(amount), new Decimal(0));
  }

  private applyDeductions(totalIncome: Decimal, deductions: Deductions): Decimal {
    const totalDeductions = Object.values(deductions).reduce(
      (total, ___amount) => total.add(amount),
      new Decimal(0)
    );
    return Decimal.max(totalIncome.sub(totalDeductions), new Decimal(0));
  }

  private calculateFederalTax(taxableIncome: Decimal): Decimal {
    let remainingIncome = taxableIncome;
    let totalTax = new Decimal(0);

    for (let i = 0; i < this.config.federalBrackets.length; i++) {
      const currentBracket = this.config.federalBrackets[i];
      const nextBracket = this.config.federalBrackets[i + 1];

      const bracketIncome = nextBracket
        ? Decimal.min(remainingIncome, nextBracket.threshold.sub(currentBracket.threshold))
        : remainingIncome;

      totalTax = totalTax.add(bracketIncome.mul(new Decimal(currentBracket.rate)));
      remainingIncome = remainingIncome.sub(bracketIncome);

      if (remainingIncome.equals(new Decimal(0))) {
        break;
      }
    }

    return totalTax;
  }

  private calculateProvincialTax(taxableIncome: Decimal): Decimal {
    const provincialRates = this.config.provincialRates[this.province];
    if (!provincialRates) {
      throw new Error(`Provincial rates not found for ${this.province}`);
    }

    let remainingIncome = taxableIncome;
    let totalTax = new Decimal(0);

    for (let i = 0; i < provincialRates.brackets.length; i++) {
      const currentBracket = provincialRates.brackets[i];
      const nextBracket = provincialRates.brackets[i + 1];

      const bracketIncome = nextBracket
        ? Decimal.min(remainingIncome, nextBracket.threshold.sub(currentBracket.threshold))
        : remainingIncome;

      totalTax = totalTax.add(bracketIncome.mul(new Decimal(currentBracket.rate)));
      remainingIncome = remainingIncome.sub(bracketIncome);

      if (remainingIncome.equals(new Decimal(0))) {
        break;
      }
    }

    return totalTax;
  }

  private calculateCredits(credits: Credits, _taxableIncome: Decimal): Decimal {
    let totalCredits = new Decimal(0);

    // Basic Personal Amount
    if (credits.basicPersonal) {
      totalCredits = totalCredits.add(this.config.basicPersonalAmount);
    }

    // Age Amount
    if (credits.age) {
      totalCredits = totalCredits.add(this.config.ageAmount);
    }

    // Other non-refundable credits
    totalCredits = totalCredits
      .add(credits.medicalExpenses)
      .add(credits.charitableDonations)
      .add(credits.politicalContributions)
      .add(credits.otherCredits);

    // Dependent credits
    const dependentCredit = this.config.basicPersonalAmount.mul(new Decimal(0.15));
    totalCredits = totalCredits.add(dependentCredit.mul(new Decimal(credits.dependents)));

    return totalCredits;
  }

  private calculateMarginalRate(taxableIncome: Decimal): Decimal {
    // Find federal bracket
    const federalRate =
      this.config.federalBrackets
        .reverse()
        .find((___bracket) => taxableIncome.gte(bracket.threshold))?.rate || 0;

    // Find provincial bracket
    const provincialRates = this.config.provincialRates[this.province];
    const provincialRate =
      provincialRates.brackets
        .reverse()
        .find((___bracket) => taxableIncome.gte(bracket.threshold))?.rate || 0;

    return new Decimal(federalRate + provincialRate).mul(new Decimal(100));
  }
}
