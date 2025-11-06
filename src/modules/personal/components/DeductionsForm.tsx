import React from 'react';
import { Decimal } from 'decimal.js';
import { Deductions } from '../../../core/tax/types';

interface DeductionsFormProps {
  deductions: Deductions;
  onChange: (___deductions: Deductions) => void;
  errors: Record<string, string>;
}

export const DeductionsForm: React.FC<DeductionsFormProps> = ({ deductions, onChange, errors }) => {
  const handleRRSPChange = (field: keyof typeof deductions.rrsp, value: string): void => {
    onChange({
      ...deductions,
      rrsp: {
        ...deductions.rrsp,
        [field]: new Decimal(value || 0),
      },
    });
  };

  const handleEmploymentChange = (field: keyof typeof deductions.employment, value: string): void => {
    onChange({
      ...deductions,
      employment: {
        ...deductions.employment,
        [field]: new Decimal(value || 0),
      },
    });
  };

  const handleOtherChange = (field: keyof typeof deductions.other, value: string): void => {
    if (field === 'otherDeductions') {
      return; // Handle custom deductions separately
    }

    onChange({
      ...deductions,
      other: {
        ...deductions.other,
        [field]: new Decimal(value || 0),
      },
    });
  };

  const handleCustomDeductionChange = (key: string, value: string): void => {
    onChange({
      ...deductions,
      other: {
        ...deductions.other,
        otherDeductions: {
          ...deductions.other.otherDeductions,
          [key]: new Decimal(value || 0),
        },
      },
    });
  };

  const addCustomDeduction = (): void => {
    const key = `custom_${Object.keys(deductions.other.otherDeductions).length + 1}`;
    handleCustomDeductionChange(key, '0');
  };

  const removeCustomDeduction = (key: string): void => {
    const { [key]: removed, ...rest } = deductions.other.otherDeductions;
    onChange({
      ...deductions,
      other: {
        ...deductions.other,
        otherDeductions: rest,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* RRSP Deductions */}
      <div>
        <h3 className="text-lg font-medium mb-4">RRSP Deductions</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">RRSP Contributions</label>
              <input
                type="number"
                step="0.01"
                value={deductions.rrsp.contributions.toString()}
                onChange={(e) => handleRRSPChange('contributions', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">PRPP Contributions</label>
              <input
                type="number"
                step="0.01"
                value={deductions.rrsp.prpp.toString()}
                onChange={(e) => handleRRSPChange('prpp', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Spousal RRSP Contributions
              </label>
              <input
                type="number"
                step="0.01"
                value={deductions.rrsp.spousalContributions.toString()}
                onChange={(e) => handleRRSPChange('spousalContributions', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">HBP Repayment</label>
              <input
                type="number"
                step="0.01"
                value={deductions.rrsp.hbpRepayment.toString()}
                onChange={(e) => handleRRSPChange('hbpRepayment', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Employment Deductions */}
      <div>
        <h3 className="text-lg font-medium mb-4">Employment Deductions</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Union Dues</label>
              <input
                type="number"
                step="0.01"
                value={deductions.employment.unionDues.toString()}
                onChange={(e) => handleEmploymentChange('unionDues', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Professional Dues</label>
              <input
                type="number"
                step="0.01"
                value={deductions.employment.professionalDues.toString()}
                onChange={(e) => handleEmploymentChange('professionalDues', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tool Expenses</label>
              <input
                type="number"
                step="0.01"
                value={deductions.employment.toolExpenses.toString()}
                onChange={(e) => handleEmploymentChange('toolExpenses', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work from Home Expenses
              </label>
              <input
                type="number"
                step="0.01"
                value={deductions.employment.workFromHome.toString()}
                onChange={(e) => handleEmploymentChange('workFromHome', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Other Deductions */}
      <div>
        <h3 className="text-lg font-medium mb-4">Other Deductions</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Moving Expenses</label>
              <input
                type="number"
                step="0.01"
                value={deductions.other.movingExpenses.toString()}
                onChange={(e) => handleOtherChange('movingExpenses', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Support Payments</label>
              <input
                type="number"
                step="0.01"
                value={deductions.other.supportPayments.toString()}
                onChange={(e) => handleOtherChange('supportPayments', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Carrying Charges</label>
              <input
                type="number"
                step="0.01"
                value={deductions.other.carryingCharges.toString()}
                onChange={(e) => handleOtherChange('carryingCharges', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Exploration and Development
              </label>
              <input
                type="number"
                step="0.01"
                value={deductions.other.explorationDevelopment.toString()}
                onChange={(e) => handleOtherChange('explorationDevelopment', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Custom Deductions */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Other Deductions</h4>
              <button
                type="button"
                onClick={addCustomDeduction}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Deduction
              </button>
            </div>

            {Object.entries(deductions.other.otherDeductions).map(([key, value]) => (
              <div key={key} className="flex gap-4 mb-4">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Description"
                    value={key.replace('custom_', '')}
                    onChange={(e) => {
                      const newKey = `custom_${e.target.value}`;
                      const { [key]: value, ...rest } = deductions.other.otherDeductions;
                      handleCustomDeductionChange(newKey, value.toString());
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-grow">
                  <input
                    type="number"
                    step="0.01"
                    value={value.toString()}
                    onChange={(e) => handleCustomDeductionChange(key, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCustomDeduction(key)}
                  className="mt-1 px-3 py-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
