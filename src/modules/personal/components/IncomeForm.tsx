import React from 'react';
import { Decimal } from 'decimal.js';
import { Income, EmploymentIncome, BusinessIncome } from '../../../core/tax/types';

interface IncomeFormProps {
  income: Income;
  onChange: (___income: Income) => void;
  errors: Record<string, string>;
}

export const IncomeForm: React.FC<IncomeFormProps> = ({ income, onChange, errors }) => {
  const handleEmploymentChange = (index: number, field: keyof EmploymentIncome, value: string): void => {
    const updatedEmployment = [...income.employment];
    updatedEmployment[index] = {
      ...updatedEmployment[index],
      [field]:
        field === 'employerName' || field === 'employerNumber' ? value : new Decimal(value || 0),
    };

    onChange({
      ...income,
      employment: updatedEmployment,
    });
  };

  const addEmployment = (): void => {
    onChange({
      ...income,
      employment: [
        ...income.employment,
        {
          slipType: 'T4',
          employerName: '',
          employerNumber: '',
          income: new Decimal(0),
          tax: new Decimal(0),
          cpp: new Decimal(0),
          ei: new Decimal(0),
        },
      ],
    });
  };

  const removeEmployment = (index: number): void => {
    const updatedEmployment = [...income.employment];
    updatedEmployment.splice(index, 1);
    onChange({
      ...income,
      employment: updatedEmployment,
    });
  };

  const handleBusinessChange = (index: number, field: keyof BusinessIncome, value: string): void => {
    const updatedBusiness = [...income.selfEmployment];
    updatedBusiness[index] = {
      ...updatedBusiness[index],
      [field]:
        field === 'businessName' || field === 'businessNumber' || field === 'industry'
          ? value
          : new Decimal(value || 0),
    };

    onChange({
      ...income,
      selfEmployment: updatedBusiness,
    });
  };

  const addBusiness = (): void => {
    onChange({
      ...income,
      selfEmployment: [
        ...income.selfEmployment,
        {
          businessName: '',
          industry: '',
          revenue: new Decimal(0),
          expenses: {
            advertising: new Decimal(0),
            badDebts: new Decimal(0),
            insurance: new Decimal(0),
            interest: new Decimal(0),
            maintenance: new Decimal(0),
            meals: new Decimal(0),
            motorVehicle: new Decimal(0),
            office: new Decimal(0),
            supplies: new Decimal(0),
            professionalFees: new Decimal(0),
            rent: new Decimal(0),
            salaries: new Decimal(0),
            travel: new Decimal(0),
            utilities: new Decimal(0),
            other: {},
          },
          fiscalPeriod: {
            start: new Date(),
            end: new Date(),
          },
        },
      ],
    });
  };

  const removeBusiness = (index: number): void => {
    const updatedBusiness = [...income.selfEmployment];
    updatedBusiness.splice(index, 1);
    onChange({
      ...income,
      selfEmployment: updatedBusiness,
    });
  };

  const handleInvestmentChange = (
    category: 'dividends' | 'interest' | 'capitalGains',
    field: string,
    value: string
  ) => {
    onChange({
      ...income,
      investment: {
        ...income.investment,
        [category]: {
          ...income.investment[category],
          [field]: new Decimal(value || 0),
        },
      },
    });
  };

  const handlePensionChange = (field: keyof typeof income.pension, value: string): void => {
    onChange({
      ...income,
      pension: {
        ...income.pension,
        [field]: new Decimal(value || 0),
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Employment Income */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Employment Income (T4)</h3>
          <button
            type="button"
            onClick={addEmployment}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Employer
          </button>
        </div>

        {income.employment.map((emp, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Employer Name</label>
                <input
                  type="text"
                  value={emp.employerName}
                  onChange={(e) => handleEmploymentChange(index, 'employerName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Employer Number</label>
                <input
                  type="text"
                  value={emp.employerNumber}
                  onChange={(e) => handleEmploymentChange(index, 'employerNumber', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employment Income (Box 14)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={emp.income.toString()}
                  onChange={(e) => handleEmploymentChange(index, 'income', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Income Tax Deducted (Box 22)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={emp.tax.toString()}
                  onChange={(e) => handleEmploymentChange(index, 'tax', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CPP Contributions (Box 16)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={emp.cpp.toString()}
                  onChange={(e) => handleEmploymentChange(index, 'cpp', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  EI Premiums (Box 18)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={emp.ei.toString()}
                  onChange={(e) => handleEmploymentChange(index, 'ei', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => removeEmployment(index)}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Investment Income */}
      <div>
        <h3 className="text-lg font-medium mb-4">Investment Income</h3>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Dividends</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Eligible Dividends
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={income.investment.dividends.eligible.toString()}
                    onChange={(e) =>
                      handleInvestmentChange('dividends', 'eligible', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Non-Eligible Dividends
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={income.investment.dividends.nonEligible.toString()}
                    onChange={(e) =>
                      handleInvestmentChange('dividends', 'nonEligible', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Foreign Dividends
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={income.investment.dividends.foreign.toString()}
                    onChange={(e) => handleInvestmentChange('dividends', 'foreign', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Interest</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Canadian Interest
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={income.investment.interest.canadian.toString()}
                    onChange={(e) => handleInvestmentChange('interest', 'canadian', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Foreign Interest
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={income.investment.interest.foreign.toString()}
                    onChange={(e) => handleInvestmentChange('interest', 'foreign', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Capital Gains</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Securities</label>
                  <input
                    type="number"
                    step="0.01"
                    value={income.investment.capitalGains.securities.toString()}
                    onChange={(e) =>
                      handleInvestmentChange('capitalGains', 'securities', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Real Estate</label>
                  <input
                    type="number"
                    step="0.01"
                    value={income.investment.capitalGains.realEstate.toString()}
                    onChange={(e) =>
                      handleInvestmentChange('capitalGains', 'realEstate', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Other Capital Gains
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={income.investment.capitalGains.other.toString()}
                    onChange={(e) =>
                      handleInvestmentChange('capitalGains', 'other', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pension Income */}
      <div>
        <h3 className="text-lg font-medium mb-4">Pension Income</h3>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">CPP/QPP Benefits</label>
              <input
                type="number"
                step="0.01"
                value={income.pension.cpp.toString()}
                onChange={(e) => handlePensionChange('cpp', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">OAS Pension</label>
              <input
                type="number"
                step="0.01"
                value={income.pension.oas.toString()}
                onChange={(e) => handlePensionChange('oas', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Other Pensions/Superannuation
              </label>
              <input
                type="number"
                step="0.01"
                value={income.pension.employerPension.toString()}
                onChange={(e) => handlePensionChange('employerPension', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">RRSP Income</label>
              <input
                type="number"
                step="0.01"
                value={income.pension.rrsp.toString()}
                onChange={(e) => handlePensionChange('rrsp', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">RRIF Income</label>
              <input
                type="number"
                step="0.01"
                value={income.pension.rrif.toString()}
                onChange={(e) => handlePensionChange('rrif', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Foreign Pensions</label>
              <input
                type="number"
                step="0.01"
                value={income.pension.foreignPension.toString()}
                onChange={(e) => handlePensionChange('foreignPension', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
