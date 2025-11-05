import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight, User, MapPin, Phone, Mail, Shield } from 'lucide-react'

export default function AccountSetupPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="container-max py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                <span className="ml-2 text-sm font-medium text-gray-900">Account Setup</span>
              </div>
              <div className="w-16 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                <span className="ml-2 text-sm text-gray-600">Income</span>
              </div>
              <div className="w-16 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                <span className="ml-2 text-sm text-gray-600">Deductions</span>
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Let's Get Started</h1>
            <p className="text-lg text-gray-600">
              We'll need some basic information to prepare your tax return. This should only take a few minutes.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            <form className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Personal Information
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Social Insurance Number (SIN)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="XXX XXX XXX"
                  />
                  <p className="text-xs text-gray-500 mt-1">Your SIN is required for tax filing and is kept secure</p>
                </div>
              </div>

              {/* Filing Status */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Filing Status</h2>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="radio" name="filingStatus" value="single" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span className="ml-3 text-sm text-gray-700">Single</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="filingStatus" value="married" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span className="ml-3 text-sm text-gray-700">Married/Common-law</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="filingStatus" value="divorced" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span className="ml-3 text-sm text-gray-700">Divorced/Separated</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="filingStatus" value="widowed" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span className="ml-3 text-sm text-gray-700">Widowed</span>
                  </label>
                </div>
              </div>

              {/* Province */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Province of Residence
                </h2>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select your province</option>
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="ON">Ontario</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                  <option value="YT">Yukon</option>
                </select>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                  Contact Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(XXX) XXX-XXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-900">Your Information is Secure</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      We use bank-level encryption to protect your personal information and comply with all CRA privacy requirements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <a
                  href="/file/income"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md flex items-center gap-2 transition-colors"
                >
                  Continue to Income
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