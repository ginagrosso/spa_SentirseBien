import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProtectedLayout from '@/components/ProtectedLayout';
import PageHero from '@/components/PageHero';
import TurnoList from '@/components/turnos/TurnoList';
import { getTurnos, updateTurno, deleteTurno, Turno } from '@/lib/turnos.api';

export default function TurnosPage() {
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
        <ProtectedLayout>
            <PageHero 
                title="Mis Turnos"
                description="Gestiona tus turnos y reservas de manera fácil y rápida."
            />

            <main className="bg-white font-roboto py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Lista de Turnos</h2>
                        <Link 
                            href="/turnos/reservar"
                            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Reservar Turno
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
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
                    </motion.div>
                </div>
            </main>
        </ProtectedLayout>
    );
} 