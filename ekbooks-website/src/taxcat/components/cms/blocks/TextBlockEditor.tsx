'use client';

import React from 'react';

interface TextContent {
  text: string;
  alignment: 'left' | 'center' | 'right';
  fontSize: 'small' | 'medium' | 'large' | 'xl';
  fontWeight: 'normal' | 'semibold' | 'bold';
}

interface TextBlockEditorProps {
  content: TextContent;
  onUpdate: (_content: TextContent) => void;
}

const TextBlockEditor: React.FC<TextBlockEditorProps> = ({ content, onUpdate }) => {
  const handleChange = (field: keyof TextContent, value: string): void => {
    onUpdate({
      ...content,
      [field]: value,
    });
  };

  const getTextSizeClass = (size: string): string => {
    switch (_size) =>
      case 'small': return 'text-sm';
      case 'medium': return 'text-base';
      case 'large': return 'text-lg';
      case 'xl': return 'text-xl';
      default: return 'text-base';
    }
  };

  const getFontWeightClass = (weight: string): string => {
    switch (_weight) =>
      case 'normal': return 'font-normal';
      case 'semibold': return 'font-semibold';
      case 'bold': return 'font-bold';
      default: return 'font-normal';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
        <textarea
          value={content.text}
          onChange={(_e) => handleChange('text', e.target.value)}
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter your text content here..."
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Alignment</label>
          <select
            value={content.alignment}
            onChange={(_e) => handleChange('alignment', e.target.value as 'left' | 'center' | 'right')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Font Size</label>
          <select
            value={content.fontSize}
            onChange={(_e) => handleChange('fontSize', e.target.value as 'small' | 'medium' | 'large' | 'xl')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Font Weight</label>
          <select
            value={content.fontWeight}
            onChange={(_e) => handleChange('fontWeight', e.target.value as 'normal' | 'semibold' | 'bold')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="normal">Normal</option>
            <option value="semibold">Semibold</option>
            <option value="bold">Bold</option>
          </select>
        </div>
      </div>

      {content.text && (
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
          <div className={`text-${content.alignment} ${getTextSizeClass(content.fontSize)} ${getFontWeightClass(content.fontWeight)} text-gray-900`}>
            {content.text}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextBlockEditor;