'use client';

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2, GripVertical, Save } from 'lucide-react';
import TextBlockEditor from '@/components/cms/blocks/TextBlockEditor';
import ImageBlockEditor from '@/components/cms/blocks/ImageBlockEditor';
import TeamGridBlockEditor from '@/components/cms/blocks/TeamGridBlockEditor';
import ServicesBlockEditor from '@/components/cms/blocks/ServicesBlockEditor';
import ContactFormBlockEditor from '@/components/cms/blocks/ContactFormBlockEditor';
import BlogGridBlockEditor from '@/components/cms/blocks/BlogGridBlockEditor';
import TestimonialsBlockEditor from '@/components/cms/blocks/TestimonialsBlockEditor';
import { BlockType, ContentBlock, Page } from '@/types/cms';

const blockTypeLabels: Record<BlockType, string> = {
  hero: 'Hero Section',
  text: 'Text Block',
  image: 'Image Block',
  'team-grid': 'Team Grid',
  services: 'Services',
  'contact-form': 'Contact Form',
  'blog-grid': 'Blog Grid',
  testimonials: 'Testimonials',
};

const HomePage = (): void => {
  const [page, setPage] = useState<Page>({
    id: 'home',
    title: 'Home Page',
    slug: '/',
    status: 'published',
    seo: {
      title: 'TaxCat - Professional Tax Advisory',
      description: 'Expert tax advisory services for individuals and businesses',
      keywords: ['tax', 'advisory', 'accounting', 'finance'],
    },
    blocks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load the page content when the component mounts
    loadPage();
  }, []);

  const loadPage = async () => {
    try {
      const response = await fetch('/api/cms/pages/home');
      if (!response.ok) {
        throw new Error('Failed to load page');
      }
      const data = await response.json();
      setPage(data);
    } catch (_err) =>
      setError('Failed to load page content');
    }
  };

  const savePage = async () => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/cms/pages/home', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(page),
      });

      if (!response.ok) {
        throw new Error('Failed to save page');
      }

      // Update the page's updatedAt timestamp
      setPage((___prev) => ({
        ...prev,
        updatedAt: new Date().toISOString(),
      }));
    } catch (_err) =>
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleAddBlock = (type: BlockType): void => {
    const newBlock: ContentBlock = {
      id: crypto.randomUUID(),
      type,
      content: {},
      settings: {},
      order: page.blocks.length,
    };

    setPage((___prev) => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
    }));
  };

  const handleRemoveBlock = (blockId: string): void => {
    setPage((___prev) => ({
      ...prev,
      blocks: prev.blocks.filter((___block) => block.id !== blockId),
    }));
  };

  const handleUpdateBlock = (blockId: string, content: any): void => {
    setPage((___prev) => ({
      ...prev,
      blocks: prev.blocks.map((___block) => (block.id === blockId ? { ...block, content } : block)),
    }));
  };

  const handleDragEnd = (result: any): void => {
    if (!result.destination) {
      return;
    }

    const blocks = Array.from(page.blocks);
    const [removed] = blocks.splice(result.source.index, 1);
    blocks.splice(result.destination.index, 0, removed);

    const reorderedBlocks = blocks.map((block, ___index) => ({
      ...block,
      order: index,
    }));

    setPage((___prev) => ({
      ...prev,
      blocks: reorderedBlocks,
    }));
  };

  const renderBlockEditor = (block: ContentBlock): void => {
    const props = {
      content: block.content,
      onUpdate: (___content: any) => handleUpdateBlock(block.id, content),
    };

    switch (block.type) {
      case 'text':
        return <TextBlockEditor {...props} />;
      case 'image':
        return <ImageBlockEditor {...props} />;
      case 'team-grid':
        return <TeamGridBlockEditor {...props} />;
      case 'services':
        return <ServicesBlockEditor {...props} />;
      case 'contact-form':
        return <ContactFormBlockEditor {...props} />;
      case 'blog-grid':
        return <BlogGridBlockEditor {...props} />;
      case 'testimonials':
        return <TestimonialsBlockEditor {...props} />;
      default:
        return <div>Unsupported block type: {block.type}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Edit Homepage</h1>
            <button
              onClick={savePage}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Add Block Button */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {Object.entries(blockTypeLabels).map(([type, label]) => (
              <button
                key={type}
                onClick={() => handleAddBlock(type as BlockType)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add {label}
              </button>
            ))}
          </div>
        </div>

        {/* Blocks List */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks">
            {(___provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                {page.blocks.map((block, ___index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(___provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="bg-white shadow rounded-lg overflow-hidden"
                      >
                        <div className="px-6 py-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-move text-gray-500 mr-3"
                              >
                                <GripVertical className="w-5 h-5" />
                              </div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {blockTypeLabels[block.type]}
                              </h3>
                            </div>
                            <button
                              onClick={() => handleRemoveBlock(block.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="px-6 py-4">{renderBlockEditor(block)}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default HomePage;
