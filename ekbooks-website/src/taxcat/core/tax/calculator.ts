import Decimal from 'decimal.js';
import { TaxYearConfig, Credits, ProvinceCode } from './types';

export class TaxCalculator {
  private config: TaxYearConfig;
  private province: ProvinceCode;

  constructor(config: TaxYearConfig, province: ProvinceCode) {
    this.config = config;
    this.province = province;
  }

  calculateTax(taxableIncome: Decimal): Decimal {
    const federalTax = this.calculateFederalTax(taxableIncome);
    const provincialTax = this.calculateProvincialTax(taxableIncome);
    return federalTax.add(provincialTax);
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

      totalTax = totalTax.add(bracketIncome.mul(currentBracket.rate));
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

      totalTax = totalTax.add(bracketIncome.mul(currentBracket.rate));
      remainingIncome = remainingIncome.sub(bracketIncome);

      if (remainingIncome.equals(new Decimal(0))) {
        break;
      }
    }

    return totalTax;
  }

  private calculateCredits(_credits: Credits, _taxableIncome: Decimal): Decimal {
    let totalCredits = new Decimal(0);

    // Basic Personal Amount
    if (_credits.basic) {
      totalCredits = totalCredits.add(this.config.basicPersonalAmount);
    }

    return totalCredits;
  }

  private calculateMarginalRate(_taxableIncome: Decimal): Decimal {
    // Find federal bracket
    const federalRate =
      this.config.federalBrackets
        .reverse()
        .find((_bracket) => _taxableIncome.gte(bracket.threshold))?.rate || new Decimal(0);

    // Find provincial bracket
    const provincialRates = this.config.provincialRates[this.province];
    const provincialRate =
      provincialRates.brackets
        .reverse()
        .find((_bracket) => _taxableIncome.gte(bracket.threshold))?.rate || new Decimal(0);

    return federalRate.add(provincialRate);
  }

  private calculateEffectiveRate(_income: Decimal, totalTax: Decimal): Decimal {
    return totalTax.div(_income).mul(new Decimal(100));
  }
} 