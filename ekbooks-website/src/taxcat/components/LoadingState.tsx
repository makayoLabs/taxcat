import React from 'react';

const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-taxcat-blue/20 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-taxcat-blue rounded-full border-t-transparent animate-spin absolute top-0"></div>
      </div>
      <p className="mt-4 text-taxcat-gray font-medium">{message}</p>
    </div>
  );
};

export default LoadingState;
