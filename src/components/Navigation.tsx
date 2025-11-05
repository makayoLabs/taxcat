'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navigation = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = (
    <nav className="hidden md:flex space-x-8">
      <Link
        href="/"
        className={`text-sm font-medium transition-colors duration-200 hover:text-accent-gold ${
          pathname === '/' ? 'text-accent-gold' : 'text-white'
        }`}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={`text-sm font-medium transition-colors duration-200 hover:text-accent-gold ${
          pathname === '/about' ? 'text-accent-gold' : 'text-white'
        }`}
      >
        About
      </Link>
      <Link
        href="/services"
        className={`text-sm font-medium transition-colors duration-200 hover:text-accent-gold ${
          pathname === '/services' ? 'text-accent-gold' : 'text-white'
        }`}
      >
        Services
      </Link>
      <Link
        href="/tools"
        className={`text-sm font-medium transition-colors duration-200 hover:text-accent-gold ${
          pathname === '/tools' ? 'text-accent-gold' : 'text-white'
        }`}
      >
        Tools
      </Link>
      <Link
        href="/team"
        className={`text-sm font-medium transition-colors duration-200 hover:text-accent-gold ${
          pathname === '/team' ? 'text-accent-gold' : 'text-white'
        }`}
      >
        Team
      </Link>
      <Link
        href="/insights"
        className={`text-sm font-medium transition-colors duration-200 hover:text-accent-gold ${
          pathname === '/insights' ? 'text-accent-gold' : 'text-white'
        }`}
      >
        Insights
      </Link>
      <Link
        href="/contact"
        className={`text-sm font-medium transition-colors duration-200 hover:text-accent-gold ${
          pathname === '/contact' ? 'text-accent-gold' : 'text-white'
        }`}
      >
        Contact
      </Link>
    </nav>
  );

  return (
    <header className="bg-primary-navy shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-accent-gold">🐱 TaxCat</div>
          </Link>

          {/* Desktop Navigation */}
          {navigation}

          {/* Auth Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="text-sm text-white hover:text-accent-gold transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 bg-accent-gold text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-accent-gold transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-700">
            <Link
              href="/"
              className="block text-sm font-medium text-white hover:text-accent-gold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-sm font-medium text-white hover:text-accent-gold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="block text-sm font-medium text-white hover:text-accent-gold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/tools"
              className="block text-sm font-medium text-white hover:text-accent-gold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Tools
            </Link>
            <Link
              href="/team"
              className="block text-sm font-medium text-white hover:text-accent-gold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
            <Link
              href="/insights"
              className="block text-sm font-medium text-white hover:text-accent-gold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Insights
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium text-white hover:text-accent-gold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 space-y-3 border-t border-gray-700">
              <Link
                href="/auth/login"
                className="block text-sm text-white hover:text-accent-gold transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="block px-4 py-2 bg-accent-gold text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;