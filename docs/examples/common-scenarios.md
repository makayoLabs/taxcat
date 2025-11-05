# Common Tax Scenarios Guide

This guide provides examples for common tax scenarios using the TaxCat engine.

## Personal Tax (T1) Examples

### 1. Basic Employment Income

```typescript
import { T1Calculator } from '../../src/modules/personal/T1Calculator';
import { Decimal } from 'decimal.js';

const calculator = new T1Calculator(2024);

const taxpayer = {
  sin: '123456789',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: new Date('1980-01-01'),
  address: {
    line1: '123 Main St',
    city: 'Toronto',
    province: 'ON',
    postalCode: 'M5V 2T6'
  },
  language: 'EN'
};

const income = {
  employment: [{
    t4: {
      income: new Decimal(75000),
      cpp: new Decimal(3500),
      ei: new Decimal(1000),
      tax: new Decimal(15000)
    }
  }],
  business: [],
  investment: {
    dividends: { eligible: new Decimal(0), nonEligible: new Decimal(0), foreign: new Decimal(0) },
    interest: new Decimal(0),
    capitalGains: new Decimal(0),
    rentalIncome: new Decimal(0)
  }
};

const deductions = {
  rrsp: {
    contributions: new Decimal(10000),
    prpp: new Decimal(0),
    spousalContributions: new Decimal(0)
  },
  employment: {
    union: new Decimal(500),
    professional: new Decimal(0),
    other: new Decimal(0)
  }
};

const result = calculator.calculateT1Tax(taxpayer, income, deductions, credits);
```

### 2. Self-Employed Individual

```typescript
const income = {
  employment: [],
  business: [{
    revenue: new Decimal(120000),
    expenses: {
      advertising: new Decimal(2000),
      supplies: new Decimal(5000),
      utilities: new Decimal(3000),
      rent: new Decimal(24000),
      insurance: new Decimal(1200)
    }
  }],
  investment: {
    dividends: { eligible: new Decimal(0), nonEligible: new Decimal(0), foreign: new Decimal(0) },
    interest: new Decimal(500),
    capitalGains: new Decimal(0),
    rentalIncome: new Decimal(0)
  }
};

const deductions = {
  rrsp: {
    contributions: new Decimal(15000)
  },
  business: {
    homeworkspace: new Decimal(2400),
    vehicle: new Decimal(3600)
  }
};
```

### 3. Investment Income

```typescript
const income = {
  employment: [],
  business: [],
  investment: {
    dividends: {
      eligible: new Decimal(15000),
      nonEligible: new Decimal(5000),
      foreign: new Decimal(3000)
    },
    interest: new Decimal(2000),
    capitalGains: new Decimal(10000),
    rentalIncome: new Decimal(24000)
  }
};
```

## Corporate Tax (T2) Examples

### 1. Small Business

```typescript
import { T2Calculator } from '../../src/modules/corporate/T2Calculator';

const calculator = new T2Calculator(2024);

const corporateData = {
  businessNumber: '123456789RC0001',
  taxYear: 2024,
  revenue: new Decimal(500000),
  expenses: {
    salaries: new Decimal(200000),
    rent: new Decimal(48000),
    utilities: new Decimal(12000),
    supplies: new Decimal(50000),
    insurance: new Decimal(6000)
  },
  province: 'ON',
  smallBusiness: true
};

const result = calculator.calculateTax(corporateData);
```

### 2. Manufacturing Corporation

```typescript
const manufacturingData = {
  businessNumber: '987654321RC0001',
  taxYear: 2024,
  revenue: new Decimal(5000000),
  expenses: {
    materials: new Decimal(2000000),
    labor: new Decimal(1500000),
    overhead: new Decimal(500000),
    depreciation: new Decimal(200000)
  },
  province: 'ON',
  smallBusiness: false,
  manufacturingProcessing: true
};
```

## Trust Tax (T3) Examples

### 1. Family Trust

