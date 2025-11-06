import winston from 'winston';
import { env } from '../../config/environment';

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface ErrorMetadata {
  message: string;
  name: string;
  stack?: string;
  [key: string]: unknown;
}

export interface LogMetadata {
  userId?: string;
  requestId?: string;
  path?: string;
  method?: string;
  statusCode?: number;
  error?: Error | ErrorMetadata;
  [key: string]: unknown;
}

export interface LoggerConfig {
  level?: LogLevel;
  file?: {
    filename: string;
    maxsize?: number;
    maxFiles?: number;
  };
}

const logFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  const metaString = Object.keys(metadata).length ? `\n${JSON.stringify(metadata, null, 2)}` : '';
  return `${timestamp} [${level.toUpperCase()}]: ${message}${metaString}`;
});

export class Logger {
  private static instance: winston.Logger;
  private static isInitialized = false;

  private constructor() {
    // Private constructor to prevent direct construction calls with 'new'
  }

  public static initialize(config: LoggerConfig = {}): void {
    if (Logger.isInitialized) {
      return;
    }

    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          logFormat
        ),
      }),
    ];

    if (config.file) {
      transports.push(
        new winston.transports.File({
          filename: config.file.filename,
          maxsize: config.file.maxsize || 5242880, // 5MB
          maxFiles: config.file.maxFiles || 5,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            logFormat
          ),
        })
      );
    }

    Logger.instance = winston.createLogger({
      level: config.level || env.LOG_LEVEL,
      transports,
      exitOnError: false,
    });

    Logger.isInitialized = true;
  }

  private static ensureInitialized(): void {
    if (!Logger.isInitialized) {
      Logger.initialize();
    }
  }

  private static formatError(error: Error): ErrorMetadata {
    const formattedError: ErrorMetadata = {
      message: error.message,
      name: error.name,
      stack: error.stack,
    };

    // Add any additional properties from the error object
    Object.getOwnPropertyNames(error).forEach((key) => {
      if (!formattedError[key]) {
        formattedError[key] = (error as unknown as Record<string, unknown>)[key];
      }
    });

    return formattedError;
  }

  public static error(message: string, metadata: LogMetadata = {}): void {
    Logger.ensureInitialized();
    const logMetadata = { ...metadata };
    if (metadata.error instanceof Error) {
      logMetadata.error = Logger.formatError(metadata.error);
    }
    Logger.instance.error(message, logMetadata);
  }

  public static warn(message: string, metadata: LogMetadata = {}): void {
    Logger.ensureInitialized();
    Logger.instance.warn(message, metadata);
  }

  public static info(message: string, metadata: LogMetadata = {}): void {
    Logger.ensureInitialized();
    Logger.instance.info(message, metadata);
  }

  public static debug(message: string, metadata: LogMetadata = {}): void {
    Logger.ensureInitialized();
    Logger.instance.debug(message, metadata);
  }

  public static child(metadata: LogMetadata): winston.Logger {
    Logger.ensureInitialized();
    return Logger.instance.child(metadata);
  }
}

// Create log directory if it doesn't exist
const logDir = process.env.LOG_FILE_PATH || 'logs';
if (!require('fs').existsSync(logDir)) {
  require('fs').mkdirSync(logDir);
}

export default Logger;
