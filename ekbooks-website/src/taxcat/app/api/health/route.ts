import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(): Promise<NextResponse> {
  try {
    // Check database connectivity
    await prisma.$queryRaw`SELECT 1`;
    
    // Check Redis connectivity (if implemented)
    // await redis.ping();
    
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      services: {
        database: 'healthy',
        // redis: 'healthy',
        api: 'healthy'
      }
    };
    
    return NextResponse.json(healthCheck, { status: 200 });
  } catch (_error) =>
    console.error('Health check failed:', error);
    
    const healthCheck = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    
    return NextResponse.json(healthCheck, { status: 503 });
  }
}
