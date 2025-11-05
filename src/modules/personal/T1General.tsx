import React, { useState, useEffect } from 'react';
import { Decimal } from 'decimal.js';
import { TaxCalculator } from '../../core/tax/TaxCalculator';
import {
  TaxPayer,
  Income,
  Deductions,
  Credits,
  TaxCalculations,
  TaxYear,
  ProvinceCode,
  MaritalStatus,
  ResidencyStatus,
} from '../../core/tax/types';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { IncomeForm } from './components/IncomeForm';
import { DeductionsForm } from './components/DeductionsForm';

interface T1GeneralProps {
  taxpayerId: string;
  year: TaxYear;
  onSave: (___data: T1GeneralData) => Promise<void>;
  onSubmit: (___data: T1GeneralData) => Promise<void>;
}

interface T1GeneralData {
  taxpayer: TaxPayer;
  income: Income;
  deductions: Deductions;
  credits: Credits;
  calculations: TaxCalculations;
}

export const T1General: React.FC<T1GeneralProps> = ({ taxpayerId, year, onSave, onSubmit }) => {
  const [data, setData] = useState<T1GeneralData>({
    taxpayer: {
      id: taxpayerId,
      sin: '',
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
      address: {
        street: '',
        city: '',
        province: 'ON' as ProvinceCode,
        postalCode: '',
        country: 'Canada',
      },
      residencyStatus: 'RESIDENT' as ResidencyStatus,
      maritalStatus: 'SINGLE' as MaritalStatus,
      dependents: [],
    },
    income: {
      employment: [],
      selfEmployment: [],
      investment: {
        dividends: {
          eligible: new Decimal(0),
          nonEligible: new Decimal(0),
          foreign: new Decimal(0),
        },
        interest: {
          canadian: new Decimal(0),
          foreign: new Decimal(0),
        },
        capitalGains: {
          securities: new Decimal(0),
          realEstate: new Decimal(0),
          other: new Decimal(0),
        },
        royalties: new Decimal(0),
        limitedPartnership: new Decimal(0),
      },
      rental: [],
      pension: {
        cpp: new Decimal(0),
        qpp: new Decimal(0),
        oas: new Decimal(0),
        gis: new Decimal(0),
        employerPension: new Decimal(0),
        rrsp: new Decimal(0),
        rrif: new Decimal(0),
        foreignPension: new Decimal(0),
        otherPension: new Decimal(0),
      },
      benefits: {
        ei: new Decimal(0),
        socialAssistance: new Decimal(0),
        workersCompensation: new Decimal(0),
        otherBenefits: new Decimal(0),
      },
      otherIncome: [],
      foreignIncome: [],
    },
    deductions: {
      rrsp: {
        contributions: new Decimal(0),
        prpp: new Decimal(0),
        spousalContributions: new Decimal(0),
        hbpRepayment: new Decimal(0),
        lifetimeLimitUsed: new Decimal(0),
      },
      employment: {
        unionDues: new Decimal(0),
        professionalDues: new Decimal(0),
        toolExpenses: new Decimal(0),
        workFromHome: new Decimal(0),
      },
      other: {
        movingExpenses: new Decimal(0),
        supportPayments: new Decimal(0),
        carryingCharges: new Decimal(0),
        explorationDevelopment: new Decimal(0),
        otherDeductions: {},
      },
    },
    credits: {
      basic: {
        personal: new Decimal(0),
        age: new Decimal(0),
        spouse: new Decimal(0),
        eligible_dependant: new Decimal(0),
        caregiver: new Decimal(0),
      },
      medical: {
        expenses: new Decimal(0),
        attendantCare: new Decimal(0),
        disabilitySupports: new Decimal(0),
      },
      education: {
        tuition: new Decimal(0),
        studentLoanInterest: new Decimal(0),
        textbooks: new Decimal(0),
      },
      donations: {
        charitable: new Decimal(0),
        political: new Decimal(0),
        cultural: new Decimal(0),
      },
      other: {
        pension: new Decimal(0),
        disability: new Decimal(0),
        foreignTaxCredit: new Decimal(0),
        labourSponsored: new Decimal(0),
        otherCredits: {},
      },
    },
    calculations: {
      income: {
        employment: new Decimal(0),
        business: new Decimal(0),
        investment: new Decimal(0),
        taxable: new Decimal(0),
        net: new Decimal(0),
      },
      deductions: {
        total: new Decimal(0),
        nonRefundable: new Decimal(0),
        refundable: new Decimal(0),
      },
      tax: {
        federal: new Decimal(0),
        provincial: new Decimal(0),
        total: new Decimal(0),
      },
      credits: {
        nonRefundable: new Decimal(0),
        refundable: new Decimal(0),
        total: new Decimal(0),
      },
      contributions: {
        cpp: new Decimal(0),
        ei: new Decimal(0),
        qpp: new Decimal(0),
      },
      balance: {
        owing: new Decimal(0),
        refund: new Decimal(0),
      },
    },
  });

  const [activeSection, setActiveSection] = useState<
    'personal' | 'income' | 'deductions' | 'credits' | 'review'
  >('personal');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculator = new TaxCalculator(year);

  useEffect(() => {
    const calculations = calculator.calculateTax(
      data.taxpayer,
      data.income,
      data.deductions,
      data.credits
    );
    setData((___prev) => ({ ...prev, calculations }));
  }, [data.taxpayer, data.income, data.deductions, data.credits]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(data);
      setIsDirty(false);
    } catch (___error) =>
      setErrors({ submit: 'Failed to save the tax return. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      setIsDirty(false);
    } catch (___error) =>
      setErrors({ submit: 'Failed to submit the tax return. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate taxpayer information
    if (!data.taxpayer.sin) {
      newErrors.sin = 'SIN is required';
    } else if (!/^\d{9}$/.test(data.taxpayer.sin)) {
      newErrors.sin = 'Invalid SIN format';
    }

    if (!data.taxpayer.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!data.taxpayer.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    // Validate address
    if (!data.taxpayer.address.street) {
      newErrors.street = 'Street address is required';
    }

    if (!data.taxpayer.address.city) {
      newErrors.city = 'City is required';
    }

    if (!data.taxpayer.address.postalCode) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(data.taxpayer.address.postalCode)) {
      newErrors.postalCode = 'Invalid postal code format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTaxpayerChange = (updatedTaxpayer: TaxPayer): void => {
    setData((___prev) => ({
      ...prev,
      taxpayer: updatedTaxpayer,
    }));
    setIsDirty(true);
  };

  const handleIncomeChange = (updatedIncome: Income): void => {
    setData((___prev) => ({
      ...prev,
      income: updatedIncome,
    }));
    setIsDirty(true);
  };

  const handleDeductionsChange = (updatedDeductions: Deductions): void => {
    setData((___prev) => ({
      ...prev,
      deductions: updatedDeductions,
    }));
    setIsDirty(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">T1 General {year}</h1>

      <div className="mb-8">
        <nav className="flex space-x-4">
          {['personal', 'income', 'deductions', 'credits', 'review'].map((___section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section as typeof activeSection)}
              className={`px-4 py-2 rounded-lg ${
                activeSection === section
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-8">
        {activeSection === 'personal' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <PersonalInfoForm
              taxpayer={data.taxpayer}
              onChange={handleTaxpayerChange}
              errors={errors}
            />
          </div>
        )}

        {activeSection === 'income' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Income</h2>
            <IncomeForm income={data.income} onChange={handleIncomeChange} errors={errors} />
          </div>
        )}

        {activeSection === 'deductions' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Deductions</h2>
            <DeductionsForm
              deductions={data.deductions}
              onChange={handleDeductionsChange}
              errors={errors}
            />
          </div>
        )}

        {activeSection === 'credits' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Credits</h2>
            {/* Credits form fields */}
          </div>
        )}

        {activeSection === 'review' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Review & Submit</h2>

            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Tax Summary</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700">Total Income</h4>
                  <p className="text-2xl font-bold">${data.calculations.income.net.toFixed(2)}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Taxable Income</h4>
                  <p className="text-2xl font-bold">
                    ${data.calculations.income.taxable.toFixed(2)}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Total Tax</h4>
                  <p className="text-2xl font-bold">${data.calculations.tax.total.toFixed(2)}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Total Credits</h4>
                  <p className="text-2xl font-bold">
                    ${data.calculations.credits.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Balance</h4>
                {data.calculations.balance.owing.gt(0) ? (
                  <div className="text-red-600">
                    <p className="text-3xl font-bold">
                      Amount Owing: ${data.calculations.balance.owing.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <div className="text-green-600">
                    <p className="text-3xl font-bold">
                      Refund: ${data.calculations.balance.refund.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                <h3 className="text-red-800 font-medium mb-2">Please fix the following errors:</h3>
                <ul className="list-disc list-inside text-red-700">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={handleSave}
          disabled={!isDirty || isSaving}
          className={`px-6 py-2 rounded-lg ${
            !isDirty || isSaving
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isSaving ? 'Saving...' : 'Save Draft'}
        </button>

        {activeSection === 'review' && (
          <button
            onClick={handleSubmit}
            disabled={!validateForm() || isSubmitting}
            className={`px-6 py-2 rounded-lg ${
              !validateForm() || isSubmitting
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Return'}
          </button>
        )}
      </div>
    </div>
  );
};
