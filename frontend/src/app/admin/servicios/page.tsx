'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import AdminLayout from '../../../components/AdminLayout';
import ServicioModal from '../../../components/ServicioModal';

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  duracion: number;
}

export default function ServiciosAdmin() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servicioEditar, setServicioEditar] = useState<Servicio | undefined>();

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      const response = await fetch('/api/servicios');
      if (!response.ok) throw new Error('Error al cargar servicios');
      const data = await response.json();
      setServicios(data);
    } catch (err) {
      setError('Error al cargar los servicios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (servicio: Omit<Servicio, 'id'>) => {
    try {
      const url = servicioEditar 
        ? `/api/servicios/${servicioEditar.id}`
        : '/api/servicios';
      
      const method = servicioEditar ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servicio),
      });

      if (!response.ok) throw new Error('Error al guardar servicio');
      
      await cargarServicios();
    } catch (error) {
      console.error('Error al guardar servicio:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este servicio?')) return;

    try {
      const response = await fetch(`/api/servicios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar servicio');
      
      setServicios(servicios.filter(servicio => servicio.id !== id));
    } catch (err) {
      console.error('Error al eliminar servicio:', err);
      alert('Error al eliminar el servicio');
    }
  };

  const handleEdit = (servicio: Servicio) => {
    setServicioEditar(servicio);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#436E6C]"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-red-500 text-center p-4">{error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#436E6C]">Gestión de Servicios</h1>
          <button
            onClick={() => {
              setServicioEditar(undefined);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-[#436E6C] text-white px-4 py-2 rounded-lg hover:bg-[#2C4A48] transition-colors"
          >
            <FiPlus />
            Nuevo Servicio
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, idx) => (
            <motion.div
              key={servicio.id}
              className="relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 h-40">
                {servicio.imagen ? (
                  <img
                    src={servicio.imagen}
                    alt={servicio.nombre}
                    className="object-cover w-full h-40"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                    <span className="text-4xl font-bold">{servicio.nombre[0]}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="relative h-full flex flex-col justify-between p-4 pt-44 bg-white/80">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-lora font-bold">{servicio.nombre}</h4>
                    <span className="bg-accent/30 text-primary text-base font-semibold px-3 py-1.5 rounded-full border border-accent/30">
                      ${servicio.precio}
                    </span>
                  </div>
                  <p className="text-sm text-primary/80 mb-3 line-clamp-2">{servicio.descripcion}</p>
                  <span className="inline-block text-xs font-semibold rounded-full bg-green-100 text-green-800 px-2 py-1 mb-2">{servicio.categoria}</span>
                  <span className="inline-block text-xs font-semibold rounded-full bg-blue-100 text-blue-800 px-2 py-1 ml-2 mb-2">{servicio.duracion} min</span>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(servicio)}
                    className="text-[#436E6C] hover:text-[#2C4A48] p-2 rounded-full bg-white shadow"
                    title="Editar"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(servicio.id)}
                    className="text-red-600 hover:text-red-900 p-2 rounded-full bg-white shadow"
                    title="Eliminar"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <ServicioModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setServicioEditar(undefined);
          }}
          servicio={servicioEditar}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
} 