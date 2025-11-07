'use client';

import { useState } from 'react';
import {
  calculateCurrentContributionRoom,
  calculateOverContributionPenalty,
  projectTFSAGrowth,
  getAllContributionLimits,
  TFSA_START_YEAR,
  formatCurrency,
  formatPercentage
} from '@/lib/cra';

export default function TFSACalculator() {
  const currentYear = 2025;
  const [birthYear, setBirthYear] = useState<number>(1990);
  const [totalContributions, setTotalContributions] = useState<number>(50000);
  const [totalWithdrawals, setTotalWithdrawals] = useState<number>(0);
  const [currentBalance, setCurrentBalance] = useState<number>(60000);
  const [expectedReturn, setExpectedReturn] = useState<number>(0.06); // 6%
  const [projectionYears, setProjectionYears] = useState<number>(10);

  // Calculate contribution room
  const roomInfo = calculateCurrentContributionRoom(
    birthYear,
    totalContributions,
    totalWithdrawals,
    currentYear
  );

  // Calculate penalty if over-contributed
  const monthlyPenalty = roomInfo.overContribution > 0 
    ? calculateOverContributionPenalty(roomInfo.overContribution, 1)
    : 0;

  // Project growth
  const projections = projectTFSAGrowth(
    currentBalance,
    expectedReturn,
    projectionYears,
    0 // No additional contributions in projection
  );

  const finalProjection = projections[projections.length - 1];

  // Get historical limits
  const historicalLimits = getAllContributionLimits();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            TFSA Contribution Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate your TFSA contribution room and project tax-free growth
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Your Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Birth Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth Year
              </label>
              <input
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1900"
                max={currentYear - 18}
              />
              <p className="mt-1 text-sm text-gray-500">
                You must be 18+ to contribute to a TFSA
              </p>
            </div>

            {/* Total Contributions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Contributions to Date
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  value={totalContributions}
                  onChange={(e) => setTotalContributions(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="1000"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                All money you've put into your TFSA
              </p>
            </div>

            {/* Total Withdrawals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Withdrawals to Date
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  value={totalWithdrawals}
                  onChange={(e) => setTotalWithdrawals(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="1000"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Money you've taken out (re-contributes next year)
              </p>
            </div>

            {/* Current Balance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current TFSA Balance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="1000"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Current value of your TFSA investments
              </p>
            </div>

            {/* Expected Return */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Annual Return
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={expectedReturn * 100}
                  onChange={(e) => setExpectedReturn(Number(e.target.value) / 100)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="20"
                  step="0.5"
                />
                <span className="absolute right-3 top-2.5 text-gray-500">%</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Typical: 5-7% for balanced portfolio
              </p>
            </div>

            {/* Projection Years */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years to Project
              </label>
              <input
                type="number"
                value={projectionYears}
                onChange={(e) => setProjectionYears(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="40"
              />
              <p className="mt-1 text-sm text-gray-500">
                How many years to project growth
              </p>
            </div>
          </div>
        </div>

        {/* Contribution Room Results */}
        <div className={`rounded-lg shadow-lg p-6 mb-6 text-white ${
          roomInfo.overContribution > 0 
            ? 'bg-gradient-to-br from-red-500 to-red-600' 
            : 'bg-gradient-to-br from-green-500 to-green-600'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Your TFSA Contribution Room</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Lifetime Room */}
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm opacity-90 mb-1">Lifetime Contribution Room</h3>
              <div className="text-3xl font-bold">
                {formatCurrency(roomInfo.totalRoom)}
              </div>
              <p className="text-sm opacity-75 mt-2">
                Since you turned 18 ({birthYear + 18})
              </p>
            </div>

            {/* Available Room */}
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm opacity-90 mb-1">
                {roomInfo.overContribution > 0 ? 'Over-Contribution' : 'Available Room'}
              </h3>
              <div className="text-3xl font-bold">
                {roomInfo.overContribution > 0 
                  ? `-${formatCurrency(roomInfo.overContribution)}`
                  : formatCurrency(roomInfo.available)
                }
              </div>
              <p className="text-sm opacity-75 mt-2">
                {roomInfo.overContribution > 0 
                  ? `Penalty: ${formatCurrency(monthlyPenalty)}/month`
                  : 'You can contribute this much more'
                }
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mt-6 pt-6 border-t border-white/20 space-y-2">
            <div className="flex justify-between">
              <span>Total Contributions Made</span>
              <span className="font-semibold">{formatCurrency(roomInfo.used)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Withdrawals</span>
              <span className="font-semibold">{formatCurrency(roomInfo.withdrawn)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/20">
              <span>Room Used</span>
              <span>{formatPercentage(roomInfo.used / roomInfo.totalRoom, 1)}</span>
            </div>
          </div>
        </div>

        {/* Over-Contribution Warning */}
        {roomInfo.overContribution > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-red-900 mb-2">⚠️ Over-Contribution Detected!</h3>
            <p className="text-sm text-red-800 mb-2">
              You have over-contributed by <strong>{formatCurrency(roomInfo.overContribution)}</strong>.
              The CRA charges a penalty of <strong>1% per month</strong> on the excess amount.
            </p>
            <p className="text-sm text-red-800">
              <strong>Monthly penalty:</strong> {formatCurrency(monthlyPenalty)}
            </p>
            <p className="text-sm text-red-800 mt-2">
              <strong>Action required:</strong> Withdraw the excess amount as soon as possible to avoid penalties.
            </p>
          </div>
        )}

        {/* Growth Projection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Growth Projection</h2>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-gray-600 mb-1">Starting Balance</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(currentBalance)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">After {projectionYears} Years</div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(finalProjection?.balance || 0)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Tax-Free Growth</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency((finalProjection?.balance || 0) - currentBalance)}
                </div>
              </div>
            </div>
          </div>

          {/* Projection Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-2">Year</th>
                  <th className="text-right py-2 px-2">Balance</th>
                  <th className="text-right py-2 px-2">Growth</th>
                  <th className="text-right py-2 px-2">Total Growth</th>
                </tr>
              </thead>
              <tbody>
                {projections.slice(0, 10).map((proj) => (
                  <tr key={proj.year} className="border-b border-gray-100">
                    <td className="py-2 px-2">Year {proj.year}</td>
                    <td className="text-right py-2 px-2 font-semibold">
                      {formatCurrency(proj.balance)}
                    </td>
                    <td className="text-right py-2 px-2 text-green-600">
                      +{formatCurrency(proj.balance - (projections[proj.year - 2]?.balance || currentBalance))}
                    </td>
                    <td className="text-right py-2 px-2 text-blue-600">
                      {formatCurrency(proj.growth)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Historical Contribution Limits */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Historical Contribution Limits</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {historicalLimits.map(({ year, limit }) => (
              <div key={year} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">{year}</div>
                <div className="font-bold text-gray-900">{formatCurrency(limit)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TFSA vs RRSP Comparison */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">TFSA vs RRSP</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-2">Feature</th>
                  <th className="text-center py-2 px-2">TFSA</th>
                  <th className="text-center py-2 px-2">RRSP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium">Tax on Contributions</td>
                  <td className="text-center py-3 px-2">❌ No deduction</td>
                  <td className="text-center py-3 px-2">✅ Tax deductible</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium">Tax on Growth</td>
                  <td className="text-center py-3 px-2">✅ Tax-free</td>
                  <td className="text-center py-3 px-2">❌ Taxed on withdrawal</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium">Tax on Withdrawals</td>
                  <td className="text-center py-3 px-2">✅ Tax-free</td>
                  <td className="text-center py-3 px-2">❌ Fully taxed</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium">Contribution Room</td>
                  <td className="text-center py-3 px-2">Fixed annual limit</td>
                  <td className="text-center py-3 px-2">18% of income</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium">Withdrawal Impact</td>
                  <td className="text-center py-3 px-2">✅ Room returns next year</td>
                  <td className="text-center py-3 px-2">❌ Room lost forever</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium">Best For</td>
                  <td className="text-center py-3 px-2">Short-term goals, flexibility</td>
                  <td className="text-center py-3 px-2">Retirement, tax reduction</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">💡 Which Should You Choose?</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <strong>Choose TFSA if:</strong> You're in a low tax bracket now, need flexibility, 
                or saving for short-term goals (home, car, emergency fund)
              </li>
              <li>
                <strong>Choose RRSP if:</strong> You're in a high tax bracket now, saving for retirement, 
                or want immediate tax deduction
              </li>
              <li>
                <strong>Use both!</strong> Many Canadians maximize both accounts for optimal tax efficiency
              </li>
            </ul>
          </div>
        </div>

        {/* Key Facts */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 mb-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">TFSA Key Facts</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">📅 Started in 2009</h3>
              <p className="text-sm opacity-90">
                TFSA was introduced in 2009. Contribution room accumulates from the year you turn 18.
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">💰 2025 Limit: $7,000</h3>
              <p className="text-sm opacity-90">
                The contribution limit for 2025 is $7,000. Unused room carries forward.
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔄 Withdrawals</h3>
              <p className="text-sm opacity-90">
                Withdrawals are tax-free and the amount withdrawn is added back to your contribution room the following year.
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">⚠️ Over-Contribution</h3>
              <p className="text-sm opacity-90">
                Over-contributions are subject to a 1% penalty per month. Withdraw excess immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
          <p className="font-semibold mb-2">⚠️ Important Disclaimer</p>
          <p>
            This calculator provides estimates based on the information you provide. 
            Your actual TFSA contribution room may differ. Check your CRA My Account for official contribution room.
            Growth projections are estimates and actual returns may vary. 
            This is for educational purposes only. Consult with a financial advisor for personalized advice.
          </p>
        </div>
      </div>
    </div>
  );
}