import NextAuth, { DefaultSession, AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { User } from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { getSession } from 'next-auth/react';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
    interface JWT {
        rol: 'user' | 'admin';
    }
}

declare module 'next-auth' {
    interface User {
        rol: 'user' | 'admin';
    }
    interface Session {
        user: {
            rol: 'user' | 'admin';
        } & DefaultSession['user']
    }
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email y contraseña son requeridos');
                }

                try {
                    await dbConnect();
                    
                    console.log('Searching for user with email:', credentials.email);
                    const user = await User.findOne({ email: credentials.email });
                    console.log('User found:', !!user);

                    if (!user) {
                        throw new Error('No existe una cuenta con este email');
                    }

                    const isValid = await compare(credentials.password, user.password);

                    if (!isValid) {
                        throw new Error('Contraseña incorrecta');
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        rol: user.rol
                    };
                } catch (error) {
                    console.error('Authentication error:', error);
                    throw error;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt' as const
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: any }) {
            if (user) {
                token.rol = user.rol;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            if (session?.user) {
                session.user.rol = token.rol;
            }
            return session;
        },
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            // Permitir redirecciones externas
            if (url.startsWith('http')) return url;
            // Permitir redirecciones internas
            if (url.startsWith('/')) return url;
            // Redirecciones por defecto
            return baseUrl;
        }
    },
    pages: {
        signIn: '/auth/signin'
    }
};

export default NextAuth(authOptions); 