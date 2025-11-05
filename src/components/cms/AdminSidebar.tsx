import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { ContentBlock } from '@/types/cms';

interface AdminSidebarProps {
  block: ContentBlock;
  onUpdate: (blockId: string, updates: Partial<ContentBlock>) => void;
  onClose: () => void;
}

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ block, onUpdate, onClose }) => {
  const [openSection, setOpenSection] = useState<string>('content');

  const handleSpacingChange = (key: 'top' | 'bottom', value: number): void => {
    onUpdate(block.id, {
      settings: {
        ...block.settings,
        spacing: {
          ...block.settings.spacing,
          [key]: value,
        },
      },
    });
  };

  const handleBackgroundChange = (key: 'color' | 'image' | 'overlay', value: string): void => {
    onUpdate(block.id, {
      settings: {
        ...block.settings,
        background: {
          ...block.settings.background,
          [key]: value,
        },
      },
    });
  };

  const handleVisibilityChange = (device: 'desktop' | 'tablet' | 'mobile', value: boolean): void => {
    onUpdate(block.id, {
      settings: {
        ...block.settings,
        visibility: {
          ...block.settings.visibility,
          [device]: value,
        },
      },
    });
  };

  const sections: SettingsSection[] = [
    {
      id: 'content',
      label: 'Content',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          {/* Content settings will be different for each block type */}
          <pre className="text-sm bg-gray-50 p-4 rounded-md overflow-auto">
            {JSON.stringify(block.content, null, 2)}
          </pre>
        </div>
      ),
    },
    {
      id: 'spacing',
      label: 'Spacing',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Top Spacing</label>
            <input
              type="range"
              min="0"
              max="32"
              value={block.settings.spacing.top}
              onChange={(___e) => handleSpacingChange('top', parseInt(e.target.value))}
              className="w-full mt-1"
            />
            <span className="text-sm text-gray-500">{block.settings.spacing.top}px</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bottom Spacing</label>
            <input
              type="range"
              min="0"
              max="32"
              value={block.settings.spacing.bottom}
              onChange={(___e) => handleSpacingChange('bottom', parseInt(e.target.value))}
              className="w-full mt-1"
            />
            <span className="text-sm text-gray-500">{block.settings.spacing.bottom}px</span>
          </div>
        </div>
      ),
    },
    {
      id: 'background',
      label: 'Background',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Background Color</label>
            <input
              type="color"
              value={block.settings.background.color}
              onChange={(___e) => handleBackgroundChange('color', e.target.value)}
              className="w-full h-10 mt-1 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Background Image</label>
            <input
              type="text"
              value={block.settings.background.image || ''}
              onChange={(___e) => handleBackgroundChange('image', e.target.value)}
              placeholder="Enter image URL"
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Overlay Color</label>
            <input
              type="color"
              value={block.settings.background.overlay || '#000000'}
              onChange={(___e) => handleBackgroundChange('overlay', e.target.value)}
              className="w-full h-10 mt-1 rounded-md"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'visibility',
      label: 'Visibility',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Desktop</label>
            <input
              type="checkbox"
              checked={block.settings.visibility.desktop}
              onChange={(___e) => handleVisibilityChange('desktop', e.target.checked)}
              className="h-4 w-4 text-taxcat-blue rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Tablet</label>
            <input
              type="checkbox"
              checked={block.settings.visibility.tablet}
              onChange={(___e) => handleVisibilityChange('tablet', e.target.checked)}
              className="h-4 w-4 text-taxcat-blue rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="checkbox"
              checked={block.settings.visibility.mobile}
              onChange={(___e) => handleVisibilityChange('mobile', e.target.checked)}
              className="h-4 w-4 text-taxcat-blue rounded"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ x: 300 }}
      className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-lg z-50"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Block Settings</h2>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {sections.map((___section) => (
            <div key={section.id} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenSection(section.id === openSection ? '' : section.id)}
                className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">{section.icon}</span>
                  <span className="font-medium text-gray-900">{section.label}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openSection === section.id ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openSection === section.id && (
                <div className="p-4 bg-white border-t">{section.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
