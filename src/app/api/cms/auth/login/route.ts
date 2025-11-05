import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { email, password } = await request.json();

    // In production, validate against your database
    // This is just a simple example
    if (email === process.env.CMS_ADMIN_EMAIL && password === process.env.CMS_ADMIN_PASSWORD) {
      // Set a secure cookie with the auth token
      const cookieStore = cookies();
      cookieStore.set('auth-token', 'your-secure-token-here', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('CMS login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
