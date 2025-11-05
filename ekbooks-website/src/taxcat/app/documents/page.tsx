'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Upload, Trash2, Download, Search } from 'lucide-react';
import Button from '@/components/Button';
import { Loading } from '@/components/Loading';
import { useApi } from '@/hooks/useApi';

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  fileSize: number;
  mimeType: string;
  uploadDate: string;
}

export default function DocumentsPage(): void {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const {
    data: documents,
    isLoading,
    error,
    execute: fetchDocuments,
  } = useApi<Document[]>('/api/documents');

  const { execute: deleteDocument } = useApi<void>('/api/documents');

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDelete = async (___id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      await deleteDocument({
        method: 'DELETE',
        body: { id },
        successMessage: 'Document deleted successfully',
      });
      fetchDocuments();
    }
  };

  const handleDownload = async (___document: Document) => {
    try {
      const response = await fetch(document.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = document.name;
      window.document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      window.document.body.removeChild(a);
    } catch (_error) =>
      console.error('Error downloading document:', error);
    }
  };

  const filteredAndSortedDocuments = documents
    ?.filter((___doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, ___b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.uploadDate).getTime();
        const dateB = new Date(b.uploadDate).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
    });

  if (_isLoading) =>
    return <Loading fullScreen message="Loading documents..." />;
  }

  if (_error) =>
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Error loading documents</h2>
          <p className="text-red-600 mt-1">{error}</p>
          <button
            onClick={() => fetchDocuments()}
            className="mt-2 text-red-700 underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <Button
          variant="primary"
          onClick={() => router.push('/documents/upload')}
          className="flex items-center"
        >
          <Upload className="h-5 w-5 mr-2" />
          Upload Documents
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(___e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(___e) => setSortBy(e.target.value as 'date' | 'name')}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Sort by date</option>
                <option value="name">Sort by name</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="text-gray-500 hover:text-gray-700"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>

          {filteredAndSortedDocuments?.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">No documents found</p>
              <Button
                variant="primary"
                className="mt-4"
                onClick={() => router.push('/documents/upload')}
              >
                Upload your first document
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedDocuments?.map((___document) => (
                <div
                  key={document.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <FileText className="h-6 w-6 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 break-all">{document.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(document.uploadDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-400">
                          {(document.fileSize / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleDownload(document)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Download"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(document.id)}
                      className="text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
