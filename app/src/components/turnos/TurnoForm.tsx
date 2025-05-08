'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { validations } from '@/lib/validations';
import { ClockIcon, CalendarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { apiRequest } from '../../lib/apiClient';
import { createTurno, TurnoPayload } from '../../lib/turnos.api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { turnoSchema } from '@/lib/validations';
import { ITurno } from '@/types/turno';
import { IService } from '@/types/service';
import { IProfessional } from '@/types/professional';
import Calendar from '@/components/ui/Calendar';
import TimeSlots from '@/components/ui/TimeSlots';

interface Service {
  _id: string;
  name: string;
  duration: number;
  price: number;
}

interface Professional {
  _id: string;
  name: string;
}

interface HorarioDisponible {
  startTime: string;
  endTime: string;
}

interface TurnoFormProps {
    onSubmit: (data: ITurno) => Promise<void>;
    services: IService[];
    professionals: IProfessional[];
    existingAppointments: ITurno[];
}

export default function TurnoForm({ onSubmit, services, professionals, existingAppointments }: TurnoFormProps) {
    const { data: session } = useSession();
    const router = useRouter();
    
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
    const [selectedService, setSelectedService] = React.useState<IService | null>(null);
    const [filteredProfessionals, setFilteredProfessionals] = React.useState<IProfessional[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<ITurno>({
        resolver: zodResolver(turnoSchema)
    });

    // Filtrar profesionales según el servicio seleccionado
    React.useEffect(() => {
        if (selectedService) {
            const filtered = professionals.filter(prof =>
                prof.specialties.includes(selectedService._id)
            );
            setFilteredProfessionals(filtered);
        } else {
            setFilteredProfessionals([]);
        }
    }, [selectedService, professionals]);

    // Actualizar valores del formulario cuando se seleccionan fecha y hora
    React.useEffect(() => {
        if (selectedDate && selectedTime) {
            setValue('fecha', format(selectedDate, 'yyyy-MM-dd'));
            setValue('hora', selectedTime);
        }
    }, [selectedDate, selectedTime, setValue]);

    const handleServiceChange = (serviceId: string) => {
        const service = services.find(s => s._id === serviceId);
        setSelectedService(service || null);
        setValue('servicio', serviceId);
        setValue('profesional', '');
    };

    const handleSubmitForm = async (data: ITurno) => {
        try {
            setIsSubmitting(true);
            await onSubmit(data);
            // Resetear el formulario
            setSelectedDate(null);
            setSelectedTime(null);
            setSelectedService(null);
            setValue('servicio', '');
            setValue('profesional', '');
            setValue('notas', '');
        } catch (error) {
            console.error('Error al crear el turno:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!session) {
        return (
            <div className="text-center py-8 text-gray-500">
                Debes iniciar sesión para reservar un turno
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Selecciona un Servicio
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map(service => (
                        <button
                            key={service._id}
                            type="button"
                            onClick={() => handleServiceChange(service._id)}
                            className={`
                                p-4 rounded-lg border-2 text-left
                                ${selectedService?._id === service._id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300'
                                }
                            `}
                        >
                            <h4 className="font-medium text-gray-900">{service.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                            <div className="mt-2 flex justify-between items-center">
                                <span className="text-blue-600 font-medium">
                                    ${service.price}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {service.duration} min
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
                {errors.servicio && (
                    <p className="mt-2 text-sm text-red-600">{errors.servicio.message}</p>
                )}
            </div>

            {selectedService && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Selecciona un Profesional
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProfessionals.map(professional => (
                            <button
                                key={professional._id}
                                type="button"
                                onClick={() => setValue('profesional', professional._id)}
                                className={`
                                    p-4 rounded-lg border-2 text-left
                                    ${watch('profesional') === professional._id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300'
                                    }
                                `}
                            >
                                <h4 className="font-medium text-gray-900">{professional.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">{professional.specialties.join(', ')}</p>
                            </button>
                        ))}
                    </div>
                    {errors.profesional && (
                        <p className="mt-2 text-sm text-red-600">{errors.profesional.message}</p>
                    )}
                </div>
            )}

            {selectedService && watch('profesional') && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Selecciona Fecha y Hora
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Calendar
                                selectedDate={selectedDate}
                                onSelectDate={setSelectedDate}
                                minDate={new Date()}
                            />
                        </div>
                        {selectedDate && (
                            <div>
                                <TimeSlots
                                    selectedDate={selectedDate}
                                    selectedTime={selectedTime}
                                    onSelectTime={setSelectedTime}
                                    existingAppointments={existingAppointments}
                                    serviceDuration={selectedService.duration}
                                />
                            </div>
                        )}
                    </div>
                    {(errors.fecha || errors.hora) && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.fecha?.message || errors.hora?.message}
                        </p>
                    )}
                </div>
            )}

            {selectedDate && selectedTime && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Información Adicional
                    </h3>
                    <div>
                        <label htmlFor="notas" className="block text-sm font-medium text-gray-700">
                            Notas (opcional)
                        </label>
                        <textarea
                            id="notas"
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            {...register('notas')}
                        />
                    </div>
                </div>
            )}

            {selectedDate && selectedTime && (
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                            px-6 py-3 rounded-lg text-white font-medium
                            ${isSubmitting
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                            }
                        `}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Reservando...
                            </span>
                        ) : (
                            'Reservar Turno'
                        )}
                    </button>
                </div>
            )}
        </form>
    );
}