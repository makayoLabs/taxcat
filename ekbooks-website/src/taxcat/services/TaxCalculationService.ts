import Decimal from 'decimal.js';
import { TaxPayer, Income, Deductions, Credits, TaxCalculations, TaxYear } from '../core/tax/types';
import { TaxValidator } from '../core/validation/TaxValidator';
import { TaxCache } from '../core/cache/TaxCache';
import { TaxRateManager } from '../core/config/TaxRates';
import { PerformanceMonitor } from '../core/monitoring/PerformanceMonitor';
import { TaxError, TaxErrorCode, TaxErrorSeverity } from '../core/errors/TaxError';
import { LoggerService } from '../core/logging/logger';
import { DecimalType, createDecimal } from '../core/types/decimal';

export class TaxCalculationService {
  private static instance: TaxCalculationService;
  private validator: TaxValidator;
  private cache: TaxCache;
  private rateManager: TaxRateManager;
  private performanceMonitor: PerformanceMonitor;

  private constructor() {
    this.validator = new TaxValidator();
    this.cache = TaxCache.getInstance();
    this.rateManager = TaxRateManager.getInstance();
    this.performanceMonitor = PerformanceMonitor.getInstance();
  }

  public static getInstance(): TaxCalculationService {
    if (!TaxCalculationService.instance) {
      TaxCalculationService.instance = new TaxCalculationService();
    }
    return TaxCalculationService.instance;
  }

