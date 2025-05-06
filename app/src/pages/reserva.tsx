// src/pages/reserva.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservaTurno from '../components/ReservaTurno';

export default function ReservaPage() {
    const router = useRouter();

    const handleNuevoTurno = (_nuevo: any) => {
        router.push('/turnos');
    };

    return (
        <>
            <Header />
            <main className="max-w-2xl mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Reservar un turno</h1>
                <ReservaTurno onCreate={handleNuevoTurno} />
            </main>
            <Footer />
        </>
    );
}
