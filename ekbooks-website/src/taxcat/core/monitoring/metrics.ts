import * as client from 'prom-client';

// Create a Registry
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'taxcat',
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Custom metrics
export const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

export const taxCalculationDurationSeconds = new client.Histogram({
  name: 'tax_calculation_duration_seconds',
  help: 'Duration of tax calculations in seconds',
  labelNames: ['type', 'year'],
  buckets: [0.1, 0.5, 1, 2, 5, 10],
});

export const activeUsers = new client.Gauge({
  name: 'taxcat_active_users',
  help: 'Number of active users',
});

export const taxReturnsProcessed = new client.Counter({
  name: 'tax_returns_processed_total',
  help: 'Total number of tax returns processed',
  labelNames: ['type', 'status'],
});

export const documentUploads = new client.Counter({
  name: 'document_uploads_total',
  help: 'Total number of documents uploaded',
  labelNames: ['type', 'status'],
});

// Register custom metrics
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(taxCalculationDurationSeconds);
register.registerMetric(activeUsers);
register.registerMetric(taxReturnsProcessed);
register.registerMetric(documentUploads);

export { register };
