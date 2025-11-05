import React, { useState } from 'react'
import { DollarSign, Briefcase, TrendingUp, Building } from 'lucide-react'

interface IncomeData {
  employmentIncome: number
  cppContributions: number
  eiPremiums: number
  incomeTaxWithheld: number
  businessRevenue: number
  businessExpenses: number
  interestIncome: number
  dividendIncome: number
  capitalGains: number
  capitalLosses: number
  pensions: number
  rentalIncome: number
  otherIncome: number
}

interface IncomeFormProps {
  data: IncomeData
  onChange: (data: IncomeData) => void
}

export default function IncomeForm({ data, onChange }: IncomeFormProps) {
  const updateField = (field: keyof IncomeData, value: number) => {
    onChange({
      ...data,
      [field]: value
    })
  }

  return (
    <div className="space-y-8">
      {/* Employment Income */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
          Employment Income
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employer Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employment Income</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={data.employmentIncome || ''}
                  onChange={(e) => updateField('employmentIncome', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CPP Contributions</label>
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">EI Premiums</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={data.eiPremiums || ''}
                  onChange={(e) => updateField('eiPremiums', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Income Tax Withheld</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.incomeTaxWithheld || ''}
                onChange={(e) => updateField('incomeTaxWithheld', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Self-Employment Income */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Building className="h-5 w-5 mr-2 text-green-600" />
          Self-Employment Income
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name (if applicable)</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your business name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gross Revenue</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={data.businessRevenue || ''}
                  onChange={(e) => updateField('businessRevenue', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Expenses</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={data.businessExpenses || ''}
                  onChange={(e) => updateField('businessExpenses', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Net Self-Employment Income</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={(data.businessRevenue || 0) - (data.businessExpenses || 0)}
                readOnly
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Calculated as revenue minus expenses</p>
          </div>
        </div>
      </div>

      {/* Investment Income */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
          Investment Income
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interest Income</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={data.interestIncome || ''}
                  onChange={(e) => updateField('interestIncome', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dividend Income</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={data.dividendIncome || ''}
                  onChange={(e) => updateField('dividendIncome', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capital Gains</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={data.capitalGains || ''}
                  onChange={(e) => updateField('capitalGains', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capital Losses</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={data.capitalLosses || ''}
                  onChange={(e) => updateField('capitalLosses', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Income */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Other Income Sources</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pensions & Annuities</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.pensions || ''}
                onChange={(e) => updateField('pensions', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rental Income</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.rentalIncome || ''}
                onChange={(e) => updateField('rentalIncome', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Income</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={data.otherIncome || ''}
                onChange={(e) => updateField('otherIncome', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Include description in the notes section</p>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Need help finding this information?</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Check your T4 slips for employment income</li>
          <li>• T4A slips show pensions and other income</li>
          <li>• T5 slips contain investment income details</li>
          <li>• T3 slips are for trust income</li>
        </ul>
      </div>
    </div>
  )
}