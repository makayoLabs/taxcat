'use client';

import { useState } from 'react';
import {
  calculateTotalTax,
  calculateCPPContribution,
  calculateEIContribution,
  BASIC_PERSONAL_AMOUNT,
  CANADA_EMPLOYMENT_AMOUNT,
  PROVINCES,
  PROVINCE_NAMES,
  formatCurrency,
  formatPercentage
} from '@/lib/cra';

interface TaxData {
  // Income
  employmentIncome: number;
  selfEmploymentIncome: number;
  investmentIncome: number;
  otherIncome: number;
  
  // Deductions
  rrspContributions: number;
  unionDues: number;
  childcareExpenses: number;
  movingExpenses: number;
  
  // Credits
  medicalExpenses: number;
  donations: number;
  tuitionFees: number;
  publicTransit: number;
  
  // Tax paid
  taxDeducted: number;
  
  // Personal info
  province: string;
  hasSpouse: boolean;
  numberOfChildren: number;
}

export default function RefundEstimator() {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<TaxData>({
    employmentIncome: 60000,
    selfEmploymentIncome: 0,
    investmentIncome: 0,
    otherIncome: 0,
    rrspContributions: 5000,
    unionDues: 0,
    childcareExpenses: 0,
    movingExpenses: 0,
    medicalExpenses: 0,
    donations: 500,
    tuitionFees: 0,
    publicTransit: 0,
    taxDeducted: 12000,
    province: 'ON',
    hasSpouse: false,
    numberOfChildren: 0
  });

  const updateData = (field: keyof TaxData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate totals
  const totalIncome = data.employmentIncome + data.selfEmploymentIncome + 
                      data.investmentIncome + data.otherIncome;
  
  const totalDeductions = data.rrspContributions + data.unionDues + 
                          data.childcareExpenses + data.movingExpenses;
  
  const taxableIncome = Math.max(totalIncome - totalDeductions, 0);
  
  // Calculate tax
  const taxInfo = calculateTotalTax(taxableIncome, data.province);
  
  // Calculate non-refundable tax credits
  const basicPersonalCredit = BASIC_PERSONAL_AMOUNT * 0.15; // Federal rate
  const employmentCredit = Math.min(data.employmentIncome, CANADA_EMPLOYMENT_AMOUNT) * 0.15;
  const donationCredit = data.donations * 0.15; // Simplified
  const tuitionCredit = data.tuitionFees * 0.15;
  const medicalCredit = Math.max(data.medicalExpenses - (taxableIncome * 0.03), 0) * 0.15;
  
  const totalCredits = basicPersonalCredit + employmentCredit + donationCredit + 
                       tuitionCredit + medicalCredit;
  
  // Net tax
  const netFederalTax = Math.max(taxInfo.federalTax - totalCredits, 0);
  const netTotalTax = netFederalTax + taxInfo.provincialTax;
  
  // Refund or owing
  const refundOrOwing = data.taxDeducted - netTotalTax;
  const isRefund = refundOrOwing > 0;

  const totalSteps = 5;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tax Refund Estimator
          </h1>
          <p className="text-lg text-gray-600">
            Estimate your tax refund or amount owing for 2025
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round((step / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Step 1: Income */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 1: Income</h2>
              <p className="text-gray-600 mb-6">Enter all sources of income for 2025</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Income (T4)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.employmentIncome}
                      onChange={(e) => updateData('employmentIncome', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Box 14 on your T4 slip</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Self-Employment Income (Net)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.selfEmploymentIncome}
                      onChange={(e) => updateData('selfEmploymentIncome', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Business income after expenses</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Income (T5)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.investmentIncome}
                      onChange={(e) => updateData('investmentIncome', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Interest, dividends, capital gains</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.otherIncome}
                      onChange={(e) => updateData('otherIncome', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">EI benefits, pension, rental income, etc.</p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Income:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatCurrency(totalIncome)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Deductions */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 2: Deductions</h2>
              <p className="text-gray-600 mb-6">Enter deductions that reduce your taxable income</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RRSP Contributions
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.rrspContributions}
                      onChange={(e) => updateData('rrspContributions', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Contributions made in 2025 or first 60 days of 2026</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Union or Professional Dues
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.unionDues}
                      onChange={(e) => updateData('unionDues', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Annual dues paid to union or professional association</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Childcare Expenses
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.childcareExpenses}
                      onChange={(e) => updateData('childcareExpenses', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Eligible childcare expenses</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Moving Expenses
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.movingExpenses}
                      onChange={(e) => updateData('movingExpenses', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">If you moved 40km+ for work or school</p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Deductions:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatCurrency(totalDeductions)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Tax Credits */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 3: Tax Credits</h2>
              <p className="text-gray-600 mb-6">Enter expenses that provide tax credits</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Expenses
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.medicalExpenses}
                      onChange={(e) => updateData('medicalExpenses', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Eligible medical expenses (must exceed 3% of income or $2,759)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Charitable Donations
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.donations}
                      onChange={(e) => updateData('donations', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Donations to registered charities</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tuition Fees
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.tuitionFees}
                      onChange={(e) => updateData('tuitionFees', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Post-secondary tuition fees</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Public Transit Passes
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.publicTransit}
                      onChange={(e) => updateData('publicTransit', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Monthly or annual transit passes</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Tax Paid */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 4: Tax Already Paid</h2>
              <p className="text-gray-600 mb-6">Enter tax deducted from your paycheques</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Income Tax Deducted
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.taxDeducted}
                      onChange={(e) => updateData('taxDeducted', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Box 22 on your T4 slip (total tax deducted at source)
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 Where to Find This</h4>
                  <p className="text-sm text-gray-700">
                    Look at your T4 slip from your employer. Box 22 shows the total income tax
                    deducted from your paycheques throughout the year. If you had multiple jobs,
                    add up box 22 from all T4 slips.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Personal Info & Results */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 5: Personal Information</h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province of Residence
                  </label>
                  <select
                    value={data.province}
                    onChange={(e) => updateData('province', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {PROVINCES.map((prov) => (
                      <option key={prov} value={prov}>
                        {PROVINCE_NAMES[prov]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="hasSpouse"
                    checked={data.hasSpouse}
                    onChange={(e) => updateData('hasSpouse', e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <label htmlFor="hasSpouse" className="text-sm font-medium text-gray-700">
                    I have a spouse or common-law partner
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Children
                  </label>
                  <input
                    type="number"
                    value={data.numberOfChildren}
                    onChange={(e) => updateData('numberOfChildren', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="10"
                  />
                </div>
              </div>

              {/* Results */}
              <div className={`rounded-lg p-6 ${
                isRefund 
                  ? 'bg-gradient-to-br from-green-500 to-green-600' 
                  : 'bg-gradient-to-br from-red-500 to-red-600'
              } text-white mb-6`}>
                <h3 className="text-2xl font-semibold mb-4">Your Estimated Result</h3>
                
                <div className="text-center py-6">
                  <div className="text-sm opacity-90 mb-2">
                    {isRefund ? 'Estimated Refund' : 'Estimated Amount Owing'}
                  </div>
                  <div className="text-6xl font-bold mb-2">
                    {formatCurrency(Math.abs(refundOrOwing))}
                  </div>
                  <p className="text-lg opacity-90">
                    {isRefund 
                      ? '🎉 You should receive a refund!' 
                      : '⚠️ You may owe additional tax'
                    }
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Detailed Breakdown</h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Income:</span>
                    <span className="font-semibold">{formatCurrency(totalIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Deductions:</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(totalDeductions)}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-900 font-semibold">Taxable Income:</span>
                    <span className="font-bold">{formatCurrency(taxableIncome)}</span>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-600">Federal Tax:</span>
                    <span className="font-semibold">{formatCurrency(taxInfo.federalTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provincial Tax:</span>
                    <span className="font-semibold">{formatCurrency(taxInfo.provincialTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Credits:</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(totalCredits)}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-900 font-semibold">Net Tax Owing:</span>
                    <span className="font-bold">{formatCurrency(netTotalTax)}</span>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-600">Tax Already Paid:</span>
                    <span className="font-semibold">{formatCurrency(data.taxDeducted)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2">
                    <span className="text-lg font-bold text-gray-900">
                      {isRefund ? 'Refund:' : 'Amount Owing:'}
                    </span>
                    <span className={`text-xl font-bold ${isRefund ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(Math.abs(refundOrOwing))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          
          {step < totalSteps ? (
            <button
              onClick={() => setStep(Math.min(totalSteps, step + 1))}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Start Over
            </button>
          )}
        </div>

        {/* Quick Summary (always visible) */}
        {step < 5 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700">Current Estimate:</span>
              <span className={`font-bold ${isRefund ? 'text-green-600' : 'text-red-600'}`}>
                {isRefund ? 'Refund: ' : 'Owing: '}
                {formatCurrency(Math.abs(refundOrOwing))}
              </span>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
          <p className="font-semibold mb-2">⚠️ Important Disclaimer</p>
          <p>
            This is a simplified tax refund estimator for educational purposes only. 
            Actual refunds may vary based on many factors not included in this calculator
            (spouse income, additional credits, provincial credits, etc.). 
            This should not be considered tax advice. Use official tax software or consult
            a tax professional for accurate calculations.
          </p>
        </div>
      </div>
    </div>
  );
}