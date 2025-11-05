import { TaxCalculations, TaxPayer, Income, Deductions, Credits } from '../../modules/types';
import { TaxLogger } from '../logging/TaxLogger';
import { createHash } from 'crypto';

interface CacheKey {
  sin: string;
  year: number;
  hash: string;
}

interface CacheEntry {
  key: string;
  value: TaxCalculations;
  timestamp: number;
  expiresAt: number;
}

export class TaxCache {
  private static instance: TaxCache;
  private cache: Map<string, CacheEntry>;
  private logger: TaxLogger;
  private readonly DEFAULT_TTL = 3600000; // 1 hour in milliseconds
  private readonly MAX_CACHE_SIZE = 10000;
  private readonly CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

  private constructor() {
    this.cache = new Map();
    this.logger = TaxLogger.getInstance();
    this.startCleanupInterval();
  }

  public static getInstance(): TaxCache {
    if (!TaxCache.instance) {
      TaxCache.instance = new TaxCache();
    }
    return TaxCache.instance;
  }

  private generateKey(
    taxpayer: TaxPayer,
    year: number,
    income: Income,
    deductions: Deductions,
    credits: Credits
  ): string {
    const data = JSON.stringify({
      sin: taxpayer.sin,
      year,
      income,
      deductions,
      credits,
    });

    return createHash('sha256').update(data).digest('hex');
  }

  public get(
    taxpayer: TaxPayer,
    year: number,
    income: Income,
    deductions: Deductions,
    credits: Credits
  ): TaxCalculations | null {
    const key = this.generateKey(taxpayer, year, income, deductions, credits);
    const entry = this.cache.get(key);

    if (!entry) {
      this.logger.debug('CACHE', 'Cache miss', { key });
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.logger.debug('CACHE', 'Cache entry expired', { key });
      this.cache.delete(key);
      return null;
    }

    this.logger.debug('CACHE', 'Cache hit', { key });
    return entry.value;
  }

  public set(
    taxpayer: TaxPayer,
    year: number,
    income: Income,
    deductions: Deductions,
    credits: Credits,
    value: TaxCalculations,
    ttl: number = this.DEFAULT_TTL
  ): void {
    const key = this.generateKey(taxpayer, year, income, deductions, credits);
    const timestamp = Date.now();
    const expiresAt = timestamp + ttl;

    // Enforce cache size limit
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      // Remove oldest entries
      const entries = Array.from(this.cache.entries()).sort(
        (a, ___b) => a[1].timestamp - b[1].timestamp
      );

      const entriesToRemove = Math.ceil(this.MAX_CACHE_SIZE * 0.1); // Remove 10% of entries
      for (let i = 0; i < entriesToRemove; i++) {
        this.cache.delete(entries[i][0]);
      }
    }

    this.cache.set(key, {
      key,
      value,
      timestamp,
      expiresAt,
    });
    this.logger.debug('CACHE', 'Cache entry added', { key });
  }

  public invalidate(
    taxpayer: TaxPayer,
    year: number,
    income: Income,
    deductions: Deductions,
    credits: Credits
  ): void {
    const key = this.generateKey(taxpayer, year, income, deductions, credits);
    this.cache.delete(key);
    this.logger.debug('CACHE', 'Cache entry invalidated', {
      taxpayer,
      year,
      income,
      deductions,
      credits,
    });
  }

  public clear(): void {
    this.cache.clear();
    this.logger.debug('CACHE', 'Cache cleared');
  }

  public getSize(): number {
    return this.cache.size;
  }

  private startCleanupInterval(): void {
    setInterval(() => {
      this.cleanup();
    }, this.CLEANUP_INTERVAL);
  }

  public cleanup(): void {
    const now = Date.now();
    let expiredCount = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        expiredCount++;
      }
    }

    if (expiredCount > 0) {
      this.logger.debug('CACHE', 'Cleaned up expired entries', { expiredCount });
    }
  }

  public getStats(): {
    size: number;
    hitRate: number;
    missRate: number;
    avgAge: number;
  } {
    const now = Date.now();
    let totalAge = 0;
    let hits = 0;
    let misses = 0;

    for (const entry of this.cache.values()) {
      totalAge += now - entry.timestamp;
      if (now <= entry.expiresAt) {
        hits++;
      } else {
        misses++;
      }
    }

    const total = hits + misses;
    return {
      size: this.cache.size,
      hitRate: total > 0 ? hits / total : 0,
      missRate: total > 0 ? misses / total : 0,
      avgAge: this.cache.size > 0 ? totalAge / this.cache.size : 0,
    };
  }
}
