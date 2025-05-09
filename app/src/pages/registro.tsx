import { useState } from 'react';
import { useRouter } from 'next/router';
import PageHero from '../components/PageHero';
import { motion } from 'framer-motion';

export default function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [tipoMensaje, setTipoMensaje] = useState<'exito' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    if (mensaje) setMensaje(null); 
  };

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
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email)) {
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
    if (form.password !== form.confirmPassword) {
        setMensaje('Las contraseñas no coinciden');
        setTipoMensaje('error');
        return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.nombre,
          email: form.email,
          password: form.password
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje(data.mensaje || 'Registro exitoso. Redirigiendo a inicio de sesión...');
        setTipoMensaje('exito');
        setForm({ nombre: '', email: '', telefono: '', password: '', confirmPassword: '' });
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
      } else {
        setMensaje(data.error || data.message || 'Error al registrarse');
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

  return (
    <>
      <PageHero
        title="Crear cuenta"
        description="Registrate para reservar tus turnos y acceder a todos los beneficios de Sentirse Bien."
      />

      <main className="bg-white font-roboto py-16">
        <div className="max-w-md mx-auto px-4">
          <motion.div
            className="bg-[#F5F9F8] p-8 rounded-xl shadow-lg border border-[#B6D5C8]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-lora font-semibold text-center text-[#436E6C] mb-6">
              Completa tus datos
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-[#436E6C] mb-1">Nombre completo</label>
                <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required
                  className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C] text-[#436E6C]" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#436E6C] mb-1">Correo electrónico</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required
                  className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C] text-[#436E6C]" />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-[#436E6C] mb-1">Teléfono (Opcional)</label>
                <input type="tel" id="telefono" name="telefono" value={form.telefono} onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C] text-[#436E6C]" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#436E6C] mb-1">Contraseña</label>
                <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required
                  className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C] text-[#436E6C]" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#436E6C] mb-1">Confirmar Contraseña</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required
                  className="w-full p-3 rounded-md border border-[#B6D5C8] focus:outline-none focus:ring-2 focus:ring-[#436E6C] text-[#436E6C]" />
              </div>
              
              <button type="submit" disabled={isLoading}
                className="w-full bg-[#436E6C] text-white py-3 rounded-md hover:bg-[#5A9A98] transition disabled:bg-opacity-70 disabled:cursor-not-allowed font-medium">
                {isLoading ? 'Procesando...' : 'Registrarse'}
              </button>

              {mensaje && (
                <div className={`text-sm px-4 py-3 rounded-md mt-4 ${
                    tipoMensaje === 'exito' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                  }`} role="alert">
                  {mensaje}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </main>
    </>
  );
}