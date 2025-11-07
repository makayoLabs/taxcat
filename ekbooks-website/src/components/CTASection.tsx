import React from 'react';

const CTASection: React.FC = () => {
  return (
    <div>
      {/* Main CTA */}
      <section className="ws-section-lg ws-section-accent">
        <div className="ws-container">
          <div className="text-center">
            <h2 className="ws-display-lg ws-balance mb-6">
              Your financial success awaits
            </h2>
            <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 leading-relaxed">
              Join hundreds of Canadian businesses who trust EKBooks for expert accounting, tax preparation, and financial guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="ws-button ws-button-primary ws-button-lg">
                Schedule consultation
              </button>
              <button className="ws-button ws-button-secondary ws-button-lg">
                Call (123) 456-7890
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TaxCat Cross-Promotion */}
      <section className="ws-section bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="ws-container">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
                  Free Tax Education
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Learn about taxes with TaxCat
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our sister site offers free tax calculators, educational courses, and practice tax filing tools for Canadians.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="http://localhost:3000/calculators"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors text-center"
                  >
                    Try Free Calculators →
                  </a>
                  <a
                    href="http://localhost:3000/mock-return"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-white text-teal-600 border-2 border-teal-500 rounded-lg font-semibold hover:bg-teal-50 transition-colors text-center"
                  >
                    Practice Tax Filing
                  </a>
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4 text-xl">What You Can Do on TaxCat:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Use 6 free tax calculators</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Practice filing a tax return</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Learn tax basics through courses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Get answers to tax questions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTASection;