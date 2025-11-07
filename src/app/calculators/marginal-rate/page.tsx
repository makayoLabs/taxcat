'use client';

import { useState } from 'react';
import {
  calculateTotalTax,
  getMarginalRate,
  FEDERAL_TAX_BRACKETS,
  PROVINCIAL_TAX_BRACKETS,
  PROVINCES,
  PROVINCE_NAMES,
  formatCurrency,
  formatPercentage
} from '@/lib/cra';

type IncomeType = 'employment' | 'self-employment' | 'eligible-dividend' | 'non-eligible-dividend' | 'capital-gain';

interface IncomeTypeInfo {
  name: string;
  description: string;
  taxTreatment: string;
  effectiveRate: number;
}

export default function MarginalRateCalculator() {
  const [currentIncome, setCurrentIncome] = useState<number>(75000);
  const [additionalIncome, setAdditionalIncome] = useState<number>(10000);
  const [incomeType, setIncomeType] = useState<IncomeType>('employment');
  const [province, setProvince] = useState<string>('ON');

  // Calculate current tax situation
  const currentTax = calculateTotalTax(currentIncome, province);
  
  // Calculate tax on additional income based on type
  let taxableAdditionalIncome = additionalIncome;
  let grossUpAmount = 0;
  
  switch (incomeType) {
    case 'employment':
    case 'self-employment':
      taxableAdditionalIncome = additionalIncome;
      break;
    case 'eligible-dividend':
      // Eligible dividends: 38% gross-up, then dividend tax credit
      grossUpAmount = additionalIncome * 0.38;
      taxableAdditionalIncome = additionalIncome * 1.38;
      break;
    case 'non-eligible-dividend':
      // Non-eligible dividends: 15% gross-up, then dividend tax credit
      grossUpAmount = additionalIncome * 0.15;
      taxableAdditionalIncome = additionalIncome * 1.15;
      break;
    case 'capital-gain':
      // Capital gains: 50% inclusion rate
      taxableAdditionalIncome = additionalIncome * 0.50;
      break;
  }

  const newTotalIncome = currentIncome + taxableAdditionalIncome;
  const newTax = calculateTotalTax(newTotalIncome, province);
  const additionalTax = newTax.totalTax - currentTax.totalTax;
  
  // Apply dividend tax credits if applicable
  let dividendTaxCredit = 0;
  if (incomeType === 'eligible-dividend') {
    // Approximate: 25.02% federal + ~10% provincial
    dividendTaxCredit = grossUpAmount * 0.35;
  } else if (incomeType === 'non-eligible-dividend') {
    // Approximate: 13.33% federal + ~4% provincial
    dividendTaxCredit = grossUpAmount * 0.17;
  }
  
  const netAdditionalTax = Math.max(additionalTax - dividendTaxCredit, 0);
  const effectiveMarginalRate = netAdditionalTax / additionalIncome;
  const afterTaxIncome = additionalIncome - netAdditionalTax;

  // Income type information
  const incomeTypes: Record<IncomeType, IncomeTypeInfo> = {
    'employment': {
      name: 'Employment Income',
      description: 'Salary, wages, bonuses from an employer',
      taxTreatment: '100% taxable at your marginal rate',
      effectiveRate: currentTax.combinedMarginalRate
    },
    'self-employment': {
      name: 'Self-Employment Income',
      description: 'Business income after expenses',
      taxTreatment: '100% taxable at your marginal rate',
      effectiveRate: currentTax.combinedMarginalRate
    },
    'eligible-dividend': {
      name: 'Eligible Dividends',
      description: 'Dividends from Canadian public corporations',
      taxTreatment: 'Grossed up 38%, then dividend tax credit applied',
      effectiveRate: effectiveMarginalRate
    },
    'non-eligible-dividend': {
      name: 'Non-Eligible Dividends',
      description: 'Dividends from small Canadian corporations',
      taxTreatment: 'Grossed up 15%, then dividend tax credit applied',
      effectiveRate: effectiveMarginalRate
    },
    'capital-gain': {
      name: 'Capital Gains',
      description: 'Profit from selling investments or property',
      taxTreatment: 'Only 50% is taxable (inclusion rate)',
      effectiveRate: currentTax.combinedMarginalRate * 0.50
    }
  };

  const currentTypeInfo = incomeTypes[incomeType];

  // Calculate for all income types for comparison
  const allTypesComparison = (Object.keys(incomeTypes) as IncomeType[]).map(type => {
    let taxable = additionalIncome;
    let credit = 0;
    
    if (type === 'eligible-dividend') {
      taxable = additionalIncome * 1.38;
      credit = additionalIncome * 0.38 * 0.35;
    } else if (type === 'non-eligible-dividend') {
      taxable = additionalIncome * 1.15;
      credit = additionalIncome * 0.15 * 0.17;
    } else if (type === 'capital-gain') {
      taxable = additionalIncome * 0.50;
    }
    
    const newIncome = currentIncome + taxable;
    const newTaxCalc = calculateTotalTax(newIncome, province);
    const tax = Math.max(newTaxCalc.totalTax - currentTax.totalTax - credit, 0);
    const afterTax = additionalIncome - tax;
    const rate = tax / additionalIncome;
    
    return {
      type,
      info: incomeTypes[type],
      tax,
      afterTax,
      rate
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Marginal Tax Rate Calculator
          </h1>
          <p className="text-lg text-gray-600">
            See how additional income is taxed and compare different income types
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Calculate Tax on Additional Income</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Current Income */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Annual Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  value={currentIncome}
                  onChange={(e) => setCurrentIncome(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="1000"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Your current gross annual income
              </p>
            </div>

            {/* Additional Income */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  value={additionalIncome}
                  onChange={(e) => setAdditionalIncome(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="1000"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Bonus, side income, investment gain, etc.
              </p>
            </div>

            {/* Income Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Additional Income
              </label>
              <select
                value={incomeType}
                onChange={(e) => setIncomeType(e.target.value as IncomeType)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="employment">Employment Income (Salary/Bonus)</option>
                <option value="self-employment">Self-Employment Income</option>
                <option value="eligible-dividend">Eligible Dividend</option>
                <option value="non-eligible-dividend">Non-Eligible Dividend</option>
                <option value="capital-gain">Capital Gain</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Different income types are taxed differently
              </p>
            </div>

            {/* Province */}
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
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 mb-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">Tax on Your Additional Income</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Additional Income */}
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm opacity-90 mb-1">Additional Income</h3>
              <div className="text-3xl font-bold">
                {formatCurrency(additionalIncome)}
              </div>
              <p className="text-xs opacity-75 mt-2">
                {currentTypeInfo.name}
              </p>
            </div>

            {/* Tax on Additional */}
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm opacity-90 mb-1">Tax You'll Pay</h3>
              <div className="text-3xl font-bold">
                {formatCurrency(netAdditionalTax)}
              </div>
              <p className="text-xs opacity-75 mt-2">
                Effective rate: {formatPercentage(effectiveMarginalRate)}
              </p>
            </div>

            {/* After-Tax Amount */}
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm opacity-90 mb-1">You Keep</h3>
              <div className="text-3xl font-bold">
                {formatCurrency(afterTaxIncome)}
              </div>
              <p className="text-xs opacity-75 mt-2">
                After-tax amount
              </p>
            </div>
          </div>

          {/* Income Type Explanation */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <h4 className="font-semibold mb-2">{currentTypeInfo.name}</h4>
            <p className="text-sm opacity-90 mb-2">{currentTypeInfo.description}</p>
            <p className="text-sm opacity-75">
              <strong>Tax Treatment:</strong> {currentTypeInfo.taxTreatment}
            </p>
          </div>
        </div>

        {/* Income Type Comparison */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Compare: If Your {formatCurrency(additionalIncome)} Was...
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-2">Income Type</th>
                  <th className="text-right py-2 px-2">Tax Rate</th>
                  <th className="text-right py-2 px-2">Tax Paid</th>
                  <th className="text-right py-2 px-2">You Keep</th>
                  <th className="text-right py-2 px-2">Difference</th>
                </tr>
              </thead>
              <tbody>
                {allTypesComparison.map((comp) => {
                  const isSelected = comp.type === incomeType;
                  const bestOption = allTypesComparison.reduce((best, curr) => 
                    curr.afterTax > best.afterTax ? curr : best
                  );
                  const isBest = comp.type === bestOption.type;
                  
                  return (
                    <tr 
                      key={comp.type}
                      className={`border-b border-gray-100 ${
                        isSelected ? 'bg-blue-50 font-semibold' : ''
                      } ${isBest ? 'bg-green-50' : ''}`}
                    >
                      <td className="py-3 px-2">
                        {comp.info.name}
                        {isBest && <span className="ml-2 text-green-600">✓ Best</span>}
                      </td>
                      <td className="text-right py-3 px-2">
                        {formatPercentage(comp.rate)}
                      </td>
                      <td className="text-right py-3 px-2 text-red-600">
                        {formatCurrency(comp.tax)}
                      </td>
                      <td className="text-right py-3 px-2 text-green-600 font-semibold">
                        {formatCurrency(comp.afterTax)}
                      </td>
                      <td className="text-right py-3 px-2">
                        {comp.type === bestOption.type 
                          ? '—'
                          : formatCurrency(comp.afterTax - bestOption.afterTax)
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">💡 Why Income Type Matters</h4>
            <p className="text-sm text-gray-700">
              Different types of income receive different tax treatment in Canada. 
              Capital gains and dividends often have preferential tax treatment compared to employment income.
              This is why tax planning and income splitting strategies can be valuable.
            </p>
          </div>
        </div>

        {/* Optimization Tips */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Tax Optimization Strategies</h2>
          
          <div className="space-y-4">
            {currentTax.combinedMarginalRate > 0.40 && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">⚠️ High Tax Bracket</h4>
                <p className="text-sm text-red-800">
                  You're in a high tax bracket ({formatPercentage(currentTax.combinedMarginalRate)}). 
                  Consider these strategies:
                </p>
                <ul className="text-sm text-red-800 mt-2 ml-4 space-y-1">
                  <li>• Maximize RRSP contributions (immediate tax deduction)</li>
                  <li>• Consider income splitting with spouse</li>
                  <li>• Defer income to lower-income years if possible</li>
                  <li>• Consult with a tax professional about incorporation</li>
                </ul>
              </div>
            )}

            {incomeType === 'employment' && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">💼 Employment Income Tips</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Negotiate for stock options or deferred compensation</li>
                  <li>• Maximize employer RRSP matching</li>
                  <li>• Consider asking for benefits instead of salary (tax-free)</li>
                  <li>• Use RRSP to reduce taxable income</li>
                </ul>
              </div>
            )}

            {incomeType === 'capital-gain' && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">📈 Capital Gains Tips</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Only 50% of capital gains are taxable (most tax-efficient!)</li>
                  <li>• Consider timing: realize gains in lower-income years</li>
                  <li>• Use capital losses to offset gains</li>
                  <li>• Hold investments in TFSA for completely tax-free gains</li>
                </ul>
              </div>
            )}

            {(incomeType === 'eligible-dividend' || incomeType === 'non-eligible-dividend') && (
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">💰 Dividend Income Tips</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Eligible dividends from public companies get better tax treatment</li>
                  <li>• Dividend tax credit reduces your effective tax rate</li>
                  <li>• Consider holding dividend stocks in non-registered accounts</li>
                  <li>• Income splitting with spouse can reduce family tax burden</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Current Tax Situation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Your Current Tax Situation</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tax Rates</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Federal Marginal Rate:</span>
                  <span className="font-semibold">{formatPercentage(currentTax.federalMarginalRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Provincial Marginal Rate:</span>
                  <span className="font-semibold">{formatPercentage(currentTax.provincialMarginalRate)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-900 font-semibold">Combined Marginal Rate:</span>
                  <span className="font-bold text-lg">{formatPercentage(currentTax.combinedMarginalRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Tax Rate:</span>
                  <span className="font-semibold">{formatPercentage(currentTax.averageRate)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tax Amounts</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Federal Tax:</span>
                  <span className="font-semibold">{formatCurrency(currentTax.federalTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Provincial Tax:</span>
                  <span className="font-semibold">{formatCurrency(currentTax.provincialTax)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-900 font-semibold">Total Tax:</span>
                  <span className="font-bold text-lg">{formatCurrency(currentTax.totalTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">After-Tax Income:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(currentIncome - currentTax.totalTax)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
          <p className="font-semibold mb-2">⚠️ Important Disclaimer</p>
          <p>
            This calculator provides estimates for educational purposes. Actual tax treatment may vary based on
            specific circumstances. Dividend tax credit calculations are approximations. Capital gains inclusion
            rate is 50% for most situations. Consult with a tax professional for personalized tax planning advice.
          </p>
        </div>
      </div>
    </div>
  );
}