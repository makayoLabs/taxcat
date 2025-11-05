import React, { useState, useEffect } from 'react';

export default function DarkModeDemo() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">Dark Mode Demo</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Experience TaxCat in dark mode
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Toggle between light and dark themes to see how TaxCat adapts to your preference.
          </p>
          <button
            onClick={() => setDark(!dark)}
            className="ws-button ws-button-primary ws-button-lg"
          >
            {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Dark Mode Features</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Seamless theme switching with preserved readability and visual hierarchy.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Eye Comfort</h3>
                <p className="ws-color-muted mb-6">
                  Reduced eye strain during extended use with carefully calibrated contrast ratios.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Automatic Switching</h3>
                <p className="ws-color-muted mb-6">
                  Respects your system preference and remembers your choice across sessions.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Consistent Branding</h3>
                <p className="ws-color-muted mb-6">
                  Brand colors and visual hierarchy remain consistent across both light and dark themes.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component Examples */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Component Showcase</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              See how all components adapt seamlessly to dark mode.
            </p>
          </div>

          <div className="space-y-8">
            {/* Buttons */}
            <div>
              <h3 className="ws-text-2xl font-bold mb-6">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="ws-button ws-button-primary ws-button-sm">Small Primary</button>
                <button className="ws-button ws-button-primary">Default Primary</button>
                <button className="ws-button ws-button-primary ws-button-lg">Large Primary</button>
                <button className="ws-button ws-button-secondary">Secondary</button>
                <button className="ws-button ws-button-primary" disabled>Disabled</button>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className="ws-text-2xl font-bold mb-6">Cards</h3>
              <div className="ws-grid">
                <div className="ws-col-12 md:ws-col-4">
                  <div className="ws-card">
                    <h4 className="ws-text-xl font-semibold mb-2">Standard Card</h4>
                    <p className="ws-color-muted">
                      Cards automatically adapt their background and border colors for optimal contrast.
                    </p>
                  </div>
                </div>
                <div className="ws-col-12 md:ws-col-4">
                  <div className="ws-card-flat">
                    <h4 className="ws-text-xl font-semibold mb-2">Flat Card</h4>
                    <p className="ws-color-muted">
                      Flat cards use subtle borders instead of shadows in dark mode.
                    </p>
                  </div>
                </div>
                <div className="ws-col-12 md:ws-col-4">
                  <div className="ws-card bg-brand-primary text-white">
                    <h4 className="ws-text-xl font-semibold mb-2">Colored Card</h4>
                    <p className="opacity-90">
                      Colored cards maintain their brand colors while ensuring text readability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Elements */}
            <div>
              <h3 className="ws-text-2xl font-bold mb-6">Form Elements</h3>
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

            {/* Typography */}
            <div>
              <h3 className="ws-text-2xl font-bold mb-6">Typography</h3>
              <div className="space-y-4">
                <h1 className="ws-display-2xl">Display 2XL - Large headings</h1>
                <h1 className="ws-display-xl">Display XL - Hero headings</h1>
                <h2 className="ws-display-md">Display MD - Section headings</h2>
                <p className="ws-text-2xl">Text 2XL - Large intro text</p>
                <p className="ws-text-xl">Text XL - Subheading text</p>
                <p className="ws-text-lg">Text LG - Body text</p>
                <p className="ws-text-md ws-color-muted">Text MD - Muted text</p>
                <span className="ws-eyebrow-sm">Eyebrow Small - Label Text</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ws-section-lg ws-section-accent">
        <div className="ws-container text-center">
          <h2 className="ws-display-lg ws-balance mb-6">
            Experience the difference
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-2xl mx-auto">
            TaxCat's dark mode provides a comfortable viewing experience while maintaining professional aesthetics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setDark(!dark)}
              className="ws-button ws-button-primary ws-button-lg"
            >
              {dark ? 'Switch to Light Mode' : 'Try Dark Mode'}
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