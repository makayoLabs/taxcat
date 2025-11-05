import React from 'react'
import { DollarSign, Heart, Home, Car, GraduationCap } from 'lucide-react'

interface DeductionData {
  rrspContribution: number
  rrspLoanRepayment: number
  medicalExpenses: number
  medicalExpenseCredit: number
  cashDonations: number
  nonCashDonations: number
  homeOfficeSqFt: number
  homeSizeSqFt: number
  homeOfficeExpenses: number
  carryingCharges: number
  movingExpenses: number
  politicalContributions: number
  cppContributions: number
  tuitionEducation: number
  canadaWorkersBenefit: number
  gstHstCredit: number
}

interface DeductionFormProps {
  data: DeductionData
  onChange: (data: DeductionData) => void
}

export default function DeductionForm({ data, onChange }: DeductionFormProps) {
  const updateField = (field: keyof DeductionData, value: number) => {
    onChange({
      ...data,
      [field]: value
    })
  }

  return (
    <div className="space-y-8">
      {/* RRSP Contributions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
          RRSP Contributions
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RRSP Contribution Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.rrspContribution || ''}
                onChange={(e) => updateField('rrspContribution', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Amount contributed to your RRSP in the tax year</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RRSP Loan Repayment</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.rrspLoanRepayment || ''}
                onChange={(e) => updateField('rrspLoanRepayment', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Amount repaid on RRSP loans</p>
          </div>
        </div>
      </div>

      {/* Medical Expenses */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Heart className="h-5 w-5 mr-2 text-red-600" />
          Medical Expenses
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Medical Expenses</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.medicalExpenses || ''}
                onChange={(e) => updateField('medicalExpenses', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Medical expenses paid in the tax year</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medical Expense Tax Credit</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.medicalExpenseCredit || ''}
                onChange={(e) => updateField('medicalExpenseCredit', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Calculated credit (15% of eligible expenses over threshold)</p>
          </div>
        </div>
      </div>

      {/* Charitable Donations */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Heart className="h-5 w-5 mr-2 text-green-600" />
          Charitable Donations
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cash Donations</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.cashDonations || ''}
                onChange={(e) => updateField('cashDonations', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Non-Cash Donations</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.nonCashDonations || ''}
                onChange={(e) => updateField('nonCashDonations', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Fair market value of donated property</p>
          </div>
        </div>
      </div>

      {/* Home Office Expenses */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Home className="h-5 w-5 mr-2 text-purple-600" />
          Home Office Expenses
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Office Space (sq ft)</label>
              <input
                type="number"
                value={data.homeOfficeSqFt || ''}
                onChange={(e) => updateField('homeOfficeSqFt', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Size (sq ft)</label>
              <input
                type="number"
                value={data.homeSizeSqFt || ''}
                onChange={(e) => updateField('homeSizeSqFt', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Office Expenses</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.homeOfficeExpenses || ''}
                onChange={(e) => updateField('homeOfficeExpenses', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Utilities, internet, supplies, etc.</p>
          </div>
        </div>
      </div>

      {/* Other Deductions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Other Deductions & Credits</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Carrying Charges</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.carryingCharges || ''}
                onChange={(e) => updateField('carryingCharges', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Investment loan interest, property taxes on investments</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Moving Expenses</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.movingExpenses || ''}
                onChange={(e) => updateField('movingExpenses', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Political Contributions</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.politicalContributions || ''}
                onChange={(e) => updateField('politicalContributions', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Canada Pension Plan (CPP) Contributions</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.cppContributions || ''}
                onChange={(e) => updateField('cppContributions', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Voluntary CPP contributions</p>
          </div>
        </div>
      </div>

      {/* Tax Credits */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />
          Education & Other Credits
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tuition & Education Amounts</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.tuitionEducation || ''}
                onChange={(e) => updateField('tuitionEducation', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Canada Workers Benefit</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.canadaWorkersBenefit || ''}
                onChange={(e) => updateField('canadaWorkersBenefit', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GST/HST Credit</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.gstHstCredit || ''}
                onChange={(e) => updateField('gstHstCredit', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Don't forget these common deductions:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• RRSP contributions reduce your taxable income</li>
          <li>• Medical expenses can provide tax credits</li>
          <li>• Charitable donations are tax-deductible</li>
          <li>• Home office expenses if you work from home</li>
          <li>• Carrying charges on investments</li>
        </ul>
      </div>
    </div>
  )
}