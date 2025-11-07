import jwt from 'jsonwebtoken';
import { SecurityConfig } from './config';
import { EncryptionService } from './encryption';
import { LoggerService } from '../logging/logger';
import { TaxCatUser } from '../../modules/types';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface MFASetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export class AuthenticationService {
  private static instance: AuthenticationService;
  private config: SecurityConfig['authentication'];
  private encryption: EncryptionService;
  private jwtSecret: string;
  private refreshTokens: Map<string, string>;

  private constructor(config: SecurityConfig['authentication']) {
    this.config = config;
    this.encryption = EncryptionService.getInstance({
      algorithm: 'AES-256-GCM',
      keyRotation: 90,
      keyStorage: 'AWS-KMS',
    });
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    this.refreshTokens = new Map();
  }

  public static getInstance(config: SecurityConfig['authentication']): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService(config);
    }
    return AuthenticationService.instance;
  }

  public async authenticate(email: string, password: string): Promise<AuthTokens> {
    try {
      const user = await this.validateCredentials(email, password);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      return this.generateTokens(user);
    } catch (error) {
      LoggerService.error('Authentication failed', { error, email });
      throw new Error('Authentication failed');
    }
  }

  public async validateToken(token: string): Promise<TaxCatUser> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as jwt.JwtPayload;

      const user = await this.getUserById(decoded.sub as string);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      LoggerService.error('Token validation failed', { error });
      throw new Error('Invalid token');
    }
  }

  public async refreshAccessToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const decoded = jwt.verify(refreshToken, this.jwtSecret) as jwt.JwtPayload;
      const storedToken = this.refreshTokens.get(decoded.sub as string);

      if (!storedToken || storedToken !== refreshToken) {
        throw new Error('Invalid refresh token');
      }

      const user = await this.getUserById(decoded.sub as string);
      if (!user) {
        throw new Error('User not found');
      }

      return this.generateTokens(user);
    } catch (error) {
      LoggerService.error('Token refresh failed', { error });
      throw new Error('Token refresh failed');
    }
  }

  public async setupMFA(userId: string): Promise<MFASetup> {
    try {
      // Generate TOTP secret
      const secret = await this.encryption.generateSecureToken(20);

      // Generate QR code (in production, use a proper TOTP library)
      const qrCode = `otpauth://totp/TaxCat:${userId}?secret=${secret}&issuer=TaxCat`;

      // Generate backup codes
      const backupCodes = [];
      for (let i = 0; i < 10; i++) {
        backupCodes.push(await this.encryption.generateSecureToken(8));
      }

      // In production, store these securely in the database
      return {
        secret,
        qrCode,
        backupCodes,
      };
    } catch (error) {
      LoggerService.error('MFA setup failed', { error, userId });
      throw new Error('MFA setup failed');
    }
  }

  public async verifyMFA(userId: string, code: string): Promise<boolean> {
    try {
      // In production, implement proper TOTP verification
      return code.length === 6 && /^\d+$/.test(code);
    } catch (error) {
      LoggerService.error('MFA verification failed', { error, userId });
      throw new Error('MFA verification failed');
    }
  }

  private async generateTokens(user: TaxCatUser): Promise<AuthTokens> {
    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      this.jwtSecret,
      { expiresIn: `${this.config.session.jwtExpiry}h` }
    );

    const refreshToken = jwt.sign({ sub: user.id }, this.jwtSecret, {
      expiresIn: `${this.config.session.refreshTokenExpiry}d`,
    });

    this.refreshTokens.set(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      expiresIn: this.config.session.jwtExpiry * 3600, // Convert hours to seconds
    };
  }

  private async validateCredentials(email: string, password: string): Promise<TaxCatUser | null> {
    // In production, this would validate against a database
    // This is just a mock implementation
    if (email === 'test@example.com' && password === 'password') {
      return {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'ADMIN',
        modules: ['T1_PERSONAL'],
        tools: ['EFILE'],
        product: 'COMPLETE_SUITE',
        settings: {
          defaultProvince: 'ON',
          defaultYear: 2024,
          theme: 'LIGHT',
          language: 'EN',
          notifications: {
            email: true,
            desktop: true,
            deadlineReminders: true,
            clientUpdates: true,
            systemUpdates: true,
          },
        },
      };
    }
    return null;
  }

  private async getUserById(id: string): Promise<TaxCatUser | null> {
    // In production, this would fetch from a database
    // This is just a mock implementation
    if (id === '123') {
      return {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'ADMIN',
        modules: ['T1_PERSONAL'],
        tools: ['EFILE'],
        product: 'COMPLETE_SUITE',
        settings: {
          defaultProvince: 'ON',
          defaultYear: 2024,
          theme: 'LIGHT',
          language: 'EN',
          notifications: {
            email: true,
            desktop: true,
            deadlineReminders: true,
            clientUpdates: true,
            systemUpdates: true,
          },
        },
      };
    }
    return null;
  }
}
