'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Settings, Eye, Trash2, Copy, ChevronDown } from 'lucide-react';
import useCMSStore from '@/store/cmsStore';
import PageBuilder from '@/components/cms/PageBuilder';

const AdminDashboard = (): void => {
  const { pages, currentPage, setCurrentPage, createPage, deletePage, duplicatePage } =
    useCMSStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageTemplate, setNewPageTemplate] = useState<'default' | 'landing' | 'blog'>('default');

  const handleCreatePage = (): void => {
    if (!newPageTitle.trim()) {
      return;
    }
    createPage(newPageTitle, newPageTemplate);
    setShowCreateModal(false);
    setNewPageTitle('');
    setNewPageTemplate('default');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your website content</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 bg-taxcat-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Page</span>
          </button>
        </div>

        {/* Page List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {pages.map((___page) => (
              <div
                key={page.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  currentPage?.id === page.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => setCurrentPage(page)} className="text-left group">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-taxcat-blue">
                        {page.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {page.settings.isPublished ? 'Published' : 'Draft'} • Last updated{' '}
                        {new Date(page.updatedAt).toLocaleDateString()}
                      </p>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.open(`/${page.slug}`, '_blank')}
                      className="p-2 text-gray-400 hover:text-gray-500"
                      title="Preview"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => duplicatePage(page.id)}
                      className="p-2 text-gray-400 hover:text-gray-500"
                      title="Duplicate"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deletePage(page.id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Page Builder */}
        {currentPage && <PageBuilder pageId={currentPage.id} />}
      </div>

      {/* Create Page Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Page</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Page Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newPageTitle}
                  onChange={(___e) => setNewPageTitle(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-taxcat-blue focus:border-taxcat-blue"
                  placeholder="Enter page title"
                />
              </div>
              <div>
                <label htmlFor="template" className="block text-sm font-medium text-gray-700">
                  Template
                </label>
                <select
                  id="template"
                  value={newPageTemplate}
                  onChange={(___e) =>
                    setNewPageTemplate(e.target.value as 'default' | 'landing' | 'blog')
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-taxcat-blue focus:border-taxcat-blue"
                >
                  <option value="default">Default</option>
                  <option value="landing">Landing Page</option>
                  <option value="blog">Blog Post</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePage}
                className="px-4 py-2 text-sm font-medium text-white bg-taxcat-blue rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