```typescript
import { T3Calculator } from '../../src/modules/trust/T3Calculator';

const calculator = new T3Calculator(2024);

const trustIncome = {
  investment: {
    dividends: {
      eligible: new Decimal(50000),
      nonEligible: new Decimal(20000)
    },
    interest: new Decimal(10000),
    capitalGains: new Decimal(100000)
  },
  business: [],
  rental: new Decimal(60000)
};

const result = calculator.calculateT3Tax(trustIncome, deductions, credits, 'ON');
```

## Partnership Tax (T5013) Examples

### 1. Professional Partnership

```typescript
import { T5013Calculator } from '../../src/modules/partnership/T5013Calculator';

const calculator = new T5013Calculator(2024);

const partnershipIncome = {
  revenue: new Decimal(1000000),
  expenses: {
    salaries: new Decimal(400000),
    rent: new Decimal(100000),
    supplies: new Decimal(50000),
    professional: new Decimal(25000)
  },
  partners: [
    { share: 0.4, sin: '123456789' },
    { share: 0.3, sin: '234567890' },
    { share: 0.3, sin: '345678901' }
  ]
};

const result = calculator.calculatePartnershipTax(partnershipIncome, 'ON');
```

## E-Filing Examples

### 1. T1 E-Filing

```typescript
import { EFileManager } from '../../src/core/efile/EFileManager';
import { XMLGenerator } from '../../src/core/efile/XMLGenerator';

// Initialize
const efileManager = EFileManager.getInstance();
const xmlGenerator = XMLGenerator.getInstance();

// Set credentials
efileManager.setCredentials({
  eservicesNumber: 'YOUR_NUMBER',
  password: 'YOUR_PASSWORD',
  environment: 'TEST'
});

// Generate XML
const t1xml = xmlGenerator.generateT1XML(taxpayer, income, deductions, credits, calculations);

// Create and submit
const submissionId = await efileManager.createSubmission('T1', 2024, t1xml);
const validationResult = await efileManager.validateSubmission(submissionId);

if (validationResult.valid) {
  const submission = await efileManager.submitToCRA(submissionId);
  console.log(`Confirmation number: ${submission.confirmationNumber}`);
}
```

### 2. T2 E-Filing with Attachments

```typescript
// Generate T2 XML
const t2xml = xmlGenerator.generateT2XML(corporateData);

// Create submission with attachments
const submissionId = await efileManager.createSubmission('T2', 2024, {
  xml: t2xml,
  attachments: {
    financialStatements: fs.readFileSync('financial_statements.pdf'),
    schedules: [
      fs.readFileSync('schedule_100.pdf'),
      fs.readFileSync('schedule_125.pdf')
    ]
  }
});

// Submit
const result = await efileManager.submitToCRA(submissionId);
```

## Error Handling Examples

### 1. Validation Errors

```typescript
try {
  const result = calculator.calculateT1Tax(taxpayer, income, deductions, credits);
} catch (error) {
  if (error instanceof TaxError) {
    switch (error.code) {
      case TaxErrorCode.INVALID_SIN:
        console.error('Invalid SIN number provided');
        break;
      case TaxErrorCode.INVALID_PROVINCE:
        console.error('Invalid province code');
        break;
      default:
        console.error(`Tax calculation error: ${error.message}`);
    }
  }
}
```

### 2. E-Filing Errors

```typescript
try {
  const submission = await efileManager.submitToCRA(submissionId);
} catch (error) {
  if (error instanceof TaxError) {
    if (error.code === TaxErrorCode.EFILE_SUBMISSION_ERROR) {
      const craError = error.details?.craErrorCode;
      switch (craError) {
        case CRAErrorCode.INVALID_CREDENTIALS:
          console.error('Invalid CRA credentials');
          break;
        case CRAErrorCode.DUPLICATE_SUBMISSION:
          console.error('Return already submitted');
          break;
        default:
          console.error(`E-filing error: ${error.message}`);
      }
    }
  }
}
``` 