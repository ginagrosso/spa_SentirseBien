'use client';

import AdminLayout from '../../components/AdminLayout';
import { Providers } from '../../components/Providers';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AdminLayout>{children}</AdminLayout>
    </Providers>
  );
} 