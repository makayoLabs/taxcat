import { captureMessage } from './sentry';
import { Gauge, Histogram } from 'prom-client';

interface Operation {
  id: string;
  name: string;
  startTime: number;
  context?: Record<string, any>;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private operations: Map<string, Operation>;
  private readonly operationDuration: Histogram;
  private readonly activeOperations: Gauge;

  private constructor() {
    this.operations = new Map();

    // Initialize Prometheus metrics
    this.operationDuration = new Histogram({
      name: 'tax_operation_duration_seconds',
      help: 'Duration of tax operations in seconds',
      labelNames: ['operation', 'status'],
      buckets: [0.1, 0.5, 1, 2, 5, 10],
    });

    this.activeOperations = new Gauge({
      name: 'tax_active_operations',
      help: 'Number of active tax operations',
      labelNames: ['operation'],
    });
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public startOperation(name: string, context?: Record<string, any>): string {
    const id = Math.random().toString(36).substr(2, 9);
    const operation: Operation = {
      id,
      name,
      startTime: Date.now(),
      context,
    };

    this.operations.set(id, operation);
    this.activeOperations.inc({ operation: name });

    return id;
  }

  public endOperation(id: string, success: boolean, metrics?: Record<string, any>): void {
    const operation = this.operations.get(id);
    if (!operation) {
      return;
    }

    const duration = (Date.now() - operation.startTime) / 1000; // Convert to seconds
    const status = success ? 'success' : 'failure';

    // Record metrics
    this.operationDuration.observe({ operation: operation.name, status }, duration);
    this.activeOperations.dec({ operation: operation.name });

    // Log slow operations
    if (duration > 5) {
      // 5 seconds threshold
      captureMessage(`Slow operation detected: ${operation.name}`, 'warning');
    }

    this.operations.delete(id);
  }

  public getActiveOperations(): number {
    return this.operations.size;
  }

  public getOperationDuration(id: string): number | null {
    const operation = this.operations.get(id);
    if (!operation) {
      return null;
    }
    return (Date.now() - operation.startTime) / 1000;
  }

  public clearOperations(): void {
    this.operations.clear();
  }
}
