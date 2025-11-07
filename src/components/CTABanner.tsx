import React from 'react'
import { ArrowRight } from 'lucide-react'

const CTABanner = (): JSX.Element => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="container-max">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">Show your money its worth</h3>
            <p className="text-white/80">Join thousands who file confidently with expert support and maximum refunds.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg flex items-center gap-2">
              Get started
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="bg-transparent border border-white/40 text-white font-semibold py-3 px-6 rounded-lg">
              Book a consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTABanner










