'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // General Tax Questions
  {
    category: 'General Tax Questions',
    question: 'When do I need to file my tax return?',
    answer: 'Most Canadians must file their tax return by April 30th. If you or your spouse are self-employed, the deadline is June 15th. However, any taxes owing are still due by April 30th to avoid interest charges.'
  },
  {
    category: 'General Tax Questions',
    question: 'Do I have to file taxes if I didn\'t earn much money?',
    answer: 'Even if you earned little or no income, you should still file a tax return. Filing allows you to receive benefits like the GST/HST credit, Canada Workers Benefit, and provincial credits. You may also get a refund of taxes withheld.'
  },
  {
    category: 'General Tax Questions',
    question: 'What happens if I file my taxes late?',
    answer: 'If you owe taxes and file late, you\'ll face a penalty of 5% of your balance owing, plus 1% for each full month your return is late (up to 12 months). If you\'re getting a refund, there\'s no penalty, but you won\'t receive your refund until you file.'
  },
  {
    category: 'General Tax Questions',
    question: 'Can I file my taxes myself or do I need an accountant?',
    answer: 'Many Canadians file their own taxes using tax software or the CRA\'s NETFILE service. Simple returns (employment income only) are straightforward. Consider an accountant if you have self-employment income, rental properties, investments, or complex situations.'
  },
  {
    category: 'General Tax Questions',
    question: 'What is a Notice of Assessment?',
    answer: 'A Notice of Assessment (NOA) is the CRA\'s response to your tax return. It shows whether they accepted your return as filed, any changes they made, your refund or balance owing, and your RRSP contribution room for next year. Keep it for your records.'
  },

  // Filing Questions
  {
    category: 'Filing Questions',
    question: 'What documents do I need to file my taxes?',
    answer: 'You\'ll need: T4 slips (employment income), T5 slips (investment income), RRSP contribution receipts, charitable donation receipts, medical expense receipts, childcare expense receipts, and any other tax slips or receipts for deductions and credits you\'re claiming.'
  },
  {
    category: 'Filing Questions',
    question: 'How do I file my taxes online?',
    answer: 'You can file online using NETFILE-certified tax software (like TurboTax, Wealthsimple Tax, or UFile) or through the CRA\'s My Account portal. You\'ll need your Social Insurance Number and information from last year\'s return to verify your identity.'
  },
  {
    category: 'Filing Questions',
    question: 'Can I file taxes for previous years?',
    answer: 'Yes! You can file returns for previous years. The CRA allows you to go back up to 10 years. If you\'re owed a refund, you have 10 years to claim it. If you owe taxes, file as soon as possible to minimize penalties and interest.'
  },
  {
    category: 'Filing Questions',
    question: 'What is NETFILE?',
    answer: 'NETFILE is the CRA\'s electronic tax filing service. It allows you to file your tax return online using certified tax software. It\'s fast, secure, and you typically receive your refund within 2 weeks if you use direct deposit.'
  },
  {
    category: 'Filing Questions',
    question: 'How long does it take to get my tax refund?',
    answer: 'If you file online and use direct deposit, expect your refund in about 2 weeks. Paper returns take 8-12 weeks. You can check your refund status on the CRA\'s My Account portal or by calling their automated service.'
  },

  // Deductions & Credits
  {
    category: 'Deductions & Credits',
    question: 'What\'s the difference between a deduction and a credit?',
    answer: 'A deduction reduces your taxable income (like RRSP contributions), while a credit reduces the tax you owe (like charitable donations). Deductions are generally more valuable if you\'re in a high tax bracket.'
  },
  {
    category: 'Deductions & Credits',
    question: 'Can I claim medical expenses?',
    answer: 'Yes, if your medical expenses exceed 3% of your net income or $2,759 (whichever is less). Eligible expenses include prescriptions, dental work, glasses, and many other health-related costs. Keep all receipts.'
  },
  {
    category: 'Deductions & Credits',
    question: 'What charitable donations can I claim?',
    answer: 'You can claim donations to registered Canadian charities. You receive a 15% federal credit on the first $200, and 29% on amounts over $200. Keep your donation receipts. You can carry forward unused donations for up to 5 years.'
  },
  {
    category: 'Deductions & Credits',
    question: 'Can I claim tuition fees?',
    answer: 'Yes, you can claim tuition fees for post-secondary education at eligible institutions. Your school will provide a T2202 form. If you don\'t need the full credit, you can transfer up to $5,000 to a parent or grandparent, or carry it forward to future years.'
  },
  {
    category: 'Deductions & Credits',
    question: 'What is the basic personal amount?',
    answer: 'The basic personal amount is a non-refundable tax credit that all Canadians receive. For 2025, it\'s $15,705. This means the first $15,705 of your income is effectively tax-free at the federal level.'
  },

  // RRSP & TFSA
  {
    category: 'RRSP & TFSA',
    question: 'Should I contribute to an RRSP or TFSA?',
    answer: 'It depends on your situation. RRSP contributions are tax-deductible (good if you\'re in a high tax bracket now), but withdrawals are taxed. TFSA contributions aren\'t deductible, but withdrawals are tax-free. Many Canadians use both.'
  },
  {
    category: 'RRSP & TFSA',
    question: 'How much can I contribute to my RRSP?',
    answer: 'You can contribute 18% of your previous year\'s earned income, up to the annual maximum ($31,560 for 2025), plus any unused contribution room from previous years. Check your Notice of Assessment for your exact contribution room.'
  },
  {
    category: 'RRSP & TFSA',
    question: 'What happens if I over-contribute to my TFSA?',
    answer: 'Over-contributions to a TFSA are subject to a 1% penalty per month on the excess amount. If you over-contribute, withdraw the excess immediately and file Form RC243 to request penalty relief if it was an honest mistake.'
  },
  {
    category: 'RRSP & TFSA',
    question: 'Can I withdraw from my RRSP without penalty?',
    answer: 'Generally, RRSP withdrawals are taxed as income. However, the Home Buyers\' Plan allows you to withdraw up to $60,000 tax-free for a first home (must repay over 15 years), and the Lifelong Learning Plan allows up to $20,000 for education.'
  },
  {
    category: 'RRSP & TFSA',
    question: 'When does my TFSA contribution room reset?',
    answer: 'TFSA contribution room accumulates on January 1st each year. The 2025 limit is $7,000. Any withdrawals you made in 2024 will be added back to your contribution room on January 1, 2025.'
  },

  // Self-Employment
  {
    category: 'Self-Employment',
    question: 'How do I report self-employment income?',
    answer: 'Report self-employment income on Form T2125 (Statement of Business Activities). You report your gross business income and deduct eligible business expenses to arrive at net income. This net income is added to your T1 return.'
  },
  {
    category: 'Self-Employment',
    question: 'What business expenses can I deduct?',
    answer: 'You can deduct expenses that are reasonable and necessary for earning business income: office supplies, advertising, vehicle expenses (business portion), home office (if you meet criteria), professional fees, insurance, and more. Keep detailed records and receipts.'
  },
  {
    category: 'Self-Employment',
    question: 'Do I need to register for GST/HST?',
    answer: 'You must register for GST/HST if your business revenue exceeds $30,000 in a calendar quarter or over four consecutive quarters. Registration is optional below this threshold, but may be beneficial if you have significant business expenses.'
  },
  {
    category: 'Self-Employment',
    question: 'How do I pay CPP if I\'m self-employed?',
    answer: 'Self-employed individuals pay both the employee and employer portions of CPP (11.9% total). This is calculated on your tax return and paid when you file. You can also make quarterly installment payments to avoid a large bill at tax time.'
  },
  {
    category: 'Self-Employment',
    question: 'Should I incorporate my business?',
    answer: 'Incorporation can provide tax benefits if your business earns over $50,000-$100,000 annually. Benefits include lower corporate tax rates, income splitting opportunities, and liability protection. Consult an accountant to determine if it\'s right for you.'
  },

  // Students
  {
    category: 'Students',
    question: 'Do students need to file taxes?',
    answer: 'Yes! Even if you had little income, filing allows you to build RRSP contribution room, receive the GST/HST credit, and start accumulating tuition credits. You may also get a refund of taxes withheld from part-time jobs.'
  },
  {
    category: 'Students',
    question: 'Can I claim textbooks and supplies?',
    answer: 'The textbook and education amounts were eliminated in 2017. However, you can still claim tuition fees. Some provinces offer credits for textbooks and supplies - check your provincial tax forms.'
  },
  {
    category: 'Students',
    question: 'Can my parents claim my tuition?',
    answer: 'If you don\'t need all your tuition credit, you can transfer up to $5,000 to a parent or grandparent. Any unused amount beyond that can be carried forward to future years when you have income to use it against.'
  },
  {
    category: 'Students',
    question: 'What is the Canada Workers Benefit?',
    answer: 'The Canada Workers Benefit (CWB) is a refundable tax credit for low-income workers. For 2025, you may receive up to $1,518 (single) or $2,616 (family) if your income is below certain thresholds. File your return to claim it automatically.'
  },
  {
    category: 'Students',
    question: 'Can I claim student loan interest?',
    answer: 'Yes! You can claim interest paid on government student loans (federal and provincial). This is a non-refundable tax credit worth 15% of the interest paid. You can carry forward unused amounts for up to 5 years.'
  },

  // Technical Support
  {
    category: 'Technical Support',
    question: 'How do I use the tax calculators?',
    answer: 'Simply enter your information in the calculator fields and results update automatically. All calculations use official 2025 CRA rates. You can save calculations if you create an account, or use them anonymously.'
  },
  {
    category: 'Technical Support',
    question: 'Is my information saved?',
    answer: 'Calculator results are processed in your browser and not stored on our servers unless you explicitly save them. The mock tax return wizard auto-saves to your browser\'s local storage so you can resume later.'
  },
  {
    category: 'Technical Support',
    question: 'Can I use this on my phone?',
    answer: 'Yes! All our calculators and the mock return wizard are mobile-responsive. However, for the best experience with the mock return wizard, we recommend using a tablet or computer.'
  },
  {
    category: 'Technical Support',
    question: 'Are the calculations accurate?',
    answer: 'Our calculators use official 2025 CRA tax rates and formulas. However, they provide estimates for educational purposes. Your actual tax situation may differ based on factors not included in the calculators. Always verify with official tax software or a professional.'
  },
  {
    category: 'Technical Support',
    question: 'Can I actually file my taxes through TaxCat?',
    answer: 'No. TaxCat is an educational platform. The mock return wizard is for practice only and does NOT submit to the CRA. To file your actual taxes, use NETFILE-certified software or consult a tax professional.'
  }
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about Canadian taxes
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All ({faqs.length})
          </button>
          {categories.map(category => {
            const count = faqs.filter(f => f.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">No questions found matching your search.</p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <div className="text-xs text-blue-600 font-medium mb-1">
                      {faq.category}
                    </div>
                    <div className="font-semibold text-gray-900">
                      {faq.question}
                    </div>
                  </div>
                  {expandedIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {expandedIndex === index && (
                  <div className="px-6 pb-4 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="mb-6 opacity-90">
            Can't find what you're looking for? Check out our learning modules or try our calculators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/learn"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Courses
            </a>
            <a
              href="/calculators"
              className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Use Calculators
            </a>
          </div>
        </div>

        {/* CRA Resources */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4">Official CRA Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://www.canada.ca/en/revenue-agency.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Canada Revenue Agency (CRA) →
              </a>
            </li>
            <li>
              <a href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                About Your Tax Return →
              </a>
            </li>
            <li>
              <a href="https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-individuals/account-individuals.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                My Account (CRA) →
              </a>
            </li>
            <li>
              <a href="https://www.canada.ca/en/revenue-agency/services/forms-publications/tax-packages-years.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Tax Forms and Publications →
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}