'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import servicios, { CategoriaServicios, Servicio } from '../../data/servicios';
import { createTurno, TurnoPayload } from '../../lib/turnos.api';

interface TurnoFormProps {
    /** Debe acabar en “Action” para ser válido en Next.js “use client” */
    onCreateAction: (nuevo: any) => void;
}

export default function TurnoForm({ onCreateAction }: TurnoFormProps) {
    const [services, setServices] = useState<{ _id: string; name: string }[]>([]);
    const [selectedService, setSelectedService] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Aplanamos todas las categorías y sus servicios
        const mapped = servicios.flatMap((cat: CategoriaServicios) =>
            cat.services.map((s: Servicio) => ({
                _id: s.name,   // aquí usamos el nombre como identificador
                name: s.name
            }))
        );
        setServices(mapped);
    }, []);

    const canSubmit = !!selectedService && !!date && !loading;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit || !date) return;
        setLoading(true);
        try {
            const payload: TurnoPayload = {
                service: selectedService,
                date: date.toISOString(),
            };
            const nuevo = await createTurno(payload);
            toast.success('Turno reservado con éxito');
            onCreateAction(nuevo);
        } catch {
            toast.error('Error al reservar turno');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="service" className="block text-sm font-medium mb-1">
                    Servicio
                </label>
                <select
                    id="service"
                    value={selectedService}
                    onChange={e => setSelectedService(e.target.value)}
                    className="w-full border border-stone rounded p-2"
                >
                    <option value="">Seleccione un servicio</option>
                    {services.map(s => (
                        <option key={s._id} value={s._id}>
                            {s.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">
                    Fecha y hora
                </label>
                <DatePicker
                    id="date"
                    selected={date}
                    onChange={d => setDate(d)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="Pp"
                    className="w-full border border-stone rounded p-2"
                    minDate={new Date()}
                />
            </div>

            <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full py-2 rounded text-white ${
                    canSubmit ? 'bg-primary hover:bg-primary/80' : 'bg-stone cursor-not-allowed'
                }`}
            >
                Reservar turno
            </button>
        </form>
    );
}
