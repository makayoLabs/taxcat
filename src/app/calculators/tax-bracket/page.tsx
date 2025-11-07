'use client';

import { useState } from 'react';
import {
  calculateTotalTax,
  PROVINCES,
  PROVINCE_NAMES,
  formatCurrency,
  formatPercentage,
  FEDERAL_TAX_BRACKETS,
  PROVINCIAL_TAX_BRACKETS,
  getTaxBracket
} from '@/lib/cra';

export default function TaxBracketCalculator() {
  const [income, setIncome] = useState<number>(75000);
  const [province, setProvince] = useState<string>('ON');

  // Calculate tax information
  const taxInfo = calculateTotalTax(income, province);
  const federalBracket = getTaxBracket(income, FEDERAL_TAX_BRACKETS);
  const provincialBracket = getTaxBracket(income, PROVINCIAL_TAX_BRACKETS[province]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tax Bracket Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Find out which tax bracket you're in and understand your marginal vs average tax rate
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Your Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Income Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="1000"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Enter your gross annual income
              </p>
            </div>

            {/* Province Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province of Residence
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {PROVINCES.map((prov) => (
                  <option key={prov} value={prov}>
                    {PROVINCE_NAMES[prov]}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Select your province or territory
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 mb-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">Your Tax Bracket</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Federal Bracket */}
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Federal</h3>
              <div className="text-3xl font-bold mb-2">
                {formatPercentage(taxInfo.federalMarginalRate)}
              </div>
              <p className="text-sm opacity-90">
                {federalBracket?.name || 'Tax bracket'}
              </p>
              <p className="text-sm opacity-75 mt-2">
                Income range: {formatCurrency(federalBracket?.min || 0)} - {
                  federalBracket?.max === Infinity 
                    ? 'and above' 
                    : formatCurrency(federalBracket?.max || 0)
                }
              </p>
            </div>

            {/* Provincial Bracket */}
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{PROVINCE_NAMES[province]}</h3>
              <div className="text-3xl font-bold mb-2">
                {formatPercentage(taxInfo.provincialMarginalRate)}
              </div>
              <p className="text-sm opacity-90">
                {provincialBracket?.name || 'Tax bracket'}
              </p>
              <p className="text-sm opacity-75 mt-2">
                Income range: {formatCurrency(provincialBracket?.min || 0)} - {
                  provincialBracket?.max === Infinity 
                    ? 'and above' 
                    : formatCurrency(provincialBracket?.max || 0)
                }
              </p>
            </div>
          </div>

          {/* Combined Rate */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="text-center">
              <p className="text-sm opacity-90 mb-2">Combined Marginal Tax Rate</p>
              <div className="text-5xl font-bold">
                {formatPercentage(taxInfo.combinedMarginalRate)}
              </div>
              <p className="text-sm opacity-75 mt-2">
                Your next dollar earned will be taxed at this rate
              </p>
            </div>
          </div>
        </div>

        {/* Marginal vs Average Explanation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Understanding Your Tax Rates</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Marginal Rate */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Marginal Tax Rate
              </h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatPercentage(taxInfo.combinedMarginalRate)}
              </div>
              <p className="text-sm text-gray-600">
                This is the tax rate on your <strong>next dollar</strong> of income. 
                If you earn an extra $1,000, you'll pay {formatPercentage(taxInfo.combinedMarginalRate)} 
                of it in taxes ({formatCurrency(1000 * taxInfo.combinedMarginalRate)}).
              </p>
            </div>

            {/* Average Rate */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Average (Effective) Tax Rate
              </h3>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatPercentage(taxInfo.averageRate)}
              </div>
              <p className="text-sm text-gray-600">
                This is the <strong>average</strong> tax rate on your total income. 
                You pay {formatCurrency(taxInfo.totalTax)} in total taxes on {formatCurrency(income)}, 
                which is {formatPercentage(taxInfo.averageRate)} on average.
              </p>
            </div>
          </div>

          {/* Why They're Different */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">💡 Why are they different?</h4>
            <p className="text-sm text-gray-700">
              Canada uses a <strong>progressive tax system</strong>. Your income is taxed in brackets:
              the first portion at a lower rate, the next portion at a higher rate, and so on.
              Your <strong>marginal rate</strong> is the highest bracket you reach, while your{' '}
              <strong>average rate</strong> is the total tax divided by your total income.
            </p>
          </div>
        </div>

        {/* Tax Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Tax Breakdown</h2>
          
          <div className="space-y-4">
            {/* Income */}
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-700">Gross Income</span>
              <span className="font-semibold text-lg">{formatCurrency(income)}</span>
            </div>

            {/* Federal Tax */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Federal Tax</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(taxInfo.federalTax)}
              </span>
            </div>

            {/* Provincial Tax */}
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-700">Provincial Tax ({PROVINCE_NAMES[province]})</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(taxInfo.provincialTax)}
              </span>
            </div>

            {/* Total Tax */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-semibold text-gray-900">Total Tax</span>
              <span className="text-2xl font-bold text-red-600">
                {formatCurrency(taxInfo.totalTax)}
              </span>
            </div>

            {/* After-Tax Income */}
            <div className="flex justify-between items-center pt-2 border-t-2">
              <span className="text-lg font-semibold text-gray-900">After-Tax Income</span>
              <span className="text-2xl font-bold text-green-600">
                {formatCurrency(income - taxInfo.totalTax)}
              </span>
            </div>
          </div>
        </div>

        {/* Next Bracket Info */}
        {federalBracket && federalBracket.max !== Infinity && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📈 Next Tax Bracket</h3>
            <p className="text-sm text-gray-700">
              You'll reach the next federal tax bracket at {formatCurrency(federalBracket.max)}.
              That's {formatCurrency(federalBracket.max - income)} more in income.
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
          <p className="font-semibold mb-2">⚠️ Important Disclaimer</p>
          <p>
            This calculator provides estimates based on 2025 federal and provincial tax rates.
            Actual taxes may vary based on deductions, credits, and other factors.
            This is for educational purposes only and should not be considered tax advice.
            Consult with a tax professional for personalized guidance.
          </p>
        </div>
      </div>
    </div>
  );
}