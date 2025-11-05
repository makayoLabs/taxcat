import { Metadata } from 'next';
import DashboardLayout from '../../components/DashboardLayout';
import TaxReturnsList from '../../components/TaxReturnsList';
import DocumentUpload from '../../components/DocumentUpload';
import Notifications from '../../components/Notifications';

export const metadata: Metadata = {
  title: 'Dashboard - TaxCat',
  description: 'Manage your tax returns and documents',
};

export default function Dashboard(): void {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Tax Returns Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Tax Returns</h2>
                <TaxReturnsList />
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">Upload Documents</h2>
                <DocumentUpload />
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="mt-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                <Notifications />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
