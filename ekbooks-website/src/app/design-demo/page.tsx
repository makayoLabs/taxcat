import React from 'react';

export default function DesignSystemDemo() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Wealthsimple Style */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container">
          <div className="ws-split-hero">
            <div>
              <span className="ws-eyebrow-sm text-brand-primary">Professional Accounting Services</span>
              <h1 className="ws-display-xl ws-balance mt-4">
                Expert bookkeeping that grows with your business
              </h1>
              <p className="ws-text-lg ws-color-muted mt-6">
                Trusted financial solutions for entrepreneurs and corporations across Canada.
              </p>
              <div className="flex gap-4 mt-8">
                <button className="ws-button ws-button-primary ws-button-lg">
                  Get Started
                </button>
                <button className="ws-button ws-button-secondary ws-button-lg">
                  Our Services
                </button>
              </div>
            </div>
            <div className="ws-media ws-media-rounded bg-background-hero p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <p className="ws-text-lg font-semibold">Professional Accounting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-5">
              <h2 className="ws-display-md ws-balance">
                Why businesses choose EKBooks
              </h2>
            </div>
            <div className="ws-col-12 md:ws-col-6 md:ws-col-start-7">
              <div className="space-y-6">
                <div>
                  <h3 className="ws-text-xl font-semibold mb-2">
                    Expert financial guidance
                  </h3>
                  <p className="ws-text-lg ws-color-muted">
                    Our certified accountants provide personalized advice to help your business thrive.
                  </p>
                </div>
                <div>
                  <h3 className="ws-text-xl font-semibold mb-2">
                    Comprehensive services
                  </h3>
                  <p className="ws-text-lg ws-color-muted">
                    From bookkeeping to tax planning, we handle all your financial needs.
                  </p>
                </div>
                <div>
                  <h3 className="ws-text-xl font-semibold mb-2">
                    Transparent pricing
                  </h3>
                  <p className="ws-text-lg ws-color-muted">
                    Clear, upfront pricing with no hidden fees or surprises.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="ws-section-lg ws-section-dark">
        <div className="ws-container">
          <div className="text-center mb-12">
            <h2 className="ws-display-md ws-balance">
              Our Services
            </h2>
          </div>
          
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card h-full">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-2xl font-bold mb-2">Bookkeeping</h3>
                <p className="ws-text-lg ws-color-muted mb-6">
                  Professional bookkeeping services to keep your finances organized and compliant.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card h-full border-2 border-brand-primary">
                <div className="bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                  Popular
                </div>
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-2">Tax Services</h3>
                <p className="ws-text-lg ws-color-muted mb-6">
                  Expert tax preparation and planning to maximize your deductions and minimize liability.
                </p>
                <button className="ws-button ws-button-primary w-full">
                  Get Started
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card h-full">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-2xl font-bold mb-2">Consulting</h3>
                <p className="ws-text-lg ws-color-muted mb-6">
                  Strategic financial consulting to help your business grow and succeed.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
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
            Ready to simplify your finances?
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 max-w-2xl mx-auto">
            Join hundreds of Canadian businesses who trust EKBooks for their accounting needs.
          </p>
          <button className="ws-button ws-button-primary ws-button-lg">
            Schedule a Consultation
          </button>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <h2 className="ws-display-md mb-12">Design System Components</h2>
          
          {/* Color Palette */}
          <div className="mb-12">
            <h3 className="ws-text-2xl font-semibold mb-6">EKBooks Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="h-24 rounded-lg bg-brand-primary mb-2"></div>
                <p className="ws-text-sm font-semibold">Primary</p>
                <p className="ws-text-xs ws-color-muted">#1A9E52</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-brand-secondary mb-2"></div>
                <p className="ws-text-sm font-semibold text-white">Secondary</p>
                <p className="ws-text-xs ws-color-muted">#191919</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-brand-accent mb-2"></div>
                <p className="ws-text-sm font-semibold">Accent</p>
                <p className="ws-text-xs ws-color-muted">#D32F2F</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-background-alt border border-gray-200 mb-2"></div>
                <p className="ws-text-sm font-semibold">Background Alt</p>
                <p className="ws-text-xs ws-color-muted">#eeece7</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div>
            <h3 className="ws-text-2xl font-semibold mb-6">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="ws-button ws-button-primary ws-button-sm">Small Primary</button>
              <button className="ws-button ws-button-primary">Default Primary</button>
              <button className="ws-button ws-button-primary ws-button-lg">Large Primary</button>
              <button className="ws-button ws-button-secondary">Secondary</button>
              <button className="ws-button ws-button-primary" disabled>Disabled</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}