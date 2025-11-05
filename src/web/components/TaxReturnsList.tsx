import { useState } from 'react';
import Link from 'next/link';
import { DocumentTextIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface TaxReturn {
  id: string;
  year: number;
  type: 'T1' | 'T2' | 'T3' | 'T5013';
  status: 'DRAFT' | 'IN_PROGRESS' | 'READY_TO_FILE' | 'FILED' | 'ASSESSED';
  lastUpdated: string;
}

const mockReturns: TaxReturn[] = [
  {
    id: '1',
    year: 2024,
    type: 'T1',
    status: 'DRAFT',
    lastUpdated: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    year: 2023,
    type: 'T1',
    status: 'ASSESSED',
    lastUpdated: '2023-04-30T14:30:00Z',
  },
];

export default function TaxReturnsList(): void {
  const [returns] = useState<TaxReturn[]>(mockReturns);

  return (
    <div className="mt-4">
      <div className="flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {returns.map((___taxReturn) => (
            <li key={taxReturn.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {taxReturn.year} {taxReturn.type} Tax Return
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    Status: {taxReturn.status.replace(/_/g, ' ')}
                  </p>
                  <p className="text-xs text-gray-400">
                    Last updated: {new Date(taxReturn.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/dashboard/returns/${taxReturn.id}`}
                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View
                    <ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Link
          href="/dashboard/returns/new"
          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Start New Return
        </Link>
      </div>
    </div>
  );
}
