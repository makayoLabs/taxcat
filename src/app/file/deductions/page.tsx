import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight, ArrowLeft, DollarSign, Heart, Home, Car, GraduationCap } from 'lucide-react'

export default function DeductionsPage() {
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
              <div className="w-16 h-px bg-blue-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                <span className="ml-2 text-sm font-medium text-gray-900">Deductions</span>
              </div>
              <div className="w-16 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                <span className="ml-2 text-sm text-gray-600">Review</span>
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Deductions & Tax Credits</h1>
            <p className="text-lg text-gray-600">
              Tell us about your eligible deductions and credits to maximize your refund.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            <form className="space-y-8">
              {/* RRSP Contributions */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                  RRSP Contributions
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">RRSP Contribution Amount</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Amount contributed to your RRSP in the tax year</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">RRSP Loan Repayment</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Amount repaid on RRSP loans</p>
                  </div>
                </div>
              </div>

              {/* Medical Expenses */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-600" />
                  Medical Expenses
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Medical Expenses</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Medical expenses paid in the tax year</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medical Expense Tax Credit</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Calculated credit (15% of eligible expenses over threshold)</p>
                  </div>
                </div>
              </div>

              {/* Charitable Donations */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-green-600" />
                  Charitable Donations
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cash Donations</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Non-Cash Donations</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Fair market value of donated property</p>
                  </div>
                </div>
              </div>

              {/* Home Office Expenses */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Home className="h-5 w-5 mr-2 text-purple-600" />
                  Home Office Expenses
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Office Space (sq ft)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Home Size (sq ft)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Home Office Expenses</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Utilities, internet, supplies, etc.</p>
                  </div>
                </div>
              </div>

              {/* Other Deductions */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Other Deductions & Credits</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carrying Charges</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Investment loan interest, property taxes on investments</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Moving Expenses</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Political Contributions</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Canada Pension Plan (CPP) Contributions</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Voluntary CPP contributions</p>
                  </div>
                </div>
              </div>

              {/* Tax Credits */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />
                  Education & Other Credits
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tuition & Education Amounts</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Canada Workers Benefit</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GST/HST Credit</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Text */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Don't forget these common deductions:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• RRSP contributions reduce your taxable income</li>
                  <li>• Medical expenses can provide tax credits</li>
                  <li>• Charitable donations are tax-deductible</li>
                  <li>• Home office expenses if you work from home</li>
                  <li>• Carrying charges on investments</li>
                </ul>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <a
                  href="/file/income"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </a>
                <a
                  href="/file/review"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md flex items-center gap-2 transition-colors"
                >
                  Continue to Review
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}