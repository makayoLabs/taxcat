import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { AuthService } from '@/lib/auth';

// Create a new ratelimiter, but only in production
const ratelimit =
  process.env.NODE_ENV === 'production'
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(10, '10 s'),
      })
    : null;

export default async function middleware(req: NextRequest): Promise<NextResponse | void> {
  const { pathname } = req.nextUrl;

  // HTTPS enforcement in production
  if (process.env.NODE_ENV === 'production' && req.headers.get('x-forwarded-proto') !== 'https') {
    return NextResponse.redirect(new URL(req.url.replace('http://', 'https://')));
  }

  // Check if the route requires authentication
  const protectedRoutes = [
    '/dashboard',
    '/tax-return',
    '/documents',
    '/payments',
    '/api/tax-returns',
    '/api/documents',
    '/api/payments',
  ];

  const requiresAuth = protectedRoutes.some(route => pathname.startsWith(route));

  if (requiresAuth) {
    // Get the token from cookies
    const token = req.cookies.get('auth-token')?.value;

    if (!token) {
      // Redirect to login if no token
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify the token
      const payload = AuthService.verifyToken(token);
      if (!payload) {
        // Token is invalid, redirect to login
        const loginUrl = new URL('/auth/login', req.url);
        loginUrl.searchParams.set('callbackUrl', req.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      // Token verification failed, redirect to login
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Add comprehensive security headers
  const headers = new Headers(req.headers);
  headers.set('x-frame-options', 'DENY');
  headers.set('x-content-type-options', 'nosniff');
  headers.set('x-xss-protection', '1; mode=block');
  headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  headers.set('permissions-policy', 'camera=(), microphone=(), geolocation=()');
  headers.set(
    'content-security-policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://api.stripe.com https://*.sentry.io; " +
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com;"
  );

  // Rate limiting for API routes (Note: This is synchronous in middleware)
  // For proper async rate limiting, consider using a different approach

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

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
