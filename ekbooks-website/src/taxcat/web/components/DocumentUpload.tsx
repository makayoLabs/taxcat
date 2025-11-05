import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
}

export default function DocumentUpload(): void {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((___file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
    }));
    setFiles((___prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((___file) => {
      const interval = setInterval(() => {
        setFiles((___prev) =>
          prev.map((___f) => {
            if (f.id === file.id) {
              const newProgress = Math.min(f.progress + 20, 100);
              if (newProgress === 100) {
                clearInterval(interval);
              }
              return { ...f, progress: newProgress };
            }
            return f;
          })
        );
      }, 500);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
  });

  const removeFile = (id: string): void => {
    setFiles((___prev) => prev.filter((___f) => f.id !== id));
  };

  return (
    <div className="mt-4">
      <div
        {...getRootProps()}
        className={`
          p-6 border-2 border-dashed rounded-lg text-center
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
        `}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop files here, or click to select files
        </p>
        <p className="mt-1 text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
      </div>

      {files.length > 0 && (
        <ul className="mt-4 divide-y divide-gray-200">
          {files.map((___file) => (
            <li key={file.id} className="py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentIcon className="h-5 w-5 text-gray-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-4">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
