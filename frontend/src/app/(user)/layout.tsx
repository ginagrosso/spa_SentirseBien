'use client';

import Header from '../../components/Header';
import { Providers } from '../../components/Providers';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Header />
      {children}
    </Providers>
  );
} 