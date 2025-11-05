import { LoggerService } from '../core/logging/logger';

beforeAll(async () => {
  // Initialize logger with test configuration
  LoggerService.initialize({
    level: 'error',
    file: {
      filename: 'test.log',
      maxsize: 1024 * 1024, // 1MB
      maxFiles: 1,
    },
  });
});

afterAll(async () => {
  // Clean up logger
  await LoggerService.close();
});
