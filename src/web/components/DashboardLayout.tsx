import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps): void {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <TopNav />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">{children}</main>
      </div>
    </div>
  );
}
