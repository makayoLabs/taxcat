import React from 'react'
import { User, Building2, ArrowRight, Calculator, FileText, Shield, Clock, DollarSign } from 'lucide-react'

const ServicesOverview = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            For your everyday tax needs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're filing personal taxes or managing business finances, we've got you covered 
            with professional services and transparent pricing.
          </p>
        </div>

        {/* Main Service Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Personal Tax Service */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="mb-8">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personal Tax Filing</h3>
              <p className="text-gray-600 mb-6">
                Complete individual tax preparation with expert review and maximum refund guarantee. 
                Get every deduction and credit you deserve.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-gray-700">Maximum refund guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calculator className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-gray-700">Free tax calculation review</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <FileText className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-gray-700">All forms and schedules included</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">Starting at $99</div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full flex items-center justify-center gap-2 transition-colors">
                Get started
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Business Tax Service */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="mb-8">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Small Business & Freelance</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive business tax services including bookkeeping, quarterly filings, and 
                strategic tax planning for growth.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="h-3 w-3 text-orange-600" />
                </div>
                <span className="text-gray-700">Year-round tax support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-gray-700">Quarterly estimated payments</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-gray-700">Business expense optimization</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">Starting at $299</div>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg w-full flex items-center justify-center gap-2 transition-colors">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">📋</div>
            <h4 className="font-semibold text-gray-900 mb-2">Tax Planning</h4>
            <p className="text-sm text-gray-600">
              Strategic advice to minimize future tax liability and maximize savings
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🔍</div>
            <h4 className="font-semibold text-gray-900 mb-2">Audit Support</h4>
            <p className="text-sm text-gray-600">
              Professional representation and guidance if you face a CRA audit
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">💼</div>
            <h4 className="font-semibold text-gray-900 mb-2">Business Setup</h4>
            <p className="text-sm text-gray-600">
              Help incorporating and setting up your business structure for tax efficiency
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
