'use client'

import React, { useMemo, useState } from 'react'

type FilingStatus = 'SINGLE' | 'MARRIED' | 'COMMON_LAW'

const provinces = [
  'ON','BC','AB','QC','MB','SK','NS','NB','NL','PE','YT','NT','NU'
]

const TaxCalculator = (): JSX.Element => {
  const [income, setIncome] = useState<number>(60000)
  const [province, setProvince] = useState<string>('ON')
  const [status, setStatus] = useState<FilingStatus>('SINGLE')
  const [rrsp, setRrsp] = useState<number>(0)
  const [key, setKey] = useState<number>(0)

  const result = useMemo(() => {
    // Calculate taxable income after RRSP deduction
    const taxable = Math.max(0, income - rrsp)

    // 2024 Federal tax brackets (from CRA)
    const fed = (() => {
      let tax = 0
      let remaining = taxable
      const step = (limit: number, rate: number) => {
        const amount = Math.min(remaining, limit)
        tax += amount * rate
        remaining -= amount
      }
      step(53359, 0.15)      // 15% on the first $53,359
      if (remaining > 0) step(53359, 0.205)  // 20.5% on the next $53,359
      if (remaining > 0) step(58944, 0.26)   // 26% on the next $58,944
      if (remaining > 0) step(70387, 0.29)   // 29% on the next $70,387
      if (remaining > 0) tax += remaining * 0.33  // 33% on the remainder
      return tax
    })()

    // 2024 Provincial tax rates (from CRA)
    const provincialRates: Record<string, number> = {
      'ON': 0.0505,  // Ontario
      'BC': 0.0535,  // British Columbia
      'AB': 0.10,    // Alberta
      'QC': 0.15,    // Quebec
      'MB': 0.108,   // Manitoba
      'SK': 0.105,   // Saskatchewan
      'NS': 0.0879,  // Nova Scotia
      'NB': 0.0948,  // New Brunswick
      'NL': 0.087,   // Newfoundland and Labrador
      'PE': 0.0917,  // Prince Edward Island
      'YT': 0.064,   // Yukon
      'NT': 0.059,   // Northwest Territories
      'NU': 0.04     // Nunavut
    }

    const provRate = provincialRates[province] || 0.10
    const prov = taxable * provRate

    // CPP and EI calculations (2024 rates from CRA)
    const cppMaxEarnings = 68500
    const cppMinEarnings = 3500
    const cppRate = 0.0695
    const eiMaxEarnings = 61500
    const eiRate = 0.0163

    // CPP calculation: 6.95% on earnings between $3,500 and $68,500
    const cppEarnings = Math.min(Math.max(0, income - cppMinEarnings), cppMaxEarnings - cppMinEarnings)
    const cpp = cppEarnings * cppRate

    // EI calculation: 1.63% on earnings up to $61,500
    const eiEarnings = Math.min(income, eiMaxEarnings)
    const ei = eiEarnings * eiRate

    // Calculate total tax and deductions
    const totalTax = Math.max(0, fed + prov)
    const totalDeductions = cpp + ei
    const net = income - totalTax - totalDeductions
    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0

    // RRSP tax savings calculation (federal + provincial blended rate)
    const blendedRate = 0.15 + provRate // Simplified blended rate
    const rrspSavings = Math.min(rrsp, taxable) * blendedRate

    // Breakdown for transparency
    const breakdown = {
      grossIncome: income,
      rrspDeduction: Math.min(rrsp, income),
      taxableIncome: taxable,
      federalTax: fed,
      provincialTax: prov,
      cppContribution: cpp,
      eiContribution: ei,
      totalTax: totalTax,
      totalDeductions: totalDeductions,
      netIncome: net,
      effectiveRate: effectiveRate,
      rrspSavings: rrspSavings
    }

    return breakdown
  }, [income, province, rrsp, key])

  return (
    <div className="ws-card">
      <div className="mb-8">
        <h2 className="ws-display-md ws-balance mb-4">Tax Calculator</h2>
        <p className="ws-text-lg ws-color-muted">
          Estimate your federal and provincial taxes, CPP/EI contributions, and see how RRSP contributions can reduce your tax liability.
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
          <label className="block ws-text-sm font-medium mb-2">Province/Territory</label>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full ws-input"
          >
            {provinces.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="ws-col-12 md:ws-col-6">
          <label className="block ws-text-sm font-medium mb-2">Filing Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as FilingStatus)}
            className="w-full ws-input"
          >
            <option value="SINGLE">Single</option>
            <option value="MARRIED">Married</option>
            <option value="COMMON_LAW">Common-law</option>
          </select>
        </div>
        <div className="ws-col-12 md:ws-col-6">
          <label className="block ws-text-sm font-medium mb-2">RRSP Contribution</label>
          <input
            type="number"
            value={rrsp}
            onChange={(e) => setRrsp(Number(e.target.value || 0))}
            className="w-full ws-input"
            placeholder="RRSP contribution amount"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          className="ws-button ws-button-primary"
          onClick={() => {
            // Force recalculation by triggering state update
            setKey(prev => prev + 1)
          }}
        >
          Calculate Taxes
        </button>
        <button
          className="ws-button ws-button-secondary"
          onClick={() => {
            const calculationData = {
              income,
              province,
              rrsp,
              results: result,
              timestamp: new Date().toISOString()
            }
            const savedCalculations = JSON.parse(localStorage.getItem('taxcat-calculations') || '[]')
            savedCalculations.push(calculationData)
            localStorage.setItem('taxcat-calculations', JSON.stringify(savedCalculations))
            alert('Calculation saved successfully!')
          }}
        >
          Save Calculation
        </button>
        <button
          className="ws-button ws-button-outline"
          onClick={() => {
            setIncome(60000)
            setProvince('ON')
            setRrsp(0)
            setKey(prev => prev + 1)
          }}
        >
          Reset Form
        </button>
      </div>

      <div className="ws-grid">
        <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
          <div className="ws-card ws-card-alt text-center">
            <div className="ws-text-sm ws-color-muted mb-2">Gross Income</div>
            <div className="ws-display-sm ws-brand-primary mb-1">
              ${result.grossIncome.toLocaleString()}
            </div>
            <div className="ws-text-sm ws-color-muted">
              Before deductions
            </div>
          </div>
        </div>
        <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
          <div className="ws-card ws-card-alt text-center">
            <div className="ws-text-sm ws-color-muted mb-2">Taxable Income</div>
            <div className="ws-display-sm ws-brand-primary mb-1">
              ${result.taxableIncome.toLocaleString()}
            </div>
            <div className="ws-text-sm ws-color-muted">
              After RRSP deduction
            </div>
          </div>
        </div>
        <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
          <div className="ws-card ws-card-alt text-center">
            <div className="ws-text-sm ws-color-muted mb-2">Total Tax</div>
            <div className="ws-display-sm ws-brand-primary mb-1">
              ${result.totalTax.toFixed(0)}
            </div>
            <div className="ws-text-sm ws-color-muted">
              Federal + Provincial
            </div>
          </div>
        </div>
        <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
          <div className="ws-card ws-card-alt text-center">
            <div className="ws-text-sm ws-color-muted mb-2">Net Income</div>
            <div className="ws-display-sm ws-brand-primary mb-1">
              ${result.netIncome.toFixed(0)}
            </div>
            <div className="ws-text-sm ws-color-muted">
              After all deductions
            </div>
          </div>
        </div>
        <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
          <div className="ws-card ws-card-alt text-center">
            <div className="ws-text-sm ws-color-muted mb-2">CPP Contribution</div>
            <div className="ws-display-sm ws-brand-primary mb-1">
              ${result.cppContribution.toFixed(0)}
            </div>
            <div className="ws-text-sm ws-color-muted">
              6.95% on earnings
            </div>
          </div>
        </div>
        <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
          <div className="ws-card ws-card-alt text-center">
            <div className="ws-text-sm ws-color-muted mb-2">EI Contribution</div>
            <div className="ws-display-sm ws-brand-primary mb-1">
              ${result.eiContribution.toFixed(0)}
            </div>
            <div className="ws-text-sm ws-color-muted">
              1.63% on earnings
            </div>
          </div>
        </div>
        <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
          <div className="ws-card ws-card-alt text-center">
            <div className="ws-text-sm ws-color-muted mb-2">Effective Rate</div>
            <div className="ws-display-sm ws-brand-primary mb-1">
              {result.effectiveRate.toFixed(1)}%
            </div>
            <div className="ws-text-sm ws-color-muted">
              Average tax rate
            </div>
          </div>
        </div>
        <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
          <div className="ws-card ws-card-alt text-center">
            <div className="ws-text-sm ws-color-muted mb-2">RRSP Savings</div>
            <div className="ws-display-sm ws-brand-primary mb-1">
              ${result.rrspSavings.toFixed(0)}
            </div>
            <div className="ws-text-sm ws-color-muted">
              Tax reduction benefit
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-background-alt rounded-lg">
        <p className="ws-text-sm ws-color-muted text-center">
          <strong>Disclaimer:</strong> This calculator provides estimates for illustrative purposes only and does not constitute tax advice.
          Consult a qualified tax professional for personalized advice. Tax rates and brackets are simplified and may not reflect your exact situation.
        </p>
      </div>
    </div>
  )
}

export default TaxCalculator










