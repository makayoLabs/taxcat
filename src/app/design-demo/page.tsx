import React from 'react';

export default function DesignSystemDemo() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Wealthsimple Style */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container">
          <div className="ws-split-hero">
            <div>
              <span className="ws-eyebrow-sm text-brand-primary">Made for Canadians, by Canadians</span>
              <h1 className="ws-display-xl ws-balance mt-4">
                Really great tax software at a really great price
              </h1>
              <p className="ws-text-lg ws-color-muted mt-6">
                No matter your tax needs, file with confidence and get the most out of your return for as little as $0.
              </p>
              <div className="flex gap-4 mt-8">
                <button className="ws-button ws-button-primary ws-button-lg">
                  Start Filing
                </button>
                <button className="ws-button ws-button-secondary ws-button-lg">
                  Learn More
                </button>
              </div>
            </div>
            <div className="ws-media ws-media-rounded bg-background-hero p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="ws-text-lg font-semibold">Tax Calculator</p>
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
                We guarantee your maximum refund
              </h2>
            </div>
            <div className="ws-col-12 md:ws-col-6 md:ws-col-start-7">
              <div className="space-y-6">
                <div>
                  <h3 className="ws-text-xl font-semibold mb-2">
                    Sophisticated features made simple
                  </h3>
                  <p className="ws-text-lg ws-color-muted">
                    Effective yet easy-to-use, every tool you need to seamlessly optimize your return is built right into our platform.
                  </p>
                </div>
                <div>
                  <h3 className="ws-text-xl font-semibold mb-2">
                    Filing that meets your needs
                  </h3>
                  <p className="ws-text-lg ws-color-muted">
                    Taxes aren't one size fits all. From spousal filing to audit protection, pick a plan that suits you best.
                  </p>
                </div>
                <div>
                  <h3 className="ws-text-xl font-semibold mb-2">
                    Transparent pricing
                  </h3>
                  <p className="ws-text-lg ws-color-muted">
                    No hidden fees or surprise charges. Our filing options start at just $0.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="ws-section-lg ws-section-dark">
        <div className="ws-container">
          <div className="text-center mb-12">
            <h2 className="ws-display-md ws-balance">
              Pick the plan that's right for you
            </h2>
          </div>
          
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                <p className="ws-text-lg ws-color-muted mb-4">
                  Every powerful feature you need to file with confidence.
                </p>
                <div className="text-4xl font-bold mb-6">$0</div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">Guarantees your maximum refund</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">Optimizes credits and deductions</span>
                  </li>
                </ul>
                <button className="ws-button ws-button-primary w-full">
                  Get Started
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card h-full flex flex-col border-2 border-brand-primary">
                <div className="bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-semibold inline-block self-start mb-4">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Plus</h3>
                <p className="ws-text-lg ws-color-muted mb-4">
                  Priority email support and audit protection.
                </p>
                <div className="text-4xl font-bold mb-6">
                  $40 <span className="text-lg font-normal ws-color-muted">+ tax</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">All the Basic benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">Audit protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">Priority support (1 day)</span>
                  </li>
                </ul>
                <button className="ws-button ws-button-primary w-full">
                  Get Started
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="ws-text-lg ws-color-muted mb-4">
                  One-on-one consultation from a tax expert.
                </p>
                <div className="text-4xl font-bold mb-6">
                  $80 <span className="text-lg font-normal ws-color-muted">+ tax</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">All the Plus benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">Customized advice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">Expert review</span>
                  </li>
                </ul>
                <button className="ws-button ws-button-primary w-full">
                  Get Started
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
            Your maximum refund awaits
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 max-w-2xl mx-auto">
            Join the 2 million Canadians who use TaxCat to file easily, efficiently, and affordably.
          </p>
          <button className="ws-button ws-button-primary ws-button-lg">
            Start Filing Today
          </button>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <h2 className="ws-display-md mb-12">Design System Components</h2>
          
          {/* Buttons */}
          <div className="mb-12">
            <h3 className="ws-text-2xl font-semibold mb-6">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="ws-button ws-button-primary ws-button-sm">Small Primary</button>
              <button className="ws-button ws-button-primary">Default Primary</button>
              <button className="ws-button ws-button-primary ws-button-lg">Large Primary</button>
              <button className="ws-button ws-button-secondary">Secondary</button>
              <button className="ws-button ws-button-primary" disabled>Disabled</button>
            </div>
          </div>

          {/* Typography */}
          <div className="mb-12">
            <h3 className="ws-text-2xl font-semibold mb-6">Typography</h3>
            <div className="space-y-4">
              <h1 className="ws-display-2xl">Display 2XL</h1>
              <h1 className="ws-display-xl">Display XL</h1>
              <h2 className="ws-display-md">Display MD</h2>
              <p className="ws-text-2xl">Text 2XL - Large intro text</p>
              <p className="ws-text-xl">Text XL - Subheading text</p>
              <p className="ws-text-lg">Text LG - Body text</p>
              <p className="ws-text-md ws-color-muted">Text MD - Muted text</p>
              <span className="ws-eyebrow-sm">Eyebrow Small - Label Text</span>
            </div>
          </div>

          {/* Cards */}
          <div className="mb-12">
            <h3 className="ws-text-2xl font-semibold mb-6">Cards</h3>
            <div className="ws-grid">
              <div className="ws-col-12 md:ws-col-4">
                <div className="ws-card">
                  <h4 className="ws-text-xl font-semibold mb-2">Hover Card</h4>
                  <p className="ws-text-md ws-color-muted">
                    This card has a hover effect with shadow and transform.
                  </p>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-4">
                <div className="ws-card-flat">
                  <h4 className="ws-text-xl font-semibold mb-2">Flat Card</h4>
                  <p className="ws-text-md ws-color-muted">
                    This card has a border instead of shadow.
                  </p>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-4">
                <div className="ws-card bg-brand-primary text-white">
                  <h4 className="ws-text-xl font-semibold mb-2">Colored Card</h4>
                  <p className="ws-text-md opacity-90">
                    This card uses the brand primary color.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="mb-12">
            <h3 className="ws-text-2xl font-semibold mb-6">Form Elements</h3>
            <div className="max-w-md space-y-4">
              <div>
                <label className="ws-label" htmlFor="demo-email">Email Address</label>
                <input
                  type="email"
                  id="demo-email"
                  className="ws-input"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="ws-label" htmlFor="demo-select">Province</label>
                <select id="demo-select" className="ws-input">
                  <option>Ontario</option>
                  <option>British Columbia</option>
                  <option>Alberta</option>
                  <option>Quebec</option>
                </select>
              </div>
              <div>
                <label className="ws-label" htmlFor="demo-textarea">Message</label>
                <textarea
                  id="demo-textarea"
                  className="ws-input"
                  rows={4}
                  placeholder="Enter your message..."
                />
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <h3 className="ws-text-2xl font-semibold mb-6">TaxCat Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="h-24 rounded-lg bg-brand-primary mb-2"></div>
                <p className="ws-text-sm font-semibold">Primary</p>
                <p className="ws-text-xs ws-color-muted">#00A950</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-brand-secondary mb-2"></div>
                <p className="ws-text-sm font-semibold">Secondary</p>
                <p className="ws-text-xs ws-color-muted">#134A8E</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-brand-accent mb-2"></div>
                <p className="ws-text-sm font-semibold">Accent</p>
                <p className="ws-text-xs ws-color-muted">#F5A623</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-background-alt border border-gray-200 mb-2"></div>
                <p className="ws-text-sm font-semibold">Background Alt</p>
                <p className="ws-text-xs ws-color-muted">#eeece7</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}