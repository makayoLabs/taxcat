'use client'

import React, { useState } from 'react'

interface Deduction {
  id: string
  name: string
  description: string
  category: string
  eligible: boolean
  potentialSavings: number
}

export default function DeductionsPage() {
  const [userProfile, setUserProfile] = useState({
    hasHome: false,
    hasChildren: false,
    hasMedicalExpenses: false,
    hasCharitableDonations: false,
    hasRRSP: false,
    hasWorkFromHome: false,
    hasVehicle: false,
    hasInvestments: false,
    isSelfEmployed: false,
    hasDisability: false
  })
  const [key, setKey] = useState<number>(0)

  const allDeductions: Deduction[] = [
    {
      id: 'home-office',
      name: 'Home Office Expenses',
      description: 'Deduct a portion of rent/mortgage interest, utilities, and home insurance if you work from home.',
      category: 'Work',
      eligible: userProfile.hasWorkFromHome,
      potentialSavings: 1200
    },
    {
      id: 'vehicle',
      name: 'Vehicle Expenses',
      description: 'Deduct mileage, fuel, maintenance, and insurance for work-related vehicle use.',
      category: 'Work',
      eligible: userProfile.hasVehicle,
      potentialSavings: 1800
    },
    {
      id: 'rrsp-contribution',
      name: 'RRSP Contributions',
      description: 'Reduce your taxable income by contributing to your RRSP (up to 18% of earned income).',
      category: 'Retirement',
      eligible: userProfile.hasRRSP,
      potentialSavings: 2800
    },
    {
      id: 'medical-expenses',
      name: 'Medical Expenses',
      description: 'Deduct eligible medical expenses that exceed 3% of your net income.',
      category: 'Health',
      eligible: userProfile.hasMedicalExpenses,
      potentialSavings: 1500
    },
    {
      id: 'charitable-donations',
      name: 'Charitable Donations',
      description: 'Receive tax credits for donations to registered charities (up to 29% federal credit).',
      category: 'Philanthropy',
      eligible: userProfile.hasCharitableDonations,
      potentialSavings: 870
    },
    {
      id: 'child-care',
      name: 'Child Care Expenses',
      description: 'Deduct child care expenses for children under 6, or with disabilities.',
      category: 'Family',
      eligible: userProfile.hasChildren,
      potentialSavings: 2000
    },
    {
      id: 'investment-expenses',
      name: 'Investment Expenses',
      description: 'Deduct fees paid to advisors and carrying charges on investments.',
      category: 'Investing',
      eligible: userProfile.hasInvestments,
      potentialSavings: 500
    },
    {
      id: 'disability-supports',
      name: 'Disability Supports',
      description: 'Deduct expenses for disability-related supports and services.',
      category: 'Health',
      eligible: userProfile.hasDisability,
      potentialSavings: 1000
    },
    {
      id: 'self-employment',
      name: 'Self-Employment Expenses',
      description: 'Deduct business expenses, home office, vehicle costs, and supplies.',
      category: 'Business',
      eligible: userProfile.isSelfEmployed,
      potentialSavings: 3500
    },
    {
      id: 'property-taxes',
      name: 'Property Taxes',
      description: 'Deduct property taxes paid on your home (Ontario residents only).',
      category: 'Home',
      eligible: userProfile.hasHome,
      potentialSavings: 800
    }
  ]

  const eligibleDeductions = allDeductions.filter(d => d.eligible)
  const totalPotentialSavings = eligibleDeductions.reduce((sum, d) => sum + d.potentialSavings, 0)

  const handleProfileChange = (key: string, value: boolean) => {
    setUserProfile(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">Tax Deductions Finder</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Discover Your Eligible Tax Deductions
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Answer a few questions about your situation and we'll show you which tax deductions and credits you may be eligible for.
          </p>
        </div>
      </section>

      {/* Profile Questions */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-card">
            <div className="mb-8">
              <h2 className="ws-display-md ws-balance mb-4">Tell us about your situation</h2>
              <p className="ws-text-lg ws-color-muted">
                Check all that apply to you. This will help us identify your potential tax deductions.
              </p>
            </div>

            <div className="ws-grid">
              <div className="ws-col-12 md:ws-col-6">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.hasHome}
                    onChange={(e) => handleProfileChange('hasHome', e.target.checked)}
                    className="ws-checkbox"
                  />
                  <div>
                    <div className="ws-text-sm font-medium">I own or rent a home</div>
                    <div className="ws-text-sm ws-color-muted">Property taxes, mortgage interest</div>
                  </div>
                </label>
              </div>

              <div className="ws-col-12 md:ws-col-6">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.hasChildren}
                    onChange={(e) => handleProfileChange('hasChildren', e.target.checked)}
                    className="ws-checkbox"
                  />
                  <div>
                    <div className="ws-text-sm font-medium">I have children under 6</div>
                    <div className="ws-text-sm ws-color-muted">Child care expenses</div>
                  </div>
                </label>
              </div>

              <div className="ws-col-12 md:ws-col-6">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.hasMedicalExpenses}
                    onChange={(e) => handleProfileChange('hasMedicalExpenses', e.target.checked)}
                    className="ws-checkbox"
                  />
                  <div>
                    <div className="ws-text-sm font-medium">I have medical expenses</div>
                    <div className="ws-text-sm ws-color-muted">Doctor visits, prescriptions, etc.</div>
                  </div>
                </label>
              </div>

              <div className="ws-col-12 md:ws-col-6">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.hasCharitableDonations}
                    onChange={(e) => handleProfileChange('hasCharitableDonations', e.target.checked)}
                    className="ws-checkbox"
                  />
                  <div>
                    <div className="ws-text-sm font-medium">I make charitable donations</div>
                    <div className="ws-text-sm ws-color-muted">To registered charities</div>
                  </div>
                </label>
              </div>

              <div className="ws-col-12 md:ws-col-6">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.hasRRSP}
                    onChange={(e) => handleProfileChange('hasRRSP', e.target.checked)}
                    className="ws-checkbox"
                  />
                  <div>
                    <div className="ws-text-sm font-medium">I contribute to an RRSP</div>
                    <div className="ws-text-sm ws-color-muted">Registered Retirement Savings Plan</div>
                  </div>
                </label>
              </div>

              <div className="ws-col-12 md:ws-col-6">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.hasWorkFromHome}
                    onChange={(e) => handleProfileChange('hasWorkFromHome', e.target.checked)}
                    className="ws-checkbox"
                  />
                  <div>
                    <div className="ws-text-sm font-medium">I work from home</div>
                    <div className="ws-text-sm ws-color-muted">Home office expenses</div>
                  </div>
                </label>
              </div>

              <div className="ws-col-12 md:ws-col-6">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.hasVehicle}
                    onChange={(e) => handleProfileChange('hasVehicle', e.target.checked)}
                    className="ws-checkbox"
                  />
                  <div>
                    <div className="ws-text-sm font-medium">I use my vehicle for work</div>
                    <div className="ws-text-sm ws-color-muted">Business mileage, fuel</div>
                  </div>
                </label>
              </div>

              <div className="ws-col-12 md:ws-col-6">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.hasInvestments}
                    onChange={(e) => handleProfileChange('hasInvestments', e.target.checked)}
                    className="ws-checkbox"
                  />
                  <div>
                    <div className="ws-text-sm font-medium">I have investment accounts</div>
                    <div className="ws-text-sm ws-color-muted">Advisor fees, carrying charges</div>
                  </div>
                </label>
              </div>

              <div className="ws-col-12 md:ws-col-6">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.isSelfEmployed}
                    onChange={(e) => handleProfileChange('isSelfEmployed', e.target.checked)}
                    className="ws-checkbox"
                  />
                  <div>
                    <div className="ws-text-sm font-medium">I am self-employed</div>
                    <div className="ws-text-sm ws-color-muted">Business expenses</div>
                  </div>
                </label>
              </div>

              <div className="ws-col-12 md:ws-col-6">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.hasDisability}
                    onChange={(e) => handleProfileChange('hasDisability', e.target.checked)}
                    className="ws-checkbox"
                  />
                  <div>
                    <div className="ws-text-sm font-medium">I have a disability</div>
                    <div className="ws-text-sm ws-color-muted">Disability-related expenses</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <button
              className="ws-button ws-button-primary"
              onClick={() => {
                // Force recalculation
                setKey(prev => prev + 1)
              }}
            >
              Check Deductions
            </button>
            <button
              className="ws-button ws-button-secondary"
              onClick={() => {
                const assessmentData = {
                  userProfile,
                  eligibleDeductions,
                  totalPotentialSavings,
                  timestamp: new Date().toISOString()
                }
                const savedCalculations = JSON.parse(localStorage.getItem('taxcat-calculations') || '[]')
                savedCalculations.push(assessmentData)
                localStorage.setItem('taxcat-calculations', JSON.stringify(savedCalculations))
                alert('Deductions assessment saved successfully!')
              }}
            >
              Save Assessment
            </button>
            <button
              className="ws-button ws-button-outline"
              onClick={() => {
                setUserProfile({
                  hasHome: false,
                  hasChildren: false,
                  hasMedicalExpenses: false,
                  hasCharitableDonations: false,
                  hasRRSP: false,
                  hasWorkFromHome: false,
                  hasVehicle: false,
                  hasInvestments: false,
                  isSelfEmployed: false,
                  hasDisability: false
                })
                setKey(prev => prev + 1)
              }}
            >
              Reset Form
            </button>
          </div>

          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Your Eligible Deductions</h2>
            <div className="ws-card ws-card-alt inline-block">
              <div className="ws-text-sm ws-color-muted mb-1">Potential Annual Savings</div>
              <div className="ws-display-lg ws-brand-primary">
                ${totalPotentialSavings.toLocaleString()}
              </div>
            </div>
          </div>

          {eligibleDeductions.length > 0 ? (
            <div className="ws-grid">
              {eligibleDeductions.map((deduction) => (
                <div key={deduction.id} className="ws-col-12 md:ws-col-6 lg:ws-col-4">
                  <div className="ws-card">
                    <div className="flex items-center justify-between mb-3">
                      <span className="ws-text-sm ws-color-muted bg-background-alt px-2 py-1 rounded">
                        {deduction.category}
                      </span>
                      <span className="ws-text-sm font-bold ws-brand-primary">
                        ${deduction.potentialSavings}
                      </span>
                    </div>
                    <h3 className="ws-text-lg font-bold mb-3">{deduction.name}</h3>
                    <p className="ws-color-muted mb-4">{deduction.description}</p>
                    <button className="ws-button ws-button-secondary w-full">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="ws-card ws-card-alt max-w-md mx-auto">
                <h3 className="ws-text-lg font-bold mb-3">No deductions selected</h3>
                <p className="ws-color-muted mb-4">
                  Check the boxes above that apply to your situation to see potential tax deductions.
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
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Tax Deduction Essentials</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Understanding deductions and credits can significantly reduce your tax liability.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Deductions vs Credits</h3>
                <p className="ws-color-muted mb-4">
                  Deductions reduce your taxable income, while credits reduce your tax payable dollar-for-dollar.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn the Difference
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Record Keeping</h3>
                <p className="ws-color-muted mb-4">
                  Keep receipts and records for all deductible expenses. The CRA may ask for documentation.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Best Practices
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
            Ready to maximize your tax savings?
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-2xl mx-auto">
            Let us help you identify and claim all eligible deductions and credits.
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