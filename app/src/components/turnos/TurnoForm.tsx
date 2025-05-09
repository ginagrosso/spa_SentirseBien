'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { IProfessional } from '@/types/professional';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { ClockIcon, CalendarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { apiRequest } from '../../lib/apiClient';
import { createTurno, TurnoPayload } from '../../lib/turnos.api';

interface Service {
  _id: string;
  name: string;
  duration: number;
  price: number;
}

interface TurnoFormProps {
  services: Service[];
  professionals: IProfessional[];
}

export default function TurnoForm({ services, professionals }: TurnoFormProps) {
  const [formData, setFormData] = useState({
    servicio: '',
    profesional: '',
    fecha: '',
    hora: '',
    notas: ''
  });
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Si cambia la fecha o el profesional, actualizar horarios disponibles
    if (name === 'fecha' || name === 'profesional') {
      actualizarHorariosDisponibles(
        name === 'fecha' ? value : formData.fecha,
        name === 'profesional' ? value : formData.profesional
      );
    }
  };

  const actualizarHorariosDisponibles = async (fecha: string, profesional: string) => {
    if (!fecha || !profesional) return;
    try {
      const response = await fetch(`/api/turnos/disponibles?date=${fecha}&professionalId=${profesional}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setHorariosDisponibles(data.map((slot: any) => slot.startTime));
    } catch (error) {
      console.error('Error al obtener horarios disponibles:', error);
      toast.error('Error al cargar los horarios disponibles');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/turnos/reservar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al reservar el turno');
      }

      toast.success('Turno reservado exitosamente');
      router.push('/turnos');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al reservar el turno');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-1">
          Servicio
        </label>
        <select
          id="servicio"
          name="servicio"
          value={formData.servicio}
          onChange={handleChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
          required
        >
          <option value="">Selecciona un servicio</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name} - ${service.price}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="profesional" className="block text-sm font-medium text-gray-700 mb-1">
          Profesional
        </label>
        <select
          id="profesional"
          name="profesional"
          value={formData.profesional}
          onChange={handleChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
          required
        >
          <option value="">Selecciona un profesional</option>
          {professionals.map((professional) => (
            <option key={professional._id} value={professional._id}>
              {professional.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
          Fecha
        </label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
          required
        />
      </div>

      <div>
        <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-1">
          Hora
        </label>
        <select
          id="hora"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
          required
          disabled={!formData.fecha || !formData.profesional}
        >
          <option value="">Selecciona una hora</option>
          {formData.fecha && formData.profesional ? (
            horariosDisponibles.length > 0 ? (
              horariosDisponibles.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))
            ) : (
              <option value="" disabled>No hay horarios disponibles</option>
            )
          ) : (
            <option value="" disabled>Selecciona fecha y profesional</option>
          )}
        </select>
      </div>

      <div>
        <label htmlFor="notas" className="block text-sm font-medium text-gray-700 mb-1">
          Notas adicionales (opcional)
        </label>
        <textarea
          id="notas"
          name="notas"
          value={formData.notas}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
          placeholder="Escribe aquí cualquier información adicional que quieras compartir..."
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isLoading}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-[#436E6C] hover:bg-[#5A9A98] text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Reservando...' : 'Confirmar Reserva'}
        </button>
      </div>
    </form>
  );
}