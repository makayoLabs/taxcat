'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '@/components/Button';

const deductionCategories = [
  'MORTGAGE_INTEREST',
  'PROPERTY_TAX',
  'CHARITABLE_CONTRIBUTIONS',
  'MEDICAL_EXPENSES',
  'STATE_LOCAL_TAX',
  'STUDENT_LOAN_INTEREST',
  'RETIREMENT_CONTRIBUTIONS',
  'HOME_OFFICE',
  'BUSINESS_EXPENSES',
  'OTHER',
] as const;

const deductionsSchema = z.object({
  deductions: z.array(
    z.object({
      category: z.enum(deductionCategories),
      description: z.string().min(1, 'Description is required'),
      amount: z.number().min(0, 'Amount must be positive'),
    })
  ),
  useStandardDeduction: z.boolean(),
});

type DeductionsFormData = z.infer<typeof deductionsSchema>;

export default function DeductionsPage({ params }: { params: { id: string } }): JSX.Element {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taxReturn, setTaxReturn] = useState<any>(null);
  const [totalDeductions, setTotalDeductions] = useState(0);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<DeductionsFormData>({
    resolver: zodResolver(deductionsSchema),
    defaultValues: {
      deductions: [],
      useStandardDeduction: true,
    },
  });

  const {
    fields: deductionFields,
    append: appendDeduction,
    remove: removeDeduction,
  } = useFieldArray({
    control,
    name: 'deductions',
  });

  const useStandardDeduction = watch('useStandardDeduction');
  const deductions = watch('deductions');

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

  useEffect(() => {
    const total = deductions.reduce((sum, deduction) => sum + (deduction.amount || 0), 0);
    setTotalDeductions(total);
  }, [deductions]);

  const onSubmit = async (data: DeductionsFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/tax-returns/${params.id}/deductions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save deductions');
      }

      router.push(`/tax-return/${params.id}/dependents`);
    } catch (error) {
      console.error('Error saving deductions:', error);
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

  const standardDeductionAmount = taxReturn.filingStatus === 'MARRIED_JOINT' ? 27700 : 13850;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Deductions</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Standard vs Itemized Selection */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Choose Your Deduction Method</h2>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    {...register('useStandardDeduction')}
                    value="true"
                    className="h-4 w-4 text-blue-600"
                  />
                  <div>
                    <span className="font-medium">Standard Deduction</span>
                    <p className="text-sm text-gray-600">
                      ${standardDeductionAmount.toLocaleString()} for{' '}
                      {taxReturn.filingStatus.toLowerCase().replace('_', ' ')} filers
                    </p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    {...register('useStandardDeduction')}
                    value="false"
                    className="h-4 w-4 text-blue-600"
                  />
                  <div>
                    <span className="font-medium">Itemized Deductions</span>
                    <p className="text-sm text-gray-600">
                      Total: ${totalDeductions.toLocaleString()}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Itemized Deductions Section */}
          {!useStandardDeduction && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Itemized Deductions</h2>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    appendDeduction({
                      category: 'OTHER',
                      description: '',
                      amount: 0,
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Deduction
                </Button>
              </div>

              <div className="space-y-6">
                {deductionFields.map((field, index) => (
                  <div key={field.id} className="border p-4 rounded-md relative">
                    <button
                      type="button"
                      onClick={() => removeDeduction(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          {...register(`deductions.${index}.category`)}
                          className="w-full px-3 py-2 border rounded-md"
                        >
                          {deductionCategories.map((category) => (
                            <option key={category} value={category}>
                              {category.replace(/_/g, ' ')}
                            </option>
                          ))}
                        </select>
                        {errors.deductions?.[index]?.category && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.deductions[index]?.category?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          {...register(`deductions.${index}.description`)}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                        {errors.deductions?.[index]?.description && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.deductions[index]?.description?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register(`deductions.${index}.amount`, { valueAsNumber: true })}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                        {errors.deductions?.[index]?.amount && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.deductions[index]?.amount?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button type="button" variant="secondary" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Continue'}
              {!isSubmitting && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
