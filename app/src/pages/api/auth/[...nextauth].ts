import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { User } from '@/models/User';
import dbConnect from '@/lib/dbConnect';

declare module 'next-auth/jwt' {
    interface JWT {
        role: 'user' | 'admin';
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
                    // Ensure MongoDB connection is established
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
                        role: user.role
                    };
                } catch (error) {
                    console.error('Authentication error:', error);
                    throw error;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                (token as any).role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error'
    }
}); 