'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider 
      refetchInterval={0} 
      refetchOnWindowFocus={false}
    >
      <AuthProvider>
        {children}
        <Toaster position="top-center" richColors closeButton />
      </AuthProvider>
    </SessionProvider>
  );
}
