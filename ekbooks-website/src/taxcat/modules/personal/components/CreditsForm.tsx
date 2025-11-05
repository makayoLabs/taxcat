import React from 'react';
import { Decimal } from 'decimal.js';
import { Credits } from '../../../core/tax/types';

interface CreditsFormProps {
  credits: Credits;
  onChange: (___credits: Credits) => void;
  errors: Record<string, string>;
}

export const CreditsForm: React.FC<CreditsFormProps> = ({ credits, onChange, errors }) => {
  const handleBasicChange = (field: keyof typeof credits.basic, value: string): void => {
    onChange({
      ...credits,
      basic: {
        ...credits.basic,
        [field]: new Decimal(value || 0),
      },
    });
  };

  const handleMedicalChange = (field: keyof typeof credits.medical, value: string): void => {
    onChange({
      ...credits,
      medical: {
        ...credits.medical,
        [field]: new Decimal(value || 0),
      },
    });
  };

  const handleEducationChange = (field: keyof typeof credits.education, value: string): void => {
    onChange({
      ...credits,
      education: {
        ...credits.education,
        [field]: new Decimal(value || 0),
      },
    });
  };

  const handleDonationsChange = (field: keyof typeof credits.donations, value: string): void => {
    onChange({
      ...credits,
      donations: {
        ...credits.donations,
        [field]: new Decimal(value || 0),
      },
    });
  };

  const handleOtherChange = (field: keyof typeof credits.other, value: string): void => {
    if (field === 'otherCredits') {
      return; // Handle custom credits separately
    }

    onChange({
      ...credits,
      other: {
        ...credits.other,
        [field]: new Decimal(value || 0),
      },
    });
  };

  const handleCustomCreditChange = (key: string, value: string): void => {
    onChange({
      ...credits,
      other: {
        ...credits.other,
        otherCredits: {
          ...credits.other.otherCredits,
          [key]: new Decimal(value || 0),
        },
      },
    });
  };

  const addCustomCredit = (): void => {
    const key = `custom_${Object.keys(credits.other.otherCredits).length + 1}`;
    handleCustomCreditChange(key, '0');
  };

  const removeCustomCredit = (key: string): void => {
    const { [key]: removed, ...rest } = credits.other.otherCredits;
    onChange({
      ...credits,
      other: {
        ...credits.other,
        otherCredits: rest,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Basic Personal Credits */}
      <div>
        <h3 className="text-lg font-medium mb-4">Basic Personal Credits</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Basic Personal Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={credits.basic.personal.toString()}
                onChange={(___e) => handleBasicChange('personal', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Age Amount</label>
              <input
                type="number"
                step="0.01"
                value={credits.basic.age.toString()}
                onChange={(___e) => handleBasicChange('age', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Spouse or Common-Law Partner Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={credits.basic.spouse.toString()}
                onChange={(___e) => handleBasicChange('spouse', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Eligible Dependant Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={credits.basic.eligible_dependant.toString()}
                onChange={(___e) => handleBasicChange('eligible_dependant', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Caregiver Amount</label>
              <input
                type="number"
                step="0.01"
                value={credits.basic.caregiver.toString()}
                onChange={(___e) => handleBasicChange('caregiver', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Medical Expenses */}
      <div>
        <h3 className="text-lg font-medium mb-4">Medical Expenses</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Medical Expenses</label>
              <input
                type="number"
                step="0.01"
                value={credits.medical.expenses.toString()}
                onChange={(___e) => handleMedicalChange('expenses', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Attendant Care Expenses
              </label>
              <input
                type="number"
                step="0.01"
                value={credits.medical.attendantCare.toString()}
                onChange={(___e) => handleMedicalChange('attendantCare', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Disability Supports</label>
              <input
                type="number"
                step="0.01"
                value={credits.medical.disabilitySupports.toString()}
                onChange={(___e) => handleMedicalChange('disabilitySupports', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Education Credits */}
      <div>
        <h3 className="text-lg font-medium mb-4">Education Credits</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tuition Amount</label>
              <input
                type="number"
                step="0.01"
                value={credits.education.tuition.toString()}
                onChange={(___e) => handleEducationChange('tuition', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Student Loan Interest
              </label>
              <input
                type="number"
                step="0.01"
                value={credits.education.studentLoanInterest.toString()}
                onChange={(___e) => handleEducationChange('studentLoanInterest', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Textbook Amount</label>
              <input
                type="number"
                step="0.01"
                value={credits.education.textbooks.toString()}
                onChange={(___e) => handleEducationChange('textbooks', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Donations and Gifts */}
      <div>
        <h3 className="text-lg font-medium mb-4">Donations and Gifts</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Charitable Donations
              </label>
              <input
                type="number"
                step="0.01"
                value={credits.donations.charitable.toString()}
                onChange={(___e) => handleDonationsChange('charitable', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Political Contributions
              </label>
              <input
                type="number"
                step="0.01"
                value={credits.donations.political.toString()}
                onChange={(___e) => handleDonationsChange('political', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cultural and Ecological Gifts
              </label>
              <input
                type="number"
                step="0.01"
                value={credits.donations.cultural.toString()}
                onChange={(___e) => handleDonationsChange('cultural', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Other Credits */}
      <div>
        <h3 className="text-lg font-medium mb-4">Other Credits</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pension Income Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={credits.other.pension.toString()}
                onChange={(___e) => handleOtherChange('pension', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Disability Amount</label>
              <input
                type="number"
                step="0.01"
                value={credits.other.disability.toString()}
                onChange={(___e) => handleOtherChange('disability', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Foreign Tax Credit</label>
              <input
                type="number"
                step="0.01"
                value={credits.other.foreignTaxCredit.toString()}
                onChange={(___e) => handleOtherChange('foreignTaxCredit', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Labour-Sponsored Funds
              </label>
              <input
                type="number"
                step="0.01"
                value={credits.other.labourSponsored.toString()}
                onChange={(___e) => handleOtherChange('labourSponsored', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Custom Credits */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Additional Credits</h4>
              <button
                type="button"
                onClick={addCustomCredit}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Credit
              </button>
            </div>

            {Object.entries(credits.other.otherCredits).map(([key, value]) => (
              <div key={key} className="flex gap-4 mb-4">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Description"
                    value={key.replace('custom_', '')}
                    onChange={(___e) => {
                      const newKey = `custom_${e.target.value}`;
                      const { [key]: value, ...rest } = credits.other.otherCredits;
                      handleCustomCreditChange(newKey, value.toString());
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-grow">
                  <input
                    type="number"
                    step="0.01"
                    value={value.toString()}
                    onChange={(___e) => handleCustomCreditChange(key, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCustomCredit(key)}
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
