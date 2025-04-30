'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiUser, FiMail, FiPhone } from 'react-icons/fi';

interface Servicio {
  id: number;
  nombre: string;
  precio: number;
  duracion: string;
}

export default function Reserva() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const servicioId = searchParams?.get('servicio');
  
  const [servicio, setServicio] = useState<Servicio | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    horario: '',
    servicio: ''
  });
  const [mensaje, setMensaje] = useState<string | null>(null);

  useEffect(() => {
    if (servicioId) {
      // Aquí iría la llamada a la API para obtener los detalles del servicio
      fetch(`/api/servicios/${servicioId}`)
        .then(res => res.json())
        .then(data => {
          setServicio(data);
          setFormData(prev => ({ ...prev, servicio: data.nombre }));
        });
    }
  }, [servicioId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje('¡Reserva realizada con éxito! Te hemos enviado un email con los detalles.');
        // Enviar email de confirmación
        await fetch('/api/email/confirmacion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            reserva: formData
          }),
        });
        router.push('/');
      } else {
        setMensaje('Error al realizar la reserva. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      setMensaje('Error al realizar la reserva. Por favor, intenta nuevamente.');
    }
  };

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
                Servicio
              </label>
              <input
                type="text"
                value={formData.servicio}
                readOnly
                className="w-full p-3 rounded-lg border border-[#B6D5C8] bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <button
              type="submit"
              className="w-full bg-[#436E6C] text-white py-3 rounded-lg hover:bg-[#5A9A98] transition font-medium"
            >
              Confirmar Reserva
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
