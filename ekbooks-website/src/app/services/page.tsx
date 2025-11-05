import React from 'react';

export default function Services() {
  return (
    <div className="theme-ekbooks">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">Comprehensive Solutions</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Expert accounting services for every business need
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            From tax compliance to strategic financial guidance, we provide the expertise you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ws-button ws-button-primary ws-button-lg">
              Get started today
            </button>
            <button className="ws-button ws-button-secondary ws-button-lg">
              Explore services
            </button>
          </div>
        </div>
      </section>

      {/* Tax Services */}
      <section id="services" className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6">
              <h2 className="ws-display-md ws-balance mb-6">
                Tax Services
              </h2>
              <p className="ws-text-xl ws-color-muted leading-relaxed mb-8">
                Professional tax preparation and compliance services for individuals, businesses, partnerships, and trusts.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">Comprehensive tax solutions</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Our tax platform handles T1, T2, T3, and T5013 forms with precision, automatically finding credits and deductions to maximize your return.
                  </p>
                </div>

                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">Year-round support</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Tax planning doesn't stop at filing season. We provide ongoing advisory services to help you make smart financial decisions all year long.
                  </p>
                </div>

                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">CRA compliance guaranteed</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Stay compliant with confidence. Our certified professionals ensure accurate filings and provide audit support when needed.
                  </p>
                </div>
              </div>

              <button className="ws-button ws-button-primary">
                Get tax help
              </button>
            </div>

            <div className="ws-col-12 md:ws-col-6">
              <div className="ws-card">
                <h3 className="ws-text-2xl font-bold mb-6">What's included</h3>
                <ul className="space-y-4">
                  {[
                    'T1, T2, T3, and T5013 form preparation',
                    'Tax planning and optimization strategies',
                    'CRA compliance and audit support',
                    'Year-round tax advisory services',
                    'Maximum refund guarantee',
                    'Secure document handling',
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
                      <div className="ws-text-sm ws-color-muted mt-1">Accuracy Rate</div>
                    </div>
                    <div className="ws-col-6 text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-brand-primary">24/7</div>
                      <div className="ws-text-sm ws-color-muted mt-1">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bookkeeping Services */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 order-2 md:order-1">
              <div className="ws-card">
                <h3 className="ws-text-2xl font-bold mb-6">Bookkeeping features</h3>
                <ul className="space-y-4">
                  {[
                    'Monthly bookkeeping and reconciliation',
                    'Financial reporting and analysis',
                    'Accounts payable/receivable management',
                    'Bank and credit card reconciliation',
                    'Real-time financial insights',
                    'Cloud-based access',
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
                      <div className="text-3xl lg:text-4xl font-bold text-brand-primary">Monthly</div>
                      <div className="ws-text-sm ws-color-muted mt-1">Reporting</div>
                    </div>
                    <div className="ws-col-6 text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-brand-primary">Real-time</div>
                      <div className="ws-text-sm ws-color-muted mt-1">Updates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-5 md:ws-col-start-8 order-1 md:order-2">
              <h2 className="ws-display-md ws-balance mb-6">
                Bookkeeping Services
              </h2>
              <p className="ws-text-xl ws-color-muted leading-relaxed mb-8">
                Accurate and timely bookkeeping to keep your financial records organized and compliant.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">Stay organized effortlessly</h3>
                  <p className="ws-color-muted leading-relaxed">
                    From transaction recording to financial statement preparation, we handle the details so you can focus on growing your business.
                  </p>
                </div>

                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">Monthly insights</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Receive detailed monthly reports that give you clear visibility into your business finances and help inform strategic decisions.
                  </p>
                </div>
              </div>

              <button className="ws-button ws-button-primary">
                Start bookkeeping
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Payroll Services */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6">
              <h2 className="ws-display-md ws-balance mb-6">
                Payroll Services
              </h2>
              <p className="ws-text-xl ws-color-muted leading-relaxed mb-8">
                Complete payroll processing and compliance management for businesses of all sizes.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">Seamless processing</h3>
                  <p className="ws-color-muted leading-relaxed">
                    We handle everything from salary calculations to government filings, ensuring accuracy and timeliness every pay period.
                  </p>
                </div>

                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">Full compliance</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Stay compliant with federal and provincial regulations. We manage all remittances and filings so you don't have to worry.
                  </p>
                </div>
              </div>

              <button className="ws-button ws-button-primary">
                Get payroll help
              </button>
            </div>

            <div className="ws-col-12 md:ws-col-6">
              <div className="ws-card">
                <h3 className="ws-text-2xl font-bold mb-6">Payroll features</h3>
                <ul className="space-y-4">
                  {[
                    'Payroll processing and calculations',
                    'Government compliance and filings',
                    'Employee management and records',
                    'Direct deposit and pay stubs',
                    'T4 and ROE preparation',
                    'Year-end reporting',
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
                      <div className="ws-text-sm ws-color-muted mt-1">Compliance</div>
                    </div>
                    <div className="ws-col-6 text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-brand-primary">On-time</div>
                      <div className="ws-text-sm ws-color-muted mt-1">Payments</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CFO Services */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 order-2 md:order-1">
              <div className="ws-card">
                <h3 className="ws-text-2xl font-bold mb-6">CFO services overview</h3>
                <ul className="space-y-4">
                  {[
                    'Strategic financial planning and guidance',
                    'Budgeting and forecasting',
                    'Financial analysis and reporting',
                    'Cash flow management and optimization',
                    'Executive advisory services',
                    'Board presentation support',
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
                      <div className="ws-text-sm ws-color-muted mt-1">Guidance</div>
                    </div>
                    <div className="ws-col-6 text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-brand-primary">Executive</div>
                      <div className="ws-text-sm ws-color-muted mt-1">Level</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-5 md:ws-col-start-8 order-1 md:order-2">
              <h2 className="ws-display-md ws-balance mb-6">
                CFO Services
              </h2>
              <p className="ws-text-xl ws-color-muted leading-relaxed mb-8">
                Fractional CFO services providing strategic financial guidance for growing businesses.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">Executive-level expertise</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Get CFO-level financial leadership without the full-time commitment. Perfect for businesses ready to scale strategically.
                  </p>
                </div>

                <div>
                  <h3 className="ws-text-lg font-semibold mb-3">Data-driven decisions</h3>
                  <p className="ws-color-muted leading-relaxed">
                    Make informed business decisions with comprehensive financial analysis, forecasting, and strategic planning support.
                  </p>
                </div>
              </div>

              <button className="ws-button ws-button-primary">
                Get CFO support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="ws-section ws-section-primary">
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
                Quick processing times without sacrificing accuracy. Most services completed within 5-7 business days.
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
                Work with certified professionals who have decades of combined experience in Canadian accounting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="ws-section-lg ws-section-accent">
        <div className="ws-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="ws-display-lg ws-balance mb-6">Ready to get started?</h2>
            <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 leading-relaxed">
              Contact us today for a free consultation and discover how EKBooks can help streamline your financial operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="ws-button ws-button-primary ws-button-lg">
                Schedule free consultation
              </button>
              <button className="ws-button ws-button-secondary ws-button-lg">
                Call now: (123) 456-7890
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}