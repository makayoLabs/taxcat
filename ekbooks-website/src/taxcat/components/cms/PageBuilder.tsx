'use client';

import React from 'react';

interface PageBuilderProps {
  isEditMode?: boolean;
  children?: React.ReactNode;
}

const PageBuilder: React.FC<PageBuilderProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Page Builder</h1>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">Page builder functionality coming soon!</p>
            {children && (
              <div className="mt-4">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBuilder;