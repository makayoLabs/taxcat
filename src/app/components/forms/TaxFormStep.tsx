import React from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'

interface TaxFormStepProps {
  title: string
  description?: string
  children: React.ReactNode
  currentStep: number
  totalSteps: number
  onNext?: () => void
  onPrevious?: () => void
  nextLabel?: string
  previousLabel?: string
  canProceed?: boolean
  isLoading?: boolean
}

export default function TaxFormStep({
  title,
  description,
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  nextLabel = "Continue",
  previousLabel = "Back",
  canProceed = true,
  isLoading = false
}: TaxFormStepProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="container-max py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {Array.from({ length: totalSteps }, (_, i) => {
                const stepNumber = i + 1
                const isCompleted = stepNumber < currentStep
                const isCurrent = stepNumber === currentStep

                return (
                  <React.Fragment key={stepNumber}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : isCurrent
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-300 text-gray-600'
                      }`}>
                        {isCompleted ? '✓' : stepNumber}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {stepNumber === 1 && 'Account Setup'}
                        {stepNumber === 2 && 'Income'}
                        {stepNumber === 3 && 'Deductions'}
                        {stepNumber === 4 && 'Review'}
                        {stepNumber === 5 && 'Documents'}
                        {stepNumber === 6 && 'Final Review'}
                      </span>
                    </div>
                    {stepNumber < totalSteps && (
                      <div className={`w-16 h-px ${
                        isCompleted ? 'bg-green-600' : isCurrent ? 'bg-blue-600' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
            {description && (
              <p className="text-lg text-gray-600">{description}</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            {children}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            {onPrevious && (
              <button
                onClick={onPrevious}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {previousLabel}
              </button>
            )}

            <div className="flex gap-4 ml-auto">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Save & Continue Later
              </button>
              {onNext && (
                <button
                  onClick={onNext}
                  disabled={!canProceed || isLoading}
                  className={`font-semibold py-2 px-6 rounded-md flex items-center gap-2 transition-colors ${
                    canProceed && !isLoading
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      {nextLabel}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}