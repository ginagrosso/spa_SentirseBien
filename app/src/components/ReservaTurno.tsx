'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';


export default function ReservaTurno() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    servicio: '',
    fecha: null as Date | null,
    horario: '',
  });
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [tipoMensaje, setTipoMensaje] = useState<'exito' | 'error' | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.nombre && form.email && form.servicio && form.fecha && form.horario) {
      try {
        const formattedDate = form.fecha.toISOString().split('T')[0];

        const res = await fetch('/api/reservas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            fecha: formattedDate,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setMensaje(data.mensaje);
          setTipoMensaje('exito');
          setMostrarModal(true);
        } else {
          setMensaje(data.error || 'Error en el sistema, intente nuevamente.');
          setTipoMensaje('error');
        }
      } catch (error) {
        setMensaje('Error de conexión. Intente nuevamente.');
        setTipoMensaje('error');
      }
    } else {
      setMensaje('Por favor, completá todos los campos.');
      setTipoMensaje('error');
    }
  };

  const servicios = ['Masaje relajante', 'Limpieza facial', 'Día de spa'];
  const horarios = ['10:00', '11:00', '14:00', '15:30', '17:00'];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    setForm({ ...form, fecha: date });
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <section className="bg-white text-[#436E6C] font-roboto py-10 px-4 text-center">
      <div className="max-w-2xl mx-auto bg-[#F5F9F8] rounded-xl shadow-md p-8 text-left">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
          />

          <select
            name="servicio"
            value={form.servicio}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-[#B6D5C8] text-[#436E6C] bg-white focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
          >
            <option value="">Seleccioná un servicio</option>
            {servicios.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="w-full">
            <DatePicker
              selected={form.fecha}
              onChange={handleDateChange}
              filterDate={isWeekday}
              dateFormat="dd/MM/yyyy"
              locale={es}
              placeholderText="Seleccioná una fecha"
              minDate={new Date()}
              className="block w-full px-4 py-2 border border-[#B6D5C8] rounded-md text-[#436E6C] bg-white focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
              wrapperClassName="w-full"
            />
          </div>

          <select
            name="horario"
            value={form.horario}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-[#B6D5C8] text-[#436E6C] bg-white focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
          >
            <option value="">Seleccioná un horario</option>
            {horarios.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-[#436E6C] text-white py-3 rounded-md hover:bg-[#5A9A98] transition"
          >
            Confirmar turno
          </button>

          {tipoMensaje === 'error' && mensaje && (
            <div className="mt-2 text-sm bg-red-100 text-red-700 px-4 py-2 rounded-md">
              {mensaje}
            </div>
          )}
        </form>
      </div>

  
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm mx-auto text-center">
            <p className="text-sm text-green-700 mb-4">{mensaje}</p>
            <button
              onClick={() => setMostrarModal(false)}
              className="bg-[#436E6C] text-white px-4 py-2 rounded-md hover:bg-[#5A9A98] transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
