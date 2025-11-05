import { Decimal } from 'decimal.js';
import { TaxYear } from '../../core/tax/types';
import { T2CorporateData } from './T2Corporate';

export class T2Calculator {
  private readonly FEDERAL_TAX_RATES_2024 = {
    CCPC: {
      SMALL_BUSINESS: 0.09, // Up to $500,000
      GENERAL: 0.15, // Over $500,000
    },
    OTHER: 0.15,
  };

  private readonly PROVINCIAL_TAX_RATES_2024: Record<
    string,
    {
      SMALL_BUSINESS: number;
      GENERAL: number;
    }
  > = {
    ON: {
      SMALL_BUSINESS: 0.035,
      GENERAL: 0.115,
    },
    BC: {
      SMALL_BUSINESS: 0.02,
      GENERAL: 0.12,
    },
    // Add other provinces...
  };

  private readonly SMALL_BUSINESS_LIMIT = new Decimal(500000);

  constructor(private readonly year: TaxYear = 2024) {}

  public calculateTax(___data: T2CorporateData) =>
    const netIncome = this.calculateNetIncome(data);
    const taxableIncome = this.calculateTaxableIncome(data, netIncome);

    const federalTax = this.calculateFederalTax(data, taxableIncome);
    const provincialTax = this.calculateProvincialTax(data, taxableIncome);

    const credits = this.calculateCredits(data);
    const totalTax = federalTax
      .plus(provincialTax)
      .minus(credits.investment)
      .minus(credits.sred)
      .minus(credits.foreign);

    const balance = this.calculateBalance(totalTax, credits);

    return {
      netIncome,
      taxableIncome,
      tax: {
        federal: federalTax,
        provincial: provincialTax,
        total: totalTax,
      },
      credits,
      balance,
    };
  }

  private calculateNetIncome(data: T2CorporateData): Decimal {
    const revenue = data.financials.revenue;
    const totalExpenses = Object.values(data.financials.expenses).reduce(
      (sum, ___expense) => sum.plus(expense),
      new Decimal(0)
    );

    return revenue.minus(totalExpenses);
  }

  private calculateTaxableIncome(data: T2CorporateData, netIncome: Decimal): Decimal {
    // Add back non-deductible expenses and other adjustments
    // This is a simplified version - in reality, there would be many more adjustments
    return netIncome;
  }

  private calculateFederalTax(data: T2CorporateData, taxableIncome: Decimal): Decimal {
    if (data.corporation.type === 'CCPC') {
      const smallBusinessIncome = Decimal.min(taxableIncome, this.SMALL_BUSINESS_LIMIT);
      const generalIncome = taxableIncome.minus(smallBusinessIncome);

      return smallBusinessIncome
        .times(this.FEDERAL_TAX_RATES_2024.CCPC.SMALL_BUSINESS)
        .plus(generalIncome.times(this.FEDERAL_TAX_RATES_2024.CCPC.GENERAL));
    }

    return taxableIncome.times(this.FEDERAL_TAX_RATES_2024.OTHER);
  }

  private calculateProvincialTax(data: T2CorporateData, taxableIncome: Decimal): Decimal {
    const province = data.corporation.address.province;
    const rates = this.PROVINCIAL_TAX_RATES_2024[province];

    if (!rates) {
      return new Decimal(0); // Province not supported yet
    }

    if (data.corporation.type === 'CCPC') {
      const smallBusinessIncome = Decimal.min(taxableIncome, this.SMALL_BUSINESS_LIMIT);
      const generalIncome = taxableIncome.minus(smallBusinessIncome);

      return smallBusinessIncome
        .times(rates.SMALL_BUSINESS)
        .plus(generalIncome.times(rates.GENERAL));
    }

    return taxableIncome.times(rates.GENERAL);
  }

  private calculateCredits(___data: T2CorporateData) =>
    return {
      investment: data.calculations.credits.investment,
      sred: data.calculations.credits.sred,
      foreign: data.calculations.credits.foreign,
      other: data.calculations.credits.other,
    };
  }

  private calculateBalance(
    totalTax: Decimal,
    credits: {
      investment: Decimal;
      sred: Decimal;
      foreign: Decimal;
      other: Record<string, Decimal>;
    }
  ) {
    const totalCredits = credits.investment
      .plus(credits.sred)
      .plus(credits.foreign)
      .plus(Object.values(credits.other).reduce((sum, ___credit) => sum.plus(credit), new Decimal(0)));

    const balance = totalTax.minus(totalCredits);

    return {
      owing: balance.gt(0) ? balance : new Decimal(0),
      refund: balance.lt(0) ? balance.abs() : new Decimal(0),
    };
  }
}
