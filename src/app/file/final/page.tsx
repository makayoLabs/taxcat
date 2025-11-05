import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowLeft, CheckCircle, FileText, Send, Download, CreditCard, Shield, Clock } from 'lucide-react'

export default function FinalPage() {
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
              <div className="w-16 h-px bg-green-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span className="ml-2 text-sm font-medium text-gray-900">Review</span>
              </div>
              <div className="w-16 h-px bg-green-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span className="ml-2 text-sm font-medium text-gray-900">Documents</span>
              </div>
              <div className="w-16 h-px bg-blue-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">6</div>
                <span className="ml-2 text-sm font-medium text-gray-900">Final Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Final Review & Filing</h1>
            <p className="text-lg text-gray-600">
              Your tax return is ready. Review the final details and file electronically with the CRA.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Final Tax Summary */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Final Tax Return Summary - 2024
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Income Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Employment Income</span>
                          <span className="font-medium">$65,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Investment Income</span>
                          <span className="font-medium">$10,000</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium text-gray-900">Total Income</span>
                          <span className="font-medium text-gray-900">$75,000</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Deductions & Credits</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">RRSP Contributions</span>
                          <span className="font-medium">$5,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Medical Expenses</span>
                          <span className="font-medium">$2,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Other Deductions</span>
                          <span className="font-medium">$1,000</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium text-gray-900">Total Deductions</span>
                          <span className="font-medium text-gray-900">$8,500</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Tax Calculation</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Taxable Income</span>
                            <span className="font-medium">$66,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Federal Tax</span>
                            <span className="font-medium">$12,345</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Provincial Tax</span>
                            <span className="font-medium">$4,567</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">CPP/EI</span>
                            <span className="font-medium">$4,356</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-medium text-gray-900">Total Tax Owed</span>
                            <span className="font-medium text-gray-900">$21,268</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Payment Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Taxes Withheld</span>
                            <span className="font-medium">$14,200</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tax Credits</span>
                            <span className="font-medium">$3,934</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-medium text-green-600">Refund Amount</span>
                            <span className="font-bold text-green-600 text-lg">$2,134</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filing Options */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Filing Options</h2>

                <div className="space-y-4">
                  <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="filingMethod"
                          value="electronic"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <div className="ml-3">
                          <h3 className="font-medium text-blue-900">Electronic Filing (Recommended)</h3>
                          <p className="text-sm text-blue-700">File directly with CRA • Instant confirmation • Faster processing</p>
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-md">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="filingMethod"
                        value="mail"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Mail Filing</h3>
                        <p className="text-sm text-gray-600">Print and mail to CRA • Slower processing • Manual tracking</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                  Payment Options
                </h2>

                <div className="bg-green-50 border border-green-200 p-4 rounded-md mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-green-900">🎉 Great News!</h3>
                      <p className="text-sm text-green-700">You have a refund of $2,134 coming to you!</p>
                    </div>
                    <div className="text-2xl">💰</div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  Your refund will be direct deposited to your bank account within 2-3 weeks after CRA processing.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Filing Checklist */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Filing Checklist</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Personal information verified</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Income information complete</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Deductions and credits applied</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Documents uploaded and processed</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Tax calculations verified</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Ready for electronic filing</span>
                  </div>
                </div>
              </div>

              {/* Security & Compliance */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  Secure Filing
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 256-bit SSL encryption</li>
                  <li>• CRA-certified security</li>
                  <li>• Audit trail maintained</li>
                  <li>• Data deleted after filing</li>
                </ul>
              </div>

              {/* Processing Time */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Processing Time
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Electronic Filing:</strong> Instant submission</p>
                  <p><strong>CRA Processing:</strong> 2-4 weeks</p>
                  <p><strong>Refund Deposit:</strong> 2-3 weeks after approval</p>
                </div>
              </div>
            </div>
          </div>

          {/* Final Actions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <a
                href="/file/documents"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Documents
              </a>

              <div className="flex gap-4">
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-md flex items-center gap-2 transition-colors">
                  <Send className="h-4 w-4" />
                  File with CRA
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                By clicking "File with CRA", you authorize TaxCat to submit your tax return electronically.
                You can review and modify your return at any time before final submission.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}