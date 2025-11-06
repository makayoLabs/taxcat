'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, FileText, Image as ImageIcon, Settings, LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutGrid },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Media', href: '/admin/media', icon: ImageIcon },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }): void {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const NavItem = ({ item }: { item: (typeof navigation)[0] }): void => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          isActive ? 'bg-taxcat-blue text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Icon className="w-5 h-5" />
        {isSidebarOpen && <span>{item.name}</span>}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 240 : 72 }}
        className="fixed top-0 left-0 bottom-0 bg-white border-r z-30"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            {isSidebarOpen ? (
              <span className="text-xl font-bold text-taxcat-blue">
                Tax<span className="text-taxcat-gray">Cat</span>
              </span>
            ) : (
              <span className="text-xl font-bold text-taxcat-blue">TC</span>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 text-gray-400 hover:text-gray-500 transition-colors"
            >
              {isSidebarOpen ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`transition-all ${isSidebarOpen ? 'ml-60' : 'ml-[72px]'}`}>{children}</main>
    </div>
  );
}
