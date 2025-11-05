'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, FileText } from 'lucide-react';

interface TaxReturn {
  id: string;
  year: number;
  filingStatus: string;
  status: string;
  type: string;
  totalIncome: number;
  refundAmount: number;
  balanceOwing: number;
  createdAt: string;
  updatedAt: string;
}

export default function TaxReturnPage(): JSX.Element {
  const [taxReturns, setTaxReturns] = useState<TaxReturn[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tax Returns</h1>
              <p className="text-gray-600 mt-2">
                Manage your tax returns and stay organized throughout the year.
              </p>
            </div>
            <Link
              href="/tax-return/new"
              className="flex items-center px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Start New Return
            </Link>
          </div>
        </div>

        {/* Tax Returns List */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
              <p className="mt-2 text-gray-600">Loading your tax returns...</p>
            </div>
          ) : taxReturns.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tax returns yet
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by creating your first tax return for the current tax year.
              </p>
              <Link
                href="/tax-return/new"
                className="inline-flex items-center px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Start Tax Return
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {taxReturns.map((_taxReturn) => (
                <div key={taxReturn.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 bg-primary-blue rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {taxReturn.year} Tax Return
                          </h3>
                          <p className="text-sm text-gray-600">
                            Status: <span className={`font-medium ${
                              taxReturn.status === 'COMPLETED' ? 'text-green-600' :
                              taxReturn.status === 'IN_PROGRESS' ? 'text-blue-600' :
                              taxReturn.status === 'DRAFT' ? 'text-gray-600' :
                              'text-red-600'
                            }`}>
                              {taxReturn.status.replace('_', ' ')}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Filing Status: {taxReturn.filingStatus.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Income</p>
                        <p className="text-lg font-medium text-gray-900">
                          ${taxReturn.totalIncome.toLocaleString()}
                        </p>
                        {taxReturn.refundAmount > 0 ? (
                          <p className="text-sm text-green-600">
                            Refund: ${taxReturn.refundAmount.toLocaleString()}
                          </p>
                        ) : (
                          <p className="text-sm text-red-600">
                            Balance: ${Math.abs(taxReturn.balanceOwing).toLocaleString()}
                          </p>
                        )}
                      </div>
                      <Link
                        href={`/tax-return/new/${taxReturn.id}`}
                        className="text-primary-blue hover:text-blue-700 font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              Get assistance with your tax preparation or filing
            </p>
            <Link
              href="/support"
              className="text-primary-blue hover:text-blue-700 font-medium"
            >
              Contact Support →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Documents
            </h3>
            <p className="text-gray-600 mb-4">
              Upload your tax documents securely
            </p>
            <Link
              href="/documents"
              className="text-primary-blue hover:text-blue-700 font-medium"
            >
              Manage Documents →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              View Reports
            </h3>
            <p className="text-gray-600 mb-4">
              Download your tax reports and summaries
            </p>
            <Link
              href="/reports"
              className="text-primary-blue hover:text-blue-700 font-medium"
            >
              View Reports →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}