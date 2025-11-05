import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FileText, TrendingUp, Clock, CheckCircle, AlertCircle, Download, Upload, MessageSquare, Settings, DollarSign, Calendar } from 'lucide-react'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <div className="container-max py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Dashboard</h1>
            <p className="text-lg text-gray-600">Manage your tax returns, documents, and account settings</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <nav className="space-y-2">
                  <a href="#overview" className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
                    <FileText className="h-4 w-4 mr-2" />
                    Overview
                  </a>
                  <a href="#returns" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    <FileText className="h-4 w-4 mr-2" />
                    Tax Returns
                  </a>
                  <a href="#documents" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    <Upload className="h-4 w-4 mr-2" />
                    Documents
                  </a>
                  <a href="#messages" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                  </a>
                  <a href="#settings" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Status Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">2024 Tax Return</h3>
                      <p className="text-2xl font-bold text-green-600">Filed</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Filed on March 15, 2024</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">Refund Status</h3>
                      <p className="text-2xl font-bold text-blue-600">$2,134</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Deposited on April 2, 2024</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">Next Deadline</h3>
                      <p className="text-2xl font-bold text-orange-600">April 30</p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">2025 Tax Return Due</p>
                </div>
              </div>

              {/* Current Tax Return Progress */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">2025 Tax Return Progress</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Account Setup</span>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-full h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Income Information</span>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-3/4 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Deductions & Credits</span>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-1/2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Document Upload</span>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-1/4 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Final Review & Filing</span>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-0 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="/file"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors"
                  >
                    Continue Filing
                  </a>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">2024 Tax Return Filed</p>
                      <p className="text-sm text-gray-600">Successfully filed with CRA on March 15, 2024</p>
                      <p className="text-xs text-gray-500 mt-1">March 15, 2024</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Refund Deposited</p>
                      <p className="text-sm text-gray-600">$2,134 refund deposited to your account</p>
                      <p className="text-xs text-gray-500 mt-1">April 2, 2024</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <Upload className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Documents Uploaded</p>
                      <p className="text-sm text-gray-600">T4 and T5 slips uploaded for 2024 tax return</p>
                      <p className="text-xs text-gray-500 mt-1">March 10, 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous Returns */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Previous Tax Returns</h2>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div>
                      <h3 className="font-medium text-gray-900">2024 Tax Return</h3>
                      <p className="text-sm text-gray-600">Filed on March 15, 2024 • Refund: $2,134</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View
                      </button>
                      <button className="text-sm text-gray-600 hover:text-gray-800">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div>
                      <h3 className="font-medium text-gray-900">2023 Tax Return</h3>
                      <p className="text-sm text-gray-600">Filed on April 5, 2023 • Refund: $1,856</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View
                      </button>
                      <button className="text-sm text-gray-600 hover:text-gray-800">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div>
                      <h3 className="font-medium text-gray-900">2022 Tax Return</h3>
                      <p className="text-sm text-gray-600">Filed on March 28, 2022 • Paid: $456</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View
                      </button>
                      <button className="text-sm text-gray-600 hover:text-gray-800">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
