'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  FileText,
  Upload,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { AuthClient } from '@/lib/auth';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Tax Returns', href: '/tax-return' },
  { icon: Upload, label: 'Documents', href: '/documents' },
  { icon: Users, label: 'Dependents', href: '/dependents' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname() || '';

  const handleSignOut = async () => {
    AuthClient.removeToken();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-white shadow-md text-gray-600 hover:text-gray-900"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar backdrop for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 20 }}
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50',
          'transform transition-transform duration-200 ease-in-out',
          'flex flex-col'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">TaxCat</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((menuItem) => {
              const Icon = menuItem.icon;
              const isActive = pathname.startsWith(menuItem.href);

              return (
                <li key={menuItem.href}>
                  <Link
                    href={menuItem.href}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors',
                      'hover:bg-gray-100 group',
                      isActive && 'bg-blue-50 text-blue-600'
                    )}
                  >
                    <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-500'} />
                    <span className={isActive ? 'font-medium' : 'text-gray-700'}>{menuItem.label}</span>
                    {isActive && <ChevronRight size={16} className="ml-auto text-blue-600" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sign out button */}
        <div className="p-4 border-t">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-3 px-4 py-2.5 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>Sign out</span>
          </button>
        </div>
      </motion.div>

      {/* Main content */}
      <div
        className={cn(
          'transition-all duration-200 ease-in-out',
          isSidebarOpen ? 'lg:ml-64' : 'ml-0'
        )}
      >
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
