// This route is no longer needed since we switched to custom JWT authentication
// The authentication is now handled by /api/auth/login and /api/auth/register

export async function GET() {
  return new Response('NextAuth route disabled - use /api/auth/login or /api/auth/register', { status: 410 });
}

export async function POST() {
  return new Response('NextAuth route disabled - use /api/auth/login or /api/auth/register', { status: 410 });
}
