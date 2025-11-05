'use client';

import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">CMS Dashboard</h1>
          <p className="text-gray-600">
            The Content Management System is currently under development. This feature will be available in a future update.
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="/"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </a>
          <a
            href="/dashboard"
            className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Go to Tax Dashboard
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Coming Soon: Drag-and-drop page builder, content management, and customizable layouts.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
