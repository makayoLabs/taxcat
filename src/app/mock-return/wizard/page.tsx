'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Save, FileText } from 'lucide-react';
import {
  calculateTotalTax,
  calculateCPPContribution,
  calculateEIContribution,
  BASIC_PERSONAL_AMOUNT,
  CANADA_EMPLOYMENT_AMOUNT,
  PROVINCES,
  PROVINCE_NAMES,
  formatCurrency,
  formatPercentage
} from '@/lib/cra';

interface MockReturnData {
  // Step 1: Personal Info
  firstName: string;
  lastName: string;
  sin: string;
  dateOfBirth: string;
  filingStatus: 'single' | 'married' | 'common-law' | 'divorced' | 'widowed';
  spouseFirstName: string;
  spouseSIN: string;
  numberOfDependents: number;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  
  // Step 2: Income
  employmentIncome: number;
  selfEmploymentIncome: number;
  investmentIncome: number;
  otherIncome: number;
  
  // Step 3: Deductions
  rrspContributions: number;
  unionDues: number;
  childcareExpenses: number;
  movingExpenses: number;
  
  // Step 4: Credits
  medicalExpenses: number;
  donations: number;
  tuitionFees: number;
  publicTransit: number;
  
  // Step 5: Tax Paid
  taxDeducted: number;
}

const TOTAL_STEPS = 6;

