import React from 'react'
import { BookOpen, Calculator, PiggyBank, Receipt, ArrowRight } from 'lucide-react'

const articles = [
  {
    icon: <Calculator className="h-5 w-5" />, // Tax calculator
    title: 'Tax calculator (2025)',
    desc: 'Estimate your refund with our quick Canadian tax calculator.',
  },
  {
    icon: <Receipt className="h-5 w-5" />, // RRSP guide
    title: 'RRSP contribution guide',
    desc: 'How much to contribute and when to maximize your refund.',
  },
  {
    icon: <PiggyBank className="h-5 w-5" />, // TFSA guide
    title: 'TFSA: What you can (and can’t) do',
    desc: 'Rules, limits, and strategies to grow tax‑free savings.',
  },
  {
    icon: <BookOpen className="h-5 w-5" />, // Filing checklist
    title: 'T1 filing checklist',
    desc: 'Everything you need before you file this season.',
  },
]

const EducationHub = (): JSX.Element => {
  return (
    <section className="py-20 bg-white">
      <div className="container-max">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">Learn</h2>
            <p className="text-xl text-gray-600">Guides, tools, and explainers to help you make smarter decisions.</p>
          </div>
          <button className="hidden sm:inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
            See all
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((a, i) => (
            <article key={i} className="group rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center mb-4">
                {a.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700">{a.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{a.desc}</p>
              <span className="text-blue-600 text-sm font-medium inline-flex items-center gap-1">
                Read more <ArrowRight className="h-3 w-3" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EducationHub










