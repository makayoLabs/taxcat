import React from 'react';

export default function About() {
  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">About TaxCat</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Empowering Canadians with trusted tax expertise
          </h1>
          <p className="ws-text-xl ws-color-muted">
            Innovative solutions and personalized service that drives success and peace of mind.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6">
              <h2 className="ws-display-md ws-balance mb-6">Our Story</h2>
              <div className="space-y-6 ws-text-lg ws-color-muted leading-relaxed">
                <p>
                  Founded with a vision to revolutionize tax filing in Canada, TaxCat
                  combines deep-rooted financial expertise with cutting-edge technology to deliver
                  exceptional results for taxpayers of all backgrounds.
                </p>
                <p>
                  Our team of certified tax professionals brings decades of combined experience in
                  Canadian tax law, CRA regulations, and digital innovation. We understand
                  that taxes don't have to be complicated, which is why we make the process simple and accessible.
                </p>
                <p>
                  From individuals to small businesses, we partner with Canadians to navigate
                  complex tax landscapes, optimize returns, and build financial confidence for the future.
                </p>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-5 md:ws-col-start-8">
              <div className="ws-card">
                <h3 className="ws-text-2xl font-bold mb-6">Why choose TaxCat?</h3>
                <ul className="space-y-4">
                  {[
                    'Deep Canadian tax expertise and CRA compliance knowledge',
                    'Modern technology integrated with traditional tax wisdom',
                    'Client-focused approach with personalized attention',
                    'Proven track record of maximizing refunds',
                    'Transparent pricing with no hidden fees',
                    'Responsive support when you need it most',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-brand-primary mr-3 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Our Values</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Secure & Confidential</h3>
                <p className="ws-color-muted">
                  Your financial data is protected with bank-level security and strict confidentiality protocols.
                </p>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Fast & Efficient</h3>
                <p className="ws-color-muted">
                  Quick processing times without sacrificing accuracy. Most returns completed within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
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

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Maximum Refunds</h3>
                <p className="ws-color-muted">
                  Our advanced algorithms find every possible deduction and credit to maximize your tax refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-3 text-center">
              <div className="text-4xl lg:text-5xl font-bold text-brand-primary mb-2">50K+</div>
              <div className="ws-text-sm ws-color-muted">Tax Returns Filed</div>
            </div>
            <div className="ws-col-12 md:ws-col-3 text-center">
              <div className="text-4xl lg:text-5xl font-bold text-brand-primary mb-2">$2.1M</div>
              <div className="ws-text-sm ws-color-muted">Refunds Maximized</div>
            </div>
            <div className="ws-col-12 md:ws-col-3 text-center">
              <div className="text-4xl lg:text-5xl font-bold text-brand-primary mb-2">99.8%</div>
              <div className="ws-text-sm ws-color-muted">Accuracy Rate</div>
            </div>
            <div className="ws-col-12 md:ws-col-3 text-center">
              <div className="text-4xl lg:text-5xl font-bold text-brand-primary mb-2">24/7</div>
              <div className="ws-text-sm ws-color-muted">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ws-section-lg ws-section-accent">
        <div className="ws-container text-center">
          <h2 className="ws-display-lg ws-balance mb-6">
            Ready to file your taxes with confidence?
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-2xl mx-auto">
            Join thousands of Canadians who trust TaxCat for their tax filing needs. Start your return today.
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