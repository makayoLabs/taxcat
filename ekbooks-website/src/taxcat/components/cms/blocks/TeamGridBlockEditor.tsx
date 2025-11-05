'use client';

import React from 'react';

interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio: string;
  social: {
    twitter?: string;
    linkedin?: string;
  };
}

interface TeamGridContent {
  title: string;
  subtitle: string;
  members: TeamMember[];
  columns: 2 | 3 | 4;
}

interface TeamGridBlockEditorProps {
  content: TeamGridContent;
  onUpdate: (_content: TeamGridContent) => void;
}

const TeamGridBlockEditor: React.FC<TeamGridBlockEditorProps> = ({ content, onUpdate }) => {
  const handleChange = (field: keyof TeamGridContent, value: any): void => {
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
        <div className="space-y-4">
          {content.members.map((member, _index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-600">Name</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(_e) => {
                      const newMembers = [...content.members];
                      newMembers[index] = { ...member, name: e.target.value };
                      handleChange('members', newMembers);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Title</label>
                  <input
                    type="text"
                    value={member.title}
                    onChange={(_e) => {
                      const newMembers = [...content.members];
                      newMembers[index] = { ...member, title: e.target.value };
                      handleChange('members', newMembers);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-xs text-gray-600">Image URL</label>
                <input
                  type="url"
                  value={member.image}
                  onChange={(_e) => {
                    const newMembers = [...content.members];
                    newMembers[index] = { ...member, image: e.target.value };
                    handleChange('members', newMembers);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600">Bio</label>
                <textarea
                  value={member.bio}
                  onChange={(_e) => {
                    const newMembers = [...content.members];
                    newMembers[index] = { ...member, bio: e.target.value };
                    handleChange('members', newMembers);
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

export default TeamGridBlockEditor;