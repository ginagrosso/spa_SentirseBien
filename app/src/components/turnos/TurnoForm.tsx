'use client';

import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
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
=======
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { ClockIcon, CalendarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { apiRequest } from '../../lib/apiClient';
import { createTurno, TurnoPayload } from '../../lib/turnos.api';
>>>>>>> origin/feature/adminpage

interface Service {
  _id: string;
  name: string;
<<<<<<< HEAD
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
=======
  description?: string;
}

interface TurnoFormProps {
  onCreateAction: (nuevo: any) => void;
}

export default function TurnoForm({ onCreateAction }: TurnoFormProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingServices, setFetchingServices] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      setFetchingServices(true);
      try {
        const response = await apiRequest('/api/services');
        const data = await response.json();
        if (response.ok) {
          setServices(data);
        } else {
          setError('Error al cargar servicios');
          toast.error('No se pudieron cargar los servicios');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Error de conexión');
        toast.error('Error de conexión al servidor');
      } finally {
        setFetchingServices(false);
      }
    };

    fetchServices();
  }, []);

  const filterTimeOptions = (time: Date) => {
    const hour = time.getHours();
    return hour >= 8 && hour < 20;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !date) return;

    setLoading(true);
    try {
      const payload: TurnoPayload = {
        service: selectedService,
        date: date.toISOString(),
      };
      const nuevo = await createTurno(payload);
      toast.success('Turno reservado con éxito');
      onCreateAction(nuevo);

      // Reset form
      setSelectedService('');
      setDate(null);
    } catch (err) {
      console.error('Error creating appointment:', err);
      toast.error('Error al reservar turno');
    } finally {
      setLoading(false);
    }
  };

  const getServiceById = (id: string) => {
    return services.find(s => s._id === id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reserva tu turno</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">
            Servicio
          </label>
          <div className="relative">
            <SparklesIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              id="service"
              value={selectedService}
              onChange={e => setSelectedService(e.target.value)}
              className="pl-10 w-full py-2.5 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
              disabled={fetchingServices}
            >
              <option value="">Seleccione un servicio</option>
              {services.map(s => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          {selectedService && getServiceById(selectedService)?.description && (
            <p className="text-sm text-gray-500 mt-1">{getServiceById(selectedService)?.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Fecha y hora (8:00 - 20:00)
          </label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <DatePicker
              id="date"
              selected={date}
              onChange={d => setDate(d)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="dd/MM/yyyy HH:mm"
              timeCaption="Hora"
              className="pl-10 w-full py-2.5 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
              minDate={new Date()}
              placeholderText="Seleccione fecha y hora"
              filterTime={filterTimeOptions}
              popperPlacement="bottom"
              // Remove popperModifiers or use type assertion if needed
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedService || !date || loading}
          className={`w-full flex items-center justify-center py-3 px-4 rounded-md text-white font-medium transition-all ${
            !selectedService || !date || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary/90 active:scale-[0.98] shadow-md'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </>
          ) : (
            <>
              <ClockIcon className="h-5 w-5 mr-2" />
              Reservar turno
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-500">
        <p className="flex items-center">
          <ClockIcon className="h-4 w-4 mr-1" />
          Horario de atención: 8:00 - 20:00
        </p>
      </div>
    </div>
  );
>>>>>>> origin/feature/adminpage
}