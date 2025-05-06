// src/components/turnos/TurnosLayout.tsx
'use client';

import React, { ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PageHero from '../PageHero';

interface TurnosLayoutProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export default function TurnosLayout({ title, description, children }: TurnosLayoutProps) {
    return (
        <>
            <Header />
            <PageHero title={title} description={description || ''} />
            <main className="max-w-2xl mx-auto py-8">
                {children}
            </main>
            <Footer />
        </>
    );
}
