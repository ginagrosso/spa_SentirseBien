'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { ClockIcon, CalendarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { apiRequest } from '../../lib/apiClient';
import { createTurno, TurnoPayload } from '../../lib/turnos.api';

interface Service {
  _id: string;
  name: string;
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
}