'use client';

import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TurnosPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.rol !== 'admin')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#436E6C]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#436E6C]">Gestión de Turnos</h1>
      {/* Aquí irá el contenido de la página de turnos */}
    </div>
  );
} 