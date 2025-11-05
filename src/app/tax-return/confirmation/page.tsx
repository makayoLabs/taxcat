'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function ConfirmationPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tax Return Filed Successfully!</h1>

          <p className="text-lg text-gray-600 mb-8">
            Your tax return has been submitted and your payment has been processed. You will receive
            a confirmation email shortly with additional details.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">What's Next?</h2>
            <ul className="text-left space-y-3">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Check your email for a detailed confirmation of your tax return</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Track the status of your return in your dashboard</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Expect updates about your refund status (if applicable)</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => router.push('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Go to Dashboard
            </Button>
            <Button onClick={() => router.push('/documents')} variant="outline">
              View Documents
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
