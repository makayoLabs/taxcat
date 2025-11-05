// Client-side encryption utilities for sensitive data
export class EncryptionService {
  private static instance: EncryptionService
  private encryptionKey: CryptoKey | null = null

  static getInstance(): EncryptionService {
    if (!EncryptionService.instance) {
      EncryptionService.instance = new EncryptionService()
    }
    return EncryptionService.instance
  }

  // Initialize encryption with a derived key
  async initialize(password: string): Promise<void> {
    const encoder = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    )

    this.encryptionKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('taxcat-salt'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    )
  }

  // Encrypt sensitive data
  async encrypt(data: string): Promise<string> {
    if (!this.encryptionKey) {
      throw new Error('Encryption not initialized')
    }

    const encoder = new TextEncoder()
    const iv = crypto.getRandomValues(new Uint8Array(12))

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.encryptionKey,
      encoder.encode(data)
    )

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength)
    combined.set(iv)
    combined.set(new Uint8Array(encrypted), iv.length)

    return btoa(String.fromCharCode.apply(null, Array.from(combined)))
  }

  // Decrypt sensitive data
  async decrypt(encryptedData: string): Promise<string> {
    if (!this.encryptionKey) {
      throw new Error('Encryption not initialized')
    }

    const combined = new Uint8Array(atob(encryptedData).split('').map(c => c.charCodeAt(0)))
    const iv = combined.slice(0, 12)
    const encrypted = combined.slice(12)

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      this.encryptionKey,
      encrypted
    )

    const decoder = new TextDecoder()
    return decoder.decode(decrypted)
  }

  // Hash sensitive data for storage (one-way)
  async hash(data: string): Promise<string> {
    const encoder = new TextEncoder()
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data))
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }
}

// Data sanitization utilities
export class DataSanitizationService {
  // Sanitize personal information
  static sanitizePersonalInfo(data: any): any {
    const sanitized = { ...data }

    // Remove or mask sensitive fields
    if (sanitized.sin) {
      sanitized.sin = this.maskSIN(sanitized.sin)
    }

    return sanitized
  }

  // Mask Social Insurance Number
  static maskSIN(sin: string): string {
    if (sin.length !== 9) return sin
    return `***-***-${sin.slice(-3)}`
  }

  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate phone number (Canadian format)
  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/
    return phoneRegex.test(phone)
  }

  // Validate SIN format
  static isValidSIN(sin: string): boolean {
    if (sin.length !== 9 || !/^\d+$/.test(sin)) return false

    // Luhn algorithm for SIN validation
    const digits = sin.split('').map(Number)
    let sum = 0

    for (let i = 0; i < 9; i++) {
      let digit = digits[i]
      if (i % 2 === 1) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      sum += digit
    }

    return sum % 10 === 0
  }

  // Clean input data
  static cleanInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential XSS characters
      .slice(0, 1000) // Limit length
  }
}

// Security audit logging
export class SecurityAuditService {
  private static logs: SecurityEvent[] = []

  static logEvent(event: Omit<SecurityEvent, 'timestamp' | 'id'>): void {
    const securityEvent: SecurityEvent = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      ...event
    }

    this.logs.push(securityEvent)

    // In production, send to security monitoring service
    console.log('Security Event:', securityEvent)
  }

  static getLogs(): SecurityEvent[] {
    return [...this.logs]
  }

  static clearLogs(): void {
    this.logs = []
  }
}

export interface SecurityEvent {
  id: string
  timestamp: Date
  type: 'data_access' | 'data_modification' | 'authentication' | 'file_upload' | 'file_download'
  userId?: string
  action: string
  resource: string
  ipAddress?: string
  userAgent?: string
  success: boolean
  details?: any
}

// Compliance utilities
export class ComplianceService {
  // Check if data handling complies with PIPEDA
  static validatePIPEDACompliance(data: any): ComplianceResult {
    const issues: string[] = []

    // Check for required consent mechanisms
    if (!data.consentGiven) {
      issues.push('User consent not recorded')
    }

    // Check data retention policies
    if (data.createdAt && this.isDataStale(data.createdAt)) {
      issues.push('Data may exceed retention period')
    }

    return {
      compliant: issues.length === 0,
      issues
    }
  }

  // Check CRA compliance for tax data
  static validateCRACompliance(taxData: any): ComplianceResult {
    const issues: string[] = []

    // Required fields for CRA submission
    const requiredFields = ['sin', 'firstName', 'lastName', 'address', 'province']
    for (const field of requiredFields) {
      if (!taxData[field]) {
        issues.push(`Missing required field: ${field}`)
      }
    }

    // Validate amounts are reasonable
    if (taxData.income && taxData.income > 10000000) {
      issues.push('Income amount seems unusually high')
    }

    return {
      compliant: issues.length === 0,
      issues
    }
  }

  private static isDataStale(createdAt: Date): boolean {
    const sixYearsAgo = new Date()
    sixYearsAgo.setFullYear(sixYearsAgo.getFullYear() - 6)
    return createdAt < sixYearsAgo
  }
}

export interface ComplianceResult {
  compliant: boolean
  issues: string[]
}
