// pages/admin/dashboard.tsx
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';
<<<<<<< HEAD
import { motion } from 'framer-motion';
import { Calendar, Users, DollarSign, Settings } from 'lucide-react';
=======
>>>>>>> origin/feature/adminpage

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <AdminLayout>
      <div className="mb-8">
<<<<<<< HEAD
        <h1 className="text-3xl font-lora font-semibold text-primary">Panel de Administración</h1>
        <p className="text-[#436E6C]/80">Bienvenido, {user?.nombre}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 border border-[#B6D5C8] hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-[#436E6C] mb-2">Citas Hoy</h3>
              <p className="text-3xl font-bold text-primary">12</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 border border-[#B6D5C8] hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-[#436E6C] mb-2">Clientes Nuevos</h3>
              <p className="text-3xl font-bold text-primary">5</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 border border-[#B6D5C8] hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-[#436E6C] mb-2">Ingresos</h3>
              <p className="text-3xl font-bold text-primary">$1,450</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 border border-[#B6D5C8] hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-[#436E6C] mb-2">Servicios</h3>
              <p className="text-3xl font-bold text-primary">8</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Settings className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 border border-[#B6D5C8]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-[#436E6C] mb-4">Próximas Citas</h2>
          <div className="divide-y divide-[#B6D5C8]">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-[#436E6C]">Cliente {i + 1}</p>
                  <p className="text-sm text-[#436E6C]/80">Masaje Relajante • 60min</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#436E6C]">14:30</p>
                  <p className="text-sm text-[#436E6C]/80">Hoy</p>
                </div>
              </div>
            ))}
            <button className="mt-4 text-primary hover:text-[#5A9A98] transition-colors duration-300 text-sm font-medium">
              Ver todas las citas
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 border border-[#B6D5C8]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-[#436E6C] mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-primary hover:bg-[#5A9A98] text-white py-4 px-6 rounded-lg transition-colors duration-300 font-medium">
              Nueva Cita
            </button>
            <button className="bg-primary hover:bg-[#5A9A98] text-white py-4 px-6 rounded-lg transition-colors duration-300 font-medium">
              Nuevo Cliente
            </button>
            <button className="bg-primary hover:bg-[#5A9A98] text-white py-4 px-6 rounded-lg transition-colors duration-300 font-medium">
              Gestionar Servicios
            </button>
            <button className="bg-primary hover:bg-[#5A9A98] text-white py-4 px-6 rounded-lg transition-colors duration-300 font-medium">
              Ver Reportes
            </button>
          </div>
        </motion.div>
=======
        <h1 className="text-3xl font-semibold text-primary">Panel de Administración</h1>
        <p className="text-stone">Bienvenido, {user?.nombre}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Dashboard Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-medium text-dark mb-2">Citas Hoy</h3>
          <p className="text-3xl font-bold text-primary">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-medium text-dark mb-2">Clientes Nuevos</h3>
          <p className="text-3xl font-bold text-primary">5</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-medium text-dark mb-2">Ingresos</h3>
          <p className="text-3xl font-bold text-primary">$1,450</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-medium text-dark mb-2">Servicios</h3>
          <p className="text-3xl font-bold text-primary">8</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-dark mb-4">Próximas Citas</h2>
          <div className="divide-y">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">Cliente {i + 1}</p>
                  <p className="text-sm text-stone">Masaje Relajante • 60min</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">14:30</p>
                  <p className="text-sm text-stone">Hoy</p>
                </div>
              </div>
            ))}
            <button className="mt-4 text-primary hover:underline text-sm">
              Ver todas las citas
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-dark mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-primary hover:bg-opacity-90 text-white py-4 px-6 rounded-lg">
              Nueva Cita
            </button>
            <button className="bg-primary hover:bg-opacity-90 text-white py-4 px-6 rounded-lg">
              Nuevo Cliente
            </button>
            <button className="bg-primary hover:bg-opacity-90 text-white py-4 px-6 rounded-lg">
              Gestionar Servicios
            </button>
            <button className="bg-primary hover:bg-opacity-90 text-white py-4 px-6 rounded-lg">
              Ver Reportes
            </button>
          </div>
        </div>
>>>>>>> origin/feature/adminpage
      </div>
    </AdminLayout>
  );
}