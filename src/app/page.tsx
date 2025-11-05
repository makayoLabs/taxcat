import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight, Calculator, Shield, Clock, CheckCircle, FileText, Users, Award } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen theme-taxcat">
      <Header />

      {/* Hero Section - Tax Filing Focus */}
      <section className="ws-section-lg taxcat-hero">
        <div className="ws-container">
          <div className="ws-split-hero">
            <div>
              <span className="ws-eyebrow-sm">Made for Canadians, by Canadians</span>
              <h1 className="ws-display-xl ws-balance mt-4">
                Really great tax software at a really great price
              </h1>
              <p className="ws-text-lg ws-color-muted mt-6">
                No matter your tax needs, file with confidence and get the most out of your return for as little as $0.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="ws-button ws-button-primary ws-button-lg">
                  Start Filing
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="ws-button ws-button-secondary ws-button-lg">
                  Learn More
                </button>
              </div>
            </div>
            <div className="ws-media ws-media-rounded">
              <div className="text-center text-6xl p-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg taxcat-hero-image">
                📊
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics Section */}
      <section className="ws-section ws-section-primary border-b border-gray-200">
        <div className="ws-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="ws-display-md text-brand-primary mb-2">2M+</div>
              <p className="ws-text-md ws-color-muted">Canadians trust TaxCat</p>
            </div>
            <div className="text-center">
              <div className="ws-display-md text-brand-primary mb-2">$500M+</div>
              <p className="ws-text-md ws-color-muted">In refunds processed</p>
            </div>
            <div className="text-center">
              <div className="ws-display-md text-brand-primary mb-2">4.8★</div>
              <p className="ws-text-md ws-color-muted">Average rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-5">
              <h2 className="ws-display-md ws-balance">
                We guarantee your maximum refund
              </h2>
            </div>
            <div className="ws-col-12 md:ws-col-6 md:ws-col-start-7">
              <div className="space-y-6">
                <div>
                  <h3 className="ws-text-xl font-semibold mb-2">
                    Sophisticated features made simple
                  </h3>
                  <p className="ws-text-lg ws-color-muted">
                    Effective yet easy-to-use, every tool you need to seamlessly optimize your return is built right into our platform.
                  </p>
                </div>
                <div>
                  <h3 className="ws-text-xl font-semibold mb-2">
                    Filing that meets your needs
                  </h3>
                  <p className="ws-text-lg ws-color-muted">
                    Taxes aren't one size fits all. From spousal filing to audit protection, pick a plan that suits you best.
                  </p>
                </div>
                <div>
                  <h3 className="ws-text-xl font-semibold mb-2">
                    Transparent pricing
                  </h3>
                  <p className="ws-text-lg ws-color-muted">
                    No hidden fees or surprise charges. Our filing options start at just $0.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="ws-section-lg ws-section-dark">
        <div className="ws-container">
          <div className="text-center mb-12">
            <span className="ws-eyebrow-sm">Transparent Pricing</span>
            <h2 className="ws-display-md ws-balance mt-4">
              Pick the plan that's right for you
            </h2>
            <p className="ws-text-lg ws-color-muted mt-4 max-w-2xl mx-auto">
              From simple returns to complex situations, we have a plan that fits your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            <div className="ws-card h-full flex flex-col hover:shadow-xl transition-all duration-300">
              <div className="mb-4">
                <Calculator className="w-10 h-10 text-brand-primary mb-3" />
                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                <p className="ws-text-md ws-color-muted">
                  Every powerful feature you need to file with confidence.
                </p>
              </div>
              <div className="text-5xl font-bold mb-6 text-brand-primary">
                $0
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <span className="ws-text-md">Maximum refund guarantee</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <span className="ws-text-md">Optimized credits & deductions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <span className="ws-text-md">CRA NETFILE certified</span>
                </li>
              </ul>
              <button className="ws-button ws-button-primary w-full">
                Get Started
              </button>
            </div>

            <div className="ws-card h-full flex flex-col border-2 border-brand-primary relative hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              </div>
              <div className="mb-4 mt-4">
                <Shield className="w-10 h-10 text-brand-primary mb-3" />
                <h3 className="text-2xl font-bold mb-2">Plus</h3>
                <p className="ws-text-md ws-color-muted">
                  Priority support and audit protection included.
                </p>
              </div>
              <div className="text-5xl font-bold mb-2 text-brand-primary">
                $40
              </div>
              <p className="text-sm ws-color-muted mb-6">+ tax</p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <span className="ws-text-md">All Basic features</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <span className="ws-text-md">Audit defense coverage</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <span className="ws-text-md">Priority support (24h response)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <span className="ws-text-md">Previous year returns</span>
                </li>
              </ul>
              <button className="ws-button ws-button-primary w-full">
                Get Started
              </button>
            </div>

            <div className="ws-card h-full flex flex-col hover:shadow-xl transition-all duration-300">
              <div className="mb-4">
                <Award className="w-10 h-10 text-brand-primary mb-3" />
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="ws-text-md ws-color-muted">
                  Expert guidance for complex tax situations.
                </p>
              </div>
              <div className="text-5xl font-bold mb-2 text-brand-primary">
                $80
              </div>
              <p className="text-sm ws-color-muted mb-6">+ tax</p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <span className="ws-text-md">All Plus features</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <span className="ws-text-md">Dedicated tax expert review</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <span className="ws-text-md">Personalized tax planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <span className="ws-text-md">Direct phone support</span>
                </li>
              </ul>
              <button className="ws-button ws-button-primary w-full">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ws-section-lg ws-section-accent">
        <div className="ws-container text-center">
          <h2 className="ws-display-lg ws-balance mb-6">
            Your maximum refund awaits
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 max-w-2xl mx-auto">
            Join the 2 million Canadians who use TaxCat to file easily, efficiently, and affordably.
          </p>
          <button className="ws-button ws-button-primary ws-button-lg">
            Start Filing Today
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}