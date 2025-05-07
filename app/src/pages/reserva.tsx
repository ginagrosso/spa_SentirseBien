// src/pages/reserva.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import TurnosLayout from '../components/turnos/TurnosLayout';
import TurnoForm from '../components/turnos/TurnoForm';

// Define proper type for the form data
interface TurnoFormData {
    userId: string;
    serviceId: string;
    date: string;
}

export default function ReservaPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNuevoTurnoAction = async (formData: TurnoFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al crear la reserva');
            }

            router.push('/turnos');
        } catch (error) {
            console.error('Error al reservar turno:', error);
            setError(error instanceof Error ? error.message : 'Ocurrió un error al procesar la reserva');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TurnosLayout
            title="Reservar un turno"
            description="Elige servicio y fecha"
        >
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <TurnoForm
                onCreateAction={handleNuevoTurnoAction}
            />
        </TurnosLayout>
    );
}