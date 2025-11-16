import React from 'react';

export default function Services() {
  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">Tax Filing Services</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Professional tax services for every Canadian
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            From personal tax returns to business filings, we provide comprehensive tax solutions with guaranteed maximum refunds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ws-button ws-button-primary ws-button-lg">
              Start Your Return
            </button>
            <button className="ws-button ws-button-secondary ws-button-lg">
              Compare Plans
            </button>
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/services/tax-filing.jpg"
                alt="Professional Canadian tax filing services"
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg mb-2">Professional Tax Filing</h3>
                <p className="text-sm text-gray-600">CRA-certified filing with maximum refund guarantee</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/services/tax-deductions.jpg"
                alt="Tax deductions and credits optimization"
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg mb-2">Smart Deductions</h3>
                <p className="text-sm text-gray-600">AI-powered optimization finds every eligible credit</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/services/tax-completion.jpg"
                alt="Successful tax return completion"
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg mb-2">Fast & Secure</h3>
                <p className="text-sm text-gray-600">Complete your return in minutes with confidence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Tax Services */}
      <section id="services" className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6">
              <h2 className="ws-display-md ws-balance mb-6">
                Personal Tax Services
              </h2>
              <p className="ws-text-xl ws-color-muted leading-relaxed mb-8">
                Complete tax preparation services for individuals, couples, and families across Canada.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">T1 Tax Returns</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Professional preparation of T1 forms with automatic detection of all eligible credits and deductions.
                  </p>
                </div>

                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">Maximum Refund Guarantee</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Our advanced algorithms find every possible deduction. If we don't maximize your refund, you pay nothing.
                  </p>
                </div>

                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">CRA Compliance</h3>
                  <p className="ws-color-muted leading-relaxed">
                    All filings meet CRA standards with audit protection and unlimited support for any CRA inquiries.
                  </p>
                </div>
              </div>

              <button className="ws-button ws-button-primary">
                File Personal Taxes
              </button>
            </div>

            <div className="ws-col-12 md:ws-col-6">
              <div className="ws-card">
                <h3 className="ws-text-2xl font-bold mb-6">What's included</h3>
                <ul className="space-y-4">
                  {[
                    'T1 form preparation and filing',
                    'Automatic credit and deduction detection',
                    'Maximum refund guarantee',
                    'CRA compliance and audit protection',
                    'Year-round tax advisory support',
                    'Secure document storage',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-brand-primary mr-3 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="ws-grid">
                    <div className="ws-col-6 text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-brand-primary">99.8%</div>
                      <div className="ws-text-sm ws-color-muted mt-1">Accuracy Rate</div>
                    </div>
                    <div className="ws-col-6 text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-brand-primary">24/7</div>
                      <div className="ws-text-sm ws-color-muted mt-1">Expert Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Tax Services */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 order-2 md:order-1">
              <div className="ws-card">
                <h3 className="ws-text-2xl font-bold mb-6">Business tax features</h3>
                <ul className="space-y-4">
                  {[
                    'T2 corporate tax returns',
                    'Partnership and trust returns',
                    'GST/HST filings and compliance',
                    'Payroll tax calculations',
                    'Business expense optimization',
                    'Year-end tax planning',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-brand-primary mr-3 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="ws-grid">
                    <div className="ws-col-6 text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-brand-primary">100%</div>
                      <div className="ws-text-sm ws-color-muted mt-1">CRA Compliant</div>
                    </div>
                    <div className="ws-col-6 text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-brand-primary">Expert</div>
                      <div className="ws-text-sm ws-color-muted mt-1">Tax Advisors</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-5 md:ws-col-start-8 order-1 md:order-2">
              <h2 className="ws-display-md ws-balance mb-6">
                Business Tax Services
              </h2>
              <p className="ws-text-xl ws-color-muted leading-relaxed mb-8">
                Comprehensive tax services for businesses, corporations, and self-employed professionals.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">Corporate Tax Returns</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Professional T2 preparation with strategic tax planning to minimize corporate tax liability.
                  </p>
                </div>

                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">GST/HST Compliance</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Complete GST/HST filing services with automated calculations and CRA compliance.
                  </p>
                </div>
              </div>

              <button className="ws-button ws-button-primary">
                File Business Taxes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6">
              <h2 className="ws-display-md ws-balance mb-6">
                Additional Tax Services
              </h2>
              <p className="ws-text-xl ws-color-muted leading-relaxed mb-8">
                Specialized tax services to meet your unique financial needs.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">Tax Planning & Consulting</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Year-round tax planning to optimize your financial strategy and minimize tax liability.
                  </p>
                </div>

                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">Audit Support & Representation</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Professional representation and support if you receive a CRA audit notice.
                  </p>
                </div>
              </div>

              <button className="ws-button ws-button-primary">
                Learn More
              </button>
            </div>

            <div className="ws-col-12 md:ws-col-6">
              <div className="ws-card">
                <h3 className="ws-text-2xl font-bold mb-6">Specialized services</h3>
                <ul className="space-y-4">
                  {[
                    'Tax planning and strategy consulting',
                    'CRA audit support and representation',
                    'Tax dispute resolution',
                    'International tax services',
                    'Estate and trust tax planning',
                    'Tax-efficient business structuring',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-brand-primary mr-3 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="ws-grid">
                    <div className="ws-col-6 text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-brand-primary">Strategic</div>
                      <div className="ws-text-sm ws-color-muted mt-1">Tax Planning</div>
                    </div>
                    <div className="ws-col-6 text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-brand-primary">Expert</div>
                      <div className="ws-text-sm ws-color-muted mt-1">Representation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">
              All services include
            </h2>
          </div>

          <div className="ws-grid max-w-5xl mx-auto">
            <div className="ws-col-12 md:ws-col-4 text-center">
              <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="ws-text-lg font-bold mb-3">Secure & Confidential</h3>
              <p className="ws-color-muted">
                Your financial data is protected with bank-level security and strict confidentiality protocols.
              </p>
            </div>

            <div className="ws-col-12 md:ws-col-4 text-center">
              <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="ws-text-lg font-bold mb-3">Fast Turnaround</h3>
              <p className="ws-color-muted">
                Quick processing times without sacrificing accuracy. Most returns completed within 24-48 hours.
              </p>
            </div>

            <div className="ws-col-12 md:ws-col-4 text-center">
              <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="ws-text-lg font-bold mb-3">Expert Team</h3>
              <p className="ws-color-muted">
                Work with certified tax professionals who have decades of combined experience in Canadian tax law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="ws-section-lg ws-section-accent">
        <div className="ws-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="ws-display-lg ws-balance mb-6">Ready to file your taxes with confidence?</h2>
            <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 leading-relaxed">
              Join thousands of Canadians who trust TaxCat for their tax filing needs. Start your return today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="ws-button ws-button-primary ws-button-lg">
                Start Filing Today
              </button>
              <button className="ws-button ws-button-secondary ws-button-lg">
                Compare Plans
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}