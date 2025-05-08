'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { format, parse, isBefore, addMinutes } from 'date-fns';
import { es } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { turnoSchema } from '@/lib/validations';
import { ITurno } from '@/types/turno';
import { IService } from '@/types/service';
import { IProfessional } from '@/types/professional';
import { HORARIO_INICIO, HORARIO_FIN } from '@/types/constants';
import Calendar from '@/components/ui/Calendar';
import TimeSlots from '@/components/ui/TimeSlots';
import { toast } from 'react-hot-toast';

interface TurnoFormProps {
    onSubmit: (data: TurnoFormData) => Promise<void>;
    services: IService[];
    professionals: IProfessional[];
    existingAppointments: ITurno[];
}

interface HorarioDisponible {
    hora: string;
    disponible: boolean;
}

interface TurnoFormData {
    userId: string;
    service: string;
    professional: string;
    fecha: string;
    hora: string;
    duration: number;
    status: 'pendiente' | 'confirmado' | 'cancelado' | 'completado';
    notas?: string;
}

export default function TurnoForm({ onSubmit, services, professionals, existingAppointments }: TurnoFormProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableTimeSlots, setAvailableTimeSlots] = useState<HorarioDisponible[]>([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<TurnoFormData>({
        resolver: zodResolver(turnoSchema),
        defaultValues: {
            userId: session?.user?.id || '',
            service: '',
            professional: '',
            fecha: '',
            hora: '',
            duration: 60,
            status: 'pendiente'
        }
    });

    const selectedService = watch('service');
    const selectedProfessional = watch('professional');

    useEffect(() => {
        if (selectedDate) {
            const slots = getAvailableTimeSlots(selectedDate, existingAppointments);
            setAvailableTimeSlots(slots);
        }
    }, [selectedDate, existingAppointments]);

    const handleServiceChange = (serviceId: string) => {
        setValue('service', serviceId);
        setValue('professional', '');
        setSelectedDate(null);
        setSelectedTimeSlot(null);
    };

    const getAvailableTimeSlots = (date: Date, appointments: ITurno[]): HorarioDisponible[] => {
        const slots: HorarioDisponible[] = [];
        const startTime = parse(HORARIO_INICIO, 'HH:mm', new Date());
        const endTime = parse(HORARIO_FIN, 'HH:mm', new Date());
        
        let currentTime = startTime;
        while (isBefore(currentTime, endTime)) {
            const timeStr = format(currentTime, 'HH:mm');
            const isAvailable = !appointments.some(app => 
                app.fecha === format(date, 'yyyy-MM-dd') && 
                app.hora === timeStr && 
                app.status !== 'cancelado'
            );
            
            slots.push({
                hora: timeStr,
                disponible: isAvailable
            });
            
            currentTime = addMinutes(currentTime, 30);
        }
        
        return slots;
    };

    const handleSubmitForm = async (data: TurnoFormData) => {
        if (!selectedDate || !selectedTimeSlot) return;

        setLoading(true);
        try {
            const selectedServiceObj = services.find(s => s._id === data.service);
            const selectedProfessionalObj = professionals.find(p => p._id === data.professional);

            if (!selectedServiceObj || !selectedProfessionalObj) {
                throw new Error('Servicio o profesional no encontrado');
            }

            const turnoData: ITurno = {
                ...data,
                service: selectedServiceObj,
                professional: selectedProfessionalObj,
                fecha: format(selectedDate, 'yyyy-MM-dd'),
                hora: selectedTimeSlot,
                _id: '', // This will be set by the server
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const response = await fetch('/api/turnos/reservar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(turnoData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error al crear el turno');
            }

            await onSubmit(data);
            router.push('/turnos');
        } catch (error) {
            console.error('Error al crear el turno:', error);
            toast.error(error instanceof Error ? error.message : 'Error al crear el turno');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Servicio</label>
                <select
                    {...register('service')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                >
                    <option value="">Seleccione un servicio</option>
                    {services.map((service) => (
                        <option key={service._id} value={service._id}>
                            {service.name}
                        </option>
                    ))}
                </select>
                {errors.service && (
                    <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Profesional</label>
                <select
                    {...register('professional')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    disabled={!selectedService}
                >
                    <option value="">Seleccione un profesional</option>
                    {professionals.map((professional) => (
                        <option key={professional._id} value={professional._id}>
                            {professional.name}
                        </option>
                    ))}
                </select>
                {errors.professional && (
                    <p className="mt-1 text-sm text-red-600">{errors.professional.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                <Calendar
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    minDate={new Date()}
                />
            </div>

            {selectedDate && availableTimeSlots.length > 0 && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Horario</label>
                    <TimeSlots
                        selectedDate={selectedDate!}
                        selectedTime={selectedTimeSlot}
                        onSelectTime={setSelectedTimeSlot}
                        existingAppointments={existingAppointments}
                        serviceDuration={60}
                    />
                </div>
            )}

            <button
                type="submit"
                disabled={loading || !selectedDate || !selectedTimeSlot}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
                {loading ? 'Procesando...' : 'Reservar turno'}
            </button>
        </form>
    );
}