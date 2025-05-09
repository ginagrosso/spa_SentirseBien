import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');

    // Si está en página de auth y está autenticado, redirigir al dashboard
    if (isAuthPage && isAuth) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    // Si no está autenticado y no está en página de auth, redirigir al login
    if (!isAuth && !isAuthPage) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // Si está autenticado y accede a ruta admin, verificar rol
    if (isAuth && req.nextUrl.pathname.startsWith('/admin')) {
        if (token.rol !== 'admin') {
            return NextResponse.redirect(new URL('/auth/signin', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/auth/:path*']
}; 