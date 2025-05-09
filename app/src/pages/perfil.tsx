import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserProfile {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

export default function PerfilPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('spa-logueado') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // Fetch user profile data
    const token = localStorage.getItem('spa-token');
    fetch('/api/perfil', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('No se pudo cargar el perfil');
        }
        return res.json();
      })
      .then(data => {
        setProfile(data);
        setEditData(data);
        setError(null);
      })
      .catch((err) => {
        console.error('Error al cargar perfil:', err);
        setError('No se pudo cargar el perfil. Intente nuevamente.');

        // Fallback mock data if API fails
        const mockData = {
          nombre: 'Usuario',
          email: 'usuario@example.com',
          telefono: '123-456-7890',
          direccion: 'Av. Principal 123'
        };
        setProfile(mockData);
        setEditData(mockData);
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleSave = async () => {
    if (!editData) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('spa-token');
      const res = await fetch('/api/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editData),
      });

      if (res.ok) {
        const updatedData = await res.json();
        setProfile(updatedData);
        setEditing(false);
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al guardar perfil:', error);
      setError('Error de conexión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData(profile);
    setEditing(false);
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    if (!editData) return;
    setEditData({
      ...editData,
      [field]: value
    });
  };

  return (
    <>
      <Header />

      <section className="bg-[#F5F9F8] text-[#436E6C] font-roboto py-16 px-4 text-center mt-16">
        <h1 className="text-4xl font-amiri italic mb-4">Mi Perfil</h1>
        <p className="max-w-3xl mx-auto text-lg">
          Administra tu información personal en <span className="font-semibold">Sentirse Bien</span>.
        </p>
      </section>

      <motion.main
        className="py-16 px-4 bg-white font-roboto flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-[#F5F9F8] p-8 rounded-xl shadow-md w-full max-w-lg text-[#436E6C]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#436E6C]"></div>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-amiri">Información Personal</h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1 px-3 py-1 bg-[#436E6C] text-white rounded-md hover:bg-[#5A9A98] transition"
                  >
                    <Edit2 size={16} /> Editar
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1 px-3 py-1 bg-[#436E6C] text-white rounded-md hover:bg-[#5A9A98] transition"
                    >
                      <Save size={16} /> Guardar
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      <X size={16} /> Cancelar
                    </button>
                  </div>
                )}
              </div>

              {profile && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#436E6C] p-3 rounded-full text-white">
                      <User />
                    </div>
                    {!editing ? (
                      <div>
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p className="font-medium">{profile.nombre}</p>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <label className="text-sm text-gray-500">Nombre</label>
                        <input
                          type="text"
                          value={editData?.nombre || ''}
                          onChange={(e) => handleChange('nombre', e.target.value)}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-[#436E6C] p-3 rounded-full text-white">
                      <Mail />
                    </div>
                    {!editing ? (
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{profile.email}</p>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <label className="text-sm text-gray-500">Email</label>
                        <input
                          type="email"
                          value={editData?.email || ''}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-[#436E6C] p-3 rounded-full text-white">
                      <Phone />
                    </div>
                    {!editing ? (
                      <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="font-medium">{profile.telefono}</p>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <label className="text-sm text-gray-500">Teléfono</label>
                        <input
                          type="tel"
                          value={editData?.telefono || ''}
                          onChange={(e) => handleChange('telefono', e.target.value)}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-[#436E6C] p-3 rounded-full text-white">
                      <MapPin />
                    </div>
                    {!editing ? (
                      <div>
                        <p className="text-sm text-gray-500">Dirección</p>
                        <p className="font-medium">{profile.direccion}</p>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <label className="text-sm text-gray-500">Dirección</label>
                        <input
                          type="text"
                          value={editData?.direccion || ''}
                          onChange={(e) => handleChange('direccion', e.target.value)}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#436E6C]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.main>

      <Footer />
    </>
  );
}