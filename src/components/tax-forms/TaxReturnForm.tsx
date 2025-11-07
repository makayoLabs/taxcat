import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TaxCalculator } from '@/services/taxCalculator';
import Button from '@/components/Button';
import { DocumentUpload } from '@/components/DocumentUpload';
import type {
  TaxableIncome,
  Deductions,
  Credits,
  TaxCalculationResult,
  TaxReturnType,
  TaxCalculationOptions,
} from '@/types/tax';

const taxReturnSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN format'),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    filingStatus: z.enum(['single', 'married_joint', 'married_separate', 'head_household']),
    occupation: z.string().min(1, 'Occupation is required'),
    phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, 'Invalid phone format'),
    email: z.string().email('Invalid email address'),
  }),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().length(2, 'Invalid state code'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  }),
  income: z.object({
    wages: z.number().min(0, 'Must be a positive number'),
    selfEmployment: z.number().min(0),
    investments: z.object({
      dividends: z.number().min(0),
      interest: z.number().min(0),
      capitalGains: z.number(),
    }),
    rental: z.number(),
    retirement: z.number().min(0),
    otherIncome: z.number(),
  }),
  deductions: z.object({
    type: z.enum(['standard', 'itemized']),
    itemized: z
      .object({
        mortgageInterest: z.number().min(0),
        propertyTax: z.number().min(0),
        charitableContributions: z.number().min(0),
        medicalExpenses: z.number().min(0),
        otherDeductions: z.number().min(0),
      })
      .optional(),
  }),
  documents: z.array(
    z.object({
      type: z.enum(['W2', '1099', 'MORTGAGE_STATEMENT', 'PROPERTY_TAX', 'OTHER']),
      file: z.any(),
      description: z.string().optional(),
    })
  ),
});

type TaxReturnData = z.infer<typeof taxReturnSchema>;

interface TaxReturnFormProps {
  onSubmit: (___data: TaxReturnData) => Promise<void>;
  onSaveDraft: (___data: TaxReturnData) => Promise<void>;
  initialData?: Partial<TaxReturnData>;
}

