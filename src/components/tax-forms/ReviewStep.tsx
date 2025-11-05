import React from 'react';
import { Button } from '@/components/ui/button';

interface ReviewStepProps {
  taxData: {
    personalInfo: {
      firstName: string;
      lastName: string;
      ssn: string;
      filingStatus: string;
    };
    income: {
      wages: number;
      interest: number;
      dividends: number;
      otherIncome: number;
    };
    deductions: {
      standardDeduction: number;
      itemizedDeductions: number;
      otherDeductions: number;
    };
    credits: {
      childTaxCredit: number;
      earnedIncomeCredit: number;
      otherCredits: number;
    };
    calculatedTax: {
      totalTax: number;
      refundAmount?: number;
      amountDue?: number;
    };
  };
  onEdit: (___section: string) => void;
  onContinue: () => void;
}

export default function ReviewStep({ taxData, onEdit, onContinue }: ReviewStepProps): void {
  const { personalInfo, income, deductions, credits, calculatedTax } = taxData;

  const totalIncome = income.wages + income.interest + income.dividends + income.otherIncome;
  const totalDeductions =
    deductions.standardDeduction + deductions.itemizedDeductions + deductions.otherDeductions;
  const totalCredits = credits.childTaxCredit + credits.earnedIncomeCredit + credits.otherCredits;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Review Your Tax Return</h2>

      {/* Personal Information */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Personal Information</h3>
          <Button onClick={() => onEdit('personal')} variant="outline" size="sm">
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">
              {personalInfo.firstName} {personalInfo.lastName}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Filing Status</p>
            <p className="font-medium">{personalInfo.filingStatus}</p>
          </div>
        </div>
      </section>

      {/* Income Summary */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Income</h3>
          <Button onClick={() => onEdit('income')} variant="outline" size="sm">
            Edit
          </Button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <p className="text-gray-600">Wages</p>
            <p className="font-medium text-right">${income.wages.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <p className="text-gray-600">Interest</p>
            <p className="font-medium text-right">${income.interest.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <p className="text-gray-600">Dividends</p>
            <p className="font-medium text-right">${income.dividends.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <p className="text-gray-600">Other Income</p>
            <p className="font-medium text-right">${income.otherIncome.toFixed(2)}</p>
          </div>
          <div className="border-t border-gray-300 mt-2 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <p className="font-semibold text-gray-800">Total Income</p>
              <p className="font-semibold text-right">${totalIncome.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Calculation */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Final Calculation</h3>
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-700">Total Income</p>
            <p className="font-medium text-right">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-700">Total Deductions</p>
            <p className="font-medium text-right">-${totalDeductions.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-700">Total Credits</p>
            <p className="font-medium text-right">-${totalCredits.toFixed(2)}</p>
          </div>
          <div className="border-t-2 border-blue-200 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <p className="text-xl font-bold text-gray-800">
                {calculatedTax.refundAmount ? 'Your Refund' : 'Amount Due'}
              </p>
              <p className="text-xl font-bold text-right text-blue-700">
                ${(calculatedTax.refundAmount || calculatedTax.amountDue || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => onEdit('start')}>
          Start Over
        </Button>
        <Button onClick={onContinue} className="bg-blue-600 hover:bg-blue-700 text-white">
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}
