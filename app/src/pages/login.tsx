import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [tipoMensaje, setTipoMensaje] = useState<'exito' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  // Debug user data on component mount and when it changes
  useEffect(() => {
    console.log("Current user in LoginPage:", user);
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMensaje(null);
    console.log("Login form submitted for email:", email);

    try {
      console.log("Sending login request to API");
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      console.log("API response status:", res.status);
      console.log("API response data:", data);
      console.log("User from API:", data.user);
      console.log("User role from API:", data.user?.rol);

      if (res.ok) {
        // Store user data
        console.log("Login successful, calling context.login()");
        await login(data.token, data.user);
        console.log("Context updated with user data");

        // Check user role for redirection
        const userRole = data.user?.rol;
        console.log(`Redirecting based on role: "${userRole}"`);

        console.log("Checking role:", userRole, "Type:", typeof userRole);
        console.log("Is admin?", String(userRole).toLowerCase() === 'admin');

        // Force comparison as string and add delay to ensure state updates
        setTimeout(() => {
          if (String(userRole).toLowerCase() === 'admin') {
            console.log("ADMIN USER CONFIRMED - redirecting to dashboard");
            router.push('/admin/dashboard');
          } else {
            console.log("Regular user confirmed - redirecting to reserva");
            router.push('/reserva');
          }
        }, 300);
      } else {
        console.log("Login failed:", data.error);
        setMensaje(data.error || 'Error en login');
        setTipoMensaje('error');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMensaje('Error de conexión. Intente nuevamente.');
      setTipoMensaje('error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header />

      <section className="bg-[#F5F9F8] text-[#436E6C] font-roboto py-16 px-4 text-center">
        <h1 className="text-4xl font-amiri italic mb-4">Iniciar Sesión</h1>
        <p className="max-w-3xl mx-auto text-lg">
          Ingresa a tu cuenta para reservar tus turnos y acceder a todos los beneficios de{' '}
          <span className="font-semibold">Sentirse Bien</span>.
        </p>
      </section>

      <main className="py-16 px-4 bg-white font-roboto flex justify-center">
        <div className="bg-[#F5F9F8] p-8 rounded-xl shadow-md w-full max-w-lg text-[#436E6C]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
              required
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#436E6C] text-white py-3 rounded-md hover:bg-[#5A9A98] transition disabled:bg-opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Procesando...' : 'Entrar'}
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

          {/* Debug display */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-2 border border-gray-300 text-xs bg-gray-50">
              <p>Debug info - current authentication state:</p>
              <pre>{user ? `Logged in as: ${user.email} (${user.rol})` : 'Not logged in'}</pre>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}