import React, { useEffect, useState } from 'react'
import { Clock, Save, X } from 'lucide-react'

interface SaveResumeBannerProps {
  hasUnsavedChanges: boolean
  lastSaved: Date | null
  onSave: () => void
  onDismiss?: () => void
  autoHide?: boolean
}

export default function SaveResumeBanner({
  hasUnsavedChanges,
  lastSaved,
  onSave,
  onDismiss,
  autoHide = true
}: SaveResumeBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [timeSinceLastSave, setTimeSinceLastSave] = useState<string>('')

  // Update time since last save
  useEffect(() => {
    if (!lastSaved) return

    const updateTime = () => {
      const now = new Date()
      const diff = now.getTime() - lastSaved.getTime()
      const minutes = Math.floor(diff / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)

      if (minutes > 0) {
        setTimeSinceLastSave(`${minutes}m ${seconds}s ago`)
      } else {
        setTimeSinceLastSave(`${seconds}s ago`)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [lastSaved])

  // Auto-hide after successful save
  useEffect(() => {
    if (autoHide && !hasUnsavedChanges && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [hasUnsavedChanges, isVisible, autoHide])

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      hasUnsavedChanges ? 'animate-bounce' : ''
    }`}>
      <div className={`bg-white rounded-lg shadow-lg border p-4 max-w-sm ${
        hasUnsavedChanges ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            {hasUnsavedChanges ? (
              <Clock className="h-5 w-5 text-orange-600 mr-3" />
            ) : (
              <Save className="h-5 w-5 text-green-600 mr-3" />
            )}
            <div>
              <h3 className={`font-medium ${
                hasUnsavedChanges ? 'text-orange-900' : 'text-green-900'
              }`}>
                {hasUnsavedChanges ? 'Unsaved Changes' : 'Progress Saved'}
              </h3>
              <p className={`text-sm ${
                hasUnsavedChanges ? 'text-orange-700' : 'text-green-700'
              }`}>
                {hasUnsavedChanges
                  ? 'Your changes will be auto-saved in 30 seconds'
                  : `Last saved ${timeSinceLastSave}`
                }
              </p>
            </div>
          </div>
          {onDismiss && (
            <button
              onClick={() => {
                setIsVisible(false)
                onDismiss()
              }}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {hasUnsavedChanges && (
          <div className="mt-3 flex gap-2">
            <button
              onClick={onSave}
              className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-1 px-3 rounded-md transition-colors"
            >
              Save Now
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-orange-700 hover:text-orange-900 text-sm font-medium py-1 px-3 rounded-md transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Resume banner for when user returns to incomplete filing
export function ResumeBanner({ onResume, onStartNew }: {
  onResume: () => void
  onStartNew: () => void
}) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-blue-600 mr-3" />
          <div>
            <h3 className="font-medium text-blue-900">Continue Your Tax Return</h3>
            <p className="text-sm text-blue-700">
              You have an incomplete tax return. Would you like to continue where you left off?
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onResume}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
          >
            Resume Filing
          </button>
          <button
            onClick={onStartNew}
            className="text-blue-700 hover:text-blue-900 text-sm font-medium py-2 px-4 rounded-md border border-blue-300 hover:border-blue-400 transition-colors"
          >
            Start New
          </button>
        </div>
      </div>
    </div>
  )
}