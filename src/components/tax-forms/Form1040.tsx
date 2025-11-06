import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TaxReturnData } from '@/types/tax';

interface Form1040Props {
  initialData?: Partial<TaxReturnData>;
  onSubmit: (___data: TaxReturnData) => void;
  onSaveDraft: (___data: TaxReturnData) => void;
}

type FormSection = keyof TaxReturnData;
type FormField<T extends FormSection> = keyof TaxReturnData[T];

export default function Form1040({ initialData, onSubmit, onSaveDraft }: Form1040Props): void {
  const [formData, setFormData] = useState<TaxReturnData>({
    personalInfo: {
      firstName: initialData?.personalInfo?.firstName || '',
      lastName: initialData?.personalInfo?.lastName || '',
      ssn: initialData?.personalInfo?.ssn || '',
      filingStatus: initialData?.personalInfo?.filingStatus || 'single',
      dateOfBirth: initialData?.personalInfo?.dateOfBirth || '',
      occupation: initialData?.personalInfo?.occupation || '',
    },
    income: {
      wages: initialData?.income?.wages || 0,
      interest: initialData?.income?.interest || 0,
      dividends: initialData?.income?.dividends || 0,
      otherIncome: initialData?.income?.otherIncome || 0,
    },
    deductions: {
      standardDeduction: initialData?.deductions?.standardDeduction || 12950, // 2022 standard deduction for single filers
      itemizedDeductions: initialData?.deductions?.itemizedDeductions || 0,
      otherDeductions: initialData?.deductions?.otherDeductions || 0,
    },
    credits: {
      childTaxCredit: initialData?.credits?.childTaxCredit || 0,
      earnedIncomeCredit: initialData?.credits?.earnedIncomeCredit || 0,
      otherCredits: initialData?.credits?.otherCredits || 0,
    },
  });

  const handleInputChange = <T extends FormSection>(
    section: T,
    field: FormField<T>,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.personalInfo.firstName}
              onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.personalInfo.lastName}
              onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Social Security Number
            </label>
            <input
              type="text"
              required
              pattern="\d{3}-?\d{2}-?\d{4}"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.personalInfo.ssn}
              onChange={(e) => handleInputChange('personalInfo', 'ssn', e.target.value)}
              placeholder="XXX-XX-XXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.personalInfo.filingStatus}
              onChange={(e) =>
                handleInputChange('personalInfo', 'filingStatus', e.target.value as any)
              }
            >
              <option value="single">Single</option>
              <option value="married_joint">Married Filing Jointly</option>
              <option value="married_separate">Married Filing Separately</option>
              <option value="head_household">Head of Household</option>
              <option value="qualifying_widow">Qualifying Widow(er)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Income */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Income</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wages, Salaries, Tips (W-2)
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.income.wages}
              onChange={(e) =>
                handleInputChange('income', 'wages', parseFloat(e.target.value) || 0)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Income</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.income.interest}
              onChange={(e) =>
                handleInputChange('income', 'interest', parseFloat(e.target.value) || 0)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dividend Income</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.income.dividends}
              onChange={(e) =>
                handleInputChange('income', 'dividends', parseFloat(e.target.value) || 0)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Income</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.income.otherIncome}
              onChange={(e) =>
                handleInputChange('income', 'otherIncome', parseFloat(e.target.value) || 0)
              }
            />
          </div>
        </div>
      </section>

      {/* Deductions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Deductions</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Standard Deduction
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.deductions.standardDeduction}
              onChange={(e) =>
                handleInputChange(
                  'deductions',
                  'standardDeduction',
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Itemized Deductions
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.deductions.itemizedDeductions}
              onChange={(e) =>
                handleInputChange(
                  'deductions',
                  'itemizedDeductions',
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Deductions</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.deductions.otherDeductions}
              onChange={(e) =>
                handleInputChange('deductions', 'otherDeductions', parseFloat(e.target.value) || 0)
              }
            />
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Tax Credits</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Child Tax Credit</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.credits.childTaxCredit}
              onChange={(e) =>
                handleInputChange('credits', 'childTaxCredit', parseFloat(e.target.value) || 0)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Earned Income Credit
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.credits.earnedIncomeCredit}
              onChange={(e) =>
                handleInputChange('credits', 'earnedIncomeCredit', parseFloat(e.target.value) || 0)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Credits</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.credits.otherCredits}
              onChange={(e) =>
                handleInputChange('credits', 'otherCredits', parseFloat(e.target.value) || 0)
              }
            />
          </div>
        </div>
      </section>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => onSaveDraft(formData)}>
          Save Draft
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          Continue
        </Button>
      </div>
    </form>
  );
}
