import { Decimal } from 'decimal.js';
import {
  TaxPayer,
  Income,
  Deductions,
  Credits,
  TaxYear,
  ProvinceCode,
  Address,
} from '../../modules/types';
import { TaxError, TaxErrorCode, TaxErrorSeverity } from '../errors/TaxError';

export interface ValidationError {
  code: TaxErrorCode;
  message: string;
  severity: TaxErrorSeverity;
  field?: string;
}

export class TaxValidator {
  private readonly MAX_INCOME = new Decimal('999999999.99');
  private readonly MAX_DEDUCTION = new Decimal('999999.99');
  private readonly MAX_CREDIT = new Decimal('999999.99');
  private readonly MIN_TAX_YEAR = 1970;
  private readonly MAX_TAX_YEAR = new Date().getFullYear() + 1;

  public validateTaxPayer(taxpayer: TaxPayer): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!taxpayer.sin || !/^\d{9}$/.test(taxpayer.sin)) {
      errors.push({
        code: TaxErrorCode.INVALID_SIN,
        message: 'Invalid SIN format',
        severity: TaxErrorSeverity.ERROR,
        field: 'sin',
      });
    }

    if (!taxpayer.firstName || !taxpayer.lastName) {
      errors.push({
        code: TaxErrorCode.INVALID_NAME,
        message: 'Name is required',
        severity: TaxErrorSeverity.ERROR,
        field: 'name',
      });
    }

    if (!taxpayer.dateOfBirth || isNaN(new Date(taxpayer.dateOfBirth).getTime())) {
      errors.push({
        code: TaxErrorCode.INVALID_DATE,
        message: 'Invalid date of birth',
        severity: TaxErrorSeverity.ERROR,
        field: 'dateOfBirth',
      });
    }

    if (
      !taxpayer.address.postalCode ||
      !/^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/.test(taxpayer.address.postalCode)
    ) {
      errors.push({
        code: TaxErrorCode.INVALID_POSTAL_CODE,
        message: 'Invalid postal code format',
        severity: TaxErrorSeverity.ERROR,
        field: 'postalCode',
      });
    }

    return errors;
  }

  public validateIncome(income: Income): ValidationError[] {
    const errors: ValidationError[] = [];

    // Validate employment income
    if (income.employment.some((___emp) => emp.t4.income.isNegative())) {
      errors.push({
        code: TaxErrorCode.INVALID_AMOUNT,
        message: 'Employment income cannot be negative',
        severity: TaxErrorSeverity.ERROR,
        field: 'employment.income',
      });
    }

    // Validate investment income
    const { dividends, interest, capitalGains } = income.investment;
    if (
      dividends.eligible.isNegative() ||
      dividends.nonEligible.isNegative() ||
      dividends.foreign.isNegative()
    ) {
      errors.push({
        code: TaxErrorCode.INVALID_AMOUNT,
        message: 'Dividend income cannot be negative',
        severity: TaxErrorSeverity.ERROR,
        field: 'investment.dividends',
      });
    }

    if (interest.isNegative()) {
      errors.push({
        code: TaxErrorCode.INVALID_AMOUNT,
        message: 'Interest income cannot be negative',
        severity: TaxErrorSeverity.ERROR,
        field: 'investment.interest',
      });
    }

    return errors;
  }

  public validateDeductions(deductions: Deductions): ValidationError[] {
    const errors: ValidationError[] = [];

    // Validate RRSP deductions
    const { rrsp } = deductions;
    if (
      rrsp.contributions.isNegative() ||
      rrsp.prpp.isNegative() ||
      rrsp.spousalContributions.isNegative()
    ) {
      errors.push({
        code: TaxErrorCode.INVALID_AMOUNT,
        message: 'RRSP contributions cannot be negative',
        severity: TaxErrorSeverity.ERROR,
        field: 'rrsp',
      });
    }

    // Validate employment deductions
    const { employment } = deductions;
    if (employment.union.isNegative() || employment.professional.isNegative()) {
      errors.push({
        code: TaxErrorCode.INVALID_AMOUNT,
        message: 'Employment deductions cannot be negative',
        severity: TaxErrorSeverity.ERROR,
        field: 'employment',
      });
    }

    return errors;
  }

  public validateCredits(credits: Credits): ValidationError[] {
    const errors: ValidationError[] = [];

    if (credits.medical.isNegative()) {
      errors.push({
        code: TaxErrorCode.INVALID_AMOUNT,
        message: 'Medical expenses cannot be negative',
        severity: TaxErrorSeverity.ERROR,
        field: 'credits.medical',
      });
    }

    if (credits.donations.isNegative()) {
      errors.push({
        code: TaxErrorCode.INVALID_AMOUNT,
        message: 'Charitable donations cannot be negative',
        severity: TaxErrorSeverity.ERROR,
        field: 'credits.donations',
      });
    }

    return errors;
  }

  public validateTaxYear(year: number): ValidationError[] {
    const errors: ValidationError[] = [];
    const currentYear = new Date().getFullYear();

    if (year < 2000 || year > currentYear + 1) {
      errors.push({
        code: TaxErrorCode.INVALID_TAX_YEAR,
        message: `Tax year must be between 2000 and ${currentYear + 1}`,
        severity: TaxErrorSeverity.ERROR,
        field: 'year',
      });
    }

    return errors;
  }
}
