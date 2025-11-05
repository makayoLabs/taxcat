'use client';

import { useRouter } from 'next/navigation';

export default function DocumentUploadPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h1>
          <p className="text-gray-600">
            Document upload functionality is currently under development. This feature will be available in a future update.
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="/documents"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Documents
          </a>
          <a
            href="/dashboard"
            className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Coming Soon: Drag-and-drop file upload, document management, and secure file storage.</p>
        </div>
      </div>
    </div>
  );
}
