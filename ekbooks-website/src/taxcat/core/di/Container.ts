export type Constructor<T = any> = new (...args: any[]) => T;
export type Factory<T = any> = (...args: any[]) => T;

export interface ServiceDescriptor<T = any> {
  token: string | symbol;
  type: 'singleton' | 'transient';
  implementation: Constructor<T> | Factory<T>;
  dependencies?: Array<string | symbol>;
}

export class Container {
  private static instance: Container;
  private services: Map<string | symbol, ServiceDescriptor> = new Map();
  private instances: Map<string | symbol, any> = new Map();

  private constructor() {}

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public register<T>(
    token: string | symbol,
    implementation: Constructor<T> | Factory<T>,
    options: {
      type?: 'singleton' | 'transient';
      dependencies?: Array<string | symbol>;
    } = {}
  ): void {
    const descriptor: ServiceDescriptor<T> = {
      token,
      type: options.type || 'singleton',
      implementation,
      dependencies: options.dependencies || [],
    };

    this.services.set(token, descriptor);
  }

  public get<T>(token: string | symbol): T {
    const descriptor = this.services.get(token);
    if (!descriptor) {
      throw new Error(`Service not registered: ${String(token)}`);
    }

    if (descriptor.type === 'singleton') {
      let instance = this.instances.get(token);
      if (!instance) {
        instance = this.createInstance(descriptor);
        this.instances.set(token, instance);
      }
      return instance;
    }

    return this.createInstance(descriptor);
  }

  private createInstance<T>(descriptor: ServiceDescriptor<T>): T {
    const dependencies = (descriptor.dependencies || []).map((___dep) => this.get(dep));

    if (
      typeof descriptor.implementation === 'function' &&
      descriptor.implementation.prototype &&
      descriptor.implementation.prototype.constructor
    ) {
      // It's a class constructor
      return new descriptor.implementation(...dependencies);
    } else {
      // It's a factory function
      return (descriptor.implementation as Factory<T>)(...dependencies);
    }
  }

  public clear(): void {
    this.services.clear();
    this.instances.clear();
  }

  public clearInstances(): void {
    this.instances.clear();
  }

  public hasService(token: string | symbol): boolean {
    return this.services.has(token);
  }

  public hasInstance(token: string | symbol): boolean {
    return this.instances.has(token);
  }

  public remove(token: string | symbol): void {
    this.services.delete(token);
    this.instances.delete(token);
  }

  public getRegisteredServices(): Array<string | symbol> {
    return Array.from(this.services.keys());
  }
}

// Example service tokens
export const SERVICE_TOKENS = {
  TAX_CALCULATOR: Symbol('TAX_CALCULATOR'),
  TAX_VALIDATOR: Symbol('TAX_VALIDATOR'),
  TAX_LOGGER: Symbol('TAX_LOGGER'),
  TAX_CACHE: Symbol('TAX_CACHE'),
  PERFORMANCE_MONITOR: Symbol('PERFORMANCE_MONITOR'),
  TAX_RATE_MANAGER: Symbol('TAX_RATE_MANAGER'),
} as const;

// Example interfaces for dependency injection
export interface ITaxCalculator {
  calculateT1Tax(/* ... */): void;
  calculateT2Tax(/* ... */): void;
  calculateT3Tax(/* ... */): void;
}

export interface ITaxValidator {
  validateTaxPayer(/* ... */): void;
  validateIncome(/* ... */): void;
  validateDeductions(/* ... */): void;
}

export interface ITaxLogger {
  debug(/* ... */): void;
  info(/* ... */): void;
  warning(/* ... */): void;
  error(/* ... */): void;
}

export interface ITaxCache {
  get(/* ... */): void;
  set(/* ... */): void;
  invalidate(/* ... */): void;
}

export interface IPerformanceMonitor {
  startOperation(/* ... */): void;
  endOperation(/* ... */): void;
  getStats(/* ... */): void;
}

export interface ITaxRateManager {
  getRates(/* ... */): void;
  updateRates(/* ... */): void;
  getProvincialRates(/* ... */): void;
}
