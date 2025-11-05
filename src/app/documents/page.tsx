import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Upload, FileText, Search, Filter, Download, Eye, Trash2, FolderOpen, Calendar, User } from 'lucide-react'

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <div className="container-max py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Management</h1>
            <p className="text-lg text-gray-600">Upload, organize, and manage all your tax-related documents</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Document Categories</h3>
                <nav className="space-y-2">
                  <a href="#all" className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
                    <FileText className="h-4 w-4 mr-2" />
                    All Documents
                  </a>
                  <a href="#tax-returns" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    <FileText className="h-4 w-4 mr-2" />
                    Tax Returns
                  </a>
                  <a href="#income" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    <FileText className="h-4 w-4 mr-2" />
                    Income Documents
                  </a>
                  <a href="#deductions" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    <FileText className="h-4 w-4 mr-2" />
                    Deduction Receipts
                  </a>
                  <a href="#other" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Other
                  </a>
                </nav>

                <div className="mt-8">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors flex items-center justify-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Document
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Filters */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>All Years</option>
                      <option>2024</option>
                      <option>2023</option>
                      <option>2022</option>
                    </select>
                    <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Zone */}
              <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-8">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload New Documents</h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop your files here, or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                    id="document-upload"
                  />
                  <label
                    htmlFor="document-upload"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md cursor-pointer inline-block transition-colors"
                  >
                    Choose Files
                  </label>
                  <p className="text-sm text-gray-500 mt-3">
                    Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
                  </p>
                </div>
              </div>

              {/* Document List */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Your Documents</h2>
                  <p className="text-sm text-gray-600 mt-1">Manage and organize your tax documents</p>
                </div>

                <div className="divide-y divide-gray-200">
                  {/* Document Item */}
                  <div className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">T4_EmployerABC_2024.pdf</h3>
                          <p className="text-sm text-gray-600">Employment income statement • 245 KB</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Uploaded Mar 10, 2024
                            </span>
                            <span className="text-xs text-green-600 font-medium">Processed</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">T5_BankXYZ_2024.pdf</h3>
                          <p className="text-sm text-gray-600">Investment income statement • 156 KB</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Uploaded Mar 10, 2024
                            </span>
                            <span className="text-xs text-green-600 font-medium">Processed</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Medical_Receipts_2024.pdf</h3>
                          <p className="text-sm text-gray-600">Medical expense receipts • 2.1 MB</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Uploaded Mar 12, 2024
                            </span>
                            <span className="text-xs text-blue-600 font-medium">Processing</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                          <FileText className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">RRSP_Contribution_2024.pdf</h3>
                          <p className="text-sm text-gray-600">RRSP contribution receipt • 89 KB</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Uploaded Mar 8, 2024
                            </span>
                            <span className="text-xs text-green-600 font-medium">Processed</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Showing 4 of 12 documents</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">Previous</button>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">2</button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">3</button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
