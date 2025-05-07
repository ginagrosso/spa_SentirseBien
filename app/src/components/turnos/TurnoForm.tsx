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
  } = useForm<ITurno>({
    resolver: zodResolver(turnoSchema),
    defaultValues: {
      userId: session?.user?.id || '',
      serviceId: '',
      professionalId: '',
      date: '',
      time: ''
    }
  });

  const selectedService = watch('serviceId');
  const selectedProfessional = watch('professionalId');

  useEffect(() => {
    if (selectedDate) {
      // Aquí iría la lógica para obtener los horarios disponibles
      // basado en la fecha seleccionada y los turnos existentes
      const slots = getAvailableTimeSlots(selectedDate, existingAppointments);
      setAvailableTimeSlots(slots);
    }
  }, [selectedDate, existingAppointments]);

  const handleServiceChange = (serviceId: string) => {
    setValue('serviceId', serviceId);
    // Resetear otros campos cuando cambia el servicio
    setValue('professionalId', '');
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  const handleSubmitForm = async (data: ITurno) => {
    if (!selectedDate || !selectedTimeSlot) return;

    setLoading(true);
    try {
      const turnoData = {
        ...data,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTimeSlot
      };
      await onSubmit(turnoData);
      router.push('/turnos');
    } catch (error) {
      console.error('Error al crear el turno:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Servicio</label>
        <select
          {...register('serviceId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="">Seleccione un servicio</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.serviceId && (
          <p className="mt-1 text-sm text-red-600">{errors.serviceId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Profesional</label>
        <select
          {...register('professionalId')}
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
        {errors.professionalId && (
          <p className="mt-1 text-sm text-red-600">{errors.professionalId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha</label>
        <Calendar
          selected={selectedDate}
          onChange={setSelectedDate}
          minDate={new Date()}
          disabled={!selectedProfessional}
        />
      </div>

      {selectedDate && availableTimeSlots.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Horario</label>
          <TimeSlots
            slots={availableTimeSlots}
            selectedSlot={selectedTimeSlot}
            onSelect={setSelectedTimeSlot}
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