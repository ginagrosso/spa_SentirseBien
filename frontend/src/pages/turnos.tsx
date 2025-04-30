'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import servicios from '../data/servicios';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Turno = {
  id: number;
  nombre: string;
  servicio: string;
  dia: string;
  horario: string;
  estado: 'Confirmado' | 'Pendiente' | 'Cancelado';
};

export default function MisTurnos() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [filtro, setFiltro] = useState('Todos');
  const [mensaje, setMensaje] = useState<string | null>(null);

  useEffect(() => {
    const cargarTurnos = async () => {
      const res = await fetch('/api/misturnos');
      const data = await res.json();
      setTurnos(data);
    };

    cargarTurnos();
  }, []);

  const handleCancelar = async (id: number) => {
    const actualizados = turnos.map((t) =>
      t.id === id ? { ...t, estado: 'Cancelado' as 'Cancelado' } : t
    );
    setTurnos(actualizados);
    setMensaje('El turno fue cancelado correctamente.');

    setTimeout(() => setMensaje(null), 3000);
  };

  const turnosFiltrados =
    filtro === 'Todos' ? turnos : turnos.filter((t) => t.estado === filtro);

  return (
    <>
      <Header />
      <PageHero 
        title="Mis Turnos"
        description="Gestioná tus reservas y mantené tu agenda actualizada."
      />

      <main className="px-4 py-16 bg-white font-roboto">
        {mensaje && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-100 text-green-700 text-center py-2 px-4 rounded mb-8"
          >
            {mensaje}
          </motion.div>
        )}

        <div className="flex justify-center gap-4 flex-wrap mb-10">
          {['Todos', 'Confirmado', 'Pendiente', 'Cancelado'].map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltro(estado)}
              className={`px-6 py-2 rounded-full border transition text-sm ${
                filtro === estado
                  ? 'bg-[#436E6C] text-white'
                  : 'bg-white text-[#436E6C] border-[#B6D5C8]'
              } hover:bg-[#5A9A98] hover:text-white`}
            >
              {estado}
            </button>
          ))}
        </div>

        {turnosFiltrados.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {turnosFiltrados.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-[#F5F9F8] p-6 rounded-xl shadow-md border border-[#B6D5C8] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t.servicio}</h3>
                  <p><span className="font-medium">Día:</span> {t.dia}</p>
                  <p><span className="font-medium">Horario:</span> {t.horario}</p>
                  <p>
                    <span className="font-medium">Estado:</span>{' '}
                    <span
                      className={`font-semibold ${
                        t.estado === 'Cancelado'
                          ? 'text-red-500'
                          : t.estado === 'Pendiente'
                          ? 'text-yellow-500'
                          : 'text-green-600'
                      }`}
                    >
                      {t.estado}
                    </span>
                  </p>
                </div>

                {t.estado !== 'Cancelado' && (
                  <button
                    onClick={() => handleCancelar(t.id)}
                    className="mt-6 bg-red-200 hover:bg-red-300 text-red-800 px-4 py-2 rounded-full text-sm transition"
                  >
                    Cancelar turno
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#436E6C] mt-10">No tenés turnos disponibles.</p>
        )}
      </main>

      <Footer />
    </>
  );
}

