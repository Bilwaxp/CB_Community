import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

// Routes that require authentication
const protectedRoutes = ['/dashboard'];

// Routes that require admin role
const adminRoutes = ['/admin'];

// Routes that should redirect to dashboard if already logged in
const authRoutes = ['/login', '/register', '/forgot-password'];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = (req.auth?.user as any)?.role === 'ADMIN';
  const userStatus = (req.auth?.user as any)?.status;

  // Check if accessing protected route without auth
  if (protectedRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`, nextUrl)
      );
    }

    // Check if user is approved (email must be verified)
    if (userStatus === 'PENDING') {
      return NextResponse.redirect(new URL('/verify-email?error=pending_verification', nextUrl));
    }

    if (userStatus === 'BANNED') {
      return NextResponse.redirect(new URL('/account-suspended', nextUrl));
    }
  }

  // Check if accessing admin route without admin role
  if (adminRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', nextUrl));
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }
  }

  // Redirect logged in users away from auth pages
  if (isLoggedIn && authRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|).*)',
  ],
};




