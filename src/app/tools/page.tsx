import React from 'react';
import TaxCalculator from '@/components/TaxCalculator';

export default function Tools() {
  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">Free Tax Tools</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Tax planning tools to maximize your refund
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Use our free tax calculator and planning tools to estimate your tax liability and discover savings opportunities.
          </p>
        </div>
      </section>

      {/* Tax Calculator */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <TaxCalculator />
        </div>
      </section>

      {/* Link to New Calculators */}
      <section className="ws-section bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="ws-container">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg text-center">
            <div className="text-6xl mb-4">🧮</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Try Our New Tax Calculator Suite!
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              6 professional calculators with real-time calculations and Wealthsimple-inspired design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href="/calculators"
                className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all shadow-lg"
              >
                Explore All 6 Calculators →
              </a>
              <a
                href="/mock-return"
                className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
              >
                Practice Tax Filing
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Additional Tools */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">More Tax Planning Tools</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Comprehensive tools to help you understand and optimize your tax situation.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">RRSP Calculator</h3>
                <p className="ws-color-muted mb-6">
                  Calculate RRSP contributions and tax savings to maximize your retirement savings.
                </p>
                <a href="/tools/rrsp" className="ws-button ws-button-primary w-full block text-center">
                  Calculate RRSP Savings
                </a>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Deductions Finder</h3>
                <p className="ws-color-muted mb-6">
                  Discover all eligible tax deductions and credits based on your situation.
                </p>
                <a href="/tools/deductions" className="ws-button ws-button-primary w-full block text-center">
                  Find Deductions
                </a>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">TFSA Calculator</h3>
                <p className="ws-color-muted mb-6">
                  Calculate TFSA contribution limits and tax-free growth potential.
                </p>
                <a href="/tools/tfsa" className="ws-button ws-button-primary w-full block text-center">
                  Calculate TFSA Savings
                </a>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Interest Rate Calculator</h3>
                <p className="ws-color-muted mb-6">
                  Calculate loan payments and see CRA prescribed interest rates.
                </p>
                <a href="/tools/interest" className="ws-button ws-button-primary w-full block text-center">
                  Calculate Interest
                </a>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Benefits Calculator</h3>
                <p className="ws-color-muted mb-6">
                  Calculate GST/HST, CCR, OTB credits and provincial benefits you may qualify for.
                </p>
                <a href="/tools/benefits" className="ws-button ws-button-primary w-full block text-center">
                  Calculate Benefits
                </a>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Tax Calendar</h3>
                <p className="ws-color-muted mb-6">
                  Never miss important tax deadlines with our comprehensive tax calendar.
                </p>
                <a href="/tools/calendar" className="ws-button ws-button-primary w-full block text-center">
                  View Tax Calendar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Tax Education Resources</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Learn about Canadian taxes with our comprehensive guides and educational content.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Tax Basics</h3>
                <p className="ws-color-muted mb-4">
                  Understanding the fundamentals of Canadian income tax.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Read Guide
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Deductions & Credits</h3>
                <p className="ws-color-muted mb-4">
                  Complete guide to maximizing your tax deductions and credits.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Read Guide
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Self-Employment Tax</h3>
                <p className="ws-color-muted mb-4">
                  Everything freelancers and contractors need to know about taxes.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Read Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ws-section-lg ws-section-accent">
        <div className="ws-container text-center">
          <h2 className="ws-display-lg ws-balance mb-6">
            Ready to file your taxes?
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-2xl mx-auto">
            Use our tools to plan ahead, then let us handle the filing with guaranteed maximum refunds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ws-button ws-button-primary ws-button-lg">
              Start Filing Today
            </button>
            <button className="ws-button ws-button-secondary ws-button-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}






