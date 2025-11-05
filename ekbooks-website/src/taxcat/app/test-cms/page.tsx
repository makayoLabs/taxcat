'use client';

import React, { useState } from 'react';
import TextBlockEditor from '@/components/cms/blocks/TextBlockEditor';
import ImageBlockEditor from '@/components/cms/blocks/ImageBlockEditor';
import TeamGridBlockEditor from '@/components/cms/blocks/TeamGridBlockEditor';
import ServicesBlockEditor from '@/components/cms/blocks/ServicesBlockEditor';
import ContactFormBlockEditor from '@/components/cms/blocks/ContactFormBlockEditor';
import BlogGridBlockEditor from '@/components/cms/blocks/BlogGridBlockEditor';
import TestimonialsBlockEditor from '@/components/cms/blocks/TestimonialsBlockEditor';
import {
  TextBlockContent,
  ImageBlockContent,
  TeamGridBlockContent,
  ServicesBlockContent,
  ContactFormBlockContent,
  BlogGridBlockContent,
  TestimonialsBlockContent,
} from '@/types/cms';

const TestCMSPage = (): void => {
  // Sample content for each block type
  const [textContent, setTextContent] = useState<TextBlockContent>({
    content: 'This is a sample text block. Edit me!',
    alignment: 'left',
    fontSize: 'base',
    color: '#000000',
  });

  const [imageContent, setImageContent] = useState<ImageBlockContent>({
    src: 'https://picsum.photos/800/400',
    alt: 'Sample image',
    caption: 'This is a sample image caption',
    alignment: 'center',
  });

  const [teamContent, setTeamContent] = useState<TeamGridBlockContent>({
    members: [
      {
        id: '1',
        name: 'John Doe',
        title: 'CEO',
        bio: 'Sample bio text',
        image: 'https://picsum.photos/200',
        order: 0,
      },
    ],
    columns: 3,
    showBio: true,
    showContact: true,
  });

  const [servicesContent, setServicesContent] = useState<ServicesBlockContent>({
    services: [
      {
        id: '1',
        title: 'Sample Service',
        description: 'This is a sample service description',
        icon: 'star',
        features: ['Feature 1', 'Feature 2'],
        price: '$99',
      },
    ],
    layout: 'grid',
    columns: 3,
    showPricing: true,
    theme: 'default',
  });

  const [contactContent, setContactContent] = useState<ContactFormBlockContent>({
    fields: [
      {
        id: '1',
        type: 'text',
        label: 'Name',
        placeholder: 'Enter your name',
        required: true,
        order: 0,
      },
    ],
    submitText: 'Send Message',
    successMessage: 'Thank you for your message!',
    emailTo: 'test@example.com',
    subject: 'New Contact Form Submission',
  });

  const [blogContent, setBlogContent] = useState<BlogGridBlockContent>({
    posts: [
      {
        id: '1',
        title: 'Sample Blog Post',
        excerpt: 'This is a sample blog post excerpt',
        content: 'Full blog post content goes here...',
        category: 'Sample Category',
        author: 'John Doe',
        publishedAt: new Date().toISOString(),
        slug: 'sample-post',
      },
    ],
    columns: 3,
    postsPerPage: 6,
    showExcerpt: true,
    showAuthor: true,
    showDate: true,
  });

  const [testimonialsContent, setTestimonialsContent] = useState<TestimonialsBlockContent>({
    testimonials: [
      {
        id: '1',
        author: 'Jane Doe',
        role: 'Customer',
        company: 'Sample Corp',
        content: 'This is a great sample testimonial!',
        rating: 5,
      },
    ],
    layout: 'grid',
    columns: 3,
    showRating: true,
    showCompany: true,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">CMS Block Editor Test</h1>

        <div className="space-y-12">
          {/* Text Block */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Text Block Editor</h2>
            <TextBlockEditor content={textContent} onUpdate={setTextContent} />
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Preview:</h3>
              <div
                className={`text-${textContent.alignment} text-${textContent.fontSize} ${textContent.color ? `text-[${textContent.color}]` : ''}`}
              >
                {textContent.content}
              </div>
            </div>
          </div>

          {/* Image Block */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Image Block Editor</h2>
            <ImageBlockEditor content={imageContent} onUpdate={setImageContent} />
          </div>

          {/* Team Grid Block */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Grid Block Editor</h2>
            <TeamGridBlockEditor content={teamContent} onUpdate={setTeamContent} />
          </div>

          {/* Services Block */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Services Block Editor</h2>
            <ServicesBlockEditor content={servicesContent} onUpdate={setServicesContent} />
          </div>

          {/* Contact Form Block */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Form Block Editor</h2>
            <ContactFormBlockEditor content={contactContent} onUpdate={setContactContent} />
          </div>

          {/* Blog Grid Block */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Blog Grid Block Editor</h2>
            <BlogGridBlockEditor content={blogContent} onUpdate={setBlogContent} />
          </div>

          {/* Testimonials Block */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Testimonials Block Editor</h2>
            <TestimonialsBlockEditor
              content={testimonialsContent}
              onUpdate={setTestimonialsContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCMSPage;
