import { Decimal } from 'decimal.js';
import { Income, Deductions, Credits, TaxCalculations, TaxPayer, ProvinceCode } from '../types';
import { TaxCalculations as TaxCalc } from '../common/calculations';

type TaxYear = number;

export class T3Calculator {
  private readonly TRUST_FEDERAL_RATE = 0.38; // 2024 federal trust rate
  private readonly TRUST_PROVINCIAL_RATES: Record<ProvinceCode, number> = {
    ON: 0.535,
    BC: 0.538,
    AB: 0.48,
    MB: 0.504,
    NB: 0.529,
    NL: 0.537,
    NS: 0.54,
    NT: 0.478,
    NU: 0.44,
    PE: 0.51,
    QC: 0.504,
    SK: 0.47,
    YT: 0.48,
  };

  constructor(private readonly year: TaxYear = 2024) {}

  public calculateT3Tax(
    trustIncome: Income,
    deductions: Deductions,
    credits: Credits,
    province: ProvinceCode
  ): TaxCalculations {
    const totalIncome = this.calculateTotalIncome(trustIncome);
    const netIncome = this.calculateNetIncome(totalIncome, deductions);
    const taxableIncome = this.calculateTaxableIncome(netIncome);

    const federalTax = this.calculateFederalTax(taxableIncome);
    const provincialTax = this.calculateProvincialTax(taxableIncome, province);

    const totalTax = federalTax.plus(provincialTax);
    const totalCredits = this.calculateTotalCredits(credits);

    return {
      income: {
        employment: this.calculateEmploymentIncome(trustIncome),
        business: this.calculateBusinessIncome(trustIncome),
        investment: this.calculateInvestmentIncome(trustIncome),
        taxable: taxableIncome,
        net: netIncome,
      },
      deductions: {
        total: this.calculateTotalDeductions(deductions),
        nonRefundable: this.calculateNonRefundableDeductions(deductions),
        refundable: this.calculateRefundableDeductions(deductions),
      },
      tax: {
        federal: federalTax,
        provincial: provincialTax,
        total: totalTax,
      },
      credits: {
        nonRefundable: totalCredits,
        refundable: new Decimal(0), // Trusts typically don't have refundable credits
        total: totalCredits,
      },
      contributions: {
        cpp: new Decimal(0), // Trusts don't pay CPP
        ei: new Decimal(0), // Trusts don't pay EI
        qpp: new Decimal(0), // Trusts don't pay QPP
      },
      balance: this.calculateFinalBalance(totalTax, totalCredits),
    };
  }

  private calculateTotalIncome(income: Income): Decimal {
    return TaxCalc.sum([
      this.calculateEmploymentIncome(income),
      this.calculateBusinessIncome(income),
      this.calculateInvestmentIncome(income),
      this.calculatePensionIncome(income),
      this.calculateOtherIncome(income),
    ]);
  }

  private calculateNetIncome(totalIncome: Decimal, deductions: Deductions): Decimal {
    const totalDeductions = this.calculateTotalDeductions(deductions);
    return totalIncome.minus(totalDeductions);
  }

  private calculateTaxableIncome(netIncome: Decimal): Decimal {
    return netIncome;
  }

  private calculateFederalTax(taxableIncome: Decimal): Decimal {
    return TaxCalc.roundCurrency(taxableIncome.times(this.TRUST_FEDERAL_RATE));
  }

  private calculateProvincialTax(taxableIncome: Decimal, province: ProvinceCode): Decimal {
    const rate = this.TRUST_PROVINCIAL_RATES[province];
    return TaxCalc.roundCurrency(taxableIncome.times(rate));
  }

  private calculateTotalCredits(credits: Credits): Decimal {
    return TaxCalc.sum([credits.basic, credits.disability, credits.medical, credits.donations]);
  }

  private calculateTotalDeductions(deductions: Deductions): Decimal {
    return TaxCalc.sum([
      deductions.other.movingExpenses,
      deductions.other.carryingCharges,
      deductions.employment.other,
    ]);
  }

  private calculateNonRefundableDeductions(deductions: Deductions): Decimal {
    return TaxCalc.sum([deductions.employment.professional, deductions.other.carryingCharges]);
  }

  private calculateRefundableDeductions(deductions: Deductions): Decimal {
    return deductions.other.movingExpenses;
  }

  private calculateEmploymentIncome(income: Income): Decimal {
    return income.employment.reduce((sum, ___emp) => sum.plus(emp.t4.income), new Decimal(0));
  }

  private calculateBusinessIncome(income: Income): Decimal {
    return income.business.reduce((sum, ___bus) => {
      const expenses = Object.values(bus.expenses).reduce(
        (total, ___exp) => total.plus(exp),
        new Decimal(0)
      );
      return sum.plus(bus.revenue.minus(expenses));
    }, new Decimal(0));
  }

  private calculateInvestmentIncome(income: Income): Decimal {
    const { dividends, interest, capitalGains, rentalIncome } = income.investment;
    return TaxCalc.sum([
      dividends.eligible,
      dividends.nonEligible,
      dividends.foreign,
      interest,
      capitalGains,
      rentalIncome,
    ]);
  }

  private calculatePensionIncome(income: Income): Decimal {
    return TaxCalc.sum([income.pension.cpp, income.pension.oas, income.pension.other]);
  }

  private calculateOtherIncome(income: Income): Decimal {
    return TaxCalc.sum([
      income.other.ei,
      income.other.wsib,
      income.other.social,
      income.other.foreign,
      ...Object.values(income.other.other),
    ]);
  }

  private calculateFinalBalance(
    totalTax: Decimal,
    totalCredits: Decimal
  ): TaxCalculations['balance'] {
    const netBalance = totalTax.minus(totalCredits);

    return {
      owing: netBalance.gt(0) ? netBalance : new Decimal(0),
      refund: netBalance.lt(0) ? netBalance.abs() : new Decimal(0),
    };
  }
}
