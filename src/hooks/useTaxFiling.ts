import { useState, useEffect, useCallback } from 'react'

export interface PersonalInfo {
  firstName: string
  lastName: string
  dateOfBirth: string
  sin: string
  filingStatus: string
  province: string
  email: string
  phone: string
}

export interface IncomeData {
  employmentIncome: number
  cppContributions: number
  eiPremiums: number
  incomeTaxWithheld: number
  businessRevenue: number
  businessExpenses: number
  interestIncome: number
  dividendIncome: number
  capitalGains: number
  capitalLosses: number
  pensions: number
  rentalIncome: number
  otherIncome: number
}

export interface DeductionData {
  rrspContribution: number
  rrspLoanRepayment: number
  medicalExpenses: number
  medicalExpenseCredit: number
  cashDonations: number
  nonCashDonations: number
  homeOfficeSqFt: number
  homeSizeSqFt: number
  homeOfficeExpenses: number
  carryingCharges: number
  movingExpenses: number
  politicalContributions: number
  cppContributions: number
  tuitionEducation: number
  canadaWorkersBenefit: number
  gstHstCredit: number
}

export interface TaxFilingData {
  personalInfo: PersonalInfo
  incomeData: IncomeData
  deductionData: DeductionData
  currentStep: number
  lastSaved: Date | null
  isComplete: boolean
}

const STORAGE_KEY = 'taxcat-filing-data'
const AUTO_SAVE_INTERVAL = 30000 // 30 seconds

const defaultData: TaxFilingData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    sin: '',
    filingStatus: '',
    province: 'ON',
    email: '',
    phone: ''
  },
  incomeData: {
    employmentIncome: 0,
    cppContributions: 0,
    eiPremiums: 0,
    incomeTaxWithheld: 0,
    businessRevenue: 0,
    businessExpenses: 0,
    interestIncome: 0,
    dividendIncome: 0,
    capitalGains: 0,
    capitalLosses: 0,
    pensions: 0,
    rentalIncome: 0,
    otherIncome: 0
  },
  deductionData: {
    rrspContribution: 0,
    rrspLoanRepayment: 0,
    medicalExpenses: 0,
    medicalExpenseCredit: 0,
    cashDonations: 0,
    nonCashDonations: 0,
    homeOfficeSqFt: 0,
    homeSizeSqFt: 0,
    homeOfficeExpenses: 0,
    carryingCharges: 0,
    movingExpenses: 0,
    politicalContributions: 0,
    cppContributions: 0,
    tuitionEducation: 0,
    canadaWorkersBenefit: 0,
    gstHstCredit: 0
  },
  currentStep: 1,
  lastSaved: null,
  isComplete: false
}

export function useTaxFiling() {
  const [data, setData] = useState<TaxFilingData>(defaultData)
  const [isLoading, setIsLoading] = useState(true)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsedData = JSON.parse(saved)
        // Convert lastSaved back to Date object
        if (parsedData.lastSaved) {
          parsedData.lastSaved = new Date(parsedData.lastSaved)
        }
        setData(parsedData)
      }
    } catch (error) {
      console.error('Failed to load tax filing data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Auto-save functionality
  useEffect(() => {
    if (isLoading) return

    const interval = setInterval(() => {
      if (hasUnsavedChanges) {
        saveData()
      }
    }, AUTO_SAVE_INTERVAL)

    return () => clearInterval(interval)
  }, [isLoading, hasUnsavedChanges])

  // Save data to localStorage
  const saveData = useCallback(async () => {
    try {
      const dataToSave = {
        ...data,
        lastSaved: new Date()
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
      setData(prev => ({ ...prev, lastSaved: new Date() }))
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('Failed to save tax filing data:', error)
    }
  }, [data])

  // Update personal info
  const updatePersonalInfo = useCallback((updates: Partial<PersonalInfo>) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...updates }
    }))
    setHasUnsavedChanges(true)
  }, [])

  // Update income data
  const updateIncomeData = useCallback((updates: Partial<IncomeData>) => {
    setData(prev => ({
      ...prev,
      incomeData: { ...prev.incomeData, ...updates }
    }))
    setHasUnsavedChanges(true)
  }, [])

  // Update deduction data
  const updateDeductionData = useCallback((updates: Partial<DeductionData>) => {
    setData(prev => ({
      ...prev,
      deductionData: { ...prev.deductionData, ...updates }
    }))
    setHasUnsavedChanges(true)
  }, [])

  // Update current step
  const setCurrentStep = useCallback((step: number) => {
    setData(prev => ({ ...prev, currentStep: step }))
    setHasUnsavedChanges(true)
  }, [])

  // Mark as complete
  const markComplete = useCallback(() => {
    setData(prev => ({ ...prev, isComplete: true }))
    setHasUnsavedChanges(true)
  }, [])

  // Reset/clear all data
  const resetData = useCallback(() => {
    setData(defaultData)
    localStorage.removeItem(STORAGE_KEY)
    setHasUnsavedChanges(false)
  }, [])

  // Export data for submission
  const exportData = useCallback(() => {
    return {
      ...data,
      exportedAt: new Date()
    }
  }, [data])

  // Check if step is valid for progression
  const isStepValid = useCallback((step: number): boolean => {
    switch (step) {
      case 1: // Account Setup
        const { firstName, lastName, dateOfBirth, sin, filingStatus, province, email } = data.personalInfo
        return !!(firstName && lastName && dateOfBirth && sin && filingStatus && province && email)

      case 2: // Income
        return data.incomeData.employmentIncome > 0 || data.incomeData.businessRevenue > 0

      case 3: // Deductions
        return true // Deductions are optional

      case 4: // Review
        return true // Review step is always valid

      case 5: // Documents
        return true // Documents step is always valid

      case 6: // Final
        return true // Final step is always valid

      default:
        return false
    }
  }, [data])

  // Get progress percentage
  const getProgressPercentage = useCallback((): number => {
    const totalSteps = 6
    const completedSteps = Math.min(data.currentStep, totalSteps)
    return Math.round((completedSteps / totalSteps) * 100)
  }, [data.currentStep])

  return {
    data,
    isLoading,
    hasUnsavedChanges,
    updatePersonalInfo,
    updateIncomeData,
    updateDeductionData,
    setCurrentStep,
    markComplete,
    saveData,
    resetData,
    exportData,
    isStepValid,
    getProgressPercentage
  }
}