import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaxCat - Modern Canadian Tax Software',
  description: 'Professional Canadian tax preparation software with e-filing capabilities',
};

export default function RootLayout({ children }: { children: React.ReactNode }): void {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">{/* Navigation component will go here */}</nav>
          <main>{children}</main>
          <footer className="bg-gray-800 text-white">{/* Footer component will go here */}</footer>
        </div>
      </body>
    </html>
  );
}
