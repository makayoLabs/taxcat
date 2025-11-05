export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  category: string;
  message: string;
  data?: Record<string, any>;
  error?: Error;
}

export interface LogFilter {
  level?: LogLevel;
  category?: string;
  startDate?: Date;
  endDate?: Date;
}

export class TaxLogger {
  private static instance: TaxLogger;
  private logs: LogEntry[] = [];
  private logHandlers: ((___entry: LogEntry) => void)[] = [];

  private constructor() {
    // Add default console handler
    this.addHandler((entry: LogEntry) => {
      const timestamp = entry.timestamp.toISOString();
      const data = entry.data ? `\nData: ${JSON.stringify(entry.data, null, 2)}` : '';
      const error = entry.error ? `\nError: ${entry.error.stack}` : '';

      console.log(
        `[${timestamp}] ${entry.level} [${entry.category}]: ${entry.message}${data}${error}`
      );
    });
  }

  public static getInstance(): TaxLogger {
    if (!TaxLogger.instance) {
      TaxLogger.instance = new TaxLogger();
    }
    return TaxLogger.instance;
  }

  public addHandler(handler: (entry: LogEntry) => void): void {
    this.logHandlers.push(handler);
  }

  public log(
    level: LogLevel,
    category: string,
    message: string,
    data?: Record<string, any>,
    error?: Error
  ): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      category,
      message,
      data,
      error,
    };

    this.logs.push(entry);
    this.logHandlers.forEach((handler) => handler(entry));
  }

  public debug(category: string, message: string, data?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, category, message, data);
  }

  public info(category: string, message: string, data?: Record<string, any>): void {
    this.log(LogLevel.INFO, category, message, data);
  }

  public warning(category: string, message: string, data?: Record<string, any>): void {
    this.log(LogLevel.WARNING, category, message, data);
  }

  public error(category: string, message: string, error?: Error, data?: Record<string, any>): void {
    this.log(LogLevel.ERROR, category, message, data, error);
  }

  public getLogs(filter?: LogFilter): LogEntry[] {
    let filtered = this.logs;

    if (filter) {
      if (filter.level) {
        filtered = filtered.filter((entry) => entry.level === filter.level);
      }
      if (filter.category) {
        filtered = filtered.filter((entry) => entry.category === filter.category);
      }
      if (filter.startDate) {
        filtered = filtered.filter((entry) => entry.timestamp >= filter.startDate!);
      }
      if (filter.endDate) {
        filtered = filtered.filter((entry) => entry.timestamp <= filter.endDate!);
      }
    }

    return filtered;
  }

  public clearLogs(): void {
    this.logs = [];
  }

  public exportLogs(filter?: LogFilter): string {
    const logs = this.getLogs(filter);
    return JSON.stringify(logs, null, 2);
  }

  public addFileHandler(filePath: string): void {
    // In a real implementation, this would write to a file
    this.addHandler((entry: LogEntry) => {
      const logLine = `${entry.timestamp.toISOString()} [${entry.level}] [${entry.category}]: ${entry.message}`;
      // Write to file would go here
      console.log(`Would write to ${filePath}: ${logLine}`);
    });
  }

  public addAuditHandler(): void {
    this.addHandler((entry: LogEntry) => {
      if (entry.category.startsWith('AUDIT')) {
        // In a real implementation, this would write to a secure audit log
        console.log(`AUDIT: ${JSON.stringify(entry)}`);
      }
    });
  }
}
