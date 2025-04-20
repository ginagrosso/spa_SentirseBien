'use client';

import { useState } from 'react';

export default function ReservaTurno() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    servicio: '',
    dia: '',
    horario: '',
  });

  const servicios = ['Masaje relajante', 'Limpieza facial', 'Día de spa'];
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const horarios = ['10:00', '11:00', '14:00', '15:30', '17:00'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-6 px-2 bg-white">
      <div className="max-w-xl mx-auto text-center">
        <form className="space-y-4 text-left">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#bac4e0] rounded-md text-[#536a86] focus:outline-none focus:ring-2 focus:ring-[#bac4e0]"
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#bac4e0] rounded-md text-[#536a86] focus:outline-none focus:ring-2 focus:ring-[#bac4e0]"
          />

          <select
            name="servicio"
            value={form.servicio}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#bac4e0] rounded-md text-[#536a86] bg-white"
          >
            <option value="">Seleccioná un servicio</option>
            {servicios.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            name="dia"
            value={form.dia}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#bac4e0] rounded-md text-[#536a86] bg-white"
          >
            <option value="">Seleccioná un día</option>
            {dias.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            name="horario"
            value={form.horario}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#bac4e0] rounded-md text-[#536a86] bg-white"
          >
            <option value="">Seleccioná un horario</option>
            {horarios.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-[#536a86] text-white py-2 rounded-md hover:bg-[#40576d] transition"
          >
            Confirmar turno
          </button>
        </form>
      </div>
    </section>
  );
}
