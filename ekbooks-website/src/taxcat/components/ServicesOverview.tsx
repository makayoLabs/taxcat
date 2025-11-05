import React from 'react';
import { User, Building2, ArrowRight, Shield, Calculator, FileText } from 'lucide-react';

const ServicesOverview = (): void => {
  return (
    <section
      id="services"
      className="section-padding bg-gradient-to-br from-primary-navy/5 to-primary-blue/5"
    >
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mb-4">
            Comprehensive Tax Solutions
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Whether you're an individual taxpayer or running a small business, we have the expertise
            to maximize your returns and minimize your stress.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personal Tax Service */}
          <div className="card p-8 group hover:shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-blue/10 rounded-full mb-4 group-hover:bg-primary-blue/20 transition-colors duration-300">
                <User className="h-8 w-8 text-primary-blue" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-4">Personal Tax Preparation</h3>
              <p className="text-text-light mb-6">
                Complete individual tax filing services with expert guidance to ensure you get every
                deduction and credit you deserve.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-accent-gold" />
                <span className="text-text-dark">Maximum refund guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <Calculator className="h-5 w-5 text-accent-gold" />
                <span className="text-text-dark">Free tax calculation review</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-accent-gold" />
                <span className="text-text-dark">All forms and schedules included</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-primary-navy mb-2">Starting at $99</div>
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Business Tax Service */}
          <div className="card p-8 group hover:shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-gold/10 rounded-full mb-4 group-hover:bg-accent-gold/20 transition-colors duration-300">
                <Building2 className="h-8 w-8 text-accent-gold" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-4">Small Business & Freelance</h3>
              <p className="text-text-light mb-6">
                Comprehensive business tax services including bookkeeping, quarterly filings, and
                strategic tax planning for growth.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary-blue" />
                <span className="text-text-dark">Year-round tax support</span>
              </div>
              <div className="flex items-center gap-3">
                <Calculator className="h-5 w-5 text-primary-blue" />
                <span className="text-text-dark">Quarterly estimated payments</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary-blue" />
                <span className="text-text-dark">Business expense optimization</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-primary-navy mb-2">Starting at $299</div>
              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="text-center p-6 rounded-lg bg-white/50">
            <div className="text-4xl mb-4">📋</div>
            <h4 className="font-semibold text-text-dark mb-2">Tax Planning</h4>
            <p className="text-sm text-text-light">
              Strategic advice to minimize future tax liability
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white/50">
            <div className="text-4xl mb-4">🔍</div>
            <h4 className="font-semibold text-text-dark mb-2">Audit Support</h4>
            <p className="text-sm text-text-light">
              Professional representation if you face an audit
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white/50">
            <div className="text-4xl mb-4">💼</div>
            <h4 className="font-semibold text-text-dark mb-2">Business Setup</h4>
            <p className="text-sm text-text-light">
              Help incorporating and setting up your business structure
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
