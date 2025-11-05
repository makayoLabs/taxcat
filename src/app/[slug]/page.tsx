'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import useCMSStore from '@/store/cmsStore';
import { ContentBlock } from '@/types/cms';

// Temporary simplified version to fix build errors
// TODO: Implement full CMS functionality

export default function DynamicPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <div className="w-16 h-16 bg-taxcat-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Management System</h1>
          <p className="text-gray-600">
            The CMS functionality is currently under development. This page will be available in a future update.
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="/"
            className="block w-full bg-taxcat-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </a>
          <a
            href="/dashboard"
            className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Coming Soon: Dynamic page building, content management, and customizable layouts.</p>
        </div>
      </div>
    </div>
  );
}
