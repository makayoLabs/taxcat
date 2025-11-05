import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="ws-section-lg ekbooks-hero">
      <div className="ws-container">
        <div className="ws-split-hero">
          <div>
            <span className="ws-eyebrow-sm">Professional Accounting Services</span>
            <h1 className="ws-display-xl ws-balance mt-4">
              Expert bookkeeping that grows with your business
            </h1>
            <p className="ws-text-lg ws-color-muted mt-6">
              Trusted financial solutions for entrepreneurs and corporations across Canada.
              Let us handle your books so you can focus on growing your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="ws-button ws-button-primary ws-button-lg">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="ws-button ws-button-secondary ws-button-lg">
                Our Services
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl font-bold text-brand-primary">500+</div>
                <div className="text-sm ws-color-muted">Businesses served</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-primary">15+</div>
                <div className="text-sm ws-color-muted">Years experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-primary">98%</div>
                <div className="text-sm ws-color-muted">Client satisfaction</div>
              </div>
            </div>
          </div>
          <div className="ws-media ws-media-rounded">
            <div className="text-center text-6xl p-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg ekbooks-hero-image">
              <TrendingUp className="w-24 h-24 text-brand-primary mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;