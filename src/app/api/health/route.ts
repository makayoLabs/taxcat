import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(): Promise<NextResponse> {
  const services: any = {
    api: 'healthy'
  };

  let databaseHealthy = false;

  try {
    // Check database connectivity (optional for development)
    await prisma.$queryRaw`SELECT 1`;
    services.database = 'healthy';
    databaseHealthy = true;
  } catch (error) {
    console.warn('Database not available:', error instanceof Error ? error.message : 'Unknown error');
    services.database = 'unavailable';
  }

  // Check Redis connectivity (if implemented)
  // try {
  //   await redis.ping();
  //   services.redis = 'healthy';
  // } catch (error) {
  //   services.redis = 'unavailable';
  // }

  const overallStatus = databaseHealthy ? 'healthy' : 'degraded';

  const healthCheck = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV,
    services
  };

  return NextResponse.json(healthCheck, { status: overallStatus === 'healthy' ? 200 : 200 }); // Return 200 even for degraded
}
