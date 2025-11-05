import { z } from 'zod';

const EnvironmentSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.number().default(3000),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_WEBSITE_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url(),

  // Authentication
  JWT_SECRET: z.string().min(32),
  AUTH_COOKIE_SECURE: z.boolean().default(false),
  MFA_ENABLED: z.boolean().default(true),
  SESSION_TIMEOUT: z.number().min(5).max(60).default(30),

  // Database
  DATABASE_URL: z.string(),

  // Email
  SMTP_HOST: z.string(),
  SMTP_PORT: z.number().default(587),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  EMAIL_FROM: z.string().email(),

  // CRA Integration
  CRA_ENVIRONMENT: z.enum(['TEST', 'PRODUCTION']).default('TEST'),
  CRA_ESERVICES_NUMBER: z.string(),
  CRA_PASSWORD: z.string(),

  // Monitoring
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_FILE_PATH: z.string().default('logs/tax.log'),
  SENTRY_DSN: z.string().optional(),

  // Performance
  CACHE_TTL: z.number().default(3600),
  CACHE_MAX_SIZE: z.number().default(1000),
  PERF_MONITOR_ENABLED: z.boolean().default(true),
  PERF_MONITOR_SAMPLE_RATE: z.number().min(0).max(1).default(0.1),

  // Security
  ENCRYPTION_KEY: z.string().min(32),
  TLS_MIN_VERSION: z.enum(['TLS1.2', 'TLS1.3']).default('TLS1.3'),
  CSP_ENABLED: z.boolean().default(true),
  RATE_LIMIT_MAX: z.number().default(100),
  RATE_LIMIT_WINDOW_MS: z.number().default(900000),

  // Feature Flags
  ENABLE_DOCUMENT_OCR: z.boolean().default(false),
  ENABLE_AI_SUGGESTIONS: z.boolean().default(false),
  ENABLE_ADVANCED_ANALYTICS: z.boolean().default(false),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

function validateEnvironment(): Environment {
  try {
    return EnvironmentSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: parseInt(process.env.PORT || '3000', 10),
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      JWT_SECRET: process.env.JWT_SECRET,
      AUTH_COOKIE_SECURE: process.env.AUTH_COOKIE_SECURE === 'true',
      MFA_ENABLED: process.env.MFA_ENABLED !== 'false',
      SESSION_TIMEOUT: parseInt(process.env.SESSION_TIMEOUT || '30', 10),
      DATABASE_URL: process.env.DATABASE_URL,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
      EMAIL_FROM: process.env.EMAIL_FROM,
      CRA_ENVIRONMENT: process.env.CRA_ENVIRONMENT as 'TEST' | 'PRODUCTION',
      CRA_ESERVICES_NUMBER: process.env.CRA_ESERVICES_NUMBER,
      CRA_PASSWORD: process.env.CRA_PASSWORD,
      LOG_LEVEL: process.env.LOG_LEVEL as 'error' | 'warn' | 'info' | 'debug',
      LOG_FILE_PATH: process.env.LOG_FILE_PATH,
      SENTRY_DSN: process.env.SENTRY_DSN,
      CACHE_TTL: parseInt(process.env.CACHE_TTL || '3600', 10),
      CACHE_MAX_SIZE: parseInt(process.env.CACHE_MAX_SIZE || '1000', 10),
      PERF_MONITOR_ENABLED: process.env.PERF_MONITOR_ENABLED !== 'false',
      PERF_MONITOR_SAMPLE_RATE: parseFloat(process.env.PERF_MONITOR_SAMPLE_RATE || '0.1'),
      ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
      TLS_MIN_VERSION: process.env.TLS_MIN_VERSION as 'TLS1.2' | 'TLS1.3',
      CSP_ENABLED: process.env.CSP_ENABLED !== 'false',
      RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
      RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
      ENABLE_DOCUMENT_OCR: process.env.ENABLE_DOCUMENT_OCR === 'true',
      ENABLE_AI_SUGGESTIONS: process.env.ENABLE_AI_SUGGESTIONS === 'true',
      ENABLE_ADVANCED_ANALYTICS: process.env.ENABLE_ADVANCED_ANALYTICS === 'true',
    });
  } catch (___error) =>
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((___err) => err.path.join('.')).join(', ');
      throw new Error(`Missing or invalid environment variables: ${missingVars}`);
    }
    throw error;
  }
}

export const env = validateEnvironment();
