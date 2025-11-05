'use client';

import React from 'react';

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

interface BlogGridContent {
  title: string;
  subtitle: string;
  posts: BlogPost[];
  columns: 2 | 3 | 4;
  showReadMore: boolean;
}

interface BlogGridBlockEditorProps {
  content: BlogGridContent;
  onUpdate: (_content: BlogGridContent) => void;
}

const BlogGridBlockEditor: React.FC<BlogGridBlockEditorProps> = ({ content, onUpdate }) => {
  const handleChange = (field: keyof BlogGridContent, value: any): void => {
    onUpdate({
      ...content,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Columns</label>
          <select
            value={content.columns}
            onChange={(_e) => handleChange('columns', parseInt(e.target.value) as 2 | 3 | 4)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value={2}>2 Columns</option>
            <option value={3}>3 Columns</option>
            <option value={4}>4 Columns</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={content.showReadMore}
              onChange={(_e) => handleChange('showReadMore', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Show Read More Button</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={content.title}
          onChange={(_e) => handleChange('title', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
        <textarea
          value={content.subtitle}
          onChange={(_e) => handleChange('subtitle', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter subtitle"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Blog Posts</label>
        <div className="space-y-2">
          {content.posts.map((post, _index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600">Title</label>
                  <input
                    type="text"
                    value={post.title}
                    onChange={(_e) => {
                      const newPosts = [...content.posts];
                      newPosts[index] = { ...post, title: e.target.value };
                      handleChange('posts', newPosts);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Date</label>
                  <input
                    type="date"
                    value={post.date}
                    onChange={(_e) => {
                      const newPosts = [...content.posts];
                      newPosts[index] = { ...post, date: e.target.value };
                      handleChange('posts', newPosts);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-xs text-gray-600">Excerpt</label>
                <textarea
                  value={post.excerpt}
                  onChange={(_e) => {
                    const newPosts = [...content.posts];
                    newPosts[index] = { ...post, excerpt: e.target.value };
                    handleChange('posts', newPosts);
                  }}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogGridBlockEditor;