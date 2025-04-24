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
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [tipoMensaje, setTipoMensaje] = useState<'exito' | 'error' | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.nombre && form.email && form.servicio && form.dia && form.horario) {
      try {
        const res = await fetch('/api/reservas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
          setMensaje(data.mensaje);
          setTipoMensaje('exito');
          setMostrarModal(true);
        } else {
          setMensaje(data.error || 'Error en el sistema, intente nuevamente.');

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
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const horarios = ['10:00', '11:00', '14:00', '15:30', '17:00'];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-6 px-2 bg-[#f0f8ff] font-roboto">
      <div className="max-w-xl mx-auto text-center bg-[#B6D5C8] p-6 rounded-xl shadow-md text-[#436E6C]">
        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#B6D5C8] rounded-md text-[#436E6C] focus:outline-none focus:ring-2 focus:ring-[#B6D5C8]"
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#B6D5C8] rounded-md text-[#436E6D] focus:outline-none focus:ring-2 focus:ring-[#B6D5C8]"
          />

          <select
            name="servicio"
            value={form.servicio}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#B6D5C8] rounded-md text-[#436E6C] bg-white"
          >
            <option value="">Seleccioná un servicio</option>
            {servicios.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            name="dia"
            value={form.dia}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#B6D5C8] rounded-md text-[#436E6C] bg-white"
          >
            <option value="">Seleccioná un día</option>
            {dias.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            name="horario"
            value={form.horario}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#B6D5C8] rounded-md text-[#436E6C] bg-white"
          >
            <option value="">Seleccioná un horario</option>
            {horarios.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-[#436E6C] text-white py-2 rounded-md hover:bg-[#5A9A98] transition"
          >
            Confirmar turno
          </button>
          {tipoMensaje === 'error' && mensaje && (
            <div className="mt-4 text-sm bg-red-100 text-red-700 px-4 py-2 rounded-md">
              {mensaje}
            </div>
          )}
        </form>
      </div>

      {/* Modal se muestra solo en caso de éxito */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <p className="text-sm text-green-700">{mensaje}</p>
            <button
              onClick={() => setMostrarModal(false)}
              className="mt-4 bg-[#436E6C] text-white px-4 py-2 rounded-md hover:bg-[#5A9A98] transition block mx-auto"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}