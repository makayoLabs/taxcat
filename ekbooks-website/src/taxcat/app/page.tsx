import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Shield, Calculator, FileText, Clock } from 'lucide-react';

export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-navy to-primary-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-serif mb-6">Professional Tax Services Made Simple</h1>
            <p className="text-xl mb-8 opacity-90">
              Get your taxes done right with our expert tax preparation services. Fast, accurate,
              and maximized refunds guaranteed.
            </p>
            <Link
              href="/tax-return/new"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold bg-accent-gold text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Start Your Tax Return
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-12">Our Tax Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Personal Tax Returns */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-accent-gold mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personal Tax Returns</h3>
              <p className="text-text-light mb-4">
                Complete tax preparation for individuals, including T4s, T5s, and all relevant
                deductions and credits.
              </p>
              <p className="font-semibold text-primary-blue">Starting at $99</p>
            </div>

            {/* Business Tax Returns */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-accent-gold mb-4">
                <Calculator className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Business Tax Returns</h3>
              <p className="text-text-light mb-4">
                Comprehensive tax services for small businesses, self-employed individuals, and
                corporations.
              </p>
              <p className="font-semibold text-primary-blue">Starting at $199</p>
            </div>

            {/* Tax Planning */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-accent-gold mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tax Planning</h3>
              <p className="text-text-light mb-4">
                Strategic tax planning to minimize your tax liability and maximize your financial
                future.
              </p>
              <p className="font-semibold text-primary-blue">Starting at $149</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-12">Why Choose Us</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-accent-gold flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Maximum Refund Guarantee</h3>
                  <p className="text-text-light">
                    We review every detail to ensure you get every deduction and credit you deserve.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Calculator className="h-6 w-6 text-accent-gold flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Accurate Calculations</h3>
                  <p className="text-text-light">
                    Our advanced tax software and expert review ensure 100% accurate calculations.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-accent-gold flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
                  <p className="text-text-light">
                    Get your taxes filed quickly with our streamlined process and experienced team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-navy text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            File your taxes with confidence. Our team is here to help.
          </p>
          <Link
            href="/tax-return/new"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold bg-accent-gold text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Start Your Tax Return
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}