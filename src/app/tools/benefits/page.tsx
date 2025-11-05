'use client'

import React, { useState, useMemo } from 'react'

interface Benefit {
  id: string
  name: string
  description: string
  category: 'federal' | 'provincial'
  maxAmount: number
  phaseOutStart?: number
  phaseOutRate?: number
}

export default function BenefitsCalculatorPage() {
  const [familyIncome, setFamilyIncome] = useState<number>(75000)
  const [province, setProvince] = useState<string>('ON')
  const [familySize, setFamilySize] = useState<number>(2)
  const [hasChildren, setHasChildren] = useState<boolean>(false)
  const [childrenCount, setChildrenCount] = useState<number>(0)
  const [hasDisability, setHasDisability] = useState<boolean>(false)
  const [key, setKey] = useState<number>(0)

  const benefits: Benefit[] = [
    {
      id: 'gst-hst',
      name: 'GST/HST Credit',
      description: 'Federal tax-free quarterly payment to help low and modest-income individuals and families offset GST/HST',
      category: 'federal',
      maxAmount: familySize === 1 ? 496 : 659,
      phaseOutStart: familySize === 1 ? 5000 : 7000,
      phaseOutRate: 0.02
    },
    {
      id: 'ccr',
      name: 'Canada Child and Family Benefits (CCF)',
      description: 'Tax-free monthly payment to eligible families to help with the cost of raising children under 6',
      category: 'federal',
      maxAmount: childrenCount * 7000, // Up to $7,000 per year per child
      phaseOutStart: 34000,
      phaseOutRate: 0.07
    },
    {
      id: 'otb',
      name: 'Old Age Security (OAS)',
      description: 'Taxable monthly benefit for seniors 65 and older based on Canadian residence',
      category: 'federal',
      maxAmount: 7000, // Maximum annual amount
      phaseOutStart: 81000,
      phaseOutRate: 0.15
    },
    {
      id: 'cpp',
      name: 'Canada Pension Plan (CPP)',
      description: 'Earnings-related monthly benefit for retirees, disabled individuals, and survivors',
      category: 'federal',
      maxAmount: 14000, // Maximum annual amount
      phaseOutStart: 0,
      phaseOutRate: 0
    },
    {
      id: 'ontario-trillium',
      name: 'Ontario Trillium Benefit',
      description: 'Combines Ontario Energy and Property Tax Credit, Northern Ontario Energy Credit, and Ontario Sales Tax Credit',
      category: 'provincial',
      maxAmount: province === 'ON' ? (familySize === 1 ? 350 : 450) : 0,
      phaseOutStart: province === 'ON' ? 25000 : 0,
      phaseOutRate: province === 'ON' ? 0.04 : 0
    },
    {
      id: 'bc-family',
      name: 'BC Family Benefit',
      description: 'Income assistance for families with children under 19, pregnant women, and single parents',
      category: 'provincial',
      maxAmount: province === 'BC' ? childrenCount * 300 : 0,
      phaseOutStart: province === 'BC' ? 30000 : 0,
      phaseOutRate: province === 'BC' ? 0.1 : 0
    },
    {
      id: 'quebec-family',
      name: 'Quebec Family Allowance',
      description: 'Monthly allowance for families with children under 18',
      category: 'provincial',
      maxAmount: province === 'QC' ? childrenCount * 250 : 0,
      phaseOutStart: province === 'QC' ? 35000 : 0,
      phaseOutRate: province === 'QC' ? 0.08 : 0
    }
  ]

  const result = useMemo(() => {
    const eligibleBenefits = benefits.filter(benefit => {
      // Basic eligibility checks
      if (benefit.id === 'ccr' && !hasChildren) return false
      if (benefit.id === 'otb' && familyIncome > 100000) return false // Simplified OAS eligibility
      if (benefit.category === 'provincial' && benefit.maxAmount === 0) return false

      return true
    })

    const calculatedBenefits = eligibleBenefits.map(benefit => {
      let amount = benefit.maxAmount

      // Apply phase-out calculations
      if (benefit.phaseOutStart && benefit.phaseOutRate) {
        const incomeOverThreshold = Math.max(0, familyIncome - benefit.phaseOutStart)
        const reduction = incomeOverThreshold * benefit.phaseOutRate
        amount = Math.max(0, amount - reduction)
      }

      // Special calculations for certain benefits
      if (benefit.id === 'ccr') {
        // CCF is based on number of children and adjusted family net income
        const baseAmount = childrenCount * 6000 // Base annual amount per child
        const reduction = Math.max(0, (familyIncome - 34000) * 0.07)
        amount = Math.max(0, baseAmount - reduction)
      }

      if (benefit.id === 'cpp') {
        // CPP is earnings-related, simplified calculation
        const averageEarnings = Math.min(familyIncome, 61000) // YMPE for 2024
        amount = (averageEarnings * 0.25) * 0.65 // Rough estimate
      }

      return {
        ...benefit,
        calculatedAmount: amount,
        monthlyAmount: amount / 12
      }
    })

    const totalAnnual = calculatedBenefits.reduce((sum, b) => sum + b.calculatedAmount, 0)
    const totalMonthly = totalAnnual / 12

    return {
      benefits: calculatedBenefits,
      totalAnnual,
      totalMonthly
    }
  }, [familyIncome, province, familySize, hasChildren, childrenCount, hasDisability, key])

  const handleSave = () => {
    const calculationData = {
      familyIncome,
      province,
      familySize,
      hasChildren,
      childrenCount,
      hasDisability,
      results: result,
      timestamp: new Date().toISOString()
    }

    // Save to localStorage for now (could be enhanced with proper backend)
    const savedCalculations = JSON.parse(localStorage.getItem('taxcat-calculations') || '[]')
    savedCalculations.push(calculationData)
    localStorage.setItem('taxcat-calculations', JSON.stringify(savedCalculations))

    alert('Calculation saved successfully!')
  }

  const handleReset = () => {
    setFamilyIncome(75000)
    setProvince('ON')
    setFamilySize(2)
    setHasChildren(false)
    setChildrenCount(0)
    setHasDisability(false)
  }

  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">Benefits Calculator</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Calculate Your Government Benefits
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Find out how much you may qualify for in GST/HST credits, Canada Child and Family Benefits, Old Age Security, and provincial benefits.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-card">
            <div className="mb-8">
              <h2 className="ws-display-md ws-balance mb-4">Benefits Eligibility Calculator</h2>
              <p className="ws-text-lg ws-color-muted">
                Enter your family details to see which benefits you may qualify for and how much you could receive.
              </p>
            </div>

            <div className="ws-grid mb-8">
              <div className="ws-col-12 md:ws-col-6">
                <label className="block ws-text-sm font-medium mb-2">Adjusted Family Net Income</label>
                <input
                  type="number"
                  value={familyIncome}
                  onChange={(e) => setFamilyIncome(Number(e.target.value || 0))}
                  className="w-full ws-input"
                  placeholder="Enter your family income"
                />
              </div>
              <div className="ws-col-12 md:ws-col-6">
                <label className="block ws-text-sm font-medium mb-2">Province/Territory</label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full ws-input"
                >
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
                  <option value="YT">Yukon</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                </select>
              </div>
              <div className="ws-col-12 md:ws-col-6">
                <label className="block ws-text-sm font-medium mb-2">Family Size</label>
                <select
                  value={familySize}
                  onChange={(e) => setFamilySize(Number(e.target.value))}
                  className="w-full ws-input"
                >
                  <option value={1}>1 person</option>
                  <option value={2}>2 people</option>
                  <option value={3}>3 people</option>
                  <option value={4}>4 people</option>
                  <option value={5}>5+ people</option>
                </select>
              </div>
              <div className="ws-col-12 md:ws-col-6">
                <label className="block ws-text-sm font-medium mb-2">Children Under 6</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hasChildren}
                      onChange={(e) => setHasChildren(e.target.checked)}
                      className="ws-checkbox mr-2"
                    />
                    <span className="ws-text-sm">Yes</span>
                  </label>
                  {hasChildren && (
                    <input
                      type="number"
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(Number(e.target.value || 0))}
                      className="w-20 ws-input"
                      placeholder="Count"
                      min="1"
                      max="10"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                className="ws-button ws-button-primary"
                onClick={() => {
                  // Force recalculation
                  setFamilyIncome(prev => prev + 0.01)
                  setTimeout(() => setFamilyIncome(prev => prev - 0.01), 0)
                }}
              >
                Calculate Benefits
              </button>
              <button
                onClick={handleSave}
                className="ws-button ws-button-secondary"
              >
                Save Calculation
              </button>
              <button
                onClick={handleReset}
                className="ws-button ws-button-outline"
              >
                Reset Form
              </button>
            </div>

            {/* Results */}
            <div className="ws-grid mb-8">
              <div className="ws-col-12 md:ws-col-6">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Total Annual Benefits</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.totalAnnual.toFixed(0)}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Tax-free payments
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Monthly Benefit Amount</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.totalMonthly.toFixed(0)}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Average monthly payment
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Benefits */}
            <div className="space-y-4">
              <h3 className="ws-text-lg font-bold">Your Eligible Benefits</h3>
              {result.benefits.map((benefit) => (
                <div key={benefit.id} className="ws-card">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="ws-text-lg font-bold">{benefit.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          benefit.category === 'federal'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {benefit.category}
                        </span>
                      </div>
                      <p className="ws-color-muted mb-3">{benefit.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                        <div>
                          <span className="ws-text-sm font-medium">Annual: </span>
                          <span className="ws-text-sm ws-brand-primary">${benefit.calculatedAmount.toFixed(0)}</span>
                        </div>
                        <div>
                          <span className="ws-text-sm font-medium">Monthly: </span>
                          <span className="ws-text-sm ws-brand-primary">${benefit.monthlyAmount.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-background-alt rounded-lg">
              <p className="ws-text-sm ws-color-muted text-center">
                <strong>Disclaimer:</strong> This calculator provides estimates based on 2024 benefit rates and general eligibility criteria.
                Actual benefit amounts may vary based on your specific situation. This is not financial advice - consult a qualified professional for personalized guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Government Benefits Guide</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Understanding the benefits you may qualify for and how to apply.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">GST/HST Credit</h3>
                <p className="ws-color-muted mb-4">
                  Quarterly tax-free payments to offset GST/HST costs. Automatically applied if eligible.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Canada Child and Family Benefits</h3>
                <p className="ws-color-muted mb-4">
                  Monthly payments for families with children under 6. Apply through CRA My Account.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Old Age Security</h3>
                <p className="ws-color-muted mb-4">
                  Monthly benefit for seniors 65+. Automatically applied at age 65.
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
            Maximize your government benefits
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-2xl mx-auto">
            Don't leave money on the table. Apply for all the benefits you're eligible for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ws-button ws-button-primary ws-button-lg">
              Apply for Benefits
            </button>
            <button className="ws-button ws-button-secondary ws-button-lg">
              Contact CRA
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}