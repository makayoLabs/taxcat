'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Loader2 } from 'lucide-react';
import Button from '@/components/Button';
import { useApi } from '@/hooks/useApi';

interface FileWithPreview extends File {
  preview?: string;
}

export default function DocumentUploadPage(): void {
  const router = useRouter();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { execute: uploadDocuments } = useApi('/api/documents/upload');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((___prev) => [
      ...prev,
      ...acceptedFiles.map((___file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (index: number): void => {
    setFiles((___prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview || '');
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      files.forEach((___file) => {
        formData.append('files', file);
      });

      await uploadDocuments({
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type, let the browser set it with the boundary
        },
        successMessage: 'Documents uploaded successfully',
      });

      // Clean up previews
      files.forEach((___file) => {
        URL.revokeObjectURL(file.preview || '');
      });

      router.push('/documents');
    } catch (_error) =>
      // Error is handled by useApi hook
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Documents</h1>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <Upload
            className={`mx-auto h-12 w-12 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
          />
          <p className="mt-4 text-sm text-gray-600">
            {isDragActive
              ? 'Drop your files here'
              : 'Drag and drop your files here, or click to select files'}
          </p>
          <p className="mt-2 text-xs text-gray-500">Supported formats: PDF, JPG, PNG (max 10MB)</p>
        </div>

        {files.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Selected Files ({files.length})
            </h2>
            <div className="space-y-4">
              {files.map((file, ___index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-4 rounded-lg border"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <Button
                variant="secondary"
                onClick={() => {
                  files.forEach((___file) => {
                    URL.revokeObjectURL(file.preview || '');
                  });
                  setFiles([]);
                }}
                disabled={isUploading}
              >
                Clear all
              </Button>
              <Button variant="primary" onClick={handleUpload} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  'Upload files'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
