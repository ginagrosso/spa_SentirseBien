// src/pages/turnos.tsx
'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getTurnos, updateTurno, deleteTurno, Turno } from '../lib/turnosClient';

export default function MisTurnosPage() {
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTurnos()
            .then(setTurnos)
            .catch(err => toast.error(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Header />
            <main className="max-w-3xl mx-auto py-8 space-y-6">
                <h1 className="text-3xl font-bold">Mis Turnos</h1>

                {loading ? (
                    <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="h-20 bg-gray-200 rounded animate-pulse"
                            />
                        ))}
                    </div>
                ) : turnos.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No tienes turnos reservados aún.
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {turnos.map(t => (
                            <li
                                key={t._id}
                                className="p-4 bg-white rounded shadow-md flex justify-between items-center"
                            >
                                <div>
                                    <h2 className="font-semibold">{t.serviceData.name}</h2>
                                    <p className="text-sm text-gray-600">
                                        {new Date(t.date).toLocaleDateString()} ·{' '}
                                        {new Date(t.date).toLocaleTimeString()}
                                    </p>
                                    <span className="inline-block mt-1 px-2 py-0.5 text-xs uppercase bg-gray-100 text-gray-800 rounded">
                    {t.status}
                  </span>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => {
                                            const next = t.status === 'pendiente' ? 'confirmado' : 'cancelado';
                                            toast.promise(
                                                updateTurno(t._id, { status: next }),
                                                {
                                                    loading: 'Guardando…',
                                                    success: () => {
                                                        setTurnos(ts =>
                                                            ts.map(x => (x._id === t._id ? { ...x, status: next } : x))
                                                        );
                                                        return 'Estado actualizado';
                                                    },
                                                    error: e => `Error: ${e.message}`
                                                }
                                            );
                                        }}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        {t.status === 'pendiente' ? 'Confirmar' : 'Cancelar'}
                                    </button>
                                    <button
                                        onClick={() =>
                                            toast.promise(deleteTurno(t._id), {
                                                loading: 'Cancelando…',
                                                success: () => {
                                                    setTurnos(ts => ts.filter(x => x._id !== t._id));
                                                    return 'Turno eliminado';
                                                },
                                                error: e => `Error: ${e.message}`
                                            })
                                        }
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
            <Footer />
        </>
    );
}
