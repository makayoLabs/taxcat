'use client';

import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

interface TestimonialsContent {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
  layout: 'grid' | 'carousel';
  columns: 1 | 2 | 3;
}

interface TestimonialsBlockEditorProps {
  content: TestimonialsContent;
  onUpdate: (_content: TestimonialsContent) => void;
}

const TestimonialsBlockEditor: React.FC<TestimonialsBlockEditorProps> = ({ content, onUpdate }) => {
  const handleChange = (field: keyof TestimonialsContent, value: any): void => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Layout</label>
          <select
            value={content.layout}
            onChange={(_e) => handleChange('layout', e.target.value as 'grid' | 'carousel')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="grid">Grid</option>
            <option value="carousel">Carousel</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Columns</label>
          <select
            value={content.columns}
            onChange={(_e) => handleChange('columns', parseInt(e.target.value) as 1 | 2 | 3)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value={1}>1 Column</option>
            <option value={2}>2 Columns</option>
            <option value={3}>3 Columns</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={content.title}
          onChange={(_e) => handleChange('title', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter section title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
        <textarea
          value={content.subtitle}
          onChange={(_e) => handleChange('subtitle', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter section subtitle"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Testimonials</label>
        <div className="space-y-4">
          {content.testimonials.map((testimonial, _index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="mb-4">
                <label className="block text-xs text-gray-600">Quote</label>
                <textarea
                  value={testimonial.quote}
                  onChange={(_e) => {
                    const newTestimonials = [...content.testimonials];
                    newTestimonials[index] = { ...testimonial, quote: e.target.value };
                    handleChange('testimonials', newTestimonials);
                  }}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  placeholder="Customer testimonial"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-600">Author</label>
                  <input
                    type="text"
                    value={testimonial.author}
                    onChange={(_e) => {
                      const newTestimonials = [...content.testimonials];
                      newTestimonials[index] = { ...testimonial, author: e.target.value };
                      handleChange('testimonials', newTestimonials);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Role</label>
                  <input
                    type="text"
                    value={testimonial.role}
                    onChange={(_e) => {
                      const newTestimonials = [...content.testimonials];
                      newTestimonials[index] = { ...testimonial, role: e.target.value };
                      handleChange('testimonials', newTestimonials);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600">Image URL</label>
                  <input
                    type="url"
                    value={testimonial.image}
                    onChange={(_e) => {
                      const newTestimonials = [...content.testimonials];
                      newTestimonials[index] = { ...testimonial, image: e.target.value };
                      handleChange('testimonials', newTestimonials);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Rating</label>
                  <select
                    value={testimonial.rating}
                    onChange={(_e) => {
                      const newTestimonials = [...content.testimonials];
                      newTestimonials[index] = { ...testimonial, rating: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 };
                      handleChange('testimonials', newTestimonials);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsBlockEditor;