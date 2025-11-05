# E-Filing API Reference

## Core Components

### EFileManager

The main class for managing CRA e-filing submissions.

```typescript
class EFileManager {
  static getInstance(): EFileManager;
  setCredentials(credentials: EFileCredentials): void;
  createSubmission(type: ReturnType, year: number, data: any): Promise<string>;
  validateSubmission(id: string): Promise<EFileSubmission>;
  submitToCRA(id: string): Promise<EFileSubmission>;
  checkStatus(id: string): Promise<EFileSubmission>;
  getSubmissionHistory(type?: ReturnType, year?: number): EFileSubmission[];
  getSubmissionStats(): SubmissionStats;
}
```

### XMLGenerator

Generates CRA-compliant XML for various return types.

```typescript
class XMLGenerator {
  static getInstance(): XMLGenerator;
  generateT1XML(taxpayer: TaxPayer, income: Income, deductions: Deductions, credits: Credits, calculations: TaxCalculations, options?: XMLGeneratorOptions): string;
  generateT2XML(data: T2CorporateData): string;
  generateT3XML(data: T3TrustData): string;
  generateT5013XML(data: T5013PartnershipData): string;
}
```

### SubmissionValidator

Validates tax submissions before e-filing.

```typescript
class SubmissionValidator {
  static getInstance(): SubmissionValidator;
  validateT1Submission(taxpayer: TaxPayer, income: Income, deductions: Deductions, credits: Credits, calculations: TaxCalculations): ValidationResult;
  validateT2Submission(data: T2CorporateData): ValidationResult;
  validateT3Submission(data: T3TrustData): ValidationResult;
}
```

## Type Definitions

### EFileCredentials

```typescript
interface EFileCredentials {
  eservicesNumber: string;
  password: string;
  environment: 'TEST' | 'PRODUCTION';
}
```

### EFileSubmission

```typescript
interface EFileSubmission {
  id: string;
  type: 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T5013' | 'RC59' | 'RC199';
  year: number;
  status: EFileStatus;
  data: any;
  submissionDate?: Date;
  confirmationNumber?: string;
  assessmentDate?: Date;
  errors?: EFileError[];
  warnings?: EFileWarning[];
  metadata: Record<string, any>;
}
```

### EFileStatus

```typescript
enum EFileStatus {
  DRAFT = 'DRAFT',
  VALIDATING = 'VALIDATING',
  READY = 'READY',
  SUBMITTING = 'SUBMITTING',
  SUBMITTED = 'SUBMITTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  ASSESSED = 'ASSESSED',
  ERROR = 'ERROR'
}
```

### ValidationResult

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}
```

### ValidationError/Warning

```typescript
interface ValidationError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, any>;
}

interface ValidationWarning {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, any>;
}
```

## CRA Error Codes

The system includes comprehensive error code handling through `CRAErrorCodes.ts`:

```typescript
enum CRAErrorCode {
  // Authentication Errors (1000-1099)
  INVALID_CREDENTIALS = 'CRA_1000',
  SESSION_EXPIRED = 'CRA_1001',
  UNAUTHORIZED_ACCESS = 'CRA_1002',
  
  // Validation Errors (1100-1199)
  INVALID_SIN = 'CRA_1100',
  INVALID_DATE_OF_BIRTH = 'CRA_1101',
  
  // Filing Errors (1200-1299)
  DUPLICATE_SUBMISSION = 'CRA_1200',
  LATE_FILING = 'CRA_1201',
  
  // System Errors (1600-1699)
  SERVICE_UNAVAILABLE = 'CRA_1600',
  TIMEOUT = 'CRA_1601'
}
```

## Usage Examples

### Basic E-Filing Flow

```typescript
// Initialize manager
const efileManager = EFileManager.getInstance();

// Set credentials
efileManager.setCredentials({
  eservicesNumber: 'YOUR_NUMBER',
  password: 'YOUR_PASSWORD',
  environment: 'TEST'
});

// Create submission
const submissionId = await efileManager.createSubmission('T1', 2024, taxData);

// Validate
const validationResult = await efileManager.validateSubmission(submissionId);
if (!validationResult.valid) {
  console.error('Validation errors:', validationResult.errors);
  return;
}

// Submit to CRA
const submission = await efileManager.submitToCRA(submissionId);
console.log(`Confirmation number: ${submission.confirmationNumber}`);

// Check status
const status = await efileManager.checkStatus(submissionId);
console.log(`Status: ${status.status}`);
```

### XML Generation

```typescript
const xmlGenerator = XMLGenerator.getInstance();

// Generate T1 XML
const t1xml = xmlGenerator.generateT1XML(taxpayer, income, deductions, credits, calculations, {
  pretty: true,
  validate: true
});

// Generate T2 XML
const t2xml = xmlGenerator.generateT2XML(corporateData);
``` 