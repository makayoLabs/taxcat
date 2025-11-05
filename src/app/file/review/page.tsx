import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight, ArrowLeft, Calculator, TrendingUp, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react'

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="container-max py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span className="ml-2 text-sm font-medium text-gray-900">Account Setup</span>
              </div>
              <div className="w-16 h-px bg-green-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span className="ml-2 text-sm font-medium text-gray-900">Income</span>
              </div>
              <div className="w-16 h-px bg-green-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span className="ml-2 text-sm font-medium text-gray-900">Deductions</span>
              </div>
              <div className="w-16 h-px bg-blue-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                <span className="ml-2 text-sm font-medium text-gray-900">Review</span>
              </div>
              <div className="w-16 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">5</div>
                <span className="ml-2 text-sm text-gray-600">Documents</span>
              </div>
              <div className="w-16 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">6</div>
                <span className="ml-2 text-sm text-gray-600">File</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Review & Optimize Your Return</h1>
            <p className="text-lg text-gray-600">
              Let's review your information and find opportunities to maximize your refund.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tax Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tax Calculation Summary */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                  Tax Calculation Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Total Income</span>
                    <span className="font-semibold text-gray-900">$75,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Deductions</span>
                    <span className="font-semibold text-green-600">-$8,500</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Taxable Income</span>
                    <span className="font-semibold text-gray-900">$66,500</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Federal Tax</span>
                    <span className="font-semibold text-gray-900">$12,345</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Provincial Tax</span>
                    <span className="font-semibold text-gray-900">$4,567</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">CPP Contributions</span>
                    <span className="font-semibold text-gray-900">$3,500</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">EI Premiums</span>
                    <span className="font-semibold text-gray-900">$856</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b-2 border-gray-200">
                    <span className="text-gray-700">Taxes Withheld</span>
                    <span className="font-semibold text-gray-900">$14,200</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-lg font-semibold text-gray-900">Refund Amount</span>
                    <span className="text-2xl font-bold text-green-600">$2,134</span>
                  </div>
                </div>
              </div>

              {/* Optimization Suggestions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Optimization Opportunities
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-green-50 border border-green-200 rounded-md">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-green-900">RRSP Contribution</h3>
                      <p className="text-sm text-green-700 mt-1">
                        You could contribute up to $3,500 more to your RRSP and save $1,050 in taxes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-blue-900">Medical Expense Credit</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        You may be eligible for additional medical expense tax credits. Consider reviewing your eligible expenses.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-yellow-900">Charitable Donations</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Consider increasing your charitable donations to reduce taxable income and support causes you care about.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Missing Information */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                  Missing Information
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-md">
                    <span className="text-sm text-orange-900">T4 slip from Employer ABC</span>
                    <button className="text-sm text-orange-700 hover:text-orange-900 font-medium">
                      Upload Document
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-md">
                    <span className="text-sm text-orange-900">Medical expense receipts</span>
                    <button className="text-sm text-orange-700 hover:text-orange-900 font-medium">
                      Add Details
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-md">
                    <span className="text-sm text-orange-900">RRSP contribution receipts</span>
                    <button className="text-sm text-orange-700 hover:text-orange-900 font-medium">
                      Upload Document
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    Edit Income Information
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    Update Deductions
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    Add Missing Documents
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    Save Progress
                  </button>
                </div>
              </div>

              {/* Tax Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">💡 Tax Tip</h3>
                <p className="text-sm text-blue-800">
                  RRSP contributions made before March 1st can be deducted on your current tax year return,
                  even if contributed in the following calendar year.
                </p>
              </div>

              {/* Refund Projection */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Projected Refund
                </h3>
                <div className="text-3xl font-bold text-green-600 mb-2">$2,134</div>
                <p className="text-sm text-green-700">
                  Based on your current information. This may change with additional deductions or credits.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <a
              href="/file/deductions"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Deductions
            </a>

            <div className="flex gap-4">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Save & Continue Later
              </button>
              <a
                href="/file/documents"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md flex items-center gap-2 transition-colors"
              >
                Continue to Documents
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}