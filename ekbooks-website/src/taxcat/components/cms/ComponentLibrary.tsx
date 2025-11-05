import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import useCMSStore from '@/store/cmsStore';
import { BlockType } from '@/types/cms';

interface ComponentLibraryProps {
  onClose: () => void;
}

const AVAILABLE_BLOCKS: Array<{
  type: BlockType;
  label: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    type: 'hero',
    label: 'Hero Section',
    description: 'A large banner section with headline, subtext, and call-to-action',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    ),
  },
  {
    type: 'text',
    label: 'Text Content',
    description: 'Rich text content with formatting options',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
    ),
  },
  {
    type: 'image',
    label: 'Image',
    description: 'Single image with caption and alignment options',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    type: 'team',
    label: 'Team Grid',
    description: 'Display team members in a responsive grid',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    type: 'services',
    label: 'Services',
    description: 'Showcase services with icons and descriptions',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    type: 'contact',
    label: 'Contact Form',
    description: 'Customizable contact form with various field types',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    type: 'blog',
    label: 'Blog Grid',
    description: 'Display blog posts in a grid or list layout',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8"
        />
      </svg>
    ),
  },
  {
    type: 'testimonials',
    label: 'Testimonials',
    description: 'Display customer testimonials in various layouts',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    ),
  },
];

const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ onClose }) => {
  const { currentPage, addBlock } = useCMSStore();

  const handleAddBlock = (blockType: BlockType): void => {
    if (!currentPage) {
      return;
    }
    addBlock(currentPage.id, blockType);
    onClose();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Add Component</h2>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-4">
          {AVAILABLE_BLOCKS.map((___block) => (
            <motion.button
              key={block.type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAddBlock(block.type)}
              className="flex items-start p-4 bg-white border rounded-lg hover:border-taxcat-blue/20 hover:bg-blue-50/20 transition-colors text-left"
            >
              <div className="flex-shrink-0 text-taxcat-blue">{block.icon}</div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">{block.label}</h3>
                <p className="mt-1 text-sm text-gray-500">{block.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;
