'use client';

import { useState } from 'react';
import {
  calculateCPPContribution,
  calculateEIContribution,
  CPP_BASIC_EXEMPTION,
  CPP_MAX_PENSIONABLE_EARNINGS,
  CPP_CONTRIBUTION_RATE,
  CPP_SELF_EMPLOYED_RATE,
  EI_MAX_INSURABLE_EARNINGS,
  EI_PREMIUM_RATE,
  EI_PREMIUM_RATE_QC,
  PROVINCES,
  PROVINCE_NAMES,
  formatCurrency,
  formatPercentage
} from '@/lib/cra';

export default function CPPEICalculator() {
  const [income, setIncome] = useState<number>(60000);
  const [province, setProvince] = useState<string>('ON');
  const [selfEmployed, setSelfEmployed] = useState<boolean>(false);

  // Calculate CPP
  const cppEmployee = calculateCPPContribution(income, false);
  const cppEmployer = calculateCPPContribution(income, false);
  const cppSelfEmployed = calculateCPPContribution(income, true);
  const cppTotal = selfEmployed ? cppSelfEmployed : cppEmployee;

  // Calculate EI
  const eiContribution = calculateEIContribution(income, province);
  const eiEmployer = eiContribution; // Employer pays 1.4x employee rate
  const eiEmployerTotal = eiContribution * 1.4;

  // Total contributions
  const totalEmployee = cppTotal + eiContribution;
  const totalEmployer = selfEmployed ? 0 : (cppEmployer + eiEmployerTotal);
  const totalCombined = totalEmployee + totalEmployer;

  // CPP retirement benefit estimate (very rough)
  const estimatedCPPBenefit = Math.min(income * 0.25, 1364.60); // Max monthly benefit ~$1,364.60

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            CPP & EI Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate Canada Pension Plan and Employment Insurance contributions
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Your Information</h2>
          
          <div className="space-y-6">
            {/* Income Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Employment Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  min="0"
                  step="1000"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Your gross annual employment income
              </p>
            </div>

            {/* Province Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province of Employment
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
                EI rates vary by province (Quebec has lower rate)
              </p>
            </div>

            {/* Self-Employed Toggle */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="selfEmployed"
                checked={selfEmployed}
                onChange={(e) => setSelfEmployed(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="selfEmployed" className="text-sm font-medium text-gray-700 cursor-pointer">
                I am self-employed
              </label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 mb-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">Your Contributions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* CPP */}
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Canada Pension Plan (CPP)</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">
                    {selfEmployed ? 'Your Contribution' : 'Employee Contribution'}
                  </span>
                  <span className="font-semibold">{formatCurrency(cppTotal)}</span>
                </div>
                
                {!selfEmployed && (
                  <div className="flex justify-between">
                    <span className="text-sm opacity-90">Employer Contribution</span>
                    <span className="font-semibold">{formatCurrency(cppEmployer)}</span>
                  </div>
                )}
                
                <div className="flex justify-between pt-2 border-t border-white/20">
                  <span className="font-semibold">Total CPP</span>
                  <span className="text-xl font-bold">
                    {formatCurrency(selfEmployed ? cppSelfEmployed : cppEmployee + cppEmployer)}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 text-sm opacity-90">
                <div className="flex justify-between">
                  <span>Rate:</span>
                  <span>{formatPercentage(selfEmployed ? CPP_SELF_EMPLOYED_RATE : CPP_CONTRIBUTION_RATE)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Earnings:</span>
                  <span>{formatCurrency(CPP_MAX_PENSIONABLE_EARNINGS)}</span>
                </div>
              </div>
            </div>

            {/* EI */}
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Employment Insurance (EI)</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">
                    {selfEmployed ? 'Your Contribution (Optional)' : 'Employee Contribution'}
                  </span>
                  <span className="font-semibold">{formatCurrency(eiContribution)}</span>
                </div>
                
                {!selfEmployed && (
                  <div className="flex justify-between">
                    <span className="text-sm opacity-90">Employer Contribution</span>
                    <span className="font-semibold">{formatCurrency(eiEmployerTotal)}</span>
                  </div>
                )}
                
                <div className="flex justify-between pt-2 border-t border-white/20">
                  <span className="font-semibold">Total EI</span>
                  <span className="text-xl font-bold">
                    {formatCurrency(selfEmployed ? eiContribution : eiContribution + eiEmployerTotal)}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 text-sm opacity-90">
                <div className="flex justify-between">
                  <span>Rate:</span>
                  <span>{formatPercentage(province === 'QC' ? EI_PREMIUM_RATE_QC : EI_PREMIUM_RATE)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Earnings:</span>
                  <span>{formatCurrency(EI_MAX_INSURABLE_EARNINGS)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 pt-6 border-t border-white/30">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">
                Total Annual Contributions
              </span>
              <span className="text-3xl font-bold">
                {formatCurrency(totalCombined)}
              </span>
            </div>
            {!selfEmployed && (
              <p className="text-sm opacity-75 mt-2 text-right">
                You pay: {formatCurrency(totalEmployee)} | Employer pays: {formatCurrency(totalEmployer)}
              </p>
            )}
          </div>
        </div>

        {/* CPP Benefit Estimate */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Estimated CPP Retirement Benefit</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-sm text-gray-600 mb-1">Estimated Monthly Benefit at 65</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatCurrency(estimatedCPPBenefit)}
              </div>
              <p className="text-sm text-gray-600">
                Based on contributing at current income level
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-sm text-gray-600 mb-1">Estimated Annual Benefit</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatCurrency(estimatedCPPBenefit * 12)}
              </div>
              <p className="text-sm text-gray-600">
                Yearly retirement income from CPP
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> This is a rough estimate. Actual CPP benefits depend on your contribution history,
              age at retirement, and other factors. The maximum monthly CPP benefit for 2025 is approximately $1,364.60.
            </p>
          </div>
        </div>

        {/* Self-Employed Info */}
        {selfEmployed && (
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-orange-900 mb-2">💼 Self-Employed Considerations</h3>
            <ul className="text-sm text-orange-800 space-y-2">
              <li>
                <strong>CPP:</strong> You pay both employee and employer portions ({formatPercentage(CPP_SELF_EMPLOYED_RATE)} total)
              </li>
              <li>
                <strong>EI:</strong> Self-employed individuals can opt into EI special benefits (maternity, parental, sickness, etc.)
                but it's optional. Regular EI benefits are not available.
              </li>
              <li>
                <strong>Tax Deduction:</strong> You can deduct the employer portion of CPP on your tax return
              </li>
            </ul>
          </div>
        )}

        {/* Breakdown Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Detailed Breakdown</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-2">Item</th>
                  <th className="text-right py-2 px-2">Rate</th>
                  <th className="text-right py-2 px-2">Earnings</th>
                  <th className="text-right py-2 px-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* CPP Employee */}
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium">
                    CPP {selfEmployed ? '(Self-Employed)' : '(Employee)'}
                  </td>
                  <td className="text-right py-3 px-2">
                    {formatPercentage(selfEmployed ? CPP_SELF_EMPLOYED_RATE : CPP_CONTRIBUTION_RATE)}
                  </td>
                  <td className="text-right py-3 px-2">
                    {formatCurrency(Math.min(income, CPP_MAX_PENSIONABLE_EARNINGS) - CPP_BASIC_EXEMPTION)}
                  </td>
                  <td className="text-right py-3 px-2 font-semibold">
                    {formatCurrency(cppTotal)}
                  </td>
                </tr>

                {/* CPP Employer */}
                {!selfEmployed && (
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-3 px-2 font-medium">CPP (Employer)</td>
                    <td className="text-right py-3 px-2">
                      {formatPercentage(CPP_CONTRIBUTION_RATE)}
                    </td>
                    <td className="text-right py-3 px-2">
                      {formatCurrency(Math.min(income, CPP_MAX_PENSIONABLE_EARNINGS) - CPP_BASIC_EXEMPTION)}
                    </td>
                    <td className="text-right py-3 px-2 font-semibold">
                      {formatCurrency(cppEmployer)}
                    </td>
                  </tr>
                )}

                {/* EI Employee */}
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium">
                    EI {selfEmployed ? '(Optional)' : '(Employee)'}
                  </td>
                  <td className="text-right py-3 px-2">
                    {formatPercentage(province === 'QC' ? EI_PREMIUM_RATE_QC : EI_PREMIUM_RATE)}
                  </td>
                  <td className="text-right py-3 px-2">
                    {formatCurrency(Math.min(income, EI_MAX_INSURABLE_EARNINGS))}
                  </td>
                  <td className="text-right py-3 px-2 font-semibold">
                    {formatCurrency(eiContribution)}
                  </td>
                </tr>

                {/* EI Employer */}
                {!selfEmployed && (
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-3 px-2 font-medium">EI (Employer)</td>
                    <td className="text-right py-3 px-2">1.4x employee</td>
                    <td className="text-right py-3 px-2">
                      {formatCurrency(Math.min(income, EI_MAX_INSURABLE_EARNINGS))}
                    </td>
                    <td className="text-right py-3 px-2 font-semibold">
                      {formatCurrency(eiEmployerTotal)}
                    </td>
                  </tr>
                )}

                {/* Total */}
                <tr className="border-t-2 border-gray-300 bg-blue-50">
                  <td className="py-3 px-2 font-bold">Total Contributions</td>
                  <td className="text-right py-3 px-2"></td>
                  <td className="text-right py-3 px-2"></td>
                  <td className="text-right py-3 px-2 font-bold text-lg">
                    {formatCurrency(totalCombined)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* CPP Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">📊 CPP Details</h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-gray-900">Basic Exemption:</strong>
                <p className="text-gray-600">
                  The first {formatCurrency(CPP_BASIC_EXEMPTION)} of earnings is exempt from CPP
                </p>
              </div>
              
              <div>
                <strong className="text-gray-900">Maximum Pensionable Earnings:</strong>
                <p className="text-gray-600">
                  CPP contributions stop at {formatCurrency(CPP_MAX_PENSIONABLE_EARNINGS)} of income
                </p>
              </div>
              
              <div>
                <strong className="text-gray-900">Contribution Rate:</strong>
                <p className="text-gray-600">
                  {selfEmployed 
                    ? `${formatPercentage(CPP_SELF_EMPLOYED_RATE)} (both portions)`
                    : `${formatPercentage(CPP_CONTRIBUTION_RATE)} employee + ${formatPercentage(CPP_CONTRIBUTION_RATE)} employer`
                  }
                </p>
              </div>

              <div>
                <strong className="text-gray-900">Maximum Contribution 2025:</strong>
                <p className="text-gray-600">
                  {formatCurrency(calculateCPPContribution(CPP_MAX_PENSIONABLE_EARNINGS, selfEmployed))}
                </p>
              </div>
            </div>
          </div>

          {/* EI Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">📊 EI Details</h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-gray-900">Maximum Insurable Earnings:</strong>
                <p className="text-gray-600">
                  EI premiums stop at {formatCurrency(EI_MAX_INSURABLE_EARNINGS)} of income
                </p>
              </div>
              
              <div>
                <strong className="text-gray-900">Premium Rate ({PROVINCE_NAMES[province]}):</strong>
                <p className="text-gray-600">
                  {formatPercentage(province === 'QC' ? EI_PREMIUM_RATE_QC : EI_PREMIUM_RATE)}
                  {province === 'QC' && ' (Quebec has lower rate due to QPIP)'}
                </p>
              </div>
              
              <div>
                <strong className="text-gray-900">Employer Rate:</strong>
                <p className="text-gray-600">
                  {selfEmployed 
                    ? 'Not applicable (self-employed EI is optional)'
                    : '1.4 times the employee rate'
                  }
                </p>
              </div>

              <div>
                <strong className="text-gray-900">Maximum Premium 2025:</strong>
                <p className="text-gray-600">
                  {formatCurrency(calculateEIContribution(EI_MAX_INSURABLE_EARNINGS, province))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Paycheck Impact */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Impact on Your Paycheque</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-700">Gross Annual Income</span>
              <span className="font-semibold text-lg">{formatCurrency(income)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">CPP Deduction</span>
              <span className="font-semibold text-red-600">-{formatCurrency(cppTotal)}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-700">EI Deduction</span>
              <span className="font-semibold text-red-600">-{formatCurrency(eiContribution)}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-semibold text-gray-900">After CPP/EI (before tax)</span>
              <span className="text-2xl font-bold text-green-600">
                {formatCurrency(income - totalEmployee)}
              </span>
            </div>

            {/* Per Paycheque */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Per Paycheque (Bi-weekly)</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">CPP:</span>
                  <span className="font-semibold ml-2">{formatCurrency(cppTotal / 26)}</span>
                </div>
                <div>
                  <span className="text-gray-600">EI:</span>
                  <span className="font-semibold ml-2">{formatCurrency(eiContribution / 26)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Year-over-Year Comparison */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Historical Rates</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-2">Year</th>
                  <th className="text-right py-2 px-2">CPP Rate</th>
                  <th className="text-right py-2 px-2">CPP Max</th>
                  <th className="text-right py-2 px-2">EI Rate</th>
                  <th className="text-right py-2 px-2">EI Max</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-blue-50 font-semibold">
                  <td className="py-2 px-2">2025</td>
                  <td className="text-right py-2 px-2">{formatPercentage(CPP_CONTRIBUTION_RATE)}</td>
                  <td className="text-right py-2 px-2">{formatCurrency(CPP_MAX_PENSIONABLE_EARNINGS)}</td>
                  <td className="text-right py-2 px-2">{formatPercentage(EI_PREMIUM_RATE)}</td>
                  <td className="text-right py-2 px-2">{formatCurrency(EI_MAX_INSURABLE_EARNINGS)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-2">2024</td>
                  <td className="text-right py-2 px-2">5.95%</td>
                  <td className="text-right py-2 px-2">$66,600</td>
                  <td className="text-right py-2 px-2">1.66%</td>
                  <td className="text-right py-2 px-2">$61,500</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-2">2023</td>
                  <td className="text-right py-2 px-2">5.95%</td>
                  <td className="text-right py-2 px-2">$64,900</td>
                  <td className="text-right py-2 px-2">1.63%</td>
                  <td className="text-right py-2 px-2">$61,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
          <p className="font-semibold mb-2">⚠️ Important Disclaimer</p>
          <p>
            This calculator uses 2025 CPP and EI rates. Rates and maximums are updated annually by the CRA.
            CPP benefit estimates are rough approximations. For accurate benefit estimates, use the CRA's CPP calculator
            or consult with Service Canada. This is for educational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}