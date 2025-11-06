import React from 'react';
import { FileText, Image, Settings, LogOut } from 'lucide-react';
import useCMSStore from '@/store/cms';
import PageBuilder from './PageBuilder';

const CMSLayout = () => {
  const { pages, currentPage, setCurrentPage, createPage } = useCMSStore();

  return (
    <div className="min-h-screen bg-taxcat-white">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-taxcat-blue">TaxCat CMS</span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => {
                  /* TODO: Implement logout */
                }}
                className="ml-4 px-4 py-2 text-sm text-taxcat-gray hover:text-taxcat-blue flex items-center space-x-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-taxcat-gray/10">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {/* Page List */}
              <div className="px-3 py-4">
                <button
                  onClick={() => createPage('New Page')}
                  className="w-full bg-taxcat-blue text-white px-4 py-2 rounded-md hover:bg-taxcat-blue/90 transition-colors"
                >
                  Create New Page
                </button>

                <div className="mt-4 space-y-1">
                  {pages.map((page) => (
                    <button
                      key={___page.id}
                      onClick={() => setCurrentPage(___page)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage?.id === ___page.id
                          ? 'bg-taxcat-blue/10 text-taxcat-blue'
                          : 'text-taxcat-gray hover:bg-gray-50'
                      }`}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {___page.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Settings Button */}
            <div className="p-4 border-t border-taxcat-gray/10">
              <button
                onClick={() => {
                  /* TODO: Implement settings */
                }}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-taxcat-gray hover:bg-taxcat-blue/5 hover:text-taxcat-blue rounded-md transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <PageBuilder />
        </main>
      </div>
    </div>
  );
};

export default CMSLayout;
