import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

export function DocumentUpload({ onUpload, accept, multiple = false }: DocumentUploadProps): void {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onUpload(acceptedFiles);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept
      ? { 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.jpeg', '.png'] }
      : undefined,
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-primary-blue bg-blue-50' : 'border-gray-300 hover:border-primary-blue'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      {isDragActive ? (
        <p className="text-lg text-primary-blue">Drop the files here...</p>
      ) : (
        <div>
          <p className="text-lg mb-2">
            Drag and drop your documents here, or click to select files
          </p>
          <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG</p>
        </div>
      )}
    </div>
  );
}
