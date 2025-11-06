import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Express } from 'express';
import { captureError } from '../monitoring/sentry';

export const configureSecurityMiddleware = (app: Express): void => {
  // Basic security headers
  app.use(helmet());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    handler: (req, res) => {
      captureError(new Error('Rate limit exceeded'), {
        ip: req.ip,
        path: req.path,
      });
      res.status(429).json({
        error: 'Too many requests, please try again later.',
      });
    },
  });

  // Apply rate limiting to all routes
  app.use('/api/', limiter);

  // CORS configuration
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
  });

  // XSS Protection
  app.use(helmet.xssFilter());

  // Prevent clickjacking
  app.use(helmet.frameguard({ action: 'deny' }));

  // Hide X-Powered-By header
  app.use(helmet.hidePoweredBy());

  // Strict Transport Security
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    })
  );

  // Content Security Policy
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://api.taxcat.ca'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    })
  );

  // Error handling middleware
  app.use((err: Error, req: any, res: any, next: any) => {
    captureError(err, {
      path: req.path,
      method: req.method,
      query: req.query,
      body: req.body,
    });

    res.status(500).json({
      error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message,
    });
  });
};
