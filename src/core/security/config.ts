import { z } from 'zod';

export const SecurityConfigSchema = z.object({
  authentication: z.object({
    mfa: z.object({
      required: z.boolean(),
      methods: z.array(z.enum(['SMS', 'EMAIL', 'AUTHENTICATOR'])),
      gracePeriod: z.number().min(0).max(30), // days
      backupCodes: z.boolean(),
    }),
    session: z.object({
      timeout: z.number().min(5).max(60), // minutes
      maxAttempts: z.number().min(3).max(10),
      lockoutDuration: z.number().min(5).max(60), // minutes
      jwtExpiry: z.number().min(1).max(24), // hours
      refreshTokenExpiry: z.number().min(1).max(30), // days
    }),
    passwordPolicy: z.object({
      minLength: z.number().min(8).max(128),
      requireUppercase: z.boolean(),
      requireLowercase: z.boolean(),
      requireNumbers: z.boolean(),
      requireSpecialChars: z.boolean(),
      preventReuse: z.number().min(3).max(24), // previous passwords
      expiryDays: z.number().min(30).max(365),
    }),
  }),
  encryption: z.object({
    algorithm: z.enum(['AES-256-GCM', 'ChaCha20-Poly1305']),
    keyRotation: z.number().min(30).max(365), // days
    keyStorage: z.enum(['AWS-KMS', 'AZURE-KEYVAULT', 'HASHICORP-VAULT']),
  }),
  dataProtection: z.object({
    atRest: z.object({
      enabled: z.boolean(),
      algorithm: z.enum(['AES-256-GCM', 'ChaCha20-Poly1305']),
      keyRotation: z.number().min(30).max(365), // days
    }),
    inTransit: z.object({
      minTlsVersion: z.enum(['TLS1.2', 'TLS1.3']),
      preferredCipherSuites: z.array(z.string()),
      hsts: z.boolean(),
    }),
    backup: z.object({
      enabled: z.boolean(),
      frequency: z.enum(['HOURLY', 'DAILY', 'WEEKLY']),
      retention: z.number().min(7).max(365), // days
      encrypted: z.boolean(),
    }),
  }),
  audit: z.object({
    enabled: z.boolean(),
    level: z.enum(['BASIC', 'DETAILED', 'COMPREHENSIVE']),
    retention: z.number().min(30).max(3650), // days
    alerting: z.boolean(),
  }),
  rateLimit: z.object({
    enabled: z.boolean(),
    maxRequests: z.number().min(10).max(1000),
    windowMs: z.number().min(1000).max(3600000), // milliseconds
    skipList: z.array(z.string()), // IP addresses to skip
  }),
  headers: z.object({
    csp: z.boolean(),
    xssProtection: z.boolean(),
    hsts: z.boolean(),
    noSniff: z.boolean(),
    frameOptions: z.enum(['DENY', 'SAMEORIGIN']),
  }),
});

export type SecurityConfig = z.infer<typeof SecurityConfigSchema>;

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  authentication: {
    mfa: {
      required: true,
      methods: ['SMS', 'EMAIL', 'AUTHENTICATOR'],
      gracePeriod: 7,
      backupCodes: true,
    },
    session: {
      timeout: 30,
      maxAttempts: 5,
      lockoutDuration: 15,
      jwtExpiry: 1,
      refreshTokenExpiry: 7,
    },
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventReuse: 12,
      expiryDays: 90,
    },
  },
  encryption: {
    algorithm: 'AES-256-GCM',
    keyRotation: 90,
    keyStorage: 'AWS-KMS',
  },
  dataProtection: {
    atRest: {
      enabled: true,
      algorithm: 'AES-256-GCM',
      keyRotation: 90,
    },
    inTransit: {
      minTlsVersion: 'TLS1.3',
      preferredCipherSuites: ['TLS_AES_256_GCM_SHA384', 'TLS_CHACHA20_POLY1305_SHA256'],
      hsts: true,
    },
    backup: {
      enabled: true,
      frequency: 'DAILY',
      retention: 90,
      encrypted: true,
    },
  },
  audit: {
    enabled: true,
    level: 'COMPREHENSIVE',
    retention: 365,
    alerting: true,
  },
  rateLimit: {
    enabled: true,
    maxRequests: 100,
    windowMs: 900000, // 15 minutes
    skipList: [],
  },
  headers: {
    csp: true,
    xssProtection: true,
    hsts: true,
    noSniff: true,
    frameOptions: 'DENY',
  },
};
