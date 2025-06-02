import React from 'react'
import { ArrowRight } from 'lucide-react'

const HeroSection = () => {
  return (
    <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-background-light to-white">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark leading-tight">
                Tax Filing Made{' '}
                <span className="text-primary-navy">Easy</span>,{' '}
                <span className="text-accent-gold">Smart</span>, and{' '}
                <span className="text-primary-blue">Secure</span>
              </h1>
              <p className="text-xl text-text-light max-w-lg">
                Professional tax preparation and advisory services for individuals and small businesses. 
                Get expert guidance with transparent pricing and year-round support.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                File With Us Today
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Free Consultation
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-navy">500+</div>
                <div className="text-sm text-text-light">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-navy">98%</div>
                <div className="text-sm text-text-light">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-navy">10+</div>
                <div className="text-sm text-text-light">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Professional tax consultation"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/20 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg card">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-accent-gold rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🏆</span>
                </div>
                <div>
                  <div className="font-semibold text-text-dark">CPA Certified</div>
                  <div className="text-sm text-text-light">Professional Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 