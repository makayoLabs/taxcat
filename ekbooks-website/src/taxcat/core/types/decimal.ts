import Decimal from 'decimal.js';

export type DecimalType = Decimal;

export const createDecimal = (value: number | string): DecimalType => {
  return new Decimal(value);
};
