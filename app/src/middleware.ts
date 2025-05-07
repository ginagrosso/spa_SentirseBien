import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        // Verificar si el usuario tiene el rol necesario para acceder a la ruta
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Rutas que requieren rol de admin
        if (path.startsWith('/admin') && token?.rol !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
);

export const config = {
    matcher: [
        '/turnos/:path*',
        '/admin/:path*',
        '/perfil/:path*'
    ]
}; 