'use client'

import React, { useState } from 'react'

interface TaxDeadline {
  id: string
  date: string
  title: string
  description: string
  category: 'individual' | 'business' | 'both'
  priority: 'high' | 'medium' | 'low'
  province?: string
}

export default function TaxCalendarPage() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'individual' | 'business'>('all')
  const [selectedProvince, setSelectedProvince] = useState<string>('all')

  const taxDeadlines: TaxDeadline[] = [
    {
      id: 't1-filing',
      date: '2024-04-30',
      title: 'T1 Personal Income Tax Return',
      description: 'File your personal income tax return for the 2023 tax year',
      category: 'individual',
      priority: 'high'
    },
    {
      id: 't1-payment',
      date: '2024-04-30',
      title: 'Balance of Tax Payment Due',
      description: 'Pay any remaining tax owing from your 2023 tax return',
      category: 'individual',
      priority: 'high'
    },
    {
      id: 'rrsp-contribution',
      date: '2024-03-01',
      title: 'RRSP Contribution Deadline',
      description: 'Last day to contribute to RRSP for 2023 tax year',
      category: 'individual',
      priority: 'medium'
    },
    {
      id: 't2-corporation',
      date: '2024-06-30',
      title: 'T2 Corporation Income Tax Return',
      description: 'File corporate tax return for tax year ending in previous calendar year',
      category: 'business',
      priority: 'high'
    },
    {
      id: 'gst-hst',
      date: '2024-03-31',
      title: 'GST/HST Return',
      description: 'File GST/HST return for February (if monthly filer)',
      category: 'business',
      priority: 'high'
    },
    {
      id: 'payroll-remittance',
      date: '2024-03-15',
      title: 'Payroll Tax Remittance',
      description: 'Remit payroll deductions for February payroll',
      category: 'business',
      priority: 'high'
    },
    {
      id: 't1135-foreign',
      date: '2024-06-30',
      title: 'T1135 Foreign Income Verification Statement',
      description: 'Report foreign property holdings over $100,000 CAD',
      category: 'individual',
      priority: 'medium'
    },
    {
      id: 't3-trust',
      date: '2024-03-30',
      title: 'T3 Trust Income Tax Return',
      description: 'File trust tax return for year ending December 31',
      category: 'both',
      priority: 'medium'
    },
    {
      id: 't5013-partnership',
      date: '2024-03-30',
      title: 'T5013 Partnership Information Return',
      description: 'File partnership information return',
      category: 'business',
      priority: 'medium'
    },
    {
      id: 'wsib-premiums',
      date: '2024-03-31',
      title: 'WSIB Premium Remittance',
      description: 'Pay Workplace Safety and Insurance Board premiums',
      category: 'business',
      priority: 'high',
      province: 'ON'
    },
    {
      id: 'cpp-ei-remittance',
      date: '2024-03-15',
      title: 'CPP/EI Premium Remittance',
      description: 'Remit Canada Pension Plan and Employment Insurance premiums',
      category: 'business',
      priority: 'high'
    },
    {
      id: 't4a-information',
      date: '2024-02-29',
      title: 'T4A Information Slips',
      description: 'Issue T4A slips to contractors and service providers',
      category: 'business',
      priority: 'high'
    }
  ]

  const filteredDeadlines = taxDeadlines.filter(deadline => {
    const categoryMatch = selectedCategory === 'all' || deadline.category === selectedCategory || deadline.category === 'both'
    const provinceMatch = selectedProvince === 'all' || !deadline.province || deadline.province === selectedProvince
    return categoryMatch && provinceMatch
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'individual': return 'bg-blue-100 text-blue-800'
      case 'business': return 'bg-purple-100 text-purple-800'
      case 'both': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">Tax Calendar</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Never Miss a Tax Deadline Again
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Stay organized with our comprehensive tax calendar. Track important filing dates, payment deadlines, and compliance requirements.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-card">
            <div className="mb-6">
              <h2 className="ws-display-md ws-balance mb-4">Filter Tax Deadlines</h2>
              <p className="ws-text-lg ws-color-muted">
                Customize the calendar to show deadlines relevant to your situation.
              </p>
            </div>

            <div className="ws-grid mb-6">
              <div className="ws-col-12 md:ws-col-4">
                <label className="block ws-text-sm font-medium mb-2">Tax Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full ws-input"
                >
                  <option value={2024}>2024 Tax Year</option>
                  <option value={2025}>2025 Tax Year</option>
                </select>
              </div>

              <div className="ws-col-12 md:ws-col-4">
                <label className="block ws-text-sm font-medium mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="w-full ws-input"
                >
                  <option value="all">All Categories</option>
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <div className="ws-col-12 md:ws-col-4">
                <label className="block ws-text-sm font-medium mb-2">Province</label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full ws-input"
                >
                  <option value="all">All Provinces</option>
                  <option value="ON">Ontario</option>
                  <option value="BC">British Columbia</option>
                  <option value="AB">Alberta</option>
                  <option value="QC">Quebec</option>
                  <option value="MB">Manitoba</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland</option>
                  <option value="PE">Prince Edward Island</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="ws-text-sm">High Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="ws-text-sm">Medium Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ws-text-sm">Low Priority</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="mb-8">
            <h2 className="ws-display-md ws-balance mb-4">Tax Deadlines for {selectedYear}</h2>
            <p className="ws-text-lg ws-color-muted">
              Showing {filteredDeadlines.length} deadline{filteredDeadlines.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="space-y-4">
            {filteredDeadlines.map((deadline) => (
              <div key={deadline.id} className="ws-card">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="ws-text-lg font-bold ws-brand-primary">
                        {new Date(deadline.date).toLocaleDateString('en-CA', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(deadline.priority)}`}>
                        {deadline.priority}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(deadline.category)}`}>
                        {deadline.category}
                      </div>
                      {deadline.province && (
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {deadline.province}
                        </div>
                      )}
                    </div>
                    <h3 className="ws-text-lg font-bold mb-2">{deadline.title}</h3>
                    <p className="ws-color-muted">{deadline.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button className="ws-button ws-button-secondary">
                      Set Reminder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDeadlines.length === 0 && (
            <div className="text-center py-12">
              <div className="ws-card ws-card-alt max-w-md mx-auto">
                <h3 className="ws-text-lg font-bold mb-3">No deadlines found</h3>
                <p className="ws-color-muted mb-4">
                  Try adjusting your filters to see more tax deadlines.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Educational Content */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Tax Compliance Essentials</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Understanding tax deadlines and requirements helps you avoid penalties and stay compliant.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Filing Extensions</h3>
                <p className="ws-color-muted mb-4">
                  Learn about tax filing extensions and when they're available for different types of returns.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Penalty Avoidance</h3>
                <p className="ws-color-muted mb-4">
                  Understanding penalties for late filing and late payment to minimize your tax bill.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Record Keeping</h3>
                <p className="ws-color-muted mb-4">
                  Best practices for maintaining tax records and documentation throughout the year.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
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
            Stay on top of your taxes
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-2xl mx-auto">
            Let us handle your tax filing and compliance so you can focus on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ws-button ws-button-primary ws-button-lg">
              Start Tax Filing
            </button>
            <button className="ws-button ws-button-secondary ws-button-lg">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}