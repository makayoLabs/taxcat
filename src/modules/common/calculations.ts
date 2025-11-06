import { Decimal } from 'decimal.js';

// Configure Decimal for financial calculations
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

export class TaxCalculations {
  // Rounds to 2 decimal places for currency
  static roundCurrency(amount: Decimal): Decimal {
    return amount.toDecimalPlaces(2);
  }

  // Calculates percentage with proper rounding
  static calculatePercentage(amount: Decimal, percentage: number): Decimal {
    return this.roundCurrency(amount.times(percentage).dividedBy(100));
  }

  // Sums an array of Decimals
  static sum(amounts: Decimal[]): Decimal {
    return amounts.reduce((acc, curr) => acc.plus(curr), new Decimal(0));
  }

  // Calculates prorated amount based on days
  static calculateProrated(amount: Decimal, totalDays: number, actualDays: number): Decimal {
    return this.roundCurrency(amount.times(actualDays).dividedBy(totalDays));
  }

  // Calculates compound interest
  static calculateCompoundInterest(
    principal: Decimal,
    rate: number,
    timesPerYear: number,
    years: number
  ): Decimal {
    const r = new Decimal(rate).dividedBy(100);
    const n = new Decimal(timesPerYear);
    const t = new Decimal(years);
    const base = new Decimal(1).plus(r.dividedBy(n));
    const exp = n.times(t);

    return this.roundCurrency(principal.times(base.toPower(exp)));
  }

  // Calculates present value
  static calculatePresentValue(futureValue: Decimal, rate: number, years: number): Decimal {
    const r = new Decimal(rate).dividedBy(100);
    const t = new Decimal(years);
    const divisor = new Decimal(1).plus(r).toPower(t);

    return this.roundCurrency(futureValue.dividedBy(divisor));
  }

  // Calculates amortization payment
  static calculateAmortizationPayment(principal: Decimal, rate: number, periods: number): Decimal {
    const r = new Decimal(rate).dividedBy(100).dividedBy(12); // Monthly rate
    const n = new Decimal(periods);
    const numerator = principal.times(r.times(new Decimal(1).plus(r).toPower(n)));
    const denominator = new Decimal(1).plus(r).toPower(n).minus(1);

    return this.roundCurrency(numerator.dividedBy(denominator));
  }

  // Calculates weighted average
  static calculateWeightedAverage(values: Array<{ value: Decimal; weight: number }>): Decimal {
    const weightedSum = values.reduce(
      (acc, { value, weight }) => acc.plus(value.times(weight)),
      new Decimal(0)
    );
    const totalWeight = values.reduce((acc, { weight }) => acc + weight, 0);

    return this.roundCurrency(weightedSum.dividedBy(totalWeight));
  }

  // Calculates net present value
  static calculateNPV(rate: number, cashFlows: Decimal[]): Decimal {
    const r = new Decimal(rate).dividedBy(100);

    return this.roundCurrency(
      cashFlows.reduce((npv, cf, t) => {
        const discountFactor = new Decimal(1).plus(r).toPower(t);
        return npv.plus(cf.dividedBy(discountFactor));
      }, new Decimal(0))
    );
  }
}
