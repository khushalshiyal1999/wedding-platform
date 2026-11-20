import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const AUTH_COOKIE_NAME = 'wedding_admin_token';
const AUTH_SECRET = process.env.AUTH_SECRET || 'wedding_default_fallback_jwt_secret_key_32chars';
const secretKey = new TextEncoder().encode(AUTH_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  let isAuthenticated = false;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secretKey);
      if (payload && payload.adminId) {
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // Admin dashboard routes protection
  if (pathname.startsWith('/admin/dashboard')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect to dashboard if logged-in admin visits login page
  if (pathname === '/admin/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/login'],
};
