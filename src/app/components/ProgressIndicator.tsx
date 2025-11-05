import React from 'react'
import { CheckCircle, Circle } from 'lucide-react'

interface Step {
  id: string
  title: string
  description?: string
  completed: boolean
  current?: boolean
}

interface ProgressIndicatorProps {
  steps: Step[]
  className?: string
}

export default function ProgressIndicator({ steps, className = '' }: ProgressIndicatorProps) {
  return (
    <div className={`bg-white border-b ${className}`}>
      <div className="container-max py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {steps.map((step, index) => {
              const isCompleted = step.completed
              const isCurrent = step.current
              const isLast = index === steps.length - 1

              return (
                <React.Fragment key={step.id}>
                  <div className="flex items-center min-w-max">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : isCurrent
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-300 text-gray-600'
                      }`}>
                        {isCompleted ? <CheckCircle className="h-4 w-4" /> : (index + 1)}
                      </div>
                      <div className="ml-2">
                        <span className={`text-sm font-medium ${
                          isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {step.title}
                        </span>
                        {step.description && (
                          <p className="text-xs text-gray-500">{step.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {!isLast && (
                    <div className={`w-16 h-px mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-300'
                    }`}></div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// Alternative horizontal layout for sidebar or compact spaces
export function ProgressIndicatorVertical({ steps, className = '' }: ProgressIndicatorProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = step.completed
        const isCurrent = step.current

        return (
          <div key={step.id} className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                isCompleted
                  ? 'bg-green-600 text-white'
                  : isCurrent
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-600'
              }`}>
                {isCompleted ? <CheckCircle className="h-4 w-4" /> : (index + 1)}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-px h-8 mt-2 ${
                  isCompleted ? 'bg-green-600' : 'bg-gray-300'
                }`}></div>
              )}
            </div>
            <div className="flex-1 pt-1">
              <h3 className={`font-medium ${
                isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {step.title}
              </h3>
              {step.description && (
                <p className={`text-sm mt-1 ${
                  isCompleted || isCurrent ? 'text-gray-700' : 'text-gray-500'
                }`}>
                  {step.description}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Circular progress indicator for dashboard cards
export function ProgressCircle({ progress, size = 80, strokeWidth = 8, className = '' }: {
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  className?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={`relative ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold text-gray-900">{progress}%</span>
      </div>
    </div>
  )
}