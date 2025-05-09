// src/pages/_app.tsx
<<<<<<< HEAD
import '@/styles/globals.css';
=======
import '../styles/globals.css';
>>>>>>> origin/feature/adminpage
import '@fontsource/roboto';
import '@fontsource/amiri';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';
<<<<<<< HEAD
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <AuthProvider>
                <div className="min-h-screen flex flex-col bg-gray-50">
                    <Header />
                    <main className="flex-grow pt-20">
                        <Component {...pageProps} />
                    </main>
                    <Footer />
                </div>
                <Toaster position="top-right" />
            </AuthProvider>
        </SessionProvider>
=======

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <Toaster position="top-right" />
        </AuthProvider>
>>>>>>> origin/feature/adminpage
    );
}
