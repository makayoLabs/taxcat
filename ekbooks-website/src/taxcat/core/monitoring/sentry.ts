import * as Sentry from '@sentry/nextjs';

export const initSentry = (): void => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express(),
      ],
    });
  }
};

export const captureError = (error: Error, context?: Record<string, any>): void => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      extra: context,
    });
  } else {
    console.error('Error:', error, 'Context:', context);
  }
};

export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info'): void => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureMessage(message, {
      level,
    });
  } else {
    console.log(`[${level}] ${message}`);
  }
};
