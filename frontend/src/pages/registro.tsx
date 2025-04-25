'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
  });
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [tipoMensaje, setTipoMensaje] = useState<'exito' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email && form.password) {
      try {
        const res = await fetch('/api/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
          setMensaje(data.mensaje);
          setTipoMensaje('exito');
          setForm({ nombre: '', email: '', telefono: '', password: '' });
        } else {
          setMensaje(data.error || 'Error al registrarse');
          setTipoMensaje('error');
        }
      } catch {
        setMensaje('Error de conexión. Intente nuevamente.');
        setTipoMensaje('error');
      }
    } else {
      setMensaje('Email y contraseña son obligatorios');
      setTipoMensaje('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />

      <section className="bg-[#F5F9F8] text-[#436E6C] font-roboto py-16 px-4 text-center">
        <h1 className="text-4xl font-amiri italic mb-4">Crear cuenta</h1>
        <p className="max-w-3xl mx-auto text-lg">
          Registrate para reservar tus turnos y acceder a todos los beneficios de{' '}
          <span className="font-semibold">Sentirse Bien</span>.
        </p>
      </section>

      <main className="py-16 px-4 bg-white font-roboto flex justify-center">
        <div className="bg-[#F5F9F8] p-8 rounded-xl shadow-md w-full max-w-lg text-[#436E6C]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre completo"
              className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
            />
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
              className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
            />
            <button
              type="submit"
              className="w-full bg-[#436E6C] text-white py-3 rounded-md hover:bg-[#5A9A98] transition"
            >
              Registrarse
            </button>

            {mensaje && (
              <div
                className={`text-sm px-4 py-2 rounded-md mt-2 ${
                  tipoMensaje === 'exito'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {mensaje}
              </div>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
