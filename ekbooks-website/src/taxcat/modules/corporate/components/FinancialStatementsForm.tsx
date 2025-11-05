import React from 'react';
import { Decimal } from 'decimal.js';
import { T2CorporateData } from '../T2Corporate';

interface FinancialStatementsFormProps {
  financials: T2CorporateData['financials'];
  onChange: (financials: T2CorporateData['financials']) => void;
  errors: Record<string, string>;
}

interface FinancialCategory {
  name: string;
  items: {
    key: string;
    label: string;
  }[];
}

const EXPENSE_CATEGORIES: FinancialCategory[] = [
  {
    name: 'Operating Expenses',
    items: [
      { key: 'advertising', label: 'Advertising and Promotion' },
      { key: 'badDebts', label: 'Bad Debts' },
      { key: 'delivery', label: 'Delivery and Freight' },
      { key: 'depreciation', label: 'Depreciation and Amortization' },
      { key: 'employeeBenefits', label: 'Employee Benefits' },
      { key: 'insurance', label: 'Insurance' },
      { key: 'interest', label: 'Interest and Bank Charges' },
      { key: 'maintenance', label: 'Maintenance and Repairs' },
      { key: 'officeExpenses', label: 'Office Expenses' },
      { key: 'professionalFees', label: 'Professional Fees' },
      { key: 'rent', label: 'Rent' },
      { key: 'salaries', label: 'Salaries and Wages' },
      { key: 'supplies', label: 'Supplies' },
      { key: 'travel', label: 'Travel' },
      { key: 'utilities', label: 'Utilities' },
    ],
  },
  {
    name: 'Other Expenses',
    items: [
      { key: 'foreignExchange', label: 'Foreign Exchange Loss' },
      { key: 'disposalLoss', label: 'Loss on Disposal of Assets' },
      { key: 'otherExpenses', label: 'Other Expenses' },
    ],
  },
];

const ASSET_CATEGORIES: FinancialCategory[] = [
  {
    name: 'Current Assets',
    items: [
      { key: 'cash', label: 'Cash and Cash Equivalents' },
      { key: 'accountsReceivable', label: 'Accounts Receivable' },
      { key: 'inventory', label: 'Inventory' },
      { key: 'prepaidExpenses', label: 'Prepaid Expenses' },
    ],
  },
  {
    name: 'Fixed Assets',
    items: [
      { key: 'land', label: 'Land' },
      { key: 'buildings', label: 'Buildings' },
      { key: 'equipment', label: 'Equipment' },
      { key: 'vehicles', label: 'Vehicles' },
      { key: 'accumulatedDepreciation', label: 'Accumulated Depreciation' },
    ],
  },
  {
    name: 'Other Assets',
    items: [
      { key: 'investments', label: 'Investments' },
      { key: 'goodwill', label: 'Goodwill' },
      { key: 'otherAssets', label: 'Other Assets' },
    ],
  },
];

const LIABILITY_CATEGORIES: FinancialCategory[] = [
  {
    name: 'Current Liabilities',
    items: [
      { key: 'accountsPayable', label: 'Accounts Payable' },
      { key: 'shortTermLoans', label: 'Short-term Loans' },
      { key: 'currentTaxPayable', label: 'Income Tax Payable' },
      { key: 'deferredRevenue', label: 'Deferred Revenue' },
    ],
  },
  {
    name: 'Long-term Liabilities',
    items: [
      { key: 'longTermLoans', label: 'Long-term Loans' },
      { key: 'mortgages', label: 'Mortgages Payable' },
      { key: 'deferredTax', label: 'Deferred Tax Liabilities' },
      { key: 'otherLiabilities', label: 'Other Long-term Liabilities' },
    ],
  },
];

const EQUITY_CATEGORIES: FinancialCategory[] = [
  {
    name: "Shareholders' Equity",
    items: [
      { key: 'commonShares', label: 'Common Shares' },
      { key: 'preferredShares', label: 'Preferred Shares' },
      { key: 'retainedEarnings', label: 'Retained Earnings' },
      { key: 'otherEquity', label: 'Other Equity' },
    ],
  },
];

export const FinancialStatementsForm: React.FC<FinancialStatementsFormProps> = ({
  financials,
  onChange,
  errors,
}) => {
  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange({
      ...financials,
      revenue: new Decimal(e.target.value || 0),
    });
  };

  const handleCategoryChange = (
    category: 'expenses' | 'assets' | 'liabilities' | 'equity',
    key: string,
    value: string
  ) => {
    onChange({
      ...financials,
      [category]: {
        ...financials[category],
        [key]: new Decimal(value || 0),
      },
    });
  };

  const renderFinancialSection = (
    title: string,
    categories: FinancialCategory[],
    type: 'expenses' | 'assets' | 'liabilities' | 'equity'
  ) => (
    <div className="cat-card">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-6">
        {categories.map((___category) => (
          <div key={category.name}>
            <h4 className="font-medium text-gray-700 mb-2">{category.name}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((___item) => (
                <div key={item.key}>
                  <label className="block text-sm font-medium text-gray-700">{item.label}</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      value={financials[type][item.key]?.toString() || '0'}
                      onChange={(___e) => handleCategoryChange(type, item.key, e.target.value)}
                      className="cat-input pl-7"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Revenue */}
      <div className="cat-card">
        <h3 className="text-xl font-semibold mb-4">Revenue</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Revenue</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                step="0.01"
                value={financials.revenue.toString()}
                onChange={handleRevenueChange}
                className="cat-input pl-7"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Expenses */}
      {renderFinancialSection('Expenses', EXPENSE_CATEGORIES, 'expenses')}

      {/* Assets */}
      {renderFinancialSection('Assets', ASSET_CATEGORIES, 'assets')}

      {/* Liabilities */}
      {renderFinancialSection('Liabilities', LIABILITY_CATEGORIES, 'liabilities')}

      {/* Equity */}
      {renderFinancialSection('Equity', EQUITY_CATEGORIES, 'equity')}

      {/* Totals */}
      <div className="cat-card bg-gray-50">
        <h3 className="text-xl font-semibold mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Income Statement</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Revenue</span>
                <span className="font-medium">${financials.revenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Expenses</span>
                <span className="font-medium">
                  $
                  {Object.values(financials.expenses)
                    .reduce((sum, ___expense) => sum.plus(expense), new Decimal(0))
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Net Income</span>
                <span className="font-medium">
                  $
                  {financials.revenue
                    .minus(
                      Object.values(financials.expenses).reduce(
                        (sum, ___expense) => sum.plus(expense),
                        new Decimal(0)
                      )
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Balance Sheet</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Assets</span>
                <span className="font-medium">
                  $
                  {Object.values(financials.assets)
                    .reduce((sum, ___asset) => sum.plus(asset), new Decimal(0))
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Liabilities</span>
                <span className="font-medium">
                  $
                  {Object.values(financials.liabilities)
                    .reduce((sum, ___liability) => sum.plus(liability), new Decimal(0))
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Equity</span>
                <span className="font-medium">
                  $
                  {Object.values(financials.equity)
                    .reduce((sum, ___equity) => sum.plus(equity), new Decimal(0))
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Total Liabilities and Equity</span>
                <span className="font-medium">
                  $
                  {Object.values(financials.liabilities)
                    .reduce((sum, ___liability) => sum.plus(liability), new Decimal(0))
                    .plus(
                      Object.values(financials.equity).reduce(
                        (sum, ___equity) => sum.plus(equity),
                        new Decimal(0)
                      )
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
