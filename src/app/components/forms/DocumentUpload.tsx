import React, { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Eye, Download, Trash2, X } from 'lucide-react'

interface UploadedDocument {
  id: string
  name: string
  size: number
  type: string
  status: 'uploading' | 'processing' | 'completed' | 'error'
  uploadDate: Date
}

interface DocumentUploadProps {
  documents: UploadedDocument[]
  onUpload: (files: FileList) => void
  onRemove: (documentId: string) => void
  onView: (documentId: string) => void
  maxFileSize?: number // in MB
  acceptedTypes?: string[]
}

export default function DocumentUpload({
  documents,
  onUpload,
  onRemove,
  onView,
  maxFileSize = 10,
  acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png']
}: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusIcon = (status: UploadedDocument['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'processing':
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
    }
  }

  const getStatusText = (status: UploadedDocument['status']) => {
    switch (status) {
      case 'completed':
        return 'Processed'
      case 'processing':
        return 'Processing'
      case 'error':
        return 'Error'
      default:
        return 'Uploading'
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className={`h-12 w-12 mx-auto mb-4 ${dragActive ? 'text-blue-600' : 'text-gray-400'}`} />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {dragActive ? 'Drop your files here' : 'Upload Your Documents'}
        </h3>
        <p className="text-gray-600 mb-6">
          Drag and drop your files here, or click to browse
        </p>
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
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
          Supported formats: {acceptedTypes.join(', ')} (Max {maxFileSize}MB per file)
        </p>
      </div>

      {/* Required Documents */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Required Documents</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">T4 - Employment Income</h3>
                <p className="text-sm text-gray-600">Statement of Employment Income</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600 font-medium">Uploaded</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">T4A - Other Income</h3>
                <p className="text-sm text-gray-600">Pensions, annuities, and other income</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-orange-600 font-medium">Missing</span>
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">T5 - Investment Income</h3>
                <p className="text-sm text-gray-600">Interest, dividends, and other investment income</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600 font-medium">Uploaded</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Documents */}
      {documents.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Uploaded Documents</h2>
            <p className="text-sm text-gray-600 mt-1">Manage and review your uploaded documents</p>
          </div>

          <div className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <div key={doc.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{doc.name}</h3>
                      <p className="text-sm text-gray-600">
                        {formatFileSize(doc.size)} • Uploaded {doc.uploadDate.toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(doc.status)}
                        <span className={`text-xs font-medium ${
                          doc.status === 'completed' ? 'text-green-600' :
                          doc.status === 'processing' ? 'text-blue-600' :
                          doc.status === 'error' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {getStatusText(doc.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(doc.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                      title="View document"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onRemove(doc.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50"
                      title="Remove document"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">🔒 Secure & Private</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• End-to-end encryption protects your documents</li>
          <li>• CRA compliance certified security standards</li>
          <li>• Documents are automatically deleted after filing</li>
          <li>• No unauthorized access to your files</li>
        </ul>
      </div>
    </div>
  )
}