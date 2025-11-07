import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold text-brand-primary mb-4">EKBooks</h3>
            <p className="text-gray-400 text-sm">
              Professional bookkeeping services for small businesses across the GTA.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/services" className="hover:text-brand-primary transition-colors">Bookkeeping</Link></li>
              <li><Link href="/services" className="hover:text-brand-primary transition-colors">Payroll</Link></li>
              <li><Link href="/services" className="hover:text-brand-primary transition-colors">Tax Preparation</Link></li>
              <li><Link href="/services" className="hover:text-brand-primary transition-colors">Consulting</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Sister Site */}
          <div>
            <h4 className="font-semibold mb-4">Tax Education</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                  TaxCat - Learn About Taxes →
                </a>
              </li>
              <li>
                <a href="http://localhost:3000/calculators" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                  Free Tax Calculators
                </a>
              </li>
              <li>
                <a href="http://localhost:3000/mock-return" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                  Practice Tax Filing
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EKBooks. All rights reserved. | Part of Black Margin Financial Services
          </p>
        </div>
      </div>
    </footer>
  );
}