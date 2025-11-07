'use client';

import { useState } from 'react';
import {
  calculateSalesTax,
  PROVINCES,
  PROVINCE_NAMES,
  PROVINCIAL_SALES_TAX,
  formatCurrency,
  formatPercentage
} from '@/lib/cra';

type CalculationMode = 'add' | 'included';

export default function HSTGSTCalculator() {
  const [amount, setAmount] = useState<number>(100);
  const [province, setProvince] = useState<string>('ON');
  const [mode, setMode] = useState<CalculationMode>('add');

  // Get tax rates for province
  const taxRates = PROVINCIAL_SALES_TAX[province];
  
  // Calculate based on mode
  let baseAmount: number;
  let taxAmount: { gst: number; pst: number; hst: number; total: number };
  let totalAmount: number;

  if (mode === 'add') {
    // Add tax to amount
    baseAmount = amount;
    taxAmount = calculateSalesTax(amount, province);
    totalAmount = amount + taxAmount.total;
  } else {
    // Tax is included in amount
    const totalRate = taxRates.gst + taxRates.pst + taxRates.hst;
    baseAmount = amount / (1 + totalRate);
    taxAmount = calculateSalesTax(baseAmount, province);
    totalAmount = amount;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            GST/HST/PST Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate Canadian sales tax for any province or territory
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Calculate Sales Tax</h2>
          
          <div className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Province Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province/Territory
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {PROVINCES.map((prov) => (
                  <option key={prov} value={prov}>
                    {PROVINCE_NAMES[prov]} - {taxRates.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Calculation Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calculation Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMode('add')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    mode === 'add'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold mb-1">Add Tax</div>
                  <div className="text-sm text-gray-600">
                    Calculate tax on amount
                  </div>
                </button>
                <button
                  onClick={() => setMode('included')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    mode === 'included'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold mb-1">Tax Included</div>
                  <div className="text-sm text-gray-600">
                    Extract tax from total
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 mb-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">Tax Breakdown</h2>
          
          <div className="space-y-4">
            {/* Base Amount */}
            <div className="flex justify-between items-center pb-3 border-b border-white/20">
              <span className="text-lg">Base Amount (before tax)</span>
              <span className="text-2xl font-bold">{formatCurrency(baseAmount)}</span>
            </div>

            {/* GST */}
            {taxRates.gst > 0 && (
              <div className="flex justify-between items-center">
                <span>GST ({formatPercentage(taxRates.gst)})</span>
                <span className="font-semibold">{formatCurrency(taxAmount.gst)}</span>
              </div>
            )}

            {/* PST/QST */}
            {taxRates.pst > 0 && (
              <div className="flex justify-between items-center">
                <span>
                  {province === 'QC' ? 'QST' : 'PST'} ({formatPercentage(taxRates.pst)})
                </span>
                <span className="font-semibold">{formatCurrency(taxAmount.pst)}</span>
              </div>
            )}

            {/* HST */}
            {taxRates.hst > 0 && (
              <div className="flex justify-between items-center">
                <span>HST ({formatPercentage(taxRates.hst)})</span>
                <span className="font-semibold">{formatCurrency(taxAmount.hst)}</span>
              </div>
            )}

            {/* Total Tax */}
            <div className="flex justify-between items-center pt-3 border-t border-white/20">
              <span className="text-lg font-semibold">Total Tax</span>
              <span className="text-2xl font-bold">{formatCurrency(taxAmount.total)}</span>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center pt-3 border-t-2 border-white/30">
              <span className="text-xl font-bold">Total Amount (with tax)</span>
              <span className="text-3xl font-bold">{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Tax Rate Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            {PROVINCE_NAMES[province]} Tax Rates
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tax Type */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Tax Type</h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {taxRates.name}
              </div>
              <p className="text-sm text-gray-600">
                {taxRates.hst > 0 && 'Harmonized Sales Tax (HST) - Combined federal and provincial tax'}
                {taxRates.gst > 0 && taxRates.pst > 0 && 'GST + PST - Separate federal and provincial taxes'}
                {taxRates.gst > 0 && taxRates.pst === 0 && 'GST only - No provincial sales tax'}
              </p>
            </div>

            {/* Combined Rate */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Combined Rate</h3>
              <div className="text-2xl font-bold text-green-600 mb-2">
                {formatPercentage(taxRates.gst + taxRates.pst + taxRates.hst)}
              </div>
              <p className="text-sm text-gray-600">
                Total sales tax rate in {PROVINCE_NAMES[province]}
              </p>
            </div>
          </div>
        </div>

        {/* Business Use Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">For Business Use</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">💼 Collecting Sales Tax</h3>
              <p className="text-sm text-gray-700 mb-2">
                If you're a business collecting sales tax on {formatCurrency(baseAmount)} in sales:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Charge customer: <strong>{formatCurrency(totalAmount)}</strong></li>
                <li>• Keep for your business: <strong>{formatCurrency(baseAmount)}</strong></li>
                <li>• Remit to government: <strong>{formatCurrency(taxAmount.total)}</strong></li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">📊 Input Tax Credits (ITCs)</h3>
              <p className="text-sm text-gray-700">
                If you're GST/HST registered, you can claim Input Tax Credits on business purchases.
                The {formatCurrency(taxAmount.total)} you paid can be recovered on your GST/HST return.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">⚠️ Registration Requirements</h3>
              <p className="text-sm text-gray-700">
                You must register for GST/HST if your business revenue exceeds $30,000 in a calendar quarter
                or over four consecutive quarters. Registration is optional below this threshold.
              </p>
            </div>
          </div>
        </div>

        {/* Provincial Comparison */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Compare Provinces</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-2">Province</th>
                  <th className="text-left py-2 px-2">Tax Type</th>
                  <th className="text-right py-2 px-2">Rate</th>
                  <th className="text-right py-2 px-2">Tax on {formatCurrency(baseAmount)}</th>
                </tr>
              </thead>
              <tbody>
                {PROVINCES.map((prov) => {
                  const rates = PROVINCIAL_SALES_TAX[prov];
                  const tax = calculateSalesTax(baseAmount, prov);
                  const isSelected = prov === province;
                  
                  return (
                    <tr 
                      key={prov} 
                      className={`border-b border-gray-100 ${isSelected ? 'bg-blue-50 font-semibold' : ''}`}
                    >
                      <td className="py-2 px-2">{PROVINCE_NAMES[prov]}</td>
                      <td className="py-2 px-2">{rates.name}</td>
                      <td className="text-right py-2 px-2">
                        {formatPercentage(rates.gst + rates.pst + rates.hst)}
                      </td>
                      <td className="text-right py-2 px-2">
                        {formatCurrency(tax.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Examples */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Quick Examples</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {[10, 100, 1000].map((exampleAmount) => {
              const exampleTax = calculateSalesTax(exampleAmount, province);
              const exampleTotal = exampleAmount + exampleTax.total;
              
              return (
                <button
                  key={exampleAmount}
                  onClick={() => {
                    setAmount(exampleAmount);
                    setMode('add');
                  }}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="text-sm text-gray-600 mb-1">Calculate tax on</div>
                  <div className="text-xl font-bold text-gray-900 mb-2">
                    {formatCurrency(exampleAmount)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Total: {formatCurrency(exampleTotal)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
          <p className="font-semibold mb-2">⚠️ Important Disclaimer</p>
          <p>
            This calculator uses current GST/HST/PST rates for 2025. Rates are subject to change.
            Some items may be exempt or zero-rated. This is for educational purposes only.
            Consult with a tax professional or the CRA for specific tax advice.
          </p>
        </div>
      </div>
    </div>
  );
}