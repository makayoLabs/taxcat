import React from 'react';
import { HeroBlockContent } from '@/types/cms';
import { Upload } from 'lucide-react';

interface HeroBlockEditorProps {
  content: HeroBlockContent;
  onUpdate: (___content: HeroBlockContent) => void;
}

const HeroBlockEditor: React.FC<HeroBlockEditorProps> = ({ content, onUpdate }) => {
  const handleChange = (field: keyof HeroBlockContent, value: string): void => {
    onUpdate({
      ...content,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-taxcat-gray">Headline</label>
        <input
          type="text"
          value={content.headline}
          onChange={(e) => handleChange('headline', e.target.value)}
          className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-taxcat-gray">Subheadline</label>
        <textarea
          value={content.subheadline || ''}
          onChange={(e) => handleChange('subheadline', e.target.value)}
          rows={2}
          className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-taxcat-gray">CTA Text</label>
          <input
            type="text"
            value={content.ctaText || ''}
            onChange={(e) => handleChange('ctaText', e.target.value)}
            placeholder="e.g., Get Started"
            className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-taxcat-gray">CTA Link</label>
          <input
            type="text"
            value={content.ctaLink || ''}
            onChange={(e) => handleChange('ctaLink', e.target.value)}
            placeholder="e.g., /contact"
            className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-taxcat-gray">Background Image</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-taxcat-gray/20 border-dashed rounded-md hover:border-taxcat-blue/40 transition-colors">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-taxcat-gray" />
            <div className="flex text-sm text-taxcat-gray">
              <label
                htmlFor="background-image"
                className="relative cursor-pointer rounded-md font-medium text-taxcat-blue hover:text-taxcat-blue/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-taxcat-blue"
              >
                <span>Upload a file</span>
                <input
                  id="background-image"
                  name="background-image"
                  type="file"
                  className="sr-only"
                  onChange={(_e) => {
                    const file = e.target.files?.[0];
                    if (_file) =>
                      // TODO: Implement file upload
                      handleChange('backgroundImage', URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-taxcat-gray">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-taxcat-gray">Alignment</label>
        <select
          value={content.alignment}
          onChange={(e) => handleChange('alignment', e.target.value as 'left' | 'center' | 'right')}
          className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-taxcat-gray">Overlay Color</label>
        <div className="mt-1 flex items-center space-x-2">
          <input
            type="color"
            value={content.overlay || '#000000'}
            onChange={(e) => handleChange('overlay', e.target.value)}
            className="h-8 w-8 rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue"
          />
          <input
            type="text"
            value={content.overlay || ''}
            onChange={(e) => handleChange('overlay', e.target.value)}
            placeholder="#000000"
            className="block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBlockEditor;
