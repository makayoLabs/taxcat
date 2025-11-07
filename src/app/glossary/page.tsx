'use client';

import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';

interface GlossaryTerm {
  term: string;
  definition: string;
  example?: string;
  relatedTerms?: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Adjusted Cost Base (ACB)',
    definition: 'The cost of a property plus any expenses to acquire it (like commissions and legal fees). Used to calculate capital gains or losses when you sell.',
    example: 'If you bought stock for $1,000 and paid $50 in commission, your ACB is $1,050.',
    relatedTerms: ['Capital Gain', 'Capital Loss']
  },
  {
    term: 'Assessment',
    definition: 'The CRA\'s review and acceptance of your tax return. You receive a Notice of Assessment showing if your return was accepted as filed or if changes were made.',
    relatedTerms: ['Notice of Assessment', 'Reassessment']
  },
  {
    term: 'Average Tax Rate',
    definition: 'Your total tax divided by your total income. This is your effective tax rate - the actual percentage of your income paid in taxes.',
    example: 'If you earn $60,000 and pay $12,000 in tax, your average tax rate is 20%.',
    relatedTerms: ['Marginal Tax Rate', 'Tax Bracket']
  },
  {
    term: 'Basic Personal Amount',
    definition: 'A non-refundable tax credit that all Canadians receive. For 2025, it\'s $15,705 federally, meaning the first $15,705 of income is effectively tax-free.',
    relatedTerms: ['Non-Refundable Tax Credit', 'Personal Tax Credits']
  },
  {
    term: 'Canada Pension Plan (CPP)',
    definition: 'A mandatory retirement savings program for Canadian workers. Both employees and employers contribute. Self-employed individuals pay both portions.',
    example: 'In 2025, employees contribute 5.95% of earnings between $3,500 and $68,500.',
    relatedTerms: ['CPP Contributions', 'Pensionable Earnings']
  },
  {
    term: 'Canada Workers Benefit (CWB)',
    definition: 'A refundable tax credit for low-income workers. Provides up to $1,518 (single) or $2,616 (family) for 2025.',
    relatedTerms: ['Refundable Tax Credit', 'Working Income Tax Benefit']
  },
  {
    term: 'Capital Gain',
    definition: 'Profit from selling an asset (like stocks or property) for more than you paid. In Canada, 50% of capital gains are taxable.',
    example: 'If you bought stock for $1,000 and sold for $1,500, your capital gain is $500. Only $250 (50%) is added to your taxable income.',
    relatedTerms: ['Capital Loss', 'Adjusted Cost Base', 'Inclusion Rate']
  },
  {
    term: 'Capital Loss',
    definition: 'Loss from selling an asset for less than you paid. Capital losses can offset capital gains to reduce taxes.',
    example: 'If you bought stock for $1,000 and sold for $800, you have a $200 capital loss.',
    relatedTerms: ['Capital Gain', 'Net Capital Loss']
  },
  {
    term: 'Carry Forward',
    definition: 'The ability to use unused deductions or credits in future tax years. Common for tuition credits, capital losses, and charitable donations.',
    relatedTerms: ['Tuition Credit', 'Capital Loss', 'Charitable Donations']
  },
  {
    term: 'CRA',
    definition: 'Canada Revenue Agency - the federal agency responsible for administering tax laws and collecting taxes.',
  },
  {
    term: 'Deduction',
    definition: 'An amount subtracted from your total income to arrive at taxable income. Deductions reduce the income that gets taxed.',
    example: 'RRSP contributions are deductions. If you earn $60,000 and contribute $5,000 to RRSP, your taxable income is $55,000.',
    relatedTerms: ['Tax Credit', 'Taxable Income']
  },
  {
    term: 'Dependent',
    definition: 'A person who relies on you for financial support, typically children under 18 or other family members you support.',
    relatedTerms: ['Eligible Dependant', 'Child Tax Benefit']
  },
  {
    term: 'Direct Deposit',
    definition: 'Electronic transfer of your tax refund directly to your bank account. Faster than receiving a cheque by mail.',
  },
  {
    term: 'Dividend',
    definition: 'A payment made by a corporation to its shareholders from profits. Canadian dividends receive preferential tax treatment through the dividend tax credit.',
    relatedTerms: ['Eligible Dividend', 'Non-Eligible Dividend', 'Dividend Tax Credit']
  },
  {
    term: 'Dividend Tax Credit',
    definition: 'A tax credit that reduces the tax on dividend income from Canadian corporations. Recognizes that corporate income is already taxed.',
    relatedTerms: ['Eligible Dividend', 'Gross-Up']
  },
  {
    term: 'EI (Employment Insurance)',
    definition: 'A mandatory insurance program providing temporary income support if you lose your job. Both employees and employers contribute.',
    example: 'In 2025, employees pay 1.63% of insurable earnings up to $63,200.',
    relatedTerms: ['EI Premiums', 'Insurable Earnings']
  },
  {
    term: 'Eligible Dividend',
    definition: 'Dividends from Canadian public corporations that receive enhanced dividend tax credit treatment.',
    relatedTerms: ['Non-Eligible Dividend', 'Dividend Tax Credit']
  },
  {
    term: 'Filing Status',
    definition: 'Your marital status for tax purposes: single, married, common-law, divorced, separated, or widowed. Affects available credits and deductions.',
    relatedTerms: ['Marital Status', 'Spouse']
  },
  {
    term: 'Gross Income',
    definition: 'Your total income before any deductions or taxes. Also called total income.',
    relatedTerms: ['Net Income', 'Taxable Income']
  },
  {
    term: 'Gross-Up',
    definition: 'An amount added to dividends for tax purposes. Eligible dividends are grossed up by 38%, non-eligible by 15%. The dividend tax credit then reduces the tax.',
    relatedTerms: ['Dividend', 'Dividend Tax Credit']
  },
  {
    term: 'GST/HST Credit',
    definition: 'A tax-free quarterly payment to help low and modest-income individuals and families offset the GST or HST they pay.',
    relatedTerms: ['Refundable Tax Credit', 'Sales Tax']
  },
  {
    term: 'Home Buyers\' Plan (HBP)',
    definition: 'Allows first-time home buyers to withdraw up to $60,000 from RRSP tax-free for a down payment. Must be repaid over 15 years.',
    relatedTerms: ['RRSP', 'First-Time Home Buyer']
  },
  {
    term: 'HST (Harmonized Sales Tax)',
    definition: 'A combined federal and provincial sales tax used in some provinces. Combines GST and PST into one tax.',
    example: 'Ontario has 13% HST (5% federal + 8% provincial).',
    relatedTerms: ['GST', 'PST', 'Sales Tax']
  },
  {
    term: 'Income Tax',
    definition: 'Tax on your income, calculated using federal and provincial tax brackets. Canada uses a progressive tax system where higher income is taxed at higher rates.',
    relatedTerms: ['Tax Bracket', 'Marginal Tax Rate']
  },
  {
    term: 'Inclusion Rate',
    definition: 'The percentage of capital gains that must be included in taxable income. Currently 50% in Canada.',
    example: 'If you have a $10,000 capital gain, only $5,000 (50%) is added to your taxable income.',
    relatedTerms: ['Capital Gain', 'Taxable Income']
  },
  {
    term: 'Installment Payments',
    definition: 'Quarterly tax payments made throughout the year if you have income not subject to withholding (self-employment, rental, investment). Required if you owe more than $3,000.',
    relatedTerms: ['Self-Employment', 'Tax Owing']
  },
  {
    term: 'Marginal Tax Rate',
    definition: 'The tax rate on your next dollar of income. This is the rate at your highest tax bracket.',
    example: 'If you\'re in the 26% federal bracket, your next dollar earned is taxed at 26% federally (plus provincial tax).',
    relatedTerms: ['Tax Bracket', 'Average Tax Rate']
  },
  {
    term: 'NETFILE',
    definition: 'The CRA\'s electronic tax filing service. Allows you to file your return online using certified tax software.',
    relatedTerms: ['Electronic Filing', 'Tax Software']
  },
  {
    term: 'Net Income',
    definition: 'Your total income minus certain deductions (like RRSP contributions and union dues). Used to determine eligibility for many benefits and credits.',
    relatedTerms: ['Gross Income', 'Taxable Income']
  },
  {
    term: 'Non-Eligible Dividend',
    definition: 'Dividends from small Canadian corporations that receive standard dividend tax credit treatment (less favorable than eligible dividends).',
    relatedTerms: ['Eligible Dividend', 'Dividend Tax Credit']
  },
  {
    term: 'Non-Refundable Tax Credit',
    definition: 'A credit that reduces tax owing but cannot create a refund. If the credit exceeds your tax, the excess is lost.',
    example: 'The basic personal amount, charitable donations, and medical expenses are non-refundable credits.',
    relatedTerms: ['Refundable Tax Credit', 'Tax Credit']
  },
  {
    term: 'Notice of Assessment (NOA)',
    definition: 'The CRA\'s official response to your tax return. Shows your refund or balance owing, any changes made, and your RRSP contribution room.',
    relatedTerms: ['Assessment', 'Reassessment']
  },
  {
    term: 'Pensionable Earnings',
    definition: 'Earnings subject to CPP contributions. For 2025, this is earnings between $3,500 and $68,500.',
    relatedTerms: ['CPP', 'CPP Contributions']
  },
  {
    term: 'Progressive Tax System',
    definition: 'A tax system where higher income is taxed at higher rates. Canada uses tax brackets - different portions of income are taxed at different rates.',
    relatedTerms: ['Tax Bracket', 'Marginal Tax Rate']
  },
  {
    term: 'PST (Provincial Sales Tax)',
    definition: 'A sales tax charged by some provinces in addition to GST. Rates vary by province.',
    example: 'British Columbia charges 7% PST plus 5% GST.',
    relatedTerms: ['GST', 'HST', 'Sales Tax']
  },
  {
    term: 'Reassessment',
    definition: 'When the CRA reviews your return again after the initial assessment and makes changes. You can also request a reassessment if you find an error.',
    relatedTerms: ['Assessment', 'Notice of Assessment']
  },
  {
    term: 'Refund',
    definition: 'Money returned to you when you\'ve paid more tax than you owe. Typically received within 2 weeks if you file online with direct deposit.',
    relatedTerms: ['Tax Owing', 'Direct Deposit']
  },
  {
    term: 'Refundable Tax Credit',
    definition: 'A credit that can create a refund even if you owe no tax. The GST/HST credit and Canada Workers Benefit are refundable.',
    example: 'If you owe $0 in tax but qualify for $500 in refundable credits, you get a $500 refund.',
    relatedTerms: ['Non-Refundable Tax Credit', 'Tax Credit']
  },
  {
    term: 'RRSP (Registered Retirement Savings Plan)',
    definition: 'A retirement savings account where contributions are tax-deductible and growth is tax-deferred. You pay tax when you withdraw in retirement.',
    relatedTerms: ['RRSP Contribution Room', 'RRSP Deduction']
  },
  {
    term: 'RRSP Contribution Room',
    definition: 'The maximum amount you can contribute to your RRSP. It\'s 18% of previous year\'s earned income (up to $31,560 for 2025) plus unused room from previous years.',
    relatedTerms: ['RRSP', 'Notice of Assessment']
  },
  {
    term: 'Self-Employment Income',
    definition: 'Income from running your own business. Reported on Form T2125. You can deduct business expenses to arrive at net income.',
    relatedTerms: ['Business Expenses', 'T2125', 'Net Income']
  },
  {
    term: 'SIN (Social Insurance Number)',
    definition: 'A 9-digit number issued by Service Canada. Required for employment, filing taxes, and accessing government benefits.',
  },
  {
    term: 'T1 General',
    definition: 'The main personal income tax return form for individuals. Also called the T1.',
    relatedTerms: ['Tax Return', 'Personal Tax Return']
  },
  {
    term: 'T2202',
    definition: 'Tuition and Enrolment Certificate issued by educational institutions. Shows tuition fees paid and months of full-time or part-time study.',
    relatedTerms: ['Tuition Credit', 'Education Amount']
  },
  {
    term: 'T4 Slip',
    definition: 'Statement of Remuneration Paid issued by employers. Shows employment income, CPP/EI contributions, and tax deducted.',
    relatedTerms: ['Employment Income', 'Tax Deducted at Source']
  },
  {
    term: 'T4A Slip',
    definition: 'Statement of Pension, Retirement, Annuity, and Other Income. Issued for pension income, scholarships, and other payments.',
    relatedTerms: ['Pension Income', 'Scholarship']
  },
  {
    term: 'T5 Slip',
    definition: 'Statement of Investment Income. Shows interest, dividends, and capital gains from investments.',
    relatedTerms: ['Investment Income', 'Dividend', 'Interest Income']
  },
  {
    term: 'Tax Bracket',
    definition: 'Income ranges taxed at specific rates. Canada has 5 federal brackets (15%, 20.5%, 26%, 29%, 33%) plus provincial brackets.',
    example: 'The first $55,867 is taxed at 15% federally, income from $55,867 to $111,733 is taxed at 20.5%, and so on.',
    relatedTerms: ['Marginal Tax Rate', 'Progressive Tax System']
  },
  {
    term: 'Tax Credit',
    definition: 'An amount that reduces the tax you owe. Can be refundable (can create a refund) or non-refundable (can only reduce tax to zero).',
    relatedTerms: ['Refundable Tax Credit', 'Non-Refundable Tax Credit']
  },
  {
    term: 'Tax Deducted at Source',
    definition: 'Income tax withheld from your paycheque by your employer and sent to the CRA on your behalf. Shown in Box 22 of your T4.',
    relatedTerms: ['T4 Slip', 'Withholding Tax']
  },
  {
    term: 'Taxable Income',
    definition: 'Your net income minus additional deductions (like RRSP contributions). This is the amount used to calculate your tax.',
    example: 'If your net income is $60,000 and you contributed $5,000 to RRSP, your taxable income is $55,000.',
    relatedTerms: ['Net Income', 'Gross Income', 'Deduction']
  },
  {
    term: 'Tax-Free Savings Account (TFSA)',
    definition: 'A savings account where investment growth and withdrawals are completely tax-free. Contribution limit is $7,000 for 2025.',
    relatedTerms: ['TFSA Contribution Room', 'Tax-Free Growth']
  },
  {
    term: 'TFSA Contribution Room',
    definition: 'The maximum you can contribute to your TFSA. Accumulates from the year you turn 18. Unused room carries forward, and withdrawals are added back the following year.',
    relatedTerms: ['TFSA', 'Over-Contribution']
  },
  {
    term: 'Tuition Credit',
    definition: 'A non-refundable tax credit for post-secondary tuition fees. Can be carried forward indefinitely or transferred (up to $5,000) to a parent or grandparent.',
    relatedTerms: ['T2202', 'Education Amount', 'Transfer']
  },
  {
    term: 'Withholding Tax',
    definition: 'Tax deducted from your income before you receive it. Employers withhold tax from paycheques based on your expected annual income.',
    relatedTerms: ['Tax Deducted at Source', 'T4 Slip']
  }
];

