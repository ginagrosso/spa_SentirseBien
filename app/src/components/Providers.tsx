'use client';

import { ReactNode, Suspense } from 'react';
import { AuthProvider } from '../context/AuthContext';

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#436E6C]"></div>
    </div>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthProvider>{children}</AuthProvider>
    </Suspense>
  );
} 