import { TaxCalculations, TaxPayer, Income, Deductions, Credits } from '../../modules/types';
import { TaxError, TaxErrorCode, TaxErrorSeverity } from '../errors/TaxError';
import { TaxLogger } from '../logging/TaxLogger';

export interface ValidationRule {
  code: string;
  message: string;
  severity: 'ERROR' | 'WARNING';
  validate: (___data: any) => boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, any>;
}

export interface ValidationWarning {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, any>;
}

export class SubmissionValidator {
  private static instance: SubmissionValidator;
  private logger: TaxLogger;

  private readonly T1_RULES: ValidationRule[] = [
    {
      code: 'T1_001',
      message: 'SIN number must be valid',
      severity: 'ERROR',
      validate: (___taxpayer: TaxPayer) => this.validateSIN(taxpayer.sin),
    },
    {
      code: 'T1_002',
      message: 'Taxpayer must be at least 16 years old',
      severity: 'ERROR',
      validate: (___taxpayer: TaxPayer) => this.validateAge(taxpayer.dateOfBirth, 16),
    },
    {
      code: 'T1_003',
      message: 'Total income must not exceed maximum limit',
      severity: 'ERROR',
      validate: (___income: Income) => this.validateTotalIncome(income),
    },
    {
      code: 'T1_004',
      message: 'RRSP contributions must not exceed yearly limit',
      severity: 'ERROR',
      validate: (___deductions: Deductions) => this.validateRRSPContributions(deductions),
    },
    {
      code: 'T1_005',
      message: 'Charitable donations must have valid registration numbers',
      severity: 'ERROR',
      validate: (___credits: Credits) => this.validateCharitableDonations(credits),
    },
  ];

  private readonly T2_RULES: ValidationRule[] = [
    // Add T2-specific validation rules
  ];

  private readonly T3_RULES: ValidationRule[] = [
    // Add T3-specific validation rules
  ];

  private constructor() {
    this.logger = TaxLogger.getInstance();
  }

  public static getInstance(): SubmissionValidator {
    if (!SubmissionValidator.instance) {
      SubmissionValidator.instance = new SubmissionValidator();
    }
    return SubmissionValidator.instance;
  }

  public validateT1Submission(
    taxpayer: TaxPayer,
    income: Income,
    deductions: Deductions,
    credits: Credits,
    calculations: TaxCalculations
  ): ValidationResult {
    this.logger.debug('VALIDATION', 'Starting T1 submission validation');

    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Apply all T1 rules
    for (const rule of this.T1_RULES) {
      try {
        let isValid = false;
        switch (rule.code) {
          case 'T1_001':
            isValid = rule.validate(taxpayer);
            break;
          case 'T1_002':
            isValid = rule.validate(taxpayer);
            break;
          case 'T1_003':
            isValid = rule.validate(income);
            break;
          case 'T1_004':
            isValid = rule.validate(deductions);
            break;
          case 'T1_005':
            isValid = rule.validate(credits);
            break;
          default:
            this.logger.warning('VALIDATION', `Unknown validation rule: ${rule.code}`);
            continue;
        }

        if (!isValid) {
          if (rule.severity === 'ERROR') {
            errors.push({
              code: rule.code,
              message: rule.message,
            });
          } else {
            warnings.push({
              code: rule.code,
              message: rule.message,
            });
          }
        }
      } catch (error) {
        this.logger.error('VALIDATION', `Error applying rule ${rule.code}`, error as Error);
        errors.push({
          code: rule.code,
          message: `Internal validation error: ${(error as Error).message}`,
        });
      }
    }

    // Additional CRA-specific validations
    this.validateProvincialRequirements(taxpayer, errors, warnings);
    this.validateForeignIncome(income, errors, warnings);
    this.validateCarryForwardAmounts(calculations, errors, warnings);
    this.validateFilingDeadlines(taxpayer, errors, warnings);

    const result: ValidationResult = {
      valid: errors.length === 0,
      errors,
      warnings,
    };

    this.logger.debug('VALIDATION', 'Completed T1 submission validation', {
      valid: result.valid,
      errorCount: errors.length,
      warningCount: warnings.length,
    });

    return result;
  }

  private validateSIN(sin: string): boolean {
    // Luhn algorithm for SIN validation
    if (!/^\d{9}$/.test(sin)) {
      return false;
    }

    let sum = 0;
    let alternate = false;

    for (let i = sin.length - 1; i >= 0; i--) {
      let n = parseInt(sin.charAt(i), 10);
      if (___alternate) =>
        n *= 2;
        if (n > 9) {
          n -= 9;
        }
      }
      sum += n;
      alternate = !alternate;
    }

    return sum % 10 === 0;
  }

  private validateAge(dateOfBirth: Date, minAge: number): boolean {
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      return age - 1 >= minAge;
    }

    return age >= minAge;
  }

  private validateTotalIncome(income: Income): boolean {
    // CRA maximum income validation
    const MAX_INCOME = 99999999.99;

    const totalIncome = [
      ...income.employment.map((___emp) => emp.t4.income),
      ...income.business.map((___bus) => bus.revenue),
      income.investment.dividends.eligible,
      income.investment.dividends.nonEligible,
      income.investment.dividends.foreign,
      income.investment.interest,
      income.investment.capitalGains,
      income.investment.rentalIncome,
      income.pension.cpp,
      income.pension.oas,
      income.pension.other,
      income.other.ei,
      income.other.wsib,
      income.other.social,
      income.other.foreign,
      ...Object.values(income.other.other),
    ].reduce((sum, ___amount) => sum.plus(amount), new Decimal(0));

    return totalIncome.lte(MAX_INCOME);
  }

  private validateRRSPContributions(deductions: Deductions): boolean {
    const RRSP_LIMIT = 31560; // 2024 limit
    return deductions.rrsp.contributions.lte(RRSP_LIMIT);
  }

  private validateCharitableDonations(credits: Credits): boolean {
    // Validate charity registration numbers
    const CHARITY_REGEX = /^\d{9}[A-Z]{2}\d{4}$/;
    return credits.donations.every((___donation) => CHARITY_REGEX.test(donation.registrationNumber));
  }

  private validateProvincialRequirements(
    taxpayer: TaxPayer,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    // Province-specific validations
    switch (taxpayer.province) {
      case 'QC':
        // Quebec-specific validations
        break;
      case 'ON':
        // Ontario-specific validations
        break;
      // Add other provinces
    }
  }

  private validateForeignIncome(
    income: Income,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    if (income.other.foreign.gt(0)) {
      // Check for required foreign income forms
      warnings.push({
        code: 'T1_W001',
        message: 'Foreign income reported. Form T1135 may be required.',
        field: 'foreign_income',
      });
    }
  }

  private validateCarryForwardAmounts(
    calculations: TaxCalculations,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    // Validate carry-forward amounts against previous year's NOA
    // This would require integration with CRA's Auto-fill service
  }

  private validateFilingDeadlines(
    taxpayer: TaxPayer,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    const today = new Date();
    const deadline = new Date(today.getFullYear(), 3, 30); // April 30th

    if (today > deadline) {
      warnings.push({
        code: 'T1_W002',
        message: 'Filing after deadline. Late filing penalties may apply.',
        field: 'filing_date',
      });
    }
  }

  public validateT2Submission(/* ... */): ValidationResult {
    throw new Error('T2 validation not implemented');
  }

  public validateT3Submission(/* ... */): ValidationResult {
    throw new Error('T3 validation not implemented');
  }
}