export default function MockReturnWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<MockReturnData>({
    firstName: '',
    lastName: '',
    sin: '',
    dateOfBirth: '',
    filingStatus: 'single',
    spouseFirstName: '',
    spouseSIN: '',
    numberOfDependents: 0,
    address: '',
    city: '',
    province: 'ON',
    postalCode: '',
    phone: '',
    email: '',
    employmentIncome: 0,
    selfEmploymentIncome: 0,
    investmentIncome: 0,
    otherIncome: 0,
    rrspContributions: 0,
    unionDues: 0,
    childcareExpenses: 0,
    movingExpenses: 0,
    medicalExpenses: 0,
    donations: 0,
    tuitionFees: 0,
    publicTransit: 0,
    taxDeducted: 0
  });

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mockReturn');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed.data);
        setCurrentStep(parsed.step);
      } catch (e) {
        console.error('Failed to load saved data');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mockReturn', JSON.stringify({ data, step: currentStep }));
  }, [data, currentStep]);

  const updateData = (field: keyof MockReturnData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const loadSampleData = () => {
    setData({
      firstName: 'Alex',
      lastName: 'Sample',
      sin: '123-456-789',
      dateOfBirth: '1995-06-15',
      filingStatus: 'single',
      spouseFirstName: '',
      spouseSIN: '',
      numberOfDependents: 0,
      address: '123 Main Street',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5V 3A8',
      phone: '416-555-0123',
      email: 'alex.sample@example.com',
      employmentIncome: 65000,
      selfEmploymentIncome: 0,
      investmentIncome: 1500,
      otherIncome: 0,
      rrspContributions: 5000,
      unionDues: 500,
      childcareExpenses: 0,
      movingExpenses: 0,
      medicalExpenses: 800,
      donations: 500,
      tuitionFees: 0,
      publicTransit: 1200,
      taxDeducted: 13000
    });
  };

  // Calculate results
  const totalIncome = data.employmentIncome + data.selfEmploymentIncome + 
                      data.investmentIncome + data.otherIncome;
  const totalDeductions = data.rrspContributions + data.unionDues + 
                          data.childcareExpenses + data.movingExpenses;
  const taxableIncome = Math.max(totalIncome - totalDeductions, 0);
  
  const taxInfo = calculateTotalTax(taxableIncome, data.province);
  
  const basicPersonalCredit = BASIC_PERSONAL_AMOUNT * 0.15;
  const employmentCredit = Math.min(data.employmentIncome, CANADA_EMPLOYMENT_AMOUNT) * 0.15;
  const donationCredit = data.donations * 0.15;
  const tuitionCredit = data.tuitionFees * 0.15;
  const medicalCredit = Math.max(data.medicalExpenses - (taxableIncome * 0.03), 0) * 0.15;
  const transitCredit = data.publicTransit * 0.15;
  
  const totalCredits = basicPersonalCredit + employmentCredit + donationCredit + 
                       tuitionCredit + medicalCredit + transitCredit;
  
  const netFederalTax = Math.max(taxInfo.federalTax - totalCredits, 0);
  const netTotalTax = netFederalTax + taxInfo.provincialTax;
  const refundOrOwing = data.taxDeducted - netTotalTax;
  const isRefund = refundOrOwing > 0;

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Disclaimer Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
          <p className="text-sm font-semibold text-yellow-900">
            ⚠️ PRACTICE ONLY - This is NOT a real tax return and will NOT be submitted to the CRA
          </p>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Practice Tax Return Wizard
          </h1>
          <p className="text-gray-600">
            Complete all steps to practice filing a Canadian tax return
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <button
              onClick={loadSampleData}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Load Sample Data
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {['Personal', 'Income', 'Deductions', 'Credits', 'Tax Paid', 'Results'].map((label, index) => {
              const stepNum = index + 1;
              const isActive = stepNum === currentStep;
              const isComplete = stepNum < currentStep;
              
              return (
                <button
                  key={stepNum}
                  onClick={() => goToStep(stepNum)}
                  className={`flex-1 text-xs md:text-sm font-medium py-2 px-1 transition-colors ${
                    isActive ? 'text-blue-600 font-bold' :
                    isComplete ? 'text-green-600' :
                    'text-gray-400'
                  }`}
                >
                  {isComplete && '✓ '}{label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 min-h-[500px]">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
              <p className="text-gray-600 mb-6">Enter your personal details (you can use made-up information)</p>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={data.firstName}
                      onChange={(e) => updateData('firstName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={data.lastName}
                      onChange={(e) => updateData('lastName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Social Insurance Number (Simulated) *
                    </label>
                    <input
                      type="text"
                      value={data.sin}
                      onChange={(e) => updateData('sin', e.target.value)}
                      placeholder="123-456-789"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      pattern="\d{3}-\d{3}-\d{3}"
                    />
                    <p className="mt-1 text-xs text-gray-500">Format: XXX-XXX-XXX (practice only)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={data.dateOfBirth}
                      onChange={(e) => updateData('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marital Status *
                  </label>
                  <select
                    value={data.filingStatus}
                    onChange={(e) => updateData('filingStatus', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="common-law">Common-law</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>

                {(data.filingStatus === 'married' || data.filingStatus === 'common-law') && (
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Spouse's First Name
                      </label>
                      <input
                        type="text"
                        value={data.spouseFirstName}
                        onChange={(e) => updateData('spouseFirstName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Spouse's SIN (Simulated)
                      </label>
                      <input
                        type="text"
                        value={data.spouseSIN}
                        onChange={(e) => updateData('spouseSIN', e.target.value)}
                        placeholder="123-456-789"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Dependents
                  </label>
                  <input
                    type="number"
                    value={data.numberOfDependents}
                    onChange={(e) => updateData('numberOfDependents', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="10"
                  />
                  <p className="mt-1 text-xs text-gray-500">Children under 18 or other dependents</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={data.address}
                    onChange={(e) => updateData('address', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={data.city}
                      onChange={(e) => updateData('city', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province *
                    </label>
                    <select
                      value={data.province}
                      onChange={(e) => updateData('province', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {PROVINCES.map((prov) => (
                        <option key={prov} value={prov}>
                          {PROVINCE_NAMES[prov]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={data.postalCode}
                      onChange={(e) => updateData('postalCode', e.target.value.toUpperCase())}
                      placeholder="A1A 1A1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      pattern="[A-Z]\d[A-Z] \d[A-Z]\d"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => updateData('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => updateData('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Income */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Income</h2>
              <p className="text-gray-600 mb-6">Enter all sources of income for 2025</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Income (T4) 💼
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.employmentIncome}
                      onChange={(e) => updateData('employmentIncome', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Box 14 on your T4 slip from your employer</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Self-Employment Income (Net) 💼
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.selfEmploymentIncome}
                      onChange={(e) => updateData('selfEmploymentIncome', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Business income after expenses</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Income (T5) 📈
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.investmentIncome}
                      onChange={(e) => updateData('investmentIncome', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Interest, dividends, capital gains from T5 slips</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Income 📋
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.otherIncome}
                      onChange={(e) => updateData('otherIncome', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">EI benefits, pension, rental income, etc.</p>
                </div>

                <div className="pt-4 border-t bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Income:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatCurrency(totalIncome)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Deductions */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Deductions</h2>
              <p className="text-gray-600 mb-6">Enter deductions that reduce your taxable income</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RRSP Contributions 🏦
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.rrspContributions}
                      onChange={(e) => updateData('rrspContributions', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Contributions made in 2025 or first 60 days of 2026</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Union or Professional Dues 👔
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.unionDues}
                      onChange={(e) => updateData('unionDues', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Annual dues paid to union or professional association</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Childcare Expenses 👶
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.childcareExpenses}
                      onChange={(e) => updateData('childcareExpenses', Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Eligible childcare expenses</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Moving Expenses 🚚
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.movingExpenses}
                      onChange={(e) => updateData('movingExpenses', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">If you moved 40km+ for work or school</p>
                </div>

                <div className="pt-4 border-t bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Deductions:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatCurrency(totalDeductions)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-green-200">
                    <span className="text-sm text-gray-700">Taxable Income:</span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(taxableIncome)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Tax Credits */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Tax Credits</h2>
              <p className="text-gray-600 mb-6">Enter expenses that provide tax credits</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Expenses 🏥
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.medicalExpenses}
                      onChange={(e) => updateData('medicalExpenses', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Must exceed 3% of income ({formatCurrency(taxableIncome * 0.03)}) or $2,759
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Charitable Donations ❤️
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.donations}
                      onChange={(e) => updateData('donations', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Donations to registered charities</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tuition Fees 🎓
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.tuitionFees}
                      onChange={(e) => updateData('tuitionFees', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Post-secondary tuition fees</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Public Transit Passes 🚇
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.publicTransit}
                      onChange={(e) => updateData('publicTransit', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Monthly or annual transit passes</p>
                </div>

                <div className="pt-4 border-t bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-700 mb-2">
                    <strong>Automatic Credits Applied:</strong>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4">
                    <li>• Basic Personal Amount: {formatCurrency(basicPersonalCredit)}</li>
                    <li>• Canada Employment Amount: {formatCurrency(employmentCredit)}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Tax Paid */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Tax Already Paid</h2>
              <p className="text-gray-600 mb-6">Enter tax deducted from your paycheques</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Income Tax Deducted 💵
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      value={data.taxDeducted}
                      onChange={(e) => updateData('taxDeducted', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Box 22 on your T4 slip (total tax deducted at source)
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 Where to Find This</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Look at your T4 slip from your employer. Box 22 shows the total income tax
                    deducted from your paycheques throughout the year.
                  </p>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Quick Estimate:</div>
                    <div className="text-sm">
                      If you earned {formatCurrency(data.employmentIncome)}, you likely had about{' '}
                      <strong className="text-blue-600">
                        {formatCurrency(data.employmentIncome * 0.20)}
                      </strong> deducted (rough estimate)
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-700 mb-2">Current Estimate:</div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">
                        {isRefund ? 'Estimated Refund:' : 'Estimated Owing:'}
                      </span>
                      <span className={`text-2xl font-bold ${isRefund ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(Math.abs(refundOrOwing))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Results */}
          {currentStep === 6 && (
            <div>
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Practice Return Complete!
                </h2>
                <p className="text-gray-600">
                  Here's what your tax return would look like
                </p>
              </div>

              {/* Final Result */}
              <div className={`rounded-lg p-8 mb-6 text-white text-center ${
                isRefund 
                  ? 'bg-gradient-to-br from-green-500 to-green-600' 
                  : 'bg-gradient-to-br from-red-500 to-red-600'
              }`}>
                <div className="text-sm opacity-90 mb-2">
                  {isRefund ? 'Your Estimated Refund' : 'Estimated Amount Owing'}
                </div>
                <div className="text-6xl font-bold mb-4">
                  {formatCurrency(Math.abs(refundOrOwing))}
                </div>
                <p className="text-lg opacity-90">
                  {isRefund 
                    ? '🎉 You would receive a refund!' 
                    : '⚠️ You would owe additional tax'
                  }
                </p>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Complete Tax Calculation</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between font-semibold text-gray-900 pb-2 border-b-2">
                    <span>INCOME</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employment Income:</span>
                    <span>{formatCurrency(data.employmentIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Self-Employment Income:</span>
                    <span>{formatCurrency(data.selfEmploymentIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Income:</span>
                    <span>{formatCurrency(data.investmentIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Other Income:</span>
                    <span>{formatCurrency(data.otherIncome)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total Income:</span>
                    <span>{formatCurrency(totalIncome)}</span>
                  </div>

                  <div className="flex justify-between font-semibold text-gray-900 pb-2 border-b-2 mt-4">
                    <span>DEDUCTIONS</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RRSP Contributions:</span>
                    <span className="text-green-600">-{formatCurrency(data.rrspContributions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Union Dues:</span>
                    <span className="text-green-600">-{formatCurrency(data.unionDues)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Childcare:</span>
                    <span className="text-green-600">-{formatCurrency(data.childcareExpenses)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Moving:</span>
                    <span className="text-green-600">-{formatCurrency(data.movingExpenses)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Taxable Income:</span>
                    <span>{formatCurrency(taxableIncome)}</span>
                  </div>

                  <div className="flex justify-between font-semibold text-gray-900 pb-2 border-b-2 mt-4">
                    <span>TAX CALCULATION</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Federal Tax:</span>
                    <span>{formatCurrency(taxInfo.federalTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provincial Tax ({PROVINCE_NAMES[data.province]}):</span>
                    <span>{formatCurrency(taxInfo.provincialTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Credits:</span>
                    <span className="text-green-600">-{formatCurrency(totalCredits)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Net Tax Owing:</span>
                    <span>{formatCurrency(netTotalTax)}</span>
                  </div>

                  <div className="flex justify-between font-semibold text-gray-900 pb-2 border-b-2 mt-4">
                    <span>FINAL CALCULATION</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Owing:</span>
                    <span>{formatCurrency(netTotalTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Already Paid:</span>
                    <span className="text-green-600">-{formatCurrency(data.taxDeducted)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t-2">
                    <span>{isRefund ? 'REFUND:' : 'AMOUNT OWING:'}</span>
                    <span className={isRefund ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(Math.abs(refundOrOwing))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-lg p-6 mt-6">
                <h3 className="font-bold text-gray-900 mb-3">📚 What You Learned</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✓ How to gather and organize tax documents</li>
                  <li>✓ How to report different types of income</li>
                  <li>✓ Which deductions and credits you may qualify for</li>
                  <li>✓ How tax is calculated in Canada</li>
                  <li>✓ What a completed tax return looks like</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => {
                    localStorage.removeItem('mockReturn');
                    window.location.reload();
                  }}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start New Practice Return
                </button>
                
                <button
                  onClick={() => window.print()}
                  className="w-full px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Print Summary
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <div className="text-sm text-gray-600">
            Auto-saved <Save className="w-4 h-4 inline" />
          </div>

          {currentStep < TOTAL_STEPS ? (
            <button
              onClick={nextStep}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={() => goToStep(1)}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Start Over
            </button>
          )}
        </div>

        {/* Quick Summary (always visible except on results) */}
        {currentStep < 6 && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700">Current Estimate:</span>
              <span className={`font-bold text-lg ${isRefund ? 'text-green-600' : 'text-red-600'}`}>
                {isRefund ? 'Refund: ' : 'Owing: '}
                {formatCurrency(Math.abs(refundOrOwing))}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}