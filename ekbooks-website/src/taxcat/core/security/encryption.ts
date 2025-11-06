import crypto from 'crypto';
import { promisify } from 'util';
import { SecurityConfig } from './config';
import { LoggerService } from '../logging/logger';

const randomBytes = promisify(crypto.randomBytes);
const scrypt = promisify(crypto.scrypt);

export class EncryptionService {
  private static instance: EncryptionService;
  private config: SecurityConfig['encryption'];
  private keyCache: Map<string, Buffer>;

  private constructor(config: SecurityConfig['encryption']) {
    this.config = config;
    this.keyCache = new Map();
  }

  public static getInstance(config: SecurityConfig['encryption']): EncryptionService {
    if (!EncryptionService.instance) {
      EncryptionService.instance = new EncryptionService(config);
    }
    return EncryptionService.instance;
  }

  public async encrypt(
    data: string,
    keyId?: string
  ): Promise<{
    encrypted: string;
    iv: string;
    tag: string;
    keyId: string;
  }> {
    try {
      const iv = await randomBytes(12);
      const key = await this.getEncryptionKey(keyId);
      const cipher = crypto.createCipheriv(this.config.algorithm, key, iv) as crypto.CipherGCM;

      let encrypted = cipher.update(data, 'utf8', 'base64');
      encrypted += cipher.final('base64');
      const tag = cipher.getAuthTag();

      return {
        encrypted,
        iv: iv.toString('base64'),
        tag: tag.toString('base64'),
        keyId: keyId || 'current',
      };
    } catch (error) {
      LoggerService.error('Encryption failed', { error });
      throw new Error('Encryption failed');
    }
  }

  public async decrypt(params: {
    encrypted: string;
    iv: string;
    tag: string;
    keyId: string;
  }): Promise<string> {
    try {
      const key = await this.getEncryptionKey(params.keyId);
      const decipher = crypto.createDecipheriv(
        this.config.algorithm,
        key,
        Buffer.from(params.iv, 'base64')
      ) as crypto.DecipherGCM;

      decipher.setAuthTag(Buffer.from(params.tag, 'base64'));

      let decrypted = decipher.update(params.encrypted, 'base64', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      LoggerService.error('Decryption failed', { error });
      throw new Error('Decryption failed');
    }
  }

  public async hashPassword(password: string): Promise<string> {
    try {
      const salt = await randomBytes(16);
      const key = (await scrypt(password, salt, 64)) as Buffer;
      return `${salt.toString('base64')}.${key.toString('base64')}`;
    } catch (error) {
      LoggerService.error('Password hashing failed', { error });
      throw new Error('Password hashing failed');
    }
  }

  public async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      const [salt, key] = hash.split('.');
      const keyBuffer = (await scrypt(password, Buffer.from(salt, 'base64'), 64)) as Buffer;
      return keyBuffer.toString('base64') === key;
    } catch (error) {
      LoggerService.error('Password verification failed', { error });
      throw new Error('Password verification failed');
    }
  }

  private async getEncryptionKey(keyId?: string): Promise<Buffer> {
    // In production, this would fetch from KMS/Key Vault
    if (!keyId) {
      keyId = 'current';
    }

    if (!this.keyCache.has(keyId)) {
      // Simulate key fetch from KMS
      const key = await randomBytes(32);
      this.keyCache.set(keyId, key);
    }

    return this.keyCache.get(keyId)!;
  }

  public async rotateKey(): Promise<string> {
    try {
      const newKeyId = `key-${Date.now()}`;
      const newKey = await randomBytes(32);
      this.keyCache.set(newKeyId, newKey);

      LoggerService.info('Encryption key rotated', { keyId: newKeyId });
      return newKeyId;
    } catch (error) {
      LoggerService.error('Key rotation failed', { error });
      throw new Error('Key rotation failed');
    }
  }

  public async generateSecureToken(length: number = 32): Promise<string> {
    try {
      const bytes = await randomBytes(length);
      return bytes.toString('base64').replace(/[/+=]/g, '').slice(0, length);
    } catch (error) {
      LoggerService.error('Token generation failed', { error });
      throw new Error('Token generation failed');
    }
  }
}
