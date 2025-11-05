import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { ContentBlock } from '@/types/cms';
import { Grip, Trash2, Copy, Settings } from 'lucide-react';

interface ComponentWrapperProps {
  block: ContentBlock;
  isSelected: boolean;
  isDragging: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  onSelect: () => void;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const ComponentWrapper = ({
  block,
  isSelected,
  isDragging,
  dragHandleProps,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        relative group
        ${isSelected ? 'ring-2 ring-taxcat-blue' : ''}
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      {/* Overlay Controls */}
      <div
        className={`
          absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          ${isSelected ? 'opacity-100' : ''}
        `}
      >
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <button
            onClick={onDuplicate}
            className="p-1 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors"
            title="Duplicate"
          >
            <Copy className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 bg-white rounded-md shadow-sm hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
          <button
            onClick={onSelect}
            className={`
              p-1 bg-white rounded-md shadow-sm transition-colors
              ${isSelected ? 'bg-taxcat-blue text-white' : 'hover:bg-gray-50'}
            `}
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Drag Handle */}
        <div
          {...dragHandleProps}
          className="absolute top-2 left-2 cursor-move p-1 bg-white rounded-md shadow-sm"
          title="Drag to reorder"
        >
          <Grip className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      {/* Block Preview */}
      <div className="relative">
        {/* Render the actual block component here based on block.type */}
        <div className="p-4 bg-white">
          <pre className="text-sm text-gray-500">{JSON.stringify(block, null, 2)}</pre>
        </div>
      </div>
    </motion.div>
  );
};

export default ComponentWrapper;
