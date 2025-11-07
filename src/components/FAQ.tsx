import React from 'react'

const faqs = [
  {
    q: 'How long does a typical return take?',
    a: 'Most returns are completed within 24–48 hours once we have your documents.'
  },
  {
    q: 'Do you support complex situations (rental, self‑employed, investments)?',
    a: 'Yes. Our Professional and Premium tiers cover complex returns including rental income, self‑employment, and investment income.'
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We use modern encryption, access controls, and monitoring to protect your data.'
  },
  {
    q: 'Can I talk to a real person?',
    a: 'Absolutely. Book a free consultation and we’ll match you with a dedicated advisor.'
  }
]

const FAQ = (): JSX.Element => {
  return (
    <section className="py-20 bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to know about how we work.</p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200 rounded-2xl border border-gray-200">
          {faqs.map((item, idx) => (
            <details key={idx} className="group">
              <summary className="list-none cursor-pointer p-6 flex items-center justify-between">
                <span className="font-medium text-gray-900">{item.q}</span>
                <span className="text-gray-400 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ










