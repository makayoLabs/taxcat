'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Tools', href: '/tools' },
    { name: 'Team', href: '/team' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [dark]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg'
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-primary-600">
              TaxCat
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 md:space-x-6 lg:space-x-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button
              className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setDark((v) => !v)}
              aria-label="Toggle dark mode"
            >
              {dark ? 'Light' : 'Dark'}
            </button>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors text-sm font-medium">
              Get Started
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary-600 focus:outline-none"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setDark((v) => !v)}
              >
                {dark ? 'Light mode' : 'Dark mode'}
              </button>
              <button
                className="w-full mt-4 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
