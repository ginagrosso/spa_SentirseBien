// src/pages/_app.tsx
import '@/styles/globals.css';
import '@fontsource/roboto';
import '@fontsource/amiri';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-grow pt-20">
                    <Component {...pageProps} />
                </main>
                <Footer />
            </div>
            <Toaster position="top-right" />
        </SessionProvider>
    );
}
