import { Decimal } from 'decimal.js';
import { ProvinceCode } from '../../modules/types';

export interface TaxBracket {
  threshold: Decimal;
  rate: Decimal;
}

export interface ProvincialRates {
  brackets: TaxBracket[];
  basicPersonalAmount: Decimal;
  surtax?: {
    thresholds: Decimal[];
    rates: Decimal[];
  };
}

export interface TaxRates {
  basicPersonalAmount: Decimal;
  federalBrackets: TaxBracket[];
  provincialRates: Record<string, ProvincialRates>;
}

export interface TaxYearConfig {
  federalBrackets: TaxBracket[];
  provincialRates: Record<ProvinceCode, ProvincialRates>;
  basicPersonalAmount: Decimal;
  ageAmount: Decimal;
  ageThreshold: Decimal;
  rrspDeductionLimit: Decimal;
  tfsaContributionLimit: Decimal;
  cpp: {
    rate: number;
    maxPensionable: Decimal;
    basicExemption: Decimal;
  };
  ei: {
    rate: number;
    maxInsurable: Decimal;
  };
  qpp?: {
    rate: number;
    maxPensionable: Decimal;
    basicExemption: Decimal;
  };
  inflation: {
    rate: number;
    indexationFactor: number;
  };
}

export class TaxRateManager {
  private static instance: TaxRateManager;
  private rates: Map<number, TaxRates>;

  private constructor() {
    this.rates = new Map();
    this.initializeRates();
  }

  public static getInstance(): TaxRateManager {
    if (!TaxRateManager.instance) {
      TaxRateManager.instance = new TaxRateManager();
    }
    return TaxRateManager.instance;
  }

  private initializeRates() {
    // 2024 Tax Rates
    this.rates.set(2024, {
      basicPersonalAmount: new Decimal(15000),
      federalBrackets: [
        { threshold: new Decimal(0), rate: new Decimal(0.15) },
        { threshold: new Decimal(53359), rate: new Decimal(0.205) },
        { threshold: new Decimal(106717), rate: new Decimal(0.26) },
        { threshold: new Decimal(165430), rate: new Decimal(0.29) },
        { threshold: new Decimal(235675), rate: new Decimal(0.33) },
      ],
      provincialRates: {
        ON: {
          basicPersonalAmount: new Decimal(11865),
          brackets: [
            { threshold: new Decimal(0), rate: new Decimal(0.0505) },
            { threshold: new Decimal(49231), rate: new Decimal(0.0915) },
            { threshold: new Decimal(98463), rate: new Decimal(0.1116) },
            { threshold: new Decimal(150000), rate: new Decimal(0.1216) },
            { threshold: new Decimal(220000), rate: new Decimal(0.1316) },
          ],
          surtax: {
            thresholds: [new Decimal(4991), new Decimal(6387)],
            rates: [new Decimal(0.2), new Decimal(0.36)],
          },
        },
        // Add other provinces...
        BC: {
          brackets: [
            { threshold: new Decimal(0), rate: new Decimal(0.0506) },
            { threshold: new Decimal(45654), rate: new Decimal(0.077) },
            { threshold: new Decimal(91310), rate: new Decimal(0.105) },
            { threshold: new Decimal(104835), rate: new Decimal(0.1229) },
            { threshold: new Decimal(127299), rate: new Decimal(0.147) },
            { threshold: new Decimal(172602), rate: new Decimal(0.168) },
            { threshold: new Decimal(240716), rate: new Decimal(0.205) },
          ],
          basicPersonalAmount: new Decimal(11981),
        },
        AB: {
          brackets: [{ threshold: new Decimal(0), rate: new Decimal(0.1) }],
          basicPersonalAmount: new Decimal(21003),
        },
        // ... other provinces
        MB: {
          brackets: [{ threshold: new Decimal(0), rate: new Decimal(0.108) }],
          basicPersonalAmount: new Decimal(10855),
        },
        NB: {
          brackets: [{ threshold: new Decimal(0), rate: new Decimal(0.094) }],
          basicPersonalAmount: new Decimal(11720),
        },
        NL: {
          brackets: [{ threshold: new Decimal(0), rate: new Decimal(0.087) }],
          basicPersonalAmount: new Decimal(10382),
        },
        NS: {
          brackets: [{ threshold: new Decimal(0), rate: new Decimal(0.0879) }],
          basicPersonalAmount: new Decimal(11481),
        },
        NT: {
          brackets: [{ threshold: new Decimal(0), rate: new Decimal(0.059) }],
          basicPersonalAmount: new Decimal(15609),
        },
        NU: {
          brackets: [{ threshold: new Decimal(0), rate: new Decimal(0.04) }],
          basicPersonalAmount: new Decimal(16862),
        },
        PE: {
          brackets: [{ threshold: new Decimal(0), rate: new Decimal(0.098) }],
          basicPersonalAmount: new Decimal(11250),
        },
        QC: {
          brackets: [{ threshold: new Decimal(0), rate: new Decimal(0.15) }],
          basicPersonalAmount: new Decimal(17183),
        },
        SK: {
          brackets: [{ threshold: new Decimal(0), rate: new Decimal(0.105) }],
          basicPersonalAmount: new Decimal(17661),
        },
        YT: {
          brackets: [{ threshold: new Decimal(0), rate: new Decimal(0.064) }],
          basicPersonalAmount: new Decimal(15000),
        },
      },
    });
  }

  public getRates(year: number): TaxRates {
    const rates = this.rates.get(year);
    if (!rates) {
      throw new Error(`Tax rates not available for year ${year}`);
    }
    return rates;
  }

  public getFederalBrackets(year: number): TaxBracket[] {
    return this.getRates(year).federalBrackets;
  }

  public getProvincialRates(year: number, province: string): ProvincialRates {
    const rates = this.getRates(year).provincialRates[province];
    if (!rates) {
      throw new Error(`Provincial rates not available for ${province} in year ${year}`);
    }
    return rates;
  }

  public updateRates(year: number, rates: TaxRates): void {
    this.rates.set(year, rates);
  }

  public getAvailableYears(): number[] {
    return Array.from(this.rates.keys()).sort();
  }

  public indexToInflation(amount: Decimal, fromYear: number, toYear: number): Decimal {
    let result = amount;
    for (let year = fromYear; year < toYear; year++) {
      const rates = this.getRates(year);
      result = result.times(rates.inflation.indexationFactor);
    }
    return result;
  }
}
