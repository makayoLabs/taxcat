import { TaxCalculationService } from '../services/TaxCalculationService';
import { LoggerService } from '../core/logging/logger';
import { TaxPayer, Income, Deductions, Credits, TaxCalculations, Address } from '../core/tax/types';
import { createDecimal } from '../core/types/decimal';

describe('TaxCalculationService', () => {
  let service: TaxCalculationService;

  beforeEach(() => {
    service = TaxCalculationService.getInstance();
  });

  afterAll(async () => {
    await LoggerService.close();
  });

  it('should calculate tax correctly for a simple case', async () => {
    const address: Address = {
      street: '123 Main St',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5V 2T6',
      country: 'Canada',
    };

    const taxpayer: TaxPayer = {
      id: '12345',
      sin: '123456789',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1980-01-01'),
      maritalStatus: 'SINGLE',
      residencyStatus: 'RESIDENT',
      province: 'ON',
      address,
      dependents: [],
      language: 'EN',
      email: 'john@example.com',
    };

    const income: Income = {
      employment: [
        {
          employer: 'ACME Inc',
          t4: {
            income: createDecimal(75000),
            tax: createDecimal(15000),
            cpp: createDecimal(3500),
            ei: createDecimal(1000),
            rpp: createDecimal(0),
            union: createDecimal(0),
          },
        },
      ],
      business: [],
      investment: {
        dividends: {
          eligible: createDecimal(0),
          nonEligible: createDecimal(0),
          foreign: createDecimal(0),
        },
        interest: createDecimal(1000),
        capitalGains: createDecimal(0),
        rentalIncome: createDecimal(0),
      },
      pension: {
        cpp: createDecimal(0),
        oas: createDecimal(0),
        other: createDecimal(0),
      },
      other: {
        ei: createDecimal(0),
        wsib: createDecimal(0),
        social: createDecimal(0),
        foreign: createDecimal(0),
        other: {},
      },
    };

    const deductions: Deductions = {
      rrsp: {
        contributions: createDecimal(5000),
        prpp: createDecimal(0),
        spousalContributions: createDecimal(0),
      },
      employment: {
        union: createDecimal(500),
        professional: createDecimal(0),
        other: createDecimal(0),
      },
      other: {
        movingExpenses: createDecimal(0),
        supportPayments: createDecimal(0),
        carryingCharges: createDecimal(0),
      },
    };

    const credits: Credits = {
      basic: createDecimal(15000),
      age: createDecimal(0),
      spouse: createDecimal(0),
      dependent: createDecimal(0),
      disability: createDecimal(0),
      medical: createDecimal(1000),
      donations: createDecimal(500),
      other: {},
    };

    const result = await service.calculateTax(taxpayer, 2024, income, deductions, credits);

    expect(result).toBeDefined();
    expect(result.income.employment.toString()).toBe('75000');
    expect(result.income.net.toString()).toBe('70500'); // 75000 + 1000 - 5500
    expect(result.tax.federal).toBeDefined();
    expect(result.tax.provincial).toBeDefined();
    expect(result.tax.total).toBeDefined();
    expect(result.credits.nonRefundable).toBeDefined();
    expect(result.credits.refundable).toBeDefined();
    expect(result.balance.owing).toBeDefined();
    expect(result.balance.refund).toBeDefined();
  });
});
