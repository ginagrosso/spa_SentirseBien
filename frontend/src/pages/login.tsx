'use client';

import { useState } from 'react';
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
          setMensaje(data.mensaje);
          setTipoMensaje('exito');
          setMostrarModal(true); // Solo se activa para éxito
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

      <section className="py-12 px-4 bg-white font-roboto">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#536a86] mb-6">
            Iniciar sesión
          </h2>
          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#bac4e0] rounded-md text-[#536a86] focus:outline-none focus:ring-2 focus:ring-[#bac4e0]"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#bac4e0] rounded-md text-[#536a86] focus:outline-none focus:ring-2 focus:ring-[#bac4e0]"
            />
            <button
              type="submit"
              className="w-full bg-[#536a86] text-white py-2 rounded-md hover:bg-[#40576d] transition"
            >
              Ingresar
            </button>
            {tipoMensaje === 'error' && mensaje && (
              <div className="mt-4 text-sm bg-red-100 text-red-700 px-4 py-2 rounded-md">
                {mensaje}
              </div>
            )}
          </form>
          <p className="text-sm text-center text-[#536a86] mt-4">
            ¿Todavía no tenés una cuenta?{' '}
            <a href="/registro" className="underline hover:text-[#40576d]">
              Registrate acá
            </a>
          </p>
        </div>
      </section>

      {/* Modal se muestra solo en caso de éxito */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <p className="text-sm text-green-700">{mensaje}</p>
            <button
              onClick={() => setMostrarModal(false)}
              className="mt-4 bg-[#536a86] text-white px-4 py-2 rounded-md hover:bg-[#40576d] transition block mx-auto"
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
