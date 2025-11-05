import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="ws-section-lg ws-section-primary">
      <div className="ws-container">
        <div className="ws-split-hero">
          <div>
            <span className="ws-eyebrow-sm">Professional Accounting Services</span>
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
          <div className="ws-media ws-media-rounded">
            <div className="text-center text-6xl p-12 bg-background-hero rounded-2xl">
              📚
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;