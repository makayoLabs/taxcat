'use client';

import Link from 'next/link';
import { FileText, CheckCircle, BookOpen, Shield, Clock, Users } from 'lucide-react';

export default function MockReturnLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Practice Filing Your Tax Return
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Learn how to file taxes with our interactive mock tax return wizard. 
            Practice without fear of mistakes!
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-12 max-w-4xl mx-auto">
          <div className="flex items-start">
            <Shield className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">
                ⚠️ This is a Practice Tool - Not for Actual Filing
              </h3>
              <p className="text-sm text-yellow-800">
                This mock tax return wizard is for <strong>educational purposes only</strong>. 
                It simulates the tax filing process but does NOT submit to the CRA. 
                Use this to learn and practice before filing your real tax return.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Learn by Doing</h3>
            <p className="text-gray-600">
              Step-by-step guidance through the entire tax filing process
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Mistakes</h3>
            <p className="text-gray-600">
              Practice safely without worrying about errors or penalties
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">See the Forms</h3>
            <p className="text-gray-600">
              Generate a mock PDF to see what a real tax return looks like
            </p>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            What You'll Learn
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Personal Information</h4>
                <p className="text-sm text-gray-600">
                  What information you need and how to enter it correctly
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Income Reporting</h4>
                <p className="text-sm text-gray-600">
                  How to report T4, T5, and other income sources
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Deductions</h4>
                <p className="text-sm text-gray-600">
                  Which deductions you qualify for and how to claim them
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Tax Credits</h4>
                <p className="text-sm text-gray-600">
                  Understanding and claiming available tax credits
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Review Process</h4>
                <p className="text-sm text-gray-600">
                  How to review your return before submitting
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Understanding Results</h4>
                <p className="text-sm text-gray-600">
                  How to read your Notice of Assessment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 mb-12 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-6 gap-4">
            {[
              { step: 1, title: 'Personal Info', icon: '👤' },
              { step: 2, title: 'Income', icon: '💰' },
              { step: 3, title: 'Deductions', icon: '📉' },
              { step: 4, title: 'Credits', icon: '🎁' },
              { step: 5, title: 'Review', icon: '👀' },
              { step: 6, title: 'Results', icon: '🎉' }
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="text-sm font-semibold mb-1">Step {item.step}</div>
                <div className="text-xs opacity-90">{item.title}</div>
                {index < 5 && (
                  <div className="hidden md:block text-2xl mt-2">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12">
          <Link
            href="/mock-return/wizard"
            className="inline-block px-12 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg"
          >
            Start Practice Tax Return →
          </Link>
          <p className="text-sm text-gray-600 mt-4">
            Takes about 15-20 minutes • Save and resume anytime
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 mb-1">15-20</div>
            <div className="text-sm text-gray-600">Minutes to Complete</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 mb-1">1000+</div>
            <div className="text-sm text-gray-600">Students Practiced</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
            <div className="text-sm text-gray-600">Safe & Private</div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Is this a real tax return?
              </h4>
              <p className="text-gray-600 text-sm">
                No. This is a practice tool for educational purposes only. It does NOT submit anything to the CRA.
                Use this to learn the process before filing your real tax return.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Do I need to use real information?
              </h4>
              <p className="text-gray-600 text-sm">
                No! You can use made-up information or our sample data. This is for practice only.
                We recommend using realistic numbers to get accurate learning experience.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Can I save my progress?
              </h4>
              <p className="text-gray-600 text-sm">
                Yes! Your progress is automatically saved. You can close the browser and come back later
                to continue where you left off.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Will I get a PDF?
              </h4>
              <p className="text-gray-600 text-sm">
                Yes! At the end, you'll receive a mock PDF showing what a completed tax return looks like.
                This helps you understand the forms before filing for real.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                What if I make a mistake?
              </h4>
              <p className="text-gray-600 text-sm">
                That's the point! This is a safe place to make mistakes and learn. You can go back and
                change answers at any time. There are no penalties for errors.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Ready to learn how to file taxes?</p>
          <Link
            href="/mock-return/wizard"
            className="inline-block px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Your Practice Return
          </Link>
        </div>
      </div>
    </div>
  );
}