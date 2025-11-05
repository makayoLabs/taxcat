'use client';

import React from 'react';

interface ImageBlockContent {
  src: string;
  alt: string;
  caption?: string;
  alignment?: 'left' | 'center' | 'right';
  width?: 'small' | 'medium' | 'large' | 'full';
}

interface ImageBlockEditorProps {
  content: ImageBlockContent;
  onUpdate: (_content: ImageBlockContent) => void;
}

const ImageBlockEditor: React.FC<ImageBlockEditorProps> = ({ content, onUpdate }) => {
  const handleChange = (field: keyof ImageBlockContent, value: string): void => {
    onUpdate({
      ...content,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={content.src}
          onChange={(_e) => handleChange('src', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Alt Text</label>
        <input
          type="text"
          value={content.alt}
          onChange={(_e) => handleChange('alt', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Describe the image"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Caption (Optional)</label>
        <input
          type="text"
          value={content.caption || ''}
          onChange={(_e) => handleChange('caption', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Image caption"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Alignment</label>
          <select
            value={content.alignment || 'center'}
            onChange={(_e) => handleChange('alignment', e.target.value as 'left' | 'center' | 'right')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Width</label>
          <select
            value={content.width || 'medium'}
            onChange={(_e) => handleChange('width', e.target.value as 'small' | 'medium' | 'large' | 'full')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="full">Full Width</option>
          </select>
        </div>
      </div>

      {content.src && (
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
          <div className={`text-${content.alignment || 'center'}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={content.src} 
              alt={content.alt || 'Image preview'} 
              className={`max-w-full h-auto rounded-lg ${
                content.width === 'small' ? 'max-w-sm' :
                content.width === 'medium' ? 'max-w-md' :
                content.width === 'large' ? 'max-w-lg' :
                'w-full'
              }`}
            />
            {content.caption && (
              <p className="mt-2 text-sm text-gray-600 italic">{content.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageBlockEditor;