import React, { useState, useEffect } from 'react'
import { Calculator, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react'

interface TaxData {
  totalIncome: number
  deductions: number
  taxableIncome: number
  federalTax: number
  provincialTax: number
  cppContributions: number
  eiPremiums: number
  taxesWithheld: number
  totalTaxOwed: number
  refund: number
}

interface TaxCalculatorProps {
  incomeData?: {
    employmentIncome?: number
    cppContributions?: number
    eiPremiums?: number
    incomeTaxWithheld?: number
    businessRevenue?: number
    businessExpenses?: number
    interestIncome?: number
    dividendIncome?: number
    capitalGains?: number
    capitalLosses?: number
    pensions?: number
    rentalIncome?: number
    otherIncome?: number
  }
  deductionData?: {
    rrspContribution?: number
    rrspLoanRepayment?: number
    medicalExpenses?: number
    cashDonations?: number
    nonCashDonations?: number
    carryingCharges?: number
    movingExpenses?: number
    politicalContributions?: number
    cppContributions?: number
    tuitionEducation?: number
    canadaWorkersBenefit?: number
    gstHstCredit?: number
  }
  province?: string
  onCalculationComplete?: (taxData: TaxData) => void
}

export default function TaxCalculator({
  incomeData = {},
  deductionData = {},
  province = 'ON',
  onCalculationComplete
}: TaxCalculatorProps) {
  const [taxData, setTaxData] = useState<TaxData>({
    totalIncome: 0,
    deductions: 0,
    taxableIncome: 0,
    federalTax: 0,
    provincialTax: 0,
    cppContributions: 0,
    eiPremiums: 0,
    taxesWithheld: 0,
    totalTaxOwed: 0,
    refund: 0
  })

  const [isCalculating, setIsCalculating] = useState(false)

  // Federal tax brackets (2024)
  const federalBrackets = [
    { min: 0, max: 53359, rate: 0.15 },
    { min: 53359, max: 106717, rate: 0.205 },
    { min: 106717, max: 165430, rate: 0.26 },
    { min: 165430, max: 235675, rate: 0.29 },
    { min: 235675, max: Infinity, rate: 0.33 }
  ]

  // Provincial tax brackets (Ontario 2024)
  const provincialBrackets = {
    ON: [
      { min: 0, max: 49231, rate: 0.0505 },
      { min: 49231, max: 98463, rate: 0.0915 },
      { min: 98463, max: 150000, rate: 0.1116 },
      { min: 150000, max: 220000, rate: 0.1216 },
      { min: 220000, max: Infinity, rate: 0.1316 }
    ]
  }

  const calculateTax = (income: number, brackets: typeof federalBrackets): number => {
    let tax = 0
    let remainingIncome = income

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break

      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
      tax += taxableInBracket * bracket.rate
      remainingIncome -= taxableInBracket
    }

    return tax
  }

  const calculateCPP = (income: number): number => {
    const maxCPP = 14256.60 // 2024 maximum
    const cppRate = 0.0525
    const ympe = 66600 // 2024 YMPE

    return Math.min(income * cppRate, maxCPP)
  }

  const calculateEI = (income: number): number => {
    const maxEI = 1056.00 // 2024 maximum
    const eiRate = 0.0163
    const maxInsurable = 61000 // 2024 maximum

    return Math.min(Math.min(income, maxInsurable) * eiRate, maxEI)
  }

  useEffect(() => {
    const calculateTaxes = async () => {
      setIsCalculating(true)

      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500))

      // Calculate total income
      const totalIncome =
        (incomeData.employmentIncome || 0) +
        (incomeData.businessRevenue || 0) - (incomeData.businessExpenses || 0) +
        (incomeData.interestIncome || 0) +
        (incomeData.dividendIncome || 0) +
        (incomeData.capitalGains || 0) - (incomeData.capitalLosses || 0) +
        (incomeData.pensions || 0) +
        (incomeData.rentalIncome || 0) +
        (incomeData.otherIncome || 0)

      // Calculate deductions
      const deductions =
        (deductionData.rrspContribution || 0) +
        (deductionData.rrspLoanRepayment || 0) +
        (deductionData.medicalExpenses || 0) +
        (deductionData.cashDonations || 0) +
        (deductionData.nonCashDonations || 0) +
        (deductionData.carryingCharges || 0) +
        (deductionData.movingExpenses || 0) +
        (deductionData.politicalContributions || 0)

      const taxableIncome = Math.max(0, totalIncome - deductions)

      // Calculate taxes
      const federalTax = calculateTax(taxableIncome, federalBrackets)
      const provincialTax = calculateTax(taxableIncome, provincialBrackets[province as keyof typeof provincialBrackets] || provincialBrackets.ON)

      // Calculate CPP and EI (if not already provided)
      const cppContributions = incomeData.cppContributions || calculateCPP(incomeData.employmentIncome || 0)
      const eiPremiums = incomeData.eiPremiums || calculateEI(incomeData.employmentIncome || 0)
      const taxesWithheld = incomeData.incomeTaxWithheld || 0

      const totalTaxOwed = federalTax + provincialTax + cppContributions + eiPremiums
      const refund = Math.max(0, taxesWithheld - totalTaxOwed)

      const newTaxData: TaxData = {
        totalIncome,
        deductions,
        taxableIncome,
        federalTax,
        provincialTax,
        cppContributions,
        eiPremiums,
        taxesWithheld,
        totalTaxOwed,
        refund
      }

      setTaxData(newTaxData)
      onCalculationComplete?.(newTaxData)
      setIsCalculating(false)
    }

    calculateTaxes()
  }, [incomeData, deductionData, province, onCalculationComplete])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Calculator className="h-5 w-5 mr-2 text-blue-600" />
          Tax Calculation
        </h2>
        {isCalculating && (
          <div className="flex items-center text-sm text-blue-600">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
            Calculating...
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Income Summary */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md">
          <div>
            <p className="text-sm text-gray-600">Total Income</p>
            <p className="text-lg font-semibold text-gray-900">{formatCurrency(taxData.totalIncome)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Deductions</p>
            <p className="text-lg font-semibold text-green-600">-{formatCurrency(taxData.deductions)}</p>
          </div>
        </div>

        {/* Taxable Income */}
        <div className="p-4 bg-blue-50 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-blue-900">Taxable Income</span>
            <span className="text-lg font-bold text-blue-900">{formatCurrency(taxData.taxableIncome)}</span>
          </div>
        </div>

        {/* Tax Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700">Federal Tax</span>
            <span className="font-medium text-gray-900">{formatCurrency(taxData.federalTax)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700">Provincial Tax ({province})</span>
            <span className="font-medium text-gray-900">{formatCurrency(taxData.provincialTax)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700">CPP Contributions</span>
            <span className="font-medium text-gray-900">{formatCurrency(taxData.cppContributions)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700">EI Premiums</span>
            <span className="font-medium text-gray-900">{formatCurrency(taxData.eiPremiums)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b-2 border-gray-200">
            <span className="font-medium text-gray-900">Total Tax Owed</span>
            <span className="font-bold text-gray-900">{formatCurrency(taxData.totalTaxOwed)}</span>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="p-4 bg-green-50 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-green-700">Taxes Withheld</span>
            <span className="font-medium text-green-700">{formatCurrency(taxData.taxesWithheld)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-green-900">Expected Refund</span>
            <span className="text-2xl font-bold text-green-600">{formatCurrency(taxData.refund)}</span>
          </div>
        </div>

        {/* Optimization Suggestions */}
        {taxData.refund > 0 && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-start">
              <TrendingUp className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-yellow-900">Optimization Opportunity</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Consider maximizing your RRSP contributions to potentially increase your refund.
                  We can help you calculate the optimal amount.
                </p>
              </div>
            </div>
          </div>
        )}

        {taxData.refund < 0 && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-orange-900">Additional Tax Owed</h3>
                <p className="text-sm text-orange-700 mt-1">
                  You may owe additional taxes. Consider increasing your tax withholdings or making quarterly payments.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}