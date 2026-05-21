import { NextResponse } from 'next/server';

export function middleware(req) {
  const sessionCookie = req.cookies.get('userSession')?.value;
  const { pathname } = req.nextUrl;

  const authRoutes = ['/login', '/register'];
  const protectedPrefixes = [
    { prefix: '/admin', role: 'admin' },
    { prefix: '/seller', role: 'seller' },
    { prefix: '/buyer', role: 'buyer' },
  ];

  let session = null;
  if (sessionCookie) {
    try {
      session = JSON.parse(decodeURIComponent(sessionCookie));
    } catch(e) {}
  }

  const isAuthenticated = !!session;
  const userRole = session?.role;

  if (authRoutes.some(route => pathname.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  for (const { prefix, role } of protectedPrefixes) {
    if (pathname.startsWith(prefix)) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
      if (userRole !== role && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/buyer/:path*', '/login', '/register'],
};