  public async calculateTax(
    taxpayer: TaxPayer,
    year: TaxYear,
    income: Income,
    deductions: Deductions,
    credits: Credits
  ): Promise<TaxCalculations> {
    const operationId = this.performanceMonitor.startOperation('TAX_CALCULATION', {
      sin: taxpayer.sin,
      year,
    });

    try {
      // Validate inputs
      const validationErrors = [
        ...this.validator.validateTaxPayer(taxpayer),
        ...this.validator.validateIncome(income),
        ...this.validator.validateDeductions(deductions),
        ...this.validator.validateCredits(credits),
        ...this.validator.validateTaxYear(year),
      ];

      if (validationErrors.length > 0) {
        throw new TaxError(
          TaxErrorCode.VALIDATION_ERROR,
          'Tax calculation inputs are invalid',
          TaxErrorSeverity.ERROR,
          undefined,
          { errors: validationErrors }
        );
      }

      // Check cache
      const cachedResult = this.cache.get(taxpayer, year, income, deductions, credits);
      if (___cachedResult) =>
        this.performanceMonitor.endOperation(operationId, true, { cached: true });
        return cachedResult;
      }

      // Get tax rates
      const rates = this.rateManager.getRates(year);
      const provincialRates = this.rateManager.getProvincialRates(year, taxpayer.address.province);

      // Calculate total income
      const totalIncome = this.calculateTotalIncome(income);
      const netIncome = this.calculateNetIncome(totalIncome, deductions);
      const taxableIncome = netIncome;

      // Calculate federal tax
      const federalTax = this.calculateFederalTax(taxableIncome, rates.federalBrackets);
      const provincialTax = this.calculateProvincialTax(taxableIncome, provincialRates);

      // Calculate credits
      const federalCredits = this.calculateFederalCredits(credits, rates.basicPersonalAmount);
      const provincialCredits = this.calculateProvincialCredits(
        credits,
        provincialRates.basicPersonalAmount
      );

      // Calculate contributions
      const contributions = this.calculateContributions(income, year);

      // Calculate final balance
      const totalTax = federalTax.plus(provincialTax);
      const totalCredits = federalCredits.plus(provincialCredits);
      const balance = totalTax.minus(totalCredits).minus(contributions.cpp).minus(contributions.ei);

      const result: TaxCalculations = {
        income: {
          employment: this.sumEmploymentIncome(income) as DecimalType,
          business: this.sumBusinessIncome(income) as DecimalType,
          investment: this.sumInvestmentIncome(income) as DecimalType,
          taxable: taxableIncome as DecimalType,
          net: netIncome as DecimalType,
        },
        deductions: {
          total: this.sumDeductions(deductions) as DecimalType,
          nonRefundable: this.sumNonRefundableDeductions(deductions) as DecimalType,
          refundable: this.sumRefundableDeductions(deductions) as DecimalType,
        },
        tax: {
          federal: federalTax as DecimalType,
          provincial: provincialTax as DecimalType,
          total: totalTax as DecimalType,
        },
        credits: {
          nonRefundable: totalCredits as DecimalType,
          refundable: new Decimal(0) as DecimalType,
          total: totalCredits as DecimalType,
        },
        contributions,
        balance: {
          owing: balance as DecimalType,
          refund: new Decimal(0) as DecimalType,
        },
      };

      // Cache the result
      this.cache.set(taxpayer, year, income, deductions, credits, result);

      this.performanceMonitor.endOperation(operationId, true, { cached: false });
      return result;
    } catch (error) {
      this.performanceMonitor.endOperation(operationId, false, { error });
      LoggerService.error('Failed to calculate tax', { error, taxpayer, year });
      throw error;
    }
  }

  private calculateTotalIncome(income: Income): Decimal {
    return this.sumEmploymentIncome(income)
      .plus(this.sumBusinessIncome(income))
      .plus(this.sumInvestmentIncome(income))
      .plus(income.pension.cpp)
      .plus(income.pension.oas)
      .plus(income.pension.other)
      .plus(income.other);
  }

  private calculateNetIncome(totalIncome: Decimal, deductions: Deductions): Decimal {
    const totalDeductions = this.sumDeductions(deductions);
    return Decimal.max(totalIncome.minus(totalDeductions), new Decimal(0));
  }

  private calculateFederalTax(taxableIncome: Decimal, brackets: any[]): Decimal {
    let remainingIncome = taxableIncome;
    let totalTax = new Decimal(0);

    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i];
      const nextBracket = brackets[i + 1];
      const bracketIncome = nextBracket
        ? Decimal.min(remainingIncome, nextBracket.threshold.minus(bracket.threshold))
        : remainingIncome;

      if (bracketIncome.isPositive()) {
        totalTax = totalTax.plus(bracketIncome.times(bracket.rate));
        remainingIncome = remainingIncome.minus(bracketIncome);
      }

      if (remainingIncome.isZero()) {
        break;
      }
    }

    return totalTax;
  }

  private calculateProvincialTax(taxableIncome: Decimal, provincialRates: any): Decimal {
    const baseTax = this.calculateFederalTax(taxableIncome, provincialRates.brackets);

    // Apply surtax if applicable
    if (provincialRates.surtax) {
      let surtax = new Decimal(0);
      const { thresholds, rates } = provincialRates.surtax;

      for (let i = 0; i < thresholds.length; i++) {
        if (baseTax.gt(thresholds[i])) {
          surtax = surtax.plus(baseTax.minus(thresholds[i]).times(rates[i]));
        }
      }

      return baseTax.plus(surtax);
    }

    return baseTax;
  }

  private calculateFederalCredits(credits: Credits, basicPersonalAmount: Decimal): Decimal {
    return credits.basic
      .plus(credits.age)
      .plus(credits.spouse)
      .plus(credits.dependent)
      .plus(credits.disability)
      .plus(basicPersonalAmount)
      .times(new Decimal(0.15)); // Federal credit rate
  }

  private calculateProvincialCredits(credits: Credits, basicPersonalAmount: Decimal): Decimal {
    return credits.basic
      .plus(credits.age)
      .plus(credits.spouse)
      .plus(credits.dependent)
      .plus(credits.disability)
      .plus(basicPersonalAmount)
      .times(new Decimal(0.0505)); // Lowest provincial rate
  }

  private calculateContributions(
    income: Income,
    year: number
  ): { cpp: Decimal; ei: Decimal; qpp: Decimal } {
    // Simplified calculation - in reality, would use rates from TaxRateManager
    const totalEmploymentIncome = this.sumEmploymentIncome(income);

    return {
      cpp: totalEmploymentIncome.times(new Decimal(0.0595)).round(2),
      ei: totalEmploymentIncome.times(new Decimal(0.0163)).round(2),
      qpp: new Decimal(0),
    };
  }

  private sumEmploymentIncome(income: Income): Decimal {
    return income.employment.reduce((sum, ___emp) => sum.plus(emp.t4.income), new Decimal(0));
  }

  private sumBusinessIncome(income: Income): Decimal {
    return income.business.reduce(
      (sum, ___bus) => sum.plus(bus.revenue.minus(bus.expenses)),
      new Decimal(0)
    );
  }

  private sumInvestmentIncome(income: Income): Decimal {
    const { dividends, interest, capitalGains, rentalIncome } = income.investment;
    return dividends.eligible
      .plus(dividends.nonEligible)
      .plus(dividends.foreign)
      .plus(interest)
      .plus(capitalGains)
      .plus(rentalIncome);
  }

  private sumDeductions(deductions: Deductions): Decimal {
    return deductions.rrsp.contributions
      .plus(deductions.rrsp.prpp)
      .plus(deductions.rrsp.spousalContributions)
      .plus(deductions.employment.union)
      .plus(deductions.employment.professional)
      .plus(deductions.employment.other)
      .plus(deductions.other.movingExpenses)
      .plus(deductions.other.supportPayments)
      .plus(deductions.other.carryingCharges);
  }

  private sumNonRefundableDeductions(deductions: Deductions): Decimal {
    return deductions.rrsp.contributions
      .plus(deductions.rrsp.prpp)
      .plus(deductions.rrsp.spousalContributions);
  }

  private sumRefundableDeductions(deductions: Deductions): Decimal {
    return deductions.employment.union
      .plus(deductions.employment.professional)
      .plus(deductions.employment.other);
  }
}
