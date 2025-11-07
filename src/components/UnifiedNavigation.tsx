'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Calculator, FileText, BookOpen, Briefcase } from 'lucide-react';

const UnifiedNavigation = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Black Margin */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-primary">
              🐱 TaxCat
            </div>
            <span className="hidden lg:block text-gray-300 text-sm">
              by Black Margin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Home */}
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                pathname === '/' ? 'text-primary bg-white/10' : 'text-white hover:text-primary hover:bg-white/5'
              }`}
            >
              Home
            </Link>

            {/* Tools Dropdown */}
            <div className="relative group">
              <button
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg flex items-center ${
                  pathname?.startsWith('/tools') || pathname?.startsWith('/calculators') || pathname?.startsWith('/mock-return')
                    ? 'text-primary bg-white/10'
                    : 'text-white hover:text-primary hover:bg-white/5'
                }`}
              >
                Tools
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Tax Tools
                  </div>
                  <Link
                    href="/calculators"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Calculator className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <div className="font-medium">Tax Calculators</div>
                      <div className="text-xs text-gray-500">6 free calculators</div>
                    </div>
                  </Link>
                  <Link
                    href="/mock-return"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <FileText className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <div className="font-medium">Practice Tax Filing</div>
                      <div className="text-xs text-gray-500">Interactive wizard</div>
                    </div>
                  </Link>
                  <Link
                    href="/tools"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Calculator className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <div className="font-medium">Legacy Calculator</div>
                      <div className="text-xs text-gray-500">Original tool</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Learn Dropdown */}
            <div className="relative group">
              <button
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg flex items-center ${
                  pathname?.startsWith('/learn') || pathname?.startsWith('/faq') || pathname?.startsWith('/glossary')
                    ? 'text-primary bg-white/10'
                    : 'text-white hover:text-primary hover:bg-white/5'
                }`}
              >
                Learn
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Education
                  </div>
                  <Link
                    href="/learn"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <BookOpen className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <div className="font-medium">Tax Courses</div>
                      <div className="text-xs text-gray-500">Free learning modules</div>
                    </div>
                  </Link>
                  <Link
                    href="/faq"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <div className="w-5 h-5 mr-3 text-primary flex items-center justify-center font-bold">?</div>
                    <div>
                      <div className="font-medium">FAQ</div>
                      <div className="text-xs text-gray-500">Common questions</div>
                    </div>
                  </Link>
                  <Link
                    href="/glossary"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <BookOpen className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <div className="font-medium">Tax Glossary</div>
                      <div className="text-xs text-gray-500">40+ terms defined</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* EKBooks Link */}
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              EKBooks
            </a>

            {/* Contact */}
            <Link
              href="/contact"
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                pathname === '/contact' ? 'text-primary bg-white/10' : 'text-white hover:text-primary hover:bg-white/5'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/auth/register"
              className="px-6 py-2 bg-primary text-gray-900 rounded-lg hover:bg-primary-light transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-primary transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-blue-700">
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium text-white hover:text-primary hover:bg-white/5 rounded transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Tools Section */}
            <div className="px-4 py-2">
              <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Tools</div>
              <Link
                href="/calculators"
                className="block px-3 py-2 text-sm text-white hover:text-primary hover:bg-white/5 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Tax Calculators
              </Link>
              <Link
                href="/mock-return"
                className="block px-3 py-2 text-sm text-white hover:text-primary hover:bg-white/5 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Practice Tax Filing
              </Link>
              <Link
                href="/tools"
                className="block px-3 py-2 text-sm text-white hover:text-primary hover:bg-white/5 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Legacy Calculator
              </Link>
            </div>

            {/* Learn Section */}
            <div className="px-4 py-2">
              <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Learn</div>
              <Link
                href="/learn"
                className="block px-3 py-2 text-sm text-white hover:text-primary hover:bg-white/5 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Tax Courses
              </Link>
              <Link
                href="/faq"
                className="block px-3 py-2 text-sm text-white hover:text-primary hover:bg-white/5 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/glossary"
                className="block px-3 py-2 text-sm text-white hover:text-primary hover:bg-white/5 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Tax Glossary
              </Link>
            </div>

            {/* Services Section */}
            <div className="px-4 py-2">
              <div className="text-xs font-semibold text-gray-400 uppercase mb-2">EKBooks Services</div>
              <Link
                href="/services"
                className="block px-3 py-2 text-sm text-white hover:text-primary hover:bg-white/5 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Bookkeeping Services
              </Link>
              <Link
                href="/team"
                className="block px-3 py-2 text-sm text-white hover:text-primary hover:bg-white/5 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Team
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-sm text-white hover:text-primary hover:bg-white/5 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                About EKBooks
              </Link>
            </div>

            <Link
              href="/contact"
              className="block px-4 py-2 text-sm font-medium text-white hover:text-primary hover:bg-white/5 rounded transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-4 px-4 border-t border-blue-700">
              <Link
                href="/auth/register"
                className="block px-4 py-2 bg-primary text-gray-900 rounded-lg hover:bg-primary-light transition-colors duration-200 font-semibold text-center"
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

export default UnifiedNavigation;

