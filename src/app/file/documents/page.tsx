import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight, ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, Eye, Download } from 'lucide-react'

export default function DocumentsPage() {
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
              <div className="w-16 h-px bg-blue-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">5</div>
                <span className="ml-2 text-sm font-medium text-gray-900">Documents</span>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Documents</h1>
            <p className="text-lg text-gray-600">
              Securely upload your tax documents. We'll automatically extract the information we need.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Document Upload Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload Zone */}
              <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-8">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Documents</h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop your files here, or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md cursor-pointer inline-block transition-colors"
                  >
                    Choose Files
                  </label>
                  <p className="text-sm text-gray-500 mt-3">
                    Supported formats: PDF, JPG, PNG (Max 10MB per file)
                  </p>
                </div>
              </div>

              {/* Required Documents */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Required Documents</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">T4 - Employment Income</h3>
                        <p className="text-sm text-gray-600">Statement of Employment Income</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600 font-medium">Uploaded</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">T4A - Other Income</h3>
                        <p className="text-sm text-gray-600">Pensions, annuities, and other income</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-orange-600 font-medium">Missing</span>
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">T5 - Investment Income</h3>
                        <p className="text-sm text-gray-600">Interest, dividends, and other investment income</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600 font-medium">Uploaded</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">Medical Expense Receipts</h3>
                        <p className="text-sm text-gray-600">For medical expense tax credit</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-orange-600 font-medium">Optional</span>
                      <AlertCircle className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Uploaded Documents */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Uploaded Documents</h2>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">T4_EmployerABC_2024.pdf</h3>
                        <p className="text-sm text-gray-600">Uploaded 2 minutes ago • 245 KB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">T5_BankXYZ_2024.pdf</h3>
                        <p className="text-sm text-gray-600">Uploaded 1 minute ago • 156 KB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Document Processing Status */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Processing Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">T4 Data Extraction</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">T5 Data Extraction</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Data Validation</span>
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">🔒 Secure & Private</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• End-to-end encryption</li>
                  <li>• CRA compliance certified</li>
                  <li>• Documents auto-deleted after filing</li>
                  <li>• No unauthorized access</li>
                </ul>
              </div>

              {/* Help */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Can't find your documents? We can help you request them from your employers or financial institutions.
                </p>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Request Documents →
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <a
              href="/file/review"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Review
            </a>

            <div className="flex gap-4">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Save & Continue Later
              </button>
              <a
                href="/file/final"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md flex items-center gap-2 transition-colors"
              >
                Continue to Final Review
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