import React from 'react'
import { ArrowRight, Calculator, Shield, Clock, CheckCircle } from 'lucide-react'

const HeroSection = () => {
  return (
    <section id="home" className="pt-16 min-h-screen flex items-center bg-white">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Better than your{' '}
                <span className="text-blue-600">tax software</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Get the most out of your tax filing with professional preparation, expert guidance, 
                and year-round support to maximize your returns and minimize your stress.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg flex items-center gap-2 text-lg transition-colors">
                Get started
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-8 rounded-lg text-lg transition-colors">
                Free consultation
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Calculator className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Maximum refund guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">CPA certified professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">Year-round support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                </div>
                <span className="text-gray-700 font-medium">100% accuracy guarantee</span>
              </div>
            </div>
          </div>

          {/* Right side - Cards */}
          <div className="space-y-6">
            {/* Main Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Tax Filing</h3>
                <p className="text-gray-600 mb-6">
                  Complete individual tax preparation with expert review and maximum refund guarantee.
                </p>
                <div className="text-4xl font-bold text-blue-600 mb-4">Starting at $99</div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full transition-colors">
                  Start filing
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">3,000+</div>
                <div className="text-sm text-gray-600">Returns filed</div>
              </div>
              <div className="text-center bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">$2.1M</div>
                <div className="text-sm text-gray-600">Refunds secured</div>
              </div>
              <div className="text-center bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Accuracy rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