// Sort alphabetically
const sortedTerms = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));

// Get unique first letters
const letters = Array.from(new Set(sortedTerms.map(t => t.term[0].toUpperCase()))).sort();

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');

  const filteredTerms = sortedTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLetter = selectedLetter === 'All' || term.term[0].toUpperCase() === selectedLetter;
    return matchesSearch && matchesLetter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              Tax Glossary
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Simple explanations of Canadian tax terms
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tax terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Alphabet Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedLetter('All')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                selectedLetter === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {letters.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  selectedLetter === letter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredTerms.length} of {sortedTerms.length} terms
        </div>

        {/* Terms List */}
        <div className="space-y-4">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">No terms found matching your search.</p>
            </div>
          ) : (
            filteredTerms.map((term, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {term.term}
                </h3>
                <p className="text-gray-700 mb-3">
                  {term.definition}
                </p>
                
                {term.example && (
                  <div className="p-3 bg-blue-50 rounded-lg mb-3">
                    <p className="text-sm text-gray-700">
                      <strong className="text-blue-900">Example:</strong> {term.example}
                    </p>
                  </div>
                )}
                
                {term.relatedTerms && term.relatedTerms.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-600">Related:</span>
                    {term.relatedTerms.map((related, i) => (
                      <button
                        key={i}
                        onClick={() => setSearchTerm(related)}
                        className="text-sm px-2 py-1 bg-gray-100 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                      >
                        {related}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Put Your Knowledge to Use?</h2>
          <p className="mb-6 opacity-90">
            Now that you understand the terms, try our calculators or practice filing a tax return!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/calculators"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Use Calculators
            </a>
            <a
              href="/mock-return"
              className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Practice Filing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}