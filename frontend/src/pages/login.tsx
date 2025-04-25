'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [tipoMensaje, setTipoMensaje] = useState<'exito' | 'error' | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email && form.password) {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('spa-logueado', 'true');
          setMostrarModal(true);
        } else {
          setMensaje(data.error || 'Error al iniciar sesión.');
          setTipoMensaje('error');
        }
      } catch (error) {
        setMensaje('Error de conexión. Intente nuevamente.');
        setTipoMensaje('error');
      }
    } else {
      setMensaje('Ingrese correo electrónico y contraseña.');
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
        <h1 className="text-4xl font-amiri italic mb-4">Iniciar sesión</h1>
        <p className="max-w-3xl mx-auto text-lg">
          Accedé a tu cuenta para gestionar tus turnos y mantenerte conectada con <span className="font-semibold">Sentirse Bien</span>.
        </p>
      </section>

      <main className="bg-white py-16 px-4 font-roboto">
        <div className="max-w-lg mx-auto bg-[#F5F9F8] p-8 rounded-xl shadow-md text-[#436E6C]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
            />
            <button
              type="submit"
              className="w-full bg-[#436E6C] text-white py-3 rounded-md hover:bg-[#5A9A98] transition"
            >
              Ingresar
            </button>
            {tipoMensaje === 'error' && mensaje && (
              <div className="mt-2 text-sm bg-red-100 text-red-700 px-4 py-2 rounded-md">
                {mensaje}
              </div>
            )}
          </form>

          <p className="text-sm text-center mt-6">
            ¿Todavía no tenés una cuenta?{' '}
            <a href="/registro" className="underline hover:text-[#40576d] transition">
              Registrate acá
            </a>
          </p>
        </div>
      </main>

      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm mx-auto text-center text-[#436E6C]">
            <p className="text-sm mb-4">{mensaje}</p>
            <button
              onClick={() => setMostrarModal(false)}
              className="bg-[#436E6C] text-white px-4 py-2 rounded-md hover:bg-[#5A9A98] transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
