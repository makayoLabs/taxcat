import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, TrendingUp, PiggyBank, DollarSign, FileText, Percent, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Canadian Tax Calculators | TaxCat',
  description: 'Free tax calculators for Canadians. Calculate tax brackets, RRSP savings, TFSA room, CPP/EI, HST/GST, and estimate your tax refund. All provinces supported.',
  keywords: ['Canadian tax calculator', 'RRSP calculator', 'TFSA calculator', 'tax refund estimator', 'CPP calculator', 'EI calculator', 'HST calculator', 'tax bracket calculator'],
  openGraph: {
    title: 'Free Canadian Tax Calculators | TaxCat',
    description: 'Free tax calculators for Canadians. Calculate tax brackets, RRSP savings, TFSA room, and more.',
    url: 'https://taxcat.ca/calculators',
    siteName: 'TaxCat',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Canadian Tax Calculators | TaxCat',
    description: 'Free tax calculators for Canadians. All provinces supported.',
  }
};

interface CalculatorCard {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  status: 'available' | 'coming-soon';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const calculators: CalculatorCard[] = [
  {
    title: 'Tax Bracket Calculator',
    description: 'Find your tax bracket and understand marginal vs average tax rates',
    href: '/calculators/tax-bracket',
    icon: <TrendingUp className="w-8 h-8" />,
    status: 'available',
    difficulty: 'beginner'
  },
  {
    title: 'GST/HST/PST Calculator',
    description: 'Calculate Canadian sales tax for any province or territory',
    href: '/calculators/hst-gst',
    icon: <Percent className="w-8 h-8" />,
    status: 'available',
    difficulty: 'beginner'
  },
  {
    title: 'TFSA Calculator',
    description: 'Calculate your TFSA contribution room and project growth',
    href: '/calculators/tfsa',
    icon: <PiggyBank className="w-8 h-8" />,
    status: 'available',
    difficulty: 'intermediate'
  },
  {
    title: 'CPP/EI Calculator',
    description: 'Calculate CPP and EI contributions for employees and self-employed',
    href: '/calculators/cpp-ei',
    icon: <FileText className="w-8 h-8" />,
    status: 'available',
    difficulty: 'beginner'
  },
  {
    title: 'Marginal Tax Rate Calculator',
    description: 'See how additional income is taxed and compare income types',
    href: '/calculators/marginal-rate',
    icon: <Calculator className="w-8 h-8" />,
    status: 'available',
    difficulty: 'advanced'
  },
  {
    title: 'Tax Refund Estimator',
    description: 'Estimate your tax refund or amount owing with detailed breakdown',
    href: '/calculators/refund-estimator',
    icon: <DollarSign className="w-8 h-8" />,
    status: 'available',
    difficulty: 'intermediate'
  }
];

export default function CalculatorsPage() {
  const availableCalculators = calculators.filter(c => c.status === 'available');
  const comingSoonCalculators = calculators.filter(c => c.status === 'coming-soon');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Tax Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Free Canadian tax calculators to help you estimate taxes, plan finances, 
            and make informed decisions. All calculators use official 2025 CRA rates.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {availableCalculators.length}
            </div>
            <div className="text-gray-600">Available Now</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              100%
            </div>
            <div className="text-gray-600">Free Forever</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              13
            </div>
            <div className="text-gray-600">Provinces Supported</div>
          </div>
        </div>

        {/* Available Calculators */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Available Calculators
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {availableCalculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {calc.icon}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      calc.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                      calc.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {calc.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {calc.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {calc.description}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Use Calculator
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        {comingSoonCalculators.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Coming Soon
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonCalculators.map((calc) => (
                <div
                  key={calc.href}
                  className="bg-white rounded-lg shadow-md p-6 opacity-75"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gray-100 text-gray-400 rounded-lg">
                      {calc.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                      Coming Soon
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {calc.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    {calc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Why Use Our Calculators?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-semibold mb-2">100% Accurate</h3>
              <p className="text-sm opacity-90">
                Uses official 2025 CRA tax rates and formulas
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm opacity-90">
                Real-time calculations as you type
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold mb-2">Private & Secure</h3>
              <p className="text-sm opacity-90">
                All calculations done in your browser
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Want to Learn More About Taxes?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Check out our free tax education courses to understand how taxes work, 
            maximize your refund, and make smarter financial decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/learn"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              href="/mock-return"
              className="px-8 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Practice Tax Filing
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600 text-center">
          <p className="font-semibold mb-2">⚠️ Important Disclaimer</p>
          <p>
            These calculators provide estimates for educational purposes only. 
            Actual taxes may vary based on your specific situation. 
            Consult with a tax professional for personalized advice.
          </p>
        </div>
      </div>
    </div>
  );
}