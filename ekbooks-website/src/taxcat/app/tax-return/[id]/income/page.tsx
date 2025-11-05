'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '@/components/Button';

const incomeSchema = z.object({
  isIndigenous: z.boolean(),
  indigenousNumber: z.string().optional(),
  t4Slips: z.array(
    z.object({
      employerName: z.string().min(1, 'Employer name is required'),
      employerNumber: z
        .string()
        .regex(/^\d{9}RP\d{4}$/, 'Invalid Business Number format (e.g., 123456789RP0001)'),
      box14_Employment: z.number().min(0, 'Employment income must be positive'),
      box22_CPP: z.number().min(0, 'CPP contributions must be positive'),
      box24_EI: z.number().min(0, 'EI premiums must be positive'),
      box16_Tax: z.number().min(0, 'Income tax deducted must be positive'),
      box26_CPPPensionable: z.number().min(0, 'CPP/QPP pensionable earnings must be positive'),
      box28_EIInsurable: z.number().min(0, 'EI insurable earnings must be positive'),
      box10_Province: z
        .string()
        .min(2, 'Province code is required')
        .max(2, 'Use 2-letter province code'),
    })
  ),
  t5Slips: z.array(
    z.object({
      payerName: z.string().min(1, 'Payer name is required'),
      payerNumber: z.string().regex(/^\d{9}$/, 'Invalid Business Number format (9 digits)'),
      box10_DividendAmount: z.number().min(0, 'Dividend amount must be positive'),
      box11_EligibleDividend: z.number().min(0, 'Eligible dividend amount must be positive'),
      box13_InterestIncome: z.number().min(0, 'Interest income must be positive'),
      box15_ForeignIncome: z.number().min(0, 'Foreign income must be positive'),
      box17_CapitalGains: z.number().min(0, 'Capital gains must be positive'),
      box23_Tax: z.number().min(0, 'Tax deducted must be positive'),
    })
  ),
  foreignIncome: z
    .object({
      employment: z.number().min(0, 'Foreign employment income must be positive'),
      business: z.number().min(0, 'Foreign business income must be positive'),
      investment: z.number().min(0, 'Foreign investment income must be positive'),
      taxPaid: z.number().min(0, 'Foreign tax paid must be positive'),
      countries: z.array(z.string()).min(1, 'At least one country must be selected'),
      tuition: z.number().min(0, 'Foreign tuition amount must be positive'),
    })
    .optional(),
});

type IncomeFormData = z.infer<typeof incomeSchema>;

