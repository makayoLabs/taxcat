# Tax Calculation API Reference

## Core Calculators

### T1Calculator (Personal Tax)

```typescript
class T1Calculator {
  constructor(year: number);
  calculateT1Tax(taxpayer: TaxPayer, income: Income, deductions: Deductions, credits: Credits): TaxCalculations;
}
```

#### Parameters

- `year`: Tax year for calculations (e.g., 2024)
- `taxpayer`: Taxpayer information including SIN, name, address
- `income`: All sources of income (employment, business, investment)
- `deductions`: Available deductions (RRSP, employment expenses)
- `credits`: Tax credits (basic personal, medical, donations)

#### Returns

Returns a `TaxCalculations` object containing:
- Income breakdown
- Deduction totals
- Federal and provincial tax amounts
- Credits applied
- CPP/EI contributions
- Final balance (refund or owing)

### T2Calculator (Corporate Tax)

```typescript
class T2Calculator {
  constructor(year: number);
  calculateTax(data: T2CorporateData): T2Calculations;
}
```

#### Parameters

- `year`: Tax year for calculations
- `data`: Corporate tax data including:
  - Business number
  - Revenue and expenses
  - Province
  - Small business status

### T3Calculator (Trust Tax)

```typescript
class T3Calculator {
  constructor(year: number);
  calculateT3Tax(trustIncome: Income, deductions: Deductions, credits: Credits, province: ProvinceCode): TaxCalculations;
}
```

### T5013Calculator (Partnership)

```typescript
class T5013Calculator {
  constructor(year: number);
  calculatePartnershipTax(income: BusinessIncome, province: ProvinceCode): TaxCalculations;
}
```

## Type Definitions

### TaxPayer

```typescript
interface TaxPayer {
  sin: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address: {
    line1: string;
    line2?: string;
    city: string;
    province: ProvinceCode;
    postalCode: string;
  };
  language: 'EN' | 'FR';
}
```

### Income

```typescript
interface Income {
  employment: Array<{
    t4: {
      income: Decimal;
      cpp: Decimal;
      ei: Decimal;
      tax: Decimal;
    };
  }>;
  business: Array<{
    revenue: Decimal;
    expenses: Record<string, Decimal>;
  }>;
  investment: {
    dividends: {
      eligible: Decimal;
      nonEligible: Decimal;
      foreign: Decimal;
    };
    interest: Decimal;
    capitalGains: Decimal;
    rentalIncome: Decimal;
  };
}
```

### Deductions

```typescript
interface Deductions {
  rrsp: {
    contributions: Decimal;
    prpp: Decimal;
    spousalContributions: Decimal;
  };
  employment: {
    union: Decimal;
    professional: Decimal;
    other: Decimal;
  };
  other: {
    movingExpenses: Decimal;
    supportPayments: Decimal;
    carryingCharges: Decimal;
  };
}
```

### TaxCalculations

```typescript
interface TaxCalculations {
  income: {
    employment: Decimal;
    business: Decimal;
    investment: Decimal;
    taxable: Decimal;
    net: Decimal;
  };
  deductions: {
    total: Decimal;
    nonRefundable: Decimal;
    refundable: Decimal;
  };
  tax: {
    federal: Decimal;
    provincial: Decimal;
    total: Decimal;
  };
  credits: {
    nonRefundable: Decimal;
    refundable: Decimal;
    total: Decimal;
  };
  contributions: {
    cpp: Decimal;
    ei: Decimal;
    qpp: Decimal;
  };
  balance: {
    owing: Decimal;
    refund: Decimal;
  };
}
``` 