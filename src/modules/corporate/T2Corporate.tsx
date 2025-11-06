import React, { useState, useEffect } from 'react';
import { Decimal } from 'decimal.js';
import { TaxYear } from '../../core/tax/types';
import { TaxDocument, DocumentStatus } from '../types';
import { CorporateInfoForm } from './components/CorporateInfoForm';
import { FinancialStatementsForm } from './components/FinancialStatementsForm';
import { SchedulesForm } from './components/SchedulesForm';
import { T2Calculator } from './T2Calculator';

interface T2CorporateProps {
  corporationId: string;
  year: TaxYear;
  onSave: (___data: T2CorporateData) => Promise<void>;
  onSubmit: (___data: T2CorporateData) => Promise<void>;
}

export interface T2CorporateData extends TaxDocument {
  corporation: {
    businessNumber: string;
    name: string;
    type: CorporationType;
    fiscalPeriod: {
      start: Date;
      end: Date;
    };
    address: {
      street: string;
      city: string;
      province: string;
      postalCode: string;
      country: string;
    };
    directors: Director[];
    shareholders: Shareholder[];
  };
  financials: {
    revenue: Decimal;
    expenses: Record<string, Decimal>;
    assets: Record<string, Decimal>;
    liabilities: Record<string, Decimal>;
    equity: Record<string, Decimal>;
  };
  schedules: {
    [key: string]: any; // Different schedules have different structures
  };
  calculations: {
    netIncome: Decimal;
    taxableIncome: Decimal;
    tax: {
      federal: Decimal;
      provincial: Decimal;
      total: Decimal;
    };
    credits: {
      investment: Decimal;
      sred: Decimal;
      foreign: Decimal;
      other: Record<string, Decimal>;
    };
    balance: {
      owing: Decimal;
      refund: Decimal;
    };
  };
}

type CorporationType =
  | 'CCPC' // Canadian-Controlled Private Corporation
  | 'OTHER_PRIVATE'
  | 'PUBLIC'
  | 'OTHER';

interface Director {
  name: string;
  sin?: string;
  address: string;
  startDate: Date;
  endDate?: Date;
}

interface Shareholder {
  name: string;
  sin?: string;
  shares: {
    class: string;
    number: number;
    percentage: number;
  }[];
}

export const T2Corporate: React.FC<T2CorporateProps> = ({
  corporationId,
  year,
  onSave,
  onSubmit,
}) => {
  const [data, setData] = useState<T2CorporateData>({
    id: '',
    type: 'T2_CORPORATE',
    year,
    status: 'DRAFT',
    files: [],
    metadata: {},
    created: new Date(),
    modified: new Date(),
    corporation: {
      businessNumber: '',
      name: '',
      type: 'CCPC',
      fiscalPeriod: {
        start: new Date(),
        end: new Date(),
      },
      address: {
        street: '',
        city: '',
        province: '',
        postalCode: '',
        country: 'Canada',
      },
      directors: [],
      shareholders: [],
    },
    financials: {
      revenue: new Decimal(0),
      expenses: {},
      assets: {},
      liabilities: {},
      equity: {},
    },
    schedules: {},
    calculations: {
      netIncome: new Decimal(0),
      taxableIncome: new Decimal(0),
      tax: {
        federal: new Decimal(0),
        provincial: new Decimal(0),
        total: new Decimal(0),
      },
      credits: {
        investment: new Decimal(0),
        sred: new Decimal(0),
        foreign: new Decimal(0),
        other: {},
      },
      balance: {
        owing: new Decimal(0),
        refund: new Decimal(0),
      },
    },
  });

  const [activeSection, setActiveSection] = useState<
    'info' | 'financials' | 'schedules' | 'review'
  >('info');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculator = new T2Calculator(year);

  useEffect(() => {
    const calculations = calculator.calculateTax(data);
    setData((prev) => ({ ...prev, calculations }));
  }, [data.corporation, data.financials, data.schedules]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(data);
      setIsDirty(false);
    } catch (error) {
      setErrors({ submit: 'Failed to save the tax return. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(data);
      setIsDirty(false);
    } catch (error) {
      setErrors({ submit: 'Failed to submit the tax return. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate corporation information
    if (!data.corporation.businessNumber) {
      newErrors.businessNumber = 'Business Number is required';
    }

    if (!data.corporation.name) {
      newErrors.name = 'Corporation name is required';
    }

    // Validate address
    const { address } = data.corporation;
    if (!address.street) {
      newErrors.street = 'Street address is required';
    }
    if (!address.city) {
      newErrors.city = 'City is required';
    }
    if (!address.province) {
      newErrors.province = 'Province is required';
    }
    if (!address.postalCode) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(address.postalCode)) {
      newErrors.postalCode = 'Invalid postal code format';
    }

    // Validate directors
    if (data.corporation.directors.length === 0) {
      newErrors.directors = 'At least one director is required';
    }

    // Validate shareholders
    if (data.corporation.shareholders.length === 0) {
      newErrors.shareholders = 'At least one shareholder is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">T2 Corporation Income Tax Return {year}</h1>

      <div className="mb-8">
        <nav className="flex space-x-4">
          {['info', 'financials', 'schedules', 'review'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section as typeof activeSection)}
              className={`cat-tab ${
                activeSection === section ? 'cat-tab-active' : 'cat-tab-inactive'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-8">
        {activeSection === 'info' && (
          <CorporateInfoForm
            corporation={data.corporation}
            onChange={(___corporation) => {
              setData((prev) => ({ ...prev, corporation }));
              setIsDirty(true);
            }}
            errors={errors}
          />
        )}

        {activeSection === 'financials' && (
          <FinancialStatementsForm
            financials={data.financials}
            onChange={(___financials) => {
              setData((prev) => ({ ...prev, financials }));
              setIsDirty(true);
            }}
            errors={errors}
          />
        )}

        {activeSection === 'schedules' && (
          <SchedulesForm
            schedules={data.schedules}
            onChange={(___schedules) => {
              setData((prev) => ({ ...prev, schedules }));
              setIsDirty(true);
            }}
            errors={errors}
          />
        )}

        {activeSection === 'review' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Tax Summary</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700">Net Income</h4>
                  <p className="text-2xl font-bold">${data.calculations.netIncome.toFixed(2)}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Taxable Income</h4>
                  <p className="text-2xl font-bold">
                    ${data.calculations.taxableIncome.toFixed(2)}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Total Tax</h4>
                  <p className="text-2xl font-bold">${data.calculations.tax.total.toFixed(2)}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Total Credits</h4>
                  <p className="text-2xl font-bold">
                    $
                    {Object.values(data.calculations.credits)
                      .reduce(
                        (sum, credit) =>
                          sum.plus(credit instanceof Decimal ? credit : new Decimal(0)),
                        new Decimal(0)
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Balance</h4>
                {data.calculations.balance.owing.gt(0) ? (
                  <div className="text-error">
                    <p className="text-3xl font-bold">
                      Amount Owing: ${data.calculations.balance.owing.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <div className="text-success">
                    <p className="text-3xl font-bold">
                      Refund: ${data.calculations.balance.refund.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
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
          className={`cat-button ${!isDirty || isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSaving ? 'Saving...' : 'Save Draft'}
        </button>

        {activeSection === 'review' && (
          <button
            onClick={handleSubmit}
            disabled={!validateForm() || isSubmitting}
            className={`cat-button bg-success ${
              !validateForm() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Return'}
          </button>
        )}
      </div>
    </div>
  );
};
