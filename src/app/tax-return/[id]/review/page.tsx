'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, AlertTriangle } from 'lucide-react';
import Button from '@/components/Button';

interface TaxReturn {
  id: string;
  year: number;
  filingStatus: string;
  status: string;
  totalTax: number;
  refundAmount: number;
  dueAmount: number;
  w2Forms: any[];
  form1099s: any[];
  deductions: any[];
  dependents: any[];
}

export default function ReviewPage({ params }: { params: { id: string } }): JSX.Element {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taxReturn, setTaxReturn] = useState<TaxReturn | null>(null);

  useEffect(() => {
    const fetchTaxReturn = async () => {
      try {
        const response = await fetch(`/api/tax-returns/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tax return');
        }
        const data = await response.json();
        setTaxReturn(data);
      } catch (error) {
        console.error('Error fetching tax return:', error);
        router.push('/dashboard');
      }
    };

    fetchTaxReturn();
  }, [params.id, router]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/tax-returns/${params.id}/submit`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to submit tax return');
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting tax return:', error);
      // Handle error (show toast notification, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!taxReturn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalIncome =
    taxReturn.w2Forms.reduce((sum, form) => sum + form.wages, 0) +
    taxReturn.form1099s.reduce((sum, form) => sum + form.amount, 0);

  const totalDeductions = taxReturn.deductions.reduce(
    (sum, deduction) => sum + deduction.amount,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Review Tax Return</h1>

        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Tax Year</p>
              <p className="font-medium">{taxReturn.year}</p>
            </div>
            <div>
              <p className="text-gray-600">Filing Status</p>
              <p className="font-medium">{taxReturn.filingStatus.replace(/_/g, ' ')}</p>
            </div>
          </div>
        </div>

        {/* Income Summary */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Income Summary</h2>

          {/* W-2 Forms */}
          {taxReturn.w2Forms.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">W-2 Forms</h3>
              <div className="space-y-4">
                {taxReturn.w2Forms.map((form, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Employer</p>
                        <p className="font-medium">{form.employerName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Wages</p>
                        <p className="font-medium">${form.wages.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Federal Tax Withheld</p>
                        <p className="font-medium">${form.federalTaxWithheld.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">State Tax Withheld</p>
                        <p className="font-medium">${form.stateTaxWithheld.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 1099 Forms */}
          {taxReturn.form1099s.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">1099 Forms</h3>
              <div className="space-y-4">
                {taxReturn.form1099s.map((form, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Payer</p>
                        <p className="font-medium">{form.payerName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Type</p>
                        <p className="font-medium">{form.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Amount</p>
                        <p className="font-medium">${form.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Federal Tax Withheld</p>
                        <p className="font-medium">${form.federalTaxWithheld.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Total Income</p>
              <p className="text-lg font-bold">${totalIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Deductions Summary */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Deductions Summary</h2>

          {taxReturn.deductions.length > 0 ? (
            <>
              <div className="space-y-4 mb-6">
                {taxReturn.deductions.map((deduction, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Category</p>
                        <p className="font-medium">{deduction.category.replace(/_/g, ' ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Amount</p>
                        <p className="font-medium">${deduction.amount.toLocaleString()}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Description</p>
                        <p className="font-medium">{deduction.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">Total Deductions</p>
                  <p className="text-lg font-bold">${totalDeductions.toLocaleString()}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-600">Using standard deduction</p>
          )}
        </div>

        {/* Dependents Summary */}
        {taxReturn.dependents.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Dependents</h2>
            <div className="space-y-4">
              {taxReturn.dependents.map((dependent, index) => (
                <div key={index} className="border p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-medium">{`${dependent.firstName} ${dependent.lastName}`}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Relationship</p>
                      <p className="font-medium">{dependent.relationship.replace(/_/g, ' ')}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Date of Birth</p>
                      <p className="font-medium">
                        {new Date(dependent.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">SSN</p>
                      <p className="font-medium">{dependent.ssn}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tax Summary */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Tax Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Total Income</p>
              <p className="font-medium">${totalIncome.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Total Deductions</p>
              <p className="font-medium">${totalDeductions.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Taxable Income</p>
              <p className="font-medium">${(totalIncome - totalDeductions).toLocaleString()}</p>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium">Total Tax</p>
                <p className="text-lg font-bold">${taxReturn.totalTax.toLocaleString()}</p>
              </div>
              {taxReturn.refundAmount > 0 ? (
                <div className="flex justify-between items-center text-green-600 mt-2">
                  <p className="text-lg font-medium">Refund Amount</p>
                  <p className="text-lg font-bold">${taxReturn.refundAmount.toLocaleString()}</p>
                </div>
              ) : (
                <div className="flex justify-between items-center text-red-600 mt-2">
                  <p className="text-lg font-medium">Amount Due</p>
                  <p className="text-lg font-bold">${taxReturn.dueAmount.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push(`/tax-return/${params.id}/edit`)}
            >
              Edit Return
            </Button>
            <Button type="button" variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Submit Return
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Warning Message */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center text-yellow-800">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <p className="text-sm">
              Please review all information carefully before submitting. Once submitted, you cannot
              make changes without filing an amendment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
