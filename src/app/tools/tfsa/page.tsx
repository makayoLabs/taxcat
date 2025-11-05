'use client'

import React, { useState, useMemo } from 'react'

export default function TFSAPage() {
  const [income, setIncome] = useState<number>(60000)
  const [contribution, setContribution] = useState<number>(7000)
  const [currentRoom, setCurrentRoom] = useState<number>(0)
  const [investmentReturn, setInvestmentReturn] = useState<number>(6)
  const [timeHorizon, setTimeHorizon] = useState<number>(10)
  const [key, setKey] = useState<number>(0)

  const result = useMemo(() => {
    // 2024 TFSA contribution limit (from CRA)
    const maxTFSA = 7000
    const availableRoom = Math.max(0, maxTFSA - currentRoom)
    const actualContribution = Math.min(contribution, availableRoom)

    // TFSA growth calculation (completely tax-free)
    const annualReturn = investmentReturn / 100
    const futureValue = actualContribution * Math.pow(1 + annualReturn, timeHorizon)

    // Compare to taxable account with realistic tax rates
    // Using progressive tax brackets for more accuracy
    const getMarginalRate = (income: number) => {
      if (income <= 53359) return 0.15
      if (income <= 106717) return 0.205
      if (income <= 165430) return 0.26
      if (income <= 235675) return 0.29
      return 0.33
    }

    // Assume average income for tax calculation
    const assumedIncome = 75000
    const marginalRate = getMarginalRate(assumedIncome)
    const afterTaxReturn = annualReturn * (1 - marginalRate)
    const taxableFutureValue = actualContribution * Math.pow(1 + afterTaxReturn, timeHorizon)
    const taxSavings = futureValue - taxableFutureValue

    // Annual contribution limits history (from CRA)
    const contributionLimits = [
      { year: 2024, limit: 7000 },
      { year: 2023, limit: 6500 },
      { year: 2022, limit: 6000 },
      { year: 2021, limit: 6000 },
      { year: 2020, limit: 6000 },
      { year: 2019, limit: 6000 },
      { year: 2018, limit: 5500 },
      { year: 2017, limit: 5500 },
      { year: 2016, limit: 5500 },
      { year: 2015, limit: 10000 },
      { year: 2014, limit: 5500 },
      { year: 2013, limit: 5500 },
      { year: 2012, limit: 5000 },
      { year: 2011, limit: 5000 },
      { year: 2010, limit: 5000 },
      { year: 2009, limit: 5000 }
    ]

    const totalLifetimeRoom = contributionLimits.reduce((sum, limit) => sum + limit.limit, 0)

    // Calculate compound growth breakdown
    const growthBreakdown = []
    let balance = actualContribution
    for (let year = 1; year <= Math.min(timeHorizon, 10); year++) {
      const interest = balance * annualReturn
      const endBalance = balance + interest
      growthBreakdown.push({
        year,
        startingBalance: balance,
        interest,
        endBalance
      })
      balance = endBalance
    }

    return {
      maxTFSA,
      availableRoom,
      actualContribution,
      futureValue,
      taxableFutureValue,
      taxSavings,
      totalLifetimeRoom,
      marginalRate: marginalRate * 100,
      growthBreakdown
    }
  }, [contribution, currentRoom, investmentReturn, timeHorizon, key])

  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">TFSA Calculator</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Maximize Your TFSA Contributions
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Calculate your TFSA contribution limits, tax-free growth potential, and see how TFSAs compare to taxable investments.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-card">
            <div className="mb-8">
              <h2 className="ws-display-md ws-balance mb-4">TFSA Contribution Calculator</h2>
              <p className="ws-text-lg ws-color-muted">
                Enter your details to see your TFSA contribution room and tax-free growth potential.
              </p>
            </div>

            <div className="ws-grid mb-8">
              <div className="ws-col-12 md:ws-col-6">
                <label className="block ws-text-sm font-medium mb-2">Annual Income</label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value || 0))}
                  className="w-full ws-input"
                  placeholder="Enter your annual income"
                />
              </div>
              <div className="ws-col-12 md:ws-col-6">
                <label className="block ws-text-sm font-medium mb-2">TFSA Contribution</label>
                <input
                  type="number"
                  value={contribution}
                  onChange={(e) => setContribution(Number(e.target.value || 0))}
                  className="w-full ws-input"
                  placeholder="Planned contribution"
                />
              </div>
              <div className="ws-col-12 md:ws-col-6">
                <label className="block ws-text-sm font-medium mb-2">Current TFSA Room Used</label>
                <input
                  type="number"
                  value={currentRoom}
                  onChange={(e) => setCurrentRoom(Number(e.target.value || 0))}
                  className="w-full ws-input"
                  placeholder="Amount already contributed this year"
                />
              </div>
              <div className="ws-col-12 md:ws-col-6">
                <label className="block ws-text-sm font-medium mb-2">Expected Annual Return (%)</label>
                <input
                  type="number"
                  value={investmentReturn}
                  onChange={(e) => setInvestmentReturn(Number(e.target.value || 0))}
                  className="w-full ws-input"
                  placeholder="Expected investment return"
                  step="0.1"
                />
              </div>
              <div className="ws-col-12">
                <label className="block ws-text-sm font-medium mb-2">Time Horizon (Years)</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-center mt-2">
                  <span className="ws-text-sm font-medium">{timeHorizon} years</span>
                </div>
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
                Calculate TFSA
              </button>
              <button
                className="ws-button ws-button-secondary"
                onClick={() => {
                  const calculationData = {
                    contribution,
                    currentRoom,
                    investmentReturn,
                    timeHorizon,
                    results: result,
                    timestamp: new Date().toISOString()
                  }
                  const savedCalculations = JSON.parse(localStorage.getItem('taxcat-calculations') || '[]')
                  savedCalculations.push(calculationData)
                  localStorage.setItem('taxcat-calculations', JSON.stringify(savedCalculations))
                  alert('TFSA calculation saved successfully!')
                }}
              >
                Save Calculation
              </button>
              <button
                className="ws-button ws-button-outline"
                onClick={() => {
                  setContribution(7000)
                  setCurrentRoom(0)
                  setInvestmentReturn(6)
                  setTimeHorizon(10)
                  setKey(prev => prev + 1)
                }}
              >
                Reset Form
              </button>
            </div>

            <div className="ws-grid">
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">2024 TFSA Limit</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.maxTFSA.toLocaleString()}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Annual contribution limit
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Available Room</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.availableRoom.toLocaleString()}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Remaining for 2024
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Future Value (TFSA)</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.futureValue.toLocaleString()}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Tax-free growth in {timeHorizon} years
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
                    vs taxable account
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Marginal Tax Rate</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    {result.marginalRate.toFixed(1)}%
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Used for comparison
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Total Lifetime Room</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.totalLifetimeRoom.toLocaleString()}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Since 2009 inception
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-background-alt rounded-lg">
              <p className="ws-text-sm ws-color-muted text-center">
                <strong>Disclaimer:</strong> This calculator provides estimates for illustrative purposes only and does not constitute financial or tax advice.
                TFSA contribution limits and investment returns are not guaranteed. Consult a qualified financial advisor for personalized advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TFSA vs Taxable Comparison */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">TFSA vs Taxable Account</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              See the power of tax-free growth with this side-by-side comparison.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-4 text-center">TFSA Account</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="ws-text-sm">Initial Contribution:</span>
                    <span className="ws-text-sm font-medium">${result.actualContribution.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="ws-text-sm">Growth Rate:</span>
                    <span className="ws-text-sm font-medium">{investmentReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="ws-text-sm">Time Horizon:</span>
                    <span className="ws-text-sm font-medium">{timeHorizon} years</span>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="ws-text-sm font-medium">Final Value:</span>
                    <span className="ws-text-lg font-bold ws-brand-primary">${result.futureValue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="ws-text-sm text-green-800">✅ Tax-free withdrawals</p>
                  <p className="ws-text-sm text-green-800">✅ Tax-free growth</p>
                </div>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-4 text-center">Taxable Account</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="ws-text-sm">Initial Contribution:</span>
                    <span className="ws-text-sm font-medium">${result.actualContribution.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="ws-text-sm">After-tax Growth:</span>
                    <span className="ws-text-sm font-medium">{(investmentReturn * 0.75).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="ws-text-sm">Time Horizon:</span>
                    <span className="ws-text-sm font-medium">{timeHorizon} years</span>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="ws-text-sm font-medium">Final Value:</span>
                    <span className="ws-text-lg font-bold text-gray-600">${result.taxableFutureValue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-red-50 rounded-lg">
                  <p className="ws-text-sm text-red-800">❌ Taxed capital gains</p>
                  <p className="ws-text-sm text-red-800">❌ Taxed dividends</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">TFSA Essentials</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Everything you need to know about Tax-Free Savings Accounts.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Contribution Limits</h3>
                <p className="ws-color-muted mb-4">
                  2024 limit: $7,000. Unused contribution room carries forward indefinitely.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  View All Limits
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Tax Advantages</h3>
                <p className="ws-color-muted mb-4">
                  No taxes on investment growth or withdrawals. Perfect for high-income earners.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Investment Options</h3>
                <p className="ws-color-muted mb-4">
                  Invest in stocks, bonds, mutual funds, ETFs, and more within your TFSA.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Investment Guide
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
            Start building tax-free wealth today
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-2xl mx-auto">
            Maximize your TFSA contributions and watch your money grow tax-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ws-button ws-button-primary ws-button-lg">
              Open TFSA Account
            </button>
            <button className="ws-button ws-button-secondary ws-button-lg">
              Learn More About TFSAs
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}