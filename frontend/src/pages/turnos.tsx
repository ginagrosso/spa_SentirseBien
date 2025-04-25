'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import servicios from '../data/servicios';
import { useEffect, useState } from 'react';


const turnos = [
  {
    id: 1,
    nombre: 'Lucia Tonzar',
    servicio: servicios[0].services[0].name,
    dia: 'Lunes',
    horario: '10:00',
    estado: 'Confirmado',
  },
  {
    id: 2,
    nombre: 'Lucia Tonzar',
    servicio: servicios[1].services[0].name,
    dia: 'Martes',
    horario: '11:00',
    estado: 'Pendiente',
  },
  {
    id: 3,
    nombre: 'Lucia Tonzar',
    servicio: servicios[4].services[0].name,
    dia: 'Martes',
    horario: '11:00',
    estado: 'Cancelado',
  },
];


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
      <section className="bg-[#f0f8ff] min-h-screen py-12 px-6 font-roboto text-[#436E6C]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8 text-center">Mis Turnos</h1>

          {mensaje && (
            <div className="bg-green-100 text-green-700 text-center py-2 px-4 rounded mb-6">
              {mensaje}
            </div>
          )}

          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {['Todos', 'Confirmado', 'Pendiente', 'Cancelado'].map((estado) => (
              <button
                key={estado}
                className={`px-4 py-2 rounded-full border transition text-sm ${
                  filtro === estado
                    ? 'bg-[#436E6C] text-white'
                    : 'bg-white text-[#436E6C] border-[#B6D5C8]'
                }`}
                onClick={() => setFiltro(estado)}
              >
                {estado}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {turnosFiltrados.map((t) => (
              <div key={t.id} className="bg-white rounded-xl shadow p-6 space-y-2 border border-[#B6D5C8]">
                <h3 className="text-lg font-semibold">{t.servicio}</h3>
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
                {t.estado !== 'Cancelado' && (
                  <button
                    onClick={() => handleCancelar(t.id)}
                    className="mt-4 px-4 py-2 rounded-full text-sm bg-red-200 hover:bg-red-300 text-red-800 transition"
                  >
                    Cancelar turno
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
