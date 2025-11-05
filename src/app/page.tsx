import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight, Calculator, Shield, Clock, CheckCircle, FileText, Users, Award } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen theme-taxcat">
      <Header />

      {/* Hero Section - Tax Filing Focus */}
      <section className="ws-section-lg ws-section-primary">
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
              <div className="flex gap-4 mt-8">
                <button className="ws-button ws-button-primary ws-button-lg">
                  Start Filing
                </button>
                <button className="ws-button ws-button-secondary ws-button-lg">
                  Learn More
                </button>
              </div>
            </div>
            <div className="ws-media ws-media-rounded">
              <div className="text-center text-6xl p-12 bg-background-hero rounded-2xl">
                📊
              </div>
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
            <h2 className="ws-display-md ws-balance">
              Pick the plan that's right for you
            </h2>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                <p className="ws-text-lg ws-color-muted mb-4">
                  Every powerful feature you need to file with confidence.
                </p>
                <div className="text-4xl font-bold mb-6">$0</div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">Guarantees your maximum refund</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">Optimizes credits and deductions</span>
                  </li>
                </ul>
                <button className="ws-button ws-button-primary w-full">
                  Get Started
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card h-full flex flex-col border-2 border-brand-primary">
                <div className="bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-semibold inline-block self-start mb-4">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Plus</h3>
                <p className="ws-text-lg ws-color-muted mb-4">
                  Priority email support and audit protection.
                </p>
                <div className="text-4xl font-bold mb-6">
                  $40 <span className="text-lg font-normal ws-color-muted">+ tax</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">All the Basic benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">Audit protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">Priority support (1 day)</span>
                  </li>
                </ul>
                <button className="ws-button ws-button-primary w-full">
                  Get Started
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="ws-text-lg ws-color-muted mb-4">
                  One-on-one consultation from a tax expert.
                </p>
                <div className="text-4xl font-bold mb-6">
                  $80 <span className="text-lg font-normal ws-color-muted">+ tax</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">All the Plus benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">Customized advice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary text-xl">✓</span>
                    <span className="ws-text-md">Expert review</span>
                  </li>
                </ul>
                <button className="ws-button ws-button-primary w-full">
                  Get Started
                </button>
              </div>
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