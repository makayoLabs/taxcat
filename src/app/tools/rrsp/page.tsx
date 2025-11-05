'use client'

import React, { useState, useMemo } from 'react'

export default function RRSPPage() {
  const [income, setIncome] = useState<number>(60000)
  const [contribution, setContribution] = useState<number>(5000)
  const [province, setProvince] = useState<string>('ON')
  const [key, setKey] = useState<number>(0)

  const result = useMemo(() => {
    const maxRRSP = Math.min(income * 0.18, 31560) // 2024 RRSP limit
    const actualContribution = Math.min(contribution, maxRRSP)

    // Federal tax brackets (simplified)
    const fedTaxRate = income <= 53359 ? 0.15 :
                      income <= 106717 ? 0.205 :
                      income <= 165430 ? 0.26 :
                      income <= 235675 ? 0.29 : 0.33

    // Provincial rates (simplified)
    const provRates: Record<string, number> = {
      'ON': 0.0505, 'BC': 0.0535, 'AB': 0.10, 'QC': 0.15, 'MB': 0.108,
      'SK': 0.105, 'NS': 0.0879, 'NB': 0.0948, 'NL': 0.087, 'PE': 0.0917,
      'YT': 0.064, 'NT': 0.059, 'NU': 0.04
    }

    const provTaxRate = provRates[province] || 0.10
    const combinedRate = fedTaxRate + provTaxRate

    const taxSavings = actualContribution * combinedRate
    const netCost = actualContribution - taxSavings
    const futureValue = actualContribution * Math.pow(1.07, 25) // 7% growth over 25 years

    return {
      maxRRSP,
      actualContribution,
      taxSavings,
      netCost,
      futureValue,
      combinedRate: combinedRate * 100
    }
  }, [income, contribution, province, key])

  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">RRSP Calculator</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Maximize Your RRSP Contributions
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Calculate your RRSP contribution limits, tax savings, and long-term growth potential.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-card">
            <div className="mb-8">
              <h2 className="ws-display-md ws-balance mb-4">RRSP Contribution Calculator</h2>
              <p className="ws-text-lg ws-color-muted">
                Enter your details to see how RRSP contributions can reduce your taxes and grow your wealth.
              </p>
            </div>

            <div className="ws-grid mb-8">
              <div className="ws-col-12 md:ws-col-4">
                <label className="block ws-text-sm font-medium mb-2">Annual Income</label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value || 0))}
                  className="w-full ws-input"
                  placeholder="Enter your annual income"
                />
              </div>
              <div className="ws-col-12 md:ws-col-4">
                <label className="block ws-text-sm font-medium mb-2">RRSP Contribution</label>
                <input
                  type="number"
                  value={contribution}
                  onChange={(e) => setContribution(Number(e.target.value || 0))}
                  className="w-full ws-input"
                  placeholder="Planned contribution"
                />
              </div>
              <div className="ws-col-12 md:ws-col-4">
                <label className="block ws-text-sm font-medium mb-2">Province</label>
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
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                className="ws-button ws-button-primary"
                onClick={() => {
                  // Force recalculation
                  setKey(prev => prev + 1)
                }}
              >
                Calculate RRSP
              </button>
              <button
                className="ws-button ws-button-secondary"
                onClick={() => {
                  const calculationData = {
                    income,
                    contribution,
                    province,
                    results: result,
                    timestamp: new Date().toISOString()
                  }
                  const savedCalculations = JSON.parse(localStorage.getItem('taxcat-calculations') || '[]')
                  savedCalculations.push(calculationData)
                  localStorage.setItem('taxcat-calculations', JSON.stringify(savedCalculations))
                  alert('RRSP calculation saved successfully!')
                }}
              >
                Save Calculation
              </button>
              <button
                className="ws-button ws-button-outline"
                onClick={() => {
                  setIncome(60000)
                  setContribution(5000)
                  setProvince('ON')
                  setKey(prev => prev + 1)
                }}
              >
                Reset Form
              </button>
            </div>

            <div className="ws-grid">
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">RRSP Limit</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.maxRRSP.toLocaleString()}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    18% of earned income
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Tax Savings</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.taxSavings.toFixed(0)}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Immediate tax reduction
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Net Cost</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.netCost.toFixed(0)}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    After tax savings
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Future Value</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.futureValue.toLocaleString()}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    In 25 years at 7%
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Marginal Rate</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    {((result.combinedRate * 100) / 100).toFixed(1)}%
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Federal + Provincial
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Remaining Room</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${(result.maxRRSP - result.actualContribution).toLocaleString()}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Available for 2024
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-background-alt rounded-lg">
              <p className="ws-text-sm ws-color-muted text-center">
                <strong>Disclaimer:</strong> This calculator provides estimates for illustrative purposes only and does not constitute financial or tax advice.
                RRSP contribution limits and tax rates may vary. Consult a qualified financial advisor for personalized advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">RRSP Essentials</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Everything you need to know about RRSPs and tax-advantaged retirement savings.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Contribution Limits</h3>
                <p className="ws-color-muted mb-4">
                  Your RRSP contribution limit is 18% of your earned income, up to the annual maximum ($31,560 for 2024).
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Tax Benefits</h3>
                <p className="ws-color-muted mb-4">
                  RRSP contributions reduce your taxable income, potentially dropping you into a lower tax bracket.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Investment Growth</h3>
                <p className="ws-color-muted mb-4">
                  Your RRSP investments grow tax-deferred, allowing compound growth to work in your favor.
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
            Ready to start saving for retirement?
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-2xl mx-auto">
            Maximize your RRSP contributions and build a secure financial future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ws-button ws-button-primary ws-button-lg">
              Open RRSP Account
            </button>
            <button className="ws-button ws-button-secondary ws-button-lg">
              Learn More About RRSPs
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}