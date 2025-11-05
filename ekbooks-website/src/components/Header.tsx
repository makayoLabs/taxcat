import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl lg:text-2xl font-bold text-brand-primary">
          EKBooks
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6 lg:space-x-8">
            <li><Link href="/" className="text-gray-600 hover:text-brand-primary font-medium transition-colors duration-200">Home</Link></li>
            <li><Link href="/about" className="text-gray-600 hover:text-brand-primary font-medium transition-colors duration-200">About</Link></li>
            <li><Link href="/services" className="text-gray-600 hover:text-brand-primary font-medium transition-colors duration-200">Services</Link></li>
            <li><Link href="/contact" className="text-gray-600 hover:text-brand-primary font-medium transition-colors duration-200">Contact</Link></li>
            <li><Link href="http://localhost:3001" target="_blank" className="text-brand-primary hover:text-brand-primary/80 font-semibold transition-colors duration-200">TaxCat App →</Link></li>
          </ul>
        </nav>
        {/* Mobile menu button - simplified for now */}
        <button className="md:hidden text-gray-600 hover:text-brand-primary">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}