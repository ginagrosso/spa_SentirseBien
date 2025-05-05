// pages/admin/dashboard.tsx
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not admin
    if (!user || user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') return null;

  return (
    <div>
      <h1>Panel de Administración</h1>
      {/* Admin content here */}
    </div>
  );
}