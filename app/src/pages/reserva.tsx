// src/pages/reserva.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TurnosLayout from '../components/turnos/TurnosLayout';
import TurnoForm from '../components/turnos/TurnoForm';

export default function ReservaPage() {
    const router = useRouter();

    // Debe acabar en "Action" para cumplir con Next.js
    const handleNuevoTurnoAction = (_nuevo: any) => {
        router.push('/turnos');
    };

    return (
        <TurnosLayout
            title="Reservar un turno"
            description="Elige servicio y fecha"
        >
            <TurnoForm onCreateAction={handleNuevoTurnoAction} />
        </TurnosLayout>
    );
}
