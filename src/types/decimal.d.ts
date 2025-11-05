declare module 'decimal.js' {
  class Decimal {
    constructor(value: Decimal.Value);

    static set(settings: Decimal.Config): void;
    static max(...values: Decimal.Value[]): Decimal;
    static min(...values: Decimal.Value[]): Decimal;
    static ROUND_HALF_UP: number;

    // Basic arithmetic
    add(n: Decimal.Value): Decimal;
    sub(n: Decimal.Value): Decimal;
    mul(n: Decimal.Value): Decimal;
    div(n: Decimal.Value): Decimal;
    abs(): Decimal;
    
    // Comparison methods - all variants
    lessThan(n: Decimal.Value): boolean;
    lt(n: Decimal.Value): boolean;
    lessThanOrEqualTo(n: Decimal.Value): boolean;
    lte(n: Decimal.Value): boolean;
    greaterThan(n: Decimal.Value): boolean;
    gt(n: Decimal.Value): boolean;
    greaterThanOrEqualTo(n: Decimal.Value): boolean;
    gte(n: Decimal.Value): boolean;
    equals(n: Decimal.Value): boolean;
    eq(n: Decimal.Value): boolean;
    
    // Additional arithmetic methods
    plus(n: Decimal.Value): Decimal;
    minus(n: Decimal.Value): Decimal;
    times(n: Decimal.Value): Decimal;
    dividedBy(n: Decimal.Value): Decimal;
    
    // Formatting and conversion
    toDecimalPlaces(dp: number): Decimal;
    toString(): string;
    toPower(n: Decimal.Value): Decimal;
    pow(n: Decimal.Value): Decimal;
  }

  namespace Decimal {
    type Value = string | number | Decimal;

    interface Config {
      precision?: number;
      rounding?: number;
      toExpNeg?: number;
      toExpPos?: number;
      minE?: number;
      maxE?: number;
      crypto?: boolean;
      modulo?: number;
      defaults?: boolean;
    }
  }

  export = Decimal;
}
