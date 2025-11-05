import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create a new ratelimiter, but only in production
const ratelimit =
  process.env.NODE_ENV === 'production'
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(10, '10 s'),
      })
    : null;

export default withAuth(
  function middleware(req): void {
    // Add security headers
    const headers = new Headers(req.headers);
    headers.set('x-frame-options', 'DENY');
    headers.set('x-content-type-options', 'nosniff');
    headers.set('x-xss-protection', '1; mode=block');
    headers.set(
      'content-security-policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    );

    return NextResponse.next({
      request: {
        headers,
      },
    });
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/auth/login',
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/tax-return/:path*',
    '/documents/:path*',
    '/payments/:path*',
    '/api/tax-returns/:path*',
    '/api/documents/:path*',
    '/api/payments/:path*',
  ],
};
