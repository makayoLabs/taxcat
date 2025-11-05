# TaxCat Configuration Guide

## System Requirements

- Node.js 18+
- npm or yarn
- 2GB RAM minimum
- 1GB disk space
- Internet connection for CRA e-filing

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/taxcat-app.git
cd taxcat-app
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Environment Configuration

Create a `.env` file in the root directory:

```env
# CRA E-filing Configuration
CRA_ENVIRONMENT=TEST
CRA_ESERVICES_NUMBER=your_number
CRA_PASSWORD=your_password

# Logging Configuration
LOG_LEVEL=info
LOG_FILE_PATH=logs/tax.log

# Cache Configuration
CACHE_TTL=3600
CACHE_MAX_SIZE=1000

# Performance Monitoring
PERF_MONITOR_ENABLED=true
PERF_MONITOR_SAMPLE_RATE=0.1

# Database Configuration (if using)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taxcat
DB_USER=admin
DB_PASSWORD=your_password
```

## Tax Rate Configuration

Tax rates are configured in `src/core/config/TaxRates.ts`. Update this file annually with new rates.

### Federal Rates (2024)

```typescript
const FEDERAL_BRACKETS_2024 = [
  { threshold: new Decimal(0), rate: 0.15 },
  { threshold: new Decimal(53359), rate: 0.205 },
  { threshold: new Decimal(106717), rate: 0.26 },
  { threshold: new Decimal(165430), rate: 0.29 },
  { threshold: new Decimal(235675), rate: 0.33 }
];
```

### Provincial Rates

Each province has its own tax brackets and rates. Example for Ontario:

```typescript
const ONTARIO_BRACKETS_2024 = [
  { threshold: new Decimal(0), rate: 0.0505 },
  { threshold: new Decimal(49231), rate: 0.0915 },
  { threshold: new Decimal(98463), rate: 0.1116 },
  { threshold: new Decimal(150000), rate: 0.1216 },
  { threshold: new Decimal(220000), rate: 0.1316 }
];
```

## Logging Configuration

The logging system uses Winston and can be configured in `src/core/logging/TaxLogger.ts`:

```typescript
const logConfig = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue'
  }
};
```

## Cache Configuration

The caching system uses an LRU cache and can be configured in `src/core/cache/TaxCache.ts`:

```typescript
const cacheConfig = {
  max: process.env.CACHE_MAX_SIZE || 1000,
  ttl: process.env.CACHE_TTL || 3600,
  updateAgeOnGet: true
};
```

## Performance Monitoring

Configure performance monitoring in `src/core/monitoring/PerformanceMonitor.ts`:

```typescript
const monitoringConfig = {
  enabled: process.env.PERF_MONITOR_ENABLED === 'true',
  sampleRate: parseFloat(process.env.PERF_MONITOR_SAMPLE_RATE || '0.1'),
  slowOperationThreshold: 1000 // milliseconds
};
```

## XML Schema Configuration

CRA XML schemas are configured in `src/core/efile/XMLGenerator.ts`:

```typescript
const XML_SCHEMAS = {
  T1: 'https://apps.cra-arc.gc.ca/ebci/schema/t1/v2024',
  T2: 'https://apps.cra-arc.gc.ca/ebci/schema/t2/v2024',
  T3: 'https://apps.cra-arc.gc.ca/ebci/schema/t3/v2024'
};
```

## Error Handling Configuration

Configure error severity levels in `src/core/errors/TaxError.ts`:

```typescript
enum TaxErrorSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL'
}
```

## Development Tools

### ESLint Configuration

The project uses ESLint for code quality. Configuration in `.eslintrc.json`:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": "warn"
  }
}
```

### Prettier Configuration

Code formatting is handled by Prettier. Configuration in `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

## Testing Configuration

Jest is configured in `jest.config.js`:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
``` 