import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';

interface DocumentUploadProps {
  userId: string;
  taxReturnId: string;
  onUploadComplete: (documents: Array<{ id: string; name: string; type: string }>) => void;
}

export default function DocumentUpload({
  userId,
  taxReturnId,
  onUploadComplete,
}: DocumentUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ id: string; name: string; type: string }>
  >([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);
      try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
          formData.append('files', file);
        });
        formData.append('userId', userId);
        formData.append('taxReturnId', taxReturnId);

        const response = await fetch('/api/upload-documents', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const result = await response.json();
        setUploadedFiles((prev) => [...prev, ...result.documents]);
      } catch (error) {
        console.error('Error uploading files:', error);
      } finally {
        setIsUploading(false);
      }
    },
    [userId, taxReturnId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
  });

  const handleContinue = (): void => {
    onUploadComplete(uploadedFiles);
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="text-gray-600">
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div>
                <p className="text-lg font-medium">Upload your tax documents</p>
                <p className="text-sm mt-2">
                  Drag and drop your files here, or click to select files
                </p>
                <p className="text-xs mt-1 text-gray-500">Supported formats: PDF, JPG, PNG</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Documents</h3>
          <ul className="divide-y divide-gray-200">
            {uploadedFiles.map((file) => (
              <li key={file.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-900">{file.name}</span>
                </div>
                <span className="text-sm text-gray-500">{file.type}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => window.location.reload()}>
          Clear All
        </Button>
        <Button
          onClick={handleContinue}
          disabled={uploadedFiles.length === 0 || isUploading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isUploading ? 'Uploading...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
