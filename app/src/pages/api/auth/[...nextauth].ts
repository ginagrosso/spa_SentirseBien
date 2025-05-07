import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { User } from '@/models/User';
import dbConnect from '@/lib/dbConnect';

declare module 'next-auth' {
    interface User {
        rol: string;
    }
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            rol: string;
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        rol: string;
    }
}

export default NextAuth({
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
                    const user = await User.findOne({ email: credentials.email }).select('+password');
                    console.log('User found:', !!user);
                    console.log('User data:', JSON.stringify(user, null, 2));

                    if (!user) {
                        throw new Error('No existe una cuenta con este email');
                    }

                    const isValid = await compare(credentials.password, user.password);

                    if (!isValid) {
                        throw new Error('Contraseña incorrecta');
                    }

                    const userData = {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.nombre,
                        rol: user.rol || 'user'
                    };

                    console.log('Returning user data:', userData);
                    return userData;
                } catch (error) {
                    console.error('Authentication error:', error);
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.rol = user.rol;
                console.log('JWT Callback - Setting rol from user:', user.rol);
            }
            console.log('JWT Callback - Final token:', token);
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.rol = token.rol;
                console.log('Session Callback - Setting rol from token:', token.rol);
            }
            console.log('Session Callback - Final session:', session);
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 días
    },
    debug: true
}); 