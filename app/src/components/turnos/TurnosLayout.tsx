// src/components/turnos/TurnosLayout.tsx
'use client';

import React, { ReactNode } from 'react';
<<<<<<< HEAD
=======
import Header from '../Header';
import Footer from '../Footer';
>>>>>>> origin/feature/adminpage
import PageHero from '../PageHero';

interface TurnosLayoutProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export default function TurnosLayout({ title, description, children }: TurnosLayoutProps) {
    return (
        <>
<<<<<<< HEAD
=======
            <Header />
>>>>>>> origin/feature/adminpage
            <PageHero title={title} description={description || ''} />
            <main className="max-w-2xl mx-auto py-8">
                {children}
            </main>
<<<<<<< HEAD
=======
            <Footer />
>>>>>>> origin/feature/adminpage
        </>
    );
}
