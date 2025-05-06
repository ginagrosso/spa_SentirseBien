// src/components/ReservaTurno.tsx
'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import servicios from '../data/servicios';
import { createTurno, TurnoPayload } from '../lib/turnosClient';

interface Props {
    onCreate: (nuevo: any) => void;
}

export default function ReservaTurno({ onCreate }: Props) {
    const [services, setServices] = useState<{ _id: string; name: string }[]>([]);
    const [date, setDate] = useState<Date | null>(null);
    const [service, setService] = useState<string>('');

    useEffect(() => {
        const list = servicios.flatMap(cat =>
            cat.services.map((s, idx) => ({
                _id: `${cat.anchor}-${idx}`,
                name: s.name
            }))
        );
        setServices(list);
    }, []);

    const canSubmit = !!date && !!service;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        toast.promise(
            createTurno({ date: date!.toISOString(), service }),
            {
                loading: 'Reservando turno…',
                success: t => {
                    onCreate(t);
                    return 'Turno reservado 🎉';
                },
                error: err => `Error: ${err.message}`
            }
        );
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4"
        >
            <div>
                <label className="block text-gray-700 mb-1">Fecha</label>
                <DatePicker
                    selected={date}
                    onChange={d => setDate(d)}
                    dateFormat="dd/MM/yyyy"
                    className="w-full px-3 py-2 border rounded"
                    placeholderText="Selecciona día"
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Hora</label>
                <DatePicker
                    selected={date}
                    onChange={d => setDate(d)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Hora"
                    dateFormat="h:mm aa"
                    className="w-full px-3 py-2 border rounded"
                    placeholderText="Selecciona hora"
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Servicio</label>
                <select
                    value={service}
                    onChange={e => setService(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                >
                    <option value="">-- selecciona --</option>
                    {services.map(s => (
                        <option key={s._id} value={s._id}>
                            {s.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full py-2 rounded text-white ${
                    canSubmit ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
                Reservar turno
            </button>
        </form>
    );
}