export default function TaxReturnForm({ onSubmit, onSaveDraft, initialData }: TaxReturnFormProps): void {
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedTax, setCalculatedTax] = useState<any>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TaxReturnData>({
    resolver: zodResolver(taxReturnSchema),
    defaultValues: initialData,
  });

  const watchDeductionType = watch('deductions.type');
  const watchIncome = watch('income');

  const calculateTax = async (___data: TaxReturnData) => {
    setIsCalculating(true);
    try {
      const taxCalculator = new TaxCalculator();
      const taxableIncome: TaxableIncome = {
        employment: data.income.wages,
        selfEmployment: data.income.selfEmployment,
        investment:
          data.income.investments.dividends +
          data.income.investments.interest +
          data.income.investments.capitalGains,
        rental: data.income.rental,
        pension: data.income.retirement,
        rrsp: 0,
        foreign: 0,
        other: data.income.otherIncome,
      };

      const deductions: Deductions = {
        rrspContributions: 0,
        unionDues: 0,
        movingExpenses: 0,
        childcareExpenses: 0,
        medicalExpenses: data.deductions.itemized?.medicalExpenses || 0,
        charitableDonations: data.deductions.itemized?.charitableContributions || 0,
        studentLoanInterest: 0,
        homeOffice: 0,
        selfEmploymentExpenses: 0,
        mortgageInterest: data.deductions.itemized?.mortgageInterest || 0,
        propertyTax: data.deductions.itemized?.propertyTax || 0,
        foreignTuition: 0,
        childcare: 0,
        workFromHome: 0,
        capitalLosses: 0,
        carryForwardLosses: 0,
        other: data.deductions.itemized?.otherDeductions || 0,
      };

      const credits: Credits = {
        basicPersonal: 13808, // 2024 Basic Personal Amount
        age: 0,
        spouse: 0,
        eligible_dependant: 0,
        caregiver_amount: 0,
        caregiver: 0,
        pension: 0,
        disability: 0,
        education: 0,
        tuition: 0,
        medical: 0,
        donations: 0,
        other: 0,
      };

      const result = taxCalculator.calculateTax(taxableIncome, deductions, credits, 'ON');
      setCalculatedTax(result);
    } catch (error) {
      console.error('Error calculating tax:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleFormSubmit = async (___data: TaxReturnData) => {
    await calculateTax(data);
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Personal Information */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="personalInfo.firstName"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" {...field} className="w-full px-3 py-2 border rounded-md" />
                {errors.personalInfo?.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.personalInfo.firstName.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="personalInfo.lastName"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" {...field} className="w-full px-3 py-2 border rounded-md" />
                {errors.personalInfo?.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.personalInfo.lastName.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="personalInfo.ssn"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Social Security Number
                </label>
                <input
                  type="text"
                  {...field}
                  placeholder="XXX-XX-XXXX"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.personalInfo?.ssn && (
                  <p className="mt-1 text-sm text-red-600">{errors.personalInfo.ssn.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="personalInfo.filingStatus"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filing Status
                </label>
                <select {...field} className="w-full px-3 py-2 border rounded-md">
                  <option value="single">Single</option>
                  <option value="married_joint">Married Filing Jointly</option>
                  <option value="married_separate">Married Filing Separately</option>
                  <option value="head_household">Head of Household</option>
                </select>
                {errors.personalInfo?.filingStatus && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.personalInfo.filingStatus.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </section>

      {/* Income Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Income</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="income.wages"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wages (W-2)</label>
                <input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(___e) => field.onChange(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.income?.wages && (
                  <p className="mt-1 text-sm text-red-600">{errors.income.wages.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="income.selfEmployment"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Self-Employment Income
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(___e) => field.onChange(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.income?.selfEmployment && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.income.selfEmployment.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="income.investments.dividends"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dividend Income
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(___e) => field.onChange(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.income?.investments?.dividends && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.income.investments.dividends.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </section>

      {/* Deductions Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Deductions</h2>
        <div className="space-y-6">
          <Controller
            name="deductions.type"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Deduction Type
                </label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" {...field} value="standard" className="form-radio" />
                    <span className="ml-2">Standard Deduction</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" {...field} value="itemized" className="form-radio" />
                    <span className="ml-2">Itemized Deductions</span>
                  </label>
                </div>
              </div>
            )}
          />

          {watchDeductionType === 'itemized' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="deductions.itemized.mortgageInterest"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mortgage Interest
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(___e) => field.onChange(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                )}
              />

              <Controller
                name="deductions.itemized.charitableContributions"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Charitable Contributions
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(___e) => field.onChange(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                )}
              />
            </div>
          )}
        </div>
      </section>

      {/* Document Upload */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Documents</h2>
        <DocumentUpload
          onUpload={(files: File[]) => {
            const documents = files.map((___file: File) => ({
              type: 'OTHER' as const,
              file,
              description: file.name,
            }));
            setValue('documents', documents);
          }}
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
        />
      </section>

      {/* Tax Calculation Results */}
      {calculatedTax && (
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-6">Tax Calculation</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Income:</span>
              <span>${calculatedTax.totalIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxable Income:</span>
              <span>${calculatedTax.taxableIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Federal Tax:</span>
              <span>${calculatedTax.federalTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Provincial Tax:</span>
              <span>${calculatedTax.provincialTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Tax:</span>
              <span>${calculatedTax.totalTax.toLocaleString()}</span>
            </div>
          </div>
        </section>
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="secondary" onClick={() => onSaveDraft(watch())} disabled={isSubmitting}>
          Save Draft
        </Button>
        <Button variant="primary" type="submit" loading={isSubmitting || isCalculating}>
          {isCalculating ? 'Calculating...' : 'Submit Return'}
        </Button>
      </div>
    </form>
  );
}
