// src/pages/turnos.tsx
'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import TurnosLayout from '../components/turnos/TurnosLayout';
import TurnoList from '../components/turnos/TurnoList';
import { getTurnos, updateTurno, deleteTurno, Turno } from '../lib/turnos.api';

export default function MisTurnosPage() {
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await getTurnos();
                setTurnos(data);
            } catch {
                toast.error('Error cargando turnos');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleUpdate = async (
        id: string,
        payload: Partial<Pick<Turno, 'status'>>
    ) => {
        try {
            const updated = await updateTurno(id, payload);
            setTurnos(prev =>
                prev.map(t => (t._id === id ? updated : t))
            );
            toast.success('Turno actualizado');
        } catch {
            toast.error('Error al actualizar turno');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTurno(id);
            setTurnos(prev => prev.filter(t => t._id !== id));
            toast.success('Turno eliminado');
        } catch {
            toast.error('Error al eliminar turno');
        }
    };

    return (
        <TurnosLayout
            title="Mis turnos"
            description="Gestiona tus reservas"
        >
            {loading ? (
                <p className="text-center">Cargando turnos…</p>
            ) : (
                <TurnoList
                    turnos={turnos}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            )}
        </TurnosLayout>
    );
}
