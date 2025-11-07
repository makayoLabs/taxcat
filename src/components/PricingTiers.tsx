import React from 'react'
import { Check, ArrowRight } from 'lucide-react'

const PricingTiers = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Benefits that grow with you
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the service level that matches your needs. All plans include our 
            maximum refund guarantee and year-round support.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
              <p className="text-gray-600 mb-6">Perfect for simple individual returns</p>
              <div className="text-4xl font-bold text-gray-900 mb-2">$99</div>
              <div className="text-sm text-gray-500">per return</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-gray-700">Personal tax return (T1)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-gray-700">Maximum refund guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-gray-700">Basic audit support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-gray-700">Email support</span>
              </div>
            </div>

            <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors">
              Get started
            </button>
          </div>

          {/* Professional Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-600 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
              <p className="text-gray-600 mb-6">For complex returns and small businesses</p>
              <div className="text-4xl font-bold text-blue-600 mb-2">$299</div>
              <div className="text-sm text-gray-500">per return</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-gray-700">Everything in Basic</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-gray-700">Small business returns (T2)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-gray-700">Quarterly tax planning</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-gray-700">Priority phone support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-gray-700">Dedicated tax advisor</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors">
              Get started
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <p className="text-gray-600 mb-6">For high-net-worth individuals and complex businesses</p>
              <div className="text-4xl font-bold text-gray-900 mb-2">$599</div>
              <div className="text-sm text-gray-500">per return</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-gray-700">Everything in Professional</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-gray-700">Estate tax planning</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-gray-700">International tax compliance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-gray-700">24/7 priority support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-gray-700">Personal tax strategist</span>
              </div>
            </div>

            <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors">
              Contact us
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include our maximum refund guarantee and bank-level security.
          </p>
          <p className="text-sm text-gray-500">
            Need help choosing? <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Schedule a free consultation</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default PricingTiers








