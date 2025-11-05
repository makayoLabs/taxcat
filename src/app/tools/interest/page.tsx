'use client'

import React, { useState, useMemo } from 'react'

export default function InterestRatePage() {
  const [loanAmount, setLoanAmount] = useState<number>(10000)
  const [interestRate, setInterestRate] = useState<number>(5)
  const [loanTerm, setLoanTerm] = useState<number>(5)
  const [paymentFrequency, setPaymentFrequency] = useState<'monthly' | 'biweekly' | 'weekly'>('monthly')
  const [key, setKey] = useState<number>(0)

  // CRA Prescribed Interest Rates (as of October 2024)
  const prescribedRates = {
    loans: 7, // 7% for loans between individuals
    incomeTax: 8, // 8% for income tax purposes
    minimumTax: 1 // 1% minimum tax on banks
  }

  const result = useMemo(() => {
    const principal = loanAmount
    const annualRate = interestRate / 100
    const termYears = loanTerm

    // Calculate periodic rate based on payment frequency
    let periodsPerYear: number
    let periodicRate: number
    let frequencyLabel: string

    switch (paymentFrequency) {
      case 'weekly':
        periodsPerYear = 52
        periodicRate = annualRate / 52
        frequencyLabel = 'weekly'
        break
      case 'biweekly':
        periodsPerYear = 26
        periodicRate = annualRate / 26
        frequencyLabel = 'bi-weekly'
        break
      case 'monthly':
      default:
        periodsPerYear = 12
        periodicRate = annualRate / 12
        frequencyLabel = 'monthly'
        break
    }

    const totalPeriods = periodsPerYear * termYears

    // Calculate payment amount using standard loan formula
    const payment = principal * (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) /
                   (Math.pow(1 + periodicRate, totalPeriods) - 1)

    // Calculate total interest and total payments
    const totalPayments = payment * totalPeriods
    const totalInterest = totalPayments - principal

    // Calculate detailed amortization schedule
    const schedule = []
    let balance = principal
    let totalInterestPaid = 0
    let totalPrincipalPaid = 0

    for (let i = 1; i <= Math.min(60, totalPeriods); i++) { // Show up to 5 years of payments
      const interestPayment = balance * periodicRate
      const principalPayment = payment - interestPayment
      balance -= principalPayment

      totalInterestPaid += interestPayment
      totalPrincipalPaid += principalPayment

      schedule.push({
        payment: i,
        paymentAmount: payment,
        interestPayment,
        principalPayment,
        remainingBalance: Math.max(0, balance),
        cumulativeInterest: totalInterestPaid,
        cumulativePrincipal: totalPrincipalPaid
      })

      // Break if balance is paid off
      if (balance <= 0) break
    }

    // Calculate interest paid in different years
    const yearlyBreakdown = []
    for (let year = 1; year <= Math.min(termYears, 5); year++) {
      const startPeriod = (year - 1) * periodsPerYear + 1
      const endPeriod = Math.min(year * periodsPerYear, schedule.length)

      if (startPeriod <= schedule.length) {
        const yearInterest = schedule
          .slice(startPeriod - 1, endPeriod)
          .reduce((sum, payment) => sum + payment.interestPayment, 0)

        const yearPrincipal = schedule
          .slice(startPeriod - 1, endPeriod)
          .reduce((sum, payment) => sum + payment.principalPayment, 0)

        yearlyBreakdown.push({
          year,
          interestPaid: yearInterest,
          principalPaid: yearPrincipal,
          totalPaid: yearInterest + yearPrincipal
        })
      }
    }

    return {
      payment: payment,
      totalPayments: totalPayments,
      totalInterest: totalInterest,
      periodsPerYear,
      totalPeriods,
      frequencyLabel,
      schedule,
      yearlyBreakdown
    }
  }, [loanAmount, interestRate, loanTerm, paymentFrequency, key])

  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">Interest Rate Calculator</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Calculate Loan Payments & Interest Costs
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Calculate loan payments, total interest costs, and see how different interest rates and payment frequencies affect your borrowing costs.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-card">
            <div className="mb-8">
              <h2 className="ws-display-md ws-balance mb-4">Loan Payment Calculator</h2>
              <p className="ws-text-lg ws-color-muted">
                Enter your loan details to calculate payments and see the impact of interest rates.
              </p>
            </div>

            <div className="ws-grid mb-8">
              <div className="ws-col-12 md:ws-col-6">
                <label className="block ws-text-sm font-medium mb-2">Loan Amount</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value || 0))}
                  className="w-full ws-input"
                  placeholder="Enter loan amount"
                />
              </div>
              <div className="ws-col-12 md:ws-col-6">
                <label className="block ws-text-sm font-medium mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value || 0))}
                  className="w-full ws-input"
                  placeholder="Annual interest rate"
                  step="0.01"
                />
              </div>
              <div className="ws-col-12 md:ws-col-6">
                <label className="block ws-text-sm font-medium mb-2">Loan Term (Years)</label>
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value || 0))}
                  className="w-full ws-input"
                  placeholder="Term in years"
                  min="1"
                  max="30"
                />
              </div>
              <div className="ws-col-12 md:ws-col-6">
                <label className="block ws-text-sm font-medium mb-2">Payment Frequency</label>
                <select
                  value={paymentFrequency}
                  onChange={(e) => setPaymentFrequency(e.target.value as any)}
                  className="w-full ws-input"
                >
                  <option value="monthly">Monthly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="weekly">Weekly</option>
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
                Calculate Interest
              </button>
              <button
                className="ws-button ws-button-secondary"
                onClick={() => {
                  const calculationData = {
                    loanAmount,
                    interestRate,
                    loanTerm,
                    paymentFrequency,
                    results: result,
                    timestamp: new Date().toISOString()
                  }
                  const savedCalculations = JSON.parse(localStorage.getItem('taxcat-calculations') || '[]')
                  savedCalculations.push(calculationData)
                  localStorage.setItem('taxcat-calculations', JSON.stringify(savedCalculations))
                  alert('Interest calculation saved successfully!')
                }}
              >
                Save Calculation
              </button>
              <button
                className="ws-button ws-button-outline"
                onClick={() => {
                  setLoanAmount(10000)
                  setInterestRate(5)
                  setLoanTerm(5)
                  setPaymentFrequency('monthly')
                  setKey(prev => prev + 1)
                }}
              >
                Reset Form
              </button>
            </div>

            <div className="ws-grid">
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Payment Amount</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.payment.toFixed(2)}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    {result.frequencyLabel} payment
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Total Interest</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.totalInterest.toFixed(2)}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Over {loanTerm} years
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Total Payments</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${result.totalPayments.toFixed(2)}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Principal + interest
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Interest Rate</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    {interestRate}%
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Annual percentage rate
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Loan Term</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    {loanTerm} years
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    {result.totalPeriods} total payments
                  </div>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card ws-card-alt text-center">
                  <div className="ws-text-sm ws-color-muted mb-2">Principal Amount</div>
                  <div className="ws-display-sm ws-brand-primary mb-1">
                    ${loanAmount.toLocaleString()}
                  </div>
                  <div className="ws-text-sm ws-color-muted">
                    Original loan amount
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-background-alt rounded-lg">
              <p className="ws-text-sm ws-color-muted text-center">
                <strong>Disclaimer:</strong> This calculator provides estimates for illustrative purposes only and does not constitute financial advice.
                Actual loan terms may vary. Consult a qualified financial advisor for personalized advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CRA Prescribed Rates */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">CRA Prescribed Interest Rates</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Current prescribed interest rates set by the Canada Revenue Agency for tax purposes.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Loans Between Individuals</h3>
                <p className="ws-color-muted mb-6">
                  Minimum interest rate for loans between family members or friends.
                </p>
                <div className="ws-display-md ws-brand-primary">{prescribedRates.loans}%</div>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Income Tax Purposes</h3>
                <p className="ws-color-muted mb-6">
                  Rate used for calculating imputed interest on outstanding amounts.
                </p>
                <div className="ws-display-md ws-brand-primary">{prescribedRates.incomeTax}%</div>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Minimum Tax</h3>
                <p className="ws-color-muted mb-6">
                  Minimum tax rate that banks must pay on their taxable income.
                </p>
                <div className="ws-display-md ws-brand-primary">{prescribedRates.minimumTax}%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amortization Schedule Preview */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Payment Schedule Preview</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              See how your payments are allocated between principal and interest over time.
            </p>
          </div>

          <div className="ws-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 ws-text-sm font-medium">Payment #</th>
                    <th className="text-left py-3 px-4 ws-text-sm font-medium">Payment</th>
                    <th className="text-left py-3 px-4 ws-text-sm font-medium">Principal</th>
                    <th className="text-left py-3 px-4 ws-text-sm font-medium">Interest</th>
                    <th className="text-left py-3 px-4 ws-text-sm font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((payment) => (
                    <tr key={payment.payment} className="border-b">
                      <td className="py-3 px-4 ws-text-sm">{payment.payment}</td>
                      <td className="py-3 px-4 ws-text-sm">${payment.paymentAmount.toFixed(2)}</td>
                      <td className="py-3 px-4 ws-text-sm">${payment.principalPayment.toFixed(2)}</td>
                      <td className="py-3 px-4 ws-text-sm">${payment.interestPayment.toFixed(2)}</td>
                      <td className="py-3 px-4 ws-text-sm">${payment.remainingBalance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {result.totalPeriods > 12 && (
              <div className="mt-4 p-4 bg-background-alt rounded-lg">
                <p className="ws-text-sm ws-color-muted text-center">
                  Showing first 12 payments of {result.totalPeriods} total payments.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Interest Rate Essentials</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Understanding interest rates and how they affect your borrowing and investing decisions.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Compound Interest</h3>
                <p className="ws-color-muted mb-4">
                  Interest that earns interest on itself. The earlier you start saving, the more compound interest works in your favor.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Payment Frequency</h3>
                <p className="ws-color-muted mb-4">
                  More frequent payments can reduce total interest paid by applying payments to principal sooner.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-3">Interest Rate Types</h3>
                <p className="ws-color-muted mb-4">
                  Fixed rates stay the same, variable rates change with market conditions. Each has advantages.
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
            Make informed borrowing decisions
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-2xl mx-auto">
            Use our calculators to understand the true cost of borrowing and make better financial decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ws-button ws-button-primary ws-button-lg">
              Start Tax Filing
            </button>
            <button className="ws-button ws-button-secondary ws-button-lg">
              Learn More About Taxes
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}