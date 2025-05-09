<<<<<<< HEAD
import { useState } from 'react';
import { useRouter } from 'next/router';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
=======
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
>>>>>>> origin/feature/adminpage

export default function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
<<<<<<< HEAD
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
=======
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [tipoMensaje, setTipoMensaje] = useState<'exito' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!form.nombre.trim()) {
      setMensaje('El nombre es obligatorio');
      setTipoMensaje('error');
      return false;
    }
    if (!form.email.trim()) {
      setMensaje('El email es obligatorio');
      setTipoMensaje('error');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMensaje('Formato de email inválido');
      setTipoMensaje('error');
      return false;
    }
    if (!form.password) {
      setMensaje('La contraseña es obligatoria');
      setTipoMensaje('error');
      return false;
    }
    if (form.password.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres');
      setTipoMensaje('error');
      return false;
    }
    return true;
>>>>>>> origin/feature/adminpage
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    setError('');
=======
    setMensaje(null);

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje(data.mensaje || 'Registro exitoso! Ahora puedes iniciar sesión.');
        setTipoMensaje('exito');
        setForm({ nombre: '', email: '', telefono: '', password: '' });

        // Redirect to login page after successful registration
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMensaje(data.error || 'Error al registrarse');
        setTipoMensaje('error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMensaje('Error de conexión. Intente nuevamente.');
      setTipoMensaje('error');
    } finally {
      setIsLoading(false);
    }
  };
>>>>>>> origin/feature/adminpage

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/auth/signin');
      } else {
        setError(data.message || 'Error al registrar usuario');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <>
      <PageHero 
        title="Crear cuenta"
        description="Registrate para reservar tus turnos y acceder a todos los beneficios de Sentirse Bien."
      />

<<<<<<< HEAD
      <main className="bg-white font-roboto py-16">
        <div className="max-w-md mx-auto px-4">
          <motion.div 
            className="bg-[#F5F9F8] p-8 rounded-xl shadow-lg border border-[#B6D5C8]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-[#436E6C] mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C] text-[#436E6C]"
                  required
                />
=======
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
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
              required
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
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#436E6C] text-white py-3 rounded-md hover:bg-[#5A9A98] transition disabled:bg-opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Procesando...' : 'Registrarse'}
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
>>>>>>> origin/feature/adminpage
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#436E6C] mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C] text-[#436E6C]"
                  required
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-[#436E6C] mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C] text-[#436E6C]"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#436E6C] mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C] text-[#436E6C]"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#436E6C] mb-1">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C] text-[#436E6C]"
                  required
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#436E6C] text-white py-3 rounded-md hover:bg-[#5A9A98] transition-colors duration-300 font-medium"
              >
                Crear cuenta
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </>
  );
}