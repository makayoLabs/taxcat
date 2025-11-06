import { Decimal } from 'decimal.js';
import { Income, Deductions, TaxCalculations, ProvinceCode } from '../types';
import { TaxCalculations as TaxCalc } from '../common/calculations';

type TaxYear = number;

interface Partner {
  id: string;
  name: string;
  sin: string;
  share: number; // Percentage share of partnership
  province: ProvinceCode;
}

interface PartnershipAllocation {
  partnerId: string;
  income: {
    business: Decimal;
    rental: Decimal;
    investment: Decimal;
    capitalGains: Decimal;
    other: Decimal;
  };
  deductions: {
    cca: Decimal;
    expenses: Decimal;
    other: Decimal;
  };
}

export class T5013Calculator {
  constructor(private readonly year: TaxYear = 2024) {}

  public calculatePartnershipAllocation(
    income: Income,
    deductions: Deductions,
    partners: Partner[]
  ): PartnershipAllocation[] {
    const totalIncome = this.calculateTotalIncome(income);
    const totalDeductions = this.calculateTotalDeductions(deductions);
    const netIncome = totalIncome.minus(totalDeductions);

    return partners.map((partner) =>
      this.allocateToPartner(partner, income, deductions, netIncome)
    );
  }

  private calculateTotalIncome(income: Income): Decimal {
    return TaxCalc.sum([
      this.calculateBusinessIncome(income),
      this.calculateRentalIncome(income),
      this.calculateInvestmentIncome(income),
      this.calculateOtherIncome(income),
    ]);
  }

  private calculateTotalDeductions(deductions: Deductions): Decimal {
    return TaxCalc.sum([
      deductions.employment.professional,
      deductions.employment.other,
      deductions.other.carryingCharges,
    ]);
  }

  private allocateToPartner(
    partner: Partner,
    income: Income,
    deductions: Deductions,
    netIncome: Decimal
  ): PartnershipAllocation {
    const share = new Decimal(partner.share).dividedBy(100);

    return {
      partnerId: partner.id,
      income: {
        business: this.calculateBusinessIncome(income).times(share),
        rental: this.calculateRentalIncome(income).times(share),
        investment: this.calculateInvestmentIncome(income).times(share),
        capitalGains: income.investment.capitalGains.times(share),
        other: this.calculateOtherIncome(income).times(share),
      },
      deductions: {
        cca: this.calculateCCA(deductions).times(share),
        expenses: this.calculateExpenses(deductions).times(share),
        other: this.calculateOtherDeductions(deductions).times(share),
      },
    };
  }

  private calculateBusinessIncome(income: Income): Decimal {
    return income.business.reduce((sum, bus) => {
      const expenses = Object.values(bus.expenses).reduce(
        (total, exp) => total.plus(exp),
        new Decimal(0)
      );
      return sum.plus(bus.revenue.minus(expenses));
    }, new Decimal(0));
  }

  private calculateRentalIncome(income: Income): Decimal {
    return income.investment.rentalIncome;
  }

  private calculateInvestmentIncome(income: Income): Decimal {
    const { dividends, interest } = income.investment;
    return TaxCalc.sum([dividends.eligible, dividends.nonEligible, dividends.foreign, interest]);
  }

  private calculateOtherIncome(income: Income): Decimal {
    return TaxCalc.sum([income.other.foreign, ...Object.values(income.other.other)]);
  }

  private calculateCCA(deductions: Deductions): Decimal {
    // This would normally come from a CCA schedule
    return new Decimal(0);
  }

  private calculateExpenses(deductions: Deductions): Decimal {
    return TaxCalc.sum([deductions.employment.professional, deductions.employment.other]);
  }

  private calculateOtherDeductions(deductions: Deductions): Decimal {
    return deductions.other.carryingCharges;
  }
}