export default function IncomePage({ params }: { params: { id: string } }): void {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taxReturn, setTaxReturn] = useState<any>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IncomeFormData>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      t4Slips: [],
      t5Slips: [],
    },
  });

  const {
    fields: t4Fields,
    append: appendT4,
    remove: removeT4,
  } = useFieldArray({
    control,
    name: 't4Slips',
  });

  const {
    fields: t5Fields,
    append: appendT5,
    remove: removeT5,
  } = useFieldArray({
    control,
    name: 't5Slips',
  });

  useEffect(() => {
    const fetchTaxReturn = async () => {
      try {
        const response = await fetch(`/api/tax-returns/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tax return');
        }
        const data = await response.json();
        setTaxReturn(data);
      } catch (_error) =>
        console.error('Error fetching tax return:', error);
        router.push('/dashboard');
      }
    };

    fetchTaxReturn();
  }, [params.id, router]);

  const onSubmit = async (___data: IncomeFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/tax-returns/${params.id}/income`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save income information');
      }

      router.push(`/tax-return/${params.id}/deductions`);
    } catch (_error) =>
      console.error('Error saving income:', error);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Income Information</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Indigenous Status Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Indigenous Status</h2>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register('isIndigenous')}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>I am a Status Indian under the Indian Act</span>
                </label>
              </div>
              {watch('isIndigenous') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status Card Number
                  </label>
                  <input
                    type="text"
                    {...register('indigenousNumber')}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter your 10-digit status number"
                  />
                </div>
              )}
            </div>
          </div>

          {/* T4 Slips Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">T4 Slips - Statement of Remuneration Paid</h2>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  appendT4({
                    employerName: '',
                    employerNumber: '',
                    box14_Employment: 0,
                    box22_CPP: 0,
                    box24_EI: 0,
                    box16_Tax: 0,
                    box26_CPPPensionable: 0,
                    box28_EIInsurable: 0,
                    box10_Province: '',
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add T4 Slip
              </Button>
            </div>

            <div className="space-y-6">
              {t4Fields.map((field, ___index) => (
                <div key={field.id} className="border p-4 rounded-md relative">
                  <button
                    type="button"
                    onClick={() => removeT4(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employer Name
                      </label>
                      <input
                        type="text"
                        {...register(`t4Slips.${index}.employerName`)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t4Slips?.[index]?.employerName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t4Slips[index]?.employerName?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employer Business Number
                      </label>
                      <input
                        type="text"
                        {...register(`t4Slips.${index}.employerNumber`)}
                        placeholder="123456789RP0001"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t4Slips?.[index]?.employerNumber && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t4Slips[index]?.employerNumber?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 14 - Employment Income
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`t4Slips.${index}.box14_Employment`, { valueAsNumber: true })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t4Slips?.[index]?.box14_Employment && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t4Slips[index]?.box14_Employment?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 22 - CPP Contributions
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`t4Slips.${index}.box22_CPP`, { valueAsNumber: true })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t4Slips?.[index]?.box22_CPP && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t4Slips[index]?.box22_CPP?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 24 - EI Premiums
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`t4Slips.${index}.box24_EI`, { valueAsNumber: true })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t4Slips?.[index]?.box24_EI && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t4Slips[index]?.box24_EI?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 16 - Income Tax Deducted
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`t4Slips.${index}.box16_Tax`, { valueAsNumber: true })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t4Slips?.[index]?.box16_Tax && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t4Slips[index]?.box16_Tax?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 26 - CPP/QPP Pensionable Earnings
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`t4Slips.${index}.box26_CPPPensionable`, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t4Slips?.[index]?.box26_CPPPensionable && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t4Slips[index]?.box26_CPPPensionable?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 28 - EI Insurable Earnings
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`t4Slips.${index}.box28_EIInsurable`, { valueAsNumber: true })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t4Slips?.[index]?.box28_EIInsurable && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t4Slips[index]?.box28_EIInsurable?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 10 - Province of Employment
                      </label>
                      <select
                        {...register(`t4Slips.${index}.box10_Province`)}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="">Select Province</option>
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland and Labrador</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NU">Nunavut</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="YT">Yukon</option>
                      </select>
                      {errors.t4Slips?.[index]?.box10_Province && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t4Slips[index]?.box10_Province?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* T5 Slips Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">T5 Slips - Statement of Investment Income</h2>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  appendT5({
                    payerName: '',
                    payerNumber: '',
                    box10_DividendAmount: 0,
                    box11_EligibleDividend: 0,
                    box13_InterestIncome: 0,
                    box15_ForeignIncome: 0,
                    box17_CapitalGains: 0,
                    box23_Tax: 0,
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add T5 Slip
              </Button>
            </div>

            <div className="space-y-6">
              {t5Fields.map((field, ___index) => (
                <div key={field.id} className="border p-4 rounded-md relative">
                  <button
                    type="button"
                    onClick={() => removeT5(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payer Name
                      </label>
                      <input
                        type="text"
                        {...register(`t5Slips.${index}.payerName`)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t5Slips?.[index]?.payerName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t5Slips[index]?.payerName?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payer Business Number
                      </label>
                      <input
                        type="text"
                        {...register(`t5Slips.${index}.payerNumber`)}
                        placeholder="123456789"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t5Slips?.[index]?.payerNumber && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t5Slips[index]?.payerNumber?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 10 - Actual Amount of Dividends
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`t5Slips.${index}.box10_DividendAmount`, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t5Slips?.[index]?.box10_DividendAmount && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t5Slips[index]?.box10_DividendAmount?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 11 - Taxable Amount of Eligible Dividends
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`t5Slips.${index}.box11_EligibleDividend`, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t5Slips?.[index]?.box11_EligibleDividend && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t5Slips[index]?.box11_EligibleDividend?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 13 - Interest from Canadian Sources
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`t5Slips.${index}.box13_InterestIncome`, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t5Slips?.[index]?.box13_InterestIncome && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t5Slips[index]?.box13_InterestIncome?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 15 - Foreign Income
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`t5Slips.${index}.box15_ForeignIncome`, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t5Slips?.[index]?.box15_ForeignIncome && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t5Slips[index]?.box15_ForeignIncome?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 17 - Capital Gains Dividends
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`t5Slips.${index}.box17_CapitalGains`, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t5Slips?.[index]?.box17_CapitalGains && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t5Slips[index]?.box17_CapitalGains?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Box 23 - Income Tax Deducted
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`t5Slips.${index}.box23_Tax`, { valueAsNumber: true })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.t5Slips?.[index]?.box23_Tax && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.t5Slips[index]?.box23_Tax?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Foreign Income Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Foreign Income</h2>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  const currentValue = watch('foreignIncome');
                  if (!currentValue) {
                    setValue('foreignIncome', {
                      employment: 0,
                      business: 0,
                      investment: 0,
                      taxPaid: 0,
                      countries: [],
                      tuition: 0,
                    });
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Foreign Income
              </Button>
            </div>

            {watch('foreignIncome') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Foreign Employment Income
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('foreignIncome.employment', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Foreign Business Income
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('foreignIncome.business', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Foreign Investment Income
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('foreignIncome.investment', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Foreign Tax Paid
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('foreignIncome.taxPaid', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Foreign Tuition Paid
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('foreignIncome.tuition', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the amount paid to foreign educational institutions
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Countries</label>
                  <select
                    multiple
                    {...register('foreignIncome.countries')}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="CN">China</option>
                    <option value="JP">Japan</option>
                    <option value="IN">India</option>
                    <option value="AU">Australia</option>
                    {/* Add more countries as needed */}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">
                    Hold Ctrl/Cmd to select multiple countries
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
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
