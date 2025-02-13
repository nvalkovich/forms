import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = request.cookies.get('session')?.value;

    const isProtectedRoute = pathname.startsWith('/profile');

    const isAuthRoute =
        pathname.startsWith('/auth/login') ||
        pathname.startsWith('/auth/register');

    if (!session && isProtectedRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (session && isAuthRoute) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/', '/(ru|en)/:path*'],
};
