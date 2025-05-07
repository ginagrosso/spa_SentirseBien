// src/pages/reserva.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

interface Servicio {
  nombre: string;
  name: string;
  // Add other service properties as needed
}

export default function ReservaPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const searchParams = useSearchParams();
  const servicioId = searchParams.get('servicio');

  const [servicio, setServicio] = useState<Servicio | null>(null);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: '',
    fecha: '',
    horario: '',
    servicio: ''
  });
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch service details
  useEffect(() => {
    if (servicioId) {
      setLoading(true);
      fetch(`/api/servicios/${servicioId}`)
        .then(res => {
          if (!res.ok) throw new Error('Error al cargar el servicio');
          return res.json();
        })
        .then(data => {
          setServicio(data);
          setFormData(prev => ({
            ...prev,
            servicio: data.nombre || data.name || ''
          }));
        })
        .catch(err => {
          console.error('Error fetching service:', err);
          setMensaje('No se pudo cargar la información del servicio. Por favor, intenta nuevamente.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [servicioId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);

    try {
      const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('¡Reserva realizada con éxito! Te hemos enviado un email con los detalles.');

        // Send confirmation email
        await fetch('/api/email/confirmacion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            reserva: formData
          }),
        });

        // Redirect after short delay to show success message
        setTimeout(() => {
          router.push('/misturnos');
        }, 2000);
      } else {
        setMensaje(data.error || 'Error al realizar la reserva. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      setMensaje('Error al realizar la reserva. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return null; // Don't render anything while redirecting
  }

  // Get today's date in ISO format (YYYY-MM-DD) for date input min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#F5F9F8] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold text-[#436E6C] mb-8 text-center">
            Reserva tu turno
          </h1>

          {mensaje && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700">
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="inline-flex items-center">
                  <FiUser />
                  <span className="ml-2">Nombre completo</span>
                </span>
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full p-3 rounded-lg border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="inline-flex items-center">
                  <FiMail />
                  <span className="ml-2">Email</span>
                </span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-lg border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="inline-flex items-center">
                  <FiPhone />
                  <span className="ml-2">Teléfono</span>
                </span>
              </label>
              <input
                type="tel"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full p-3 rounded-lg border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="inline-flex items-center">
                  <FiCalendar />
                  <span className="ml-2">Fecha</span>
                </span>
              </label>
              <input
                type="date"
                required
                min={today}
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                className="w-full p-3 rounded-lg border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="inline-flex items-center">
                  <FiClock />
                  <span className="ml-2">Horario</span>
                </span>
              </label>
              <input
                type="time"
                required
                value={formData.horario}
                onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                className="w-full p-3 rounded-lg border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#436E6C] text-white py-3 px-4 rounded-lg hover:bg-[#2C4A48] transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Procesando...' : 'Confirmar Reserva'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}