'use client';

import { usePathname } from 'next/navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ToastProvider } from '@/contexts/ToastContext';
import DashboardLayout from '@/components/DashboardLayout';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth/');

  return (
    <ErrorBoundary>
      <ToastProvider>
        {isAuthPage ? children : <DashboardLayout>{children}</DashboardLayout>}
      </ToastProvider>
    </ErrorBoundary>
  );
}
