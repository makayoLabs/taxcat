'use client';

import { AuthProvider } from '@/contexts/AuthContext';

export function Providers({ children }: { children: React.ReactNode }): JSX.Element {
  return <AuthProvider>{children}</AuthProvider>;
}
