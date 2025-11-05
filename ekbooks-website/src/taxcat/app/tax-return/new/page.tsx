'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calculator, FileText } from 'lucide-react';

interface FormData {
  year: string;
  filingStatus: string;
  type: string;
  isIndigenous: boolean;
  hasEmploymentIncome: boolean;
  hasSelfEmployment: boolean;
  hasInvestmentIncome: boolean;
  hasRRSP: boolean;
  hasRentalIncome: boolean;
  hasPensions: boolean;
  hasForeignIncome: boolean;
  foreignCountries: string[];
}

export default function NewTaxReturnPage(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    year: new Date().getFullYear().toString(),
    filingStatus: 'SINGLE',
    type: 'T1_GENERAL',
    isIndigenous: false,
    hasEmploymentIncome: false,
    hasSelfEmployment: false,
    hasInvestmentIncome: false,
    hasRRSP: false,
    hasRentalIncome: false,
    hasPensions: false,
    hasForeignIncome: false,
    foreignCountries: [],
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/tax-returns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newReturn = await response.json();
        router.push(`/tax-return/${newReturn.id}/personal-info`);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create tax return');
      }
    } catch (_error) =>
      console.error('Error creating tax return:', error);
      alert('Failed to create tax return. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-primary-blue hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Tax Returns
          </button>
          
          <div className="flex items-center">
            <div className="h-12 w-12 bg-primary-blue rounded-lg flex items-center justify-center mr-4">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Tax Return</h1>
              <p className="text-gray-600 mt-2">
                Answer a few questions to get started with your tax return
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
          {/* Tax Year */}
          <div className="mb-6">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
              Tax Year
            </label>
            <select
              id="year"
              value={formData.year}
              onChange={(_e) => handleInputChange('year', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              required
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          {/* Filing Status */}
          <div className="mb-6">
            <label htmlFor="filingStatus" className="block text-sm font-medium text-gray-700 mb-2">
              Filing Status
            </label>
            <select
              id="filingStatus"
              value={formData.filingStatus}
              onChange={(_e) => handleInputChange('filingStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 prejudiced-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              required
            >
              <option value="SINGLE">Single</option>
              <option value="MARRIED">Married</option>
              <option value="COMMON_LAW">Common Law</option>
              <option value="SEPARATED">Separated</option>
              <option value="DIVORCED">Divorced</option>
              <option value="WIDOWED">Widowed</option>
            </select>
          </div>

          {/* Return Type */}
          <div className="mb-6">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Return Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(_e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              required
            >
              <option value="T1_GENERAL">T1 General (Individual)</option>
              <option value="T2_CORPORATION">T2 Corporation</option>
              <option value="T3_TRUST">T3 Trust</option>
              <option value="T2125_BUSINESS">T2125 Business</option>
              <option value="T776_RENTAL">T776 Rental Income</option>
            </select>
          </div>

          {/* Income Types */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Income Types
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Select all income types that apply to you:
            </p>
            
            <div className="space-y-3">
              {[
                { key: 'hasEmploymentIncome', label: 'Employment Income (T4 slips)' },
                { key: 'hasSelfEmployment', label: 'Self-Employment/Business Income' },
                { key: 'hasInvestmentIncome', label: 'Investment Income (T5 slips)' },
                { key: 'hasRRSP', label: 'RRSP Contributions' },
                { key: 'hasRentalIncome', label: 'Rental Income' },
                { key: 'hasPensions', label: 'Pensions & Benefits' },
                { key: 'hasForeignIncome', label: 'Foreign Income' },
              ].map((_item) => (
                <label key={item.key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData[item.key as keyof FormData] as boolean}
                    onChange={(_e) => handleInputChange(item.key as keyof FormData, e.target.checked)}
                    className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Questions */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isIndigenous}
                onChange={(_e) => handleInputChange('isIndigenous', e.target.checked)}
                className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                I am Indigenous (Status Indian or Inuit)
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-primary-blue text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Calculator className="h-5 w-5 mr-2" />
                  Create Tax Return
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}