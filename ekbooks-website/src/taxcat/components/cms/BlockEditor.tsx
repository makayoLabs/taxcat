import React from 'react';
import { ContentBlock } from '@/types/cms';
import HeroBlockEditor from './blocks/HeroBlockEditor';
import TextBlockEditor from './blocks/TextBlockEditor';
import ImageBlockEditor from './blocks/ImageBlockEditor';
import TeamGridBlockEditor from './blocks/TeamGridBlockEditor';
import ServicesBlockEditor from './blocks/ServicesBlockEditor';
import ContactFormBlockEditor from './blocks/ContactFormBlockEditor';
import BlogGridBlockEditor from './blocks/BlogGridBlockEditor';
import TestimonialsBlockEditor from './blocks/TestimonialsBlockEditor';

interface BlockEditorProps {
  block: ContentBlock;
  onUpdate: (___content: any) => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ block, onUpdate }) => {
  const renderEditor = (): void => {
    switch (block.type) {
      case 'hero':
        return <HeroBlockEditor content={block.content} onUpdate={onUpdate} />;
      case 'text':
        return <TextBlockEditor content={block.content} onUpdate={onUpdate} />;
      case 'image':
        return <ImageBlockEditor content={block.content} onUpdate={onUpdate} />;
      case 'team-grid':
        return <TeamGridBlockEditor content={block.content} onUpdate={onUpdate} />;
      case 'services':
        return <ServicesBlockEditor content={block.content} onUpdate={onUpdate} />;
      case 'contact-form':
        return <ContactFormBlockEditor content={block.content} onUpdate={onUpdate} />;
      case 'blog-grid':
        return <BlogGridBlockEditor content={block.content} onUpdate={onUpdate} />;
      case 'testimonials':
        return <TestimonialsBlockEditor content={block.content} onUpdate={onUpdate} />;
      default:
        return (
          <div className="p-4 bg-red-50 text-red-500 rounded-md">
            Unknown block type: {block.type}
          </div>
        );
    }
  };

  return <div className="block-editor">{renderEditor()}</div>;
};

export default BlockEditor;
