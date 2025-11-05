import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ message = 'Something went wrong', onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <div className="text-taxcat-warning">
        <AlertTriangle className="w-12 h-12" />
      </div>
      <p className="mt-4 text-taxcat-gray font-medium text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-taxcat-blue text-white rounded-md hover:bg-taxcat-blue/90 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
