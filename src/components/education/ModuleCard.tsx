'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, Award, TrendingUp } from 'lucide-react';

interface ModuleCardProps {
  module: {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    estimatedMinutes: number;
    pointsReward: number;
    lessonsCount: number;
    progress?: number;
    isCompleted?: boolean;
  };
}

const difficultyColors = {
  BEGINNER: 'bg-green-100 text-green-800',
  INTERMEDIATE: 'bg-yellow-100 text-yellow-800',
  ADVANCED: 'bg-red-100 text-red-800',
};

const categoryColors = {
  TAX_BASICS: 'bg-blue-100 text-blue-800',
  INCOME_TYPES: 'bg-purple-100 text-purple-800',
  DEDUCTIONS_CREDITS: 'bg-pink-100 text-pink-800',
  INVESTMENTS: 'bg-indigo-100 text-indigo-800',
  BUSINESS: 'bg-orange-100 text-orange-800',
  LIFE_EVENTS: 'bg-teal-100 text-teal-800',
  ADVANCED_TAX: 'bg-red-100 text-red-800',
  FINANCIAL_LITERACY: 'bg-green-100 text-green-800',
};

export default function ModuleCard({ module }: ModuleCardProps) {
  const progress = module.progress || 0;

  return (
    <Link href={`/learn/modules/${module.slug}`}>
      <div className="ws-card hover:shadow-lg transition-shadow cursor-pointer h-full">
        {/* Status Badge */}
        {module.isCompleted && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Award className="w-4 h-4" />
            Completed
          </div>
        )}

        {/* Category & Difficulty Tags */}
        <div className="flex gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[module.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}`}>
            {module.category.replace(/_/g, ' ')}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[module.difficulty as keyof typeof difficultyColors] || 'bg-gray-100 text-gray-800'}`}>
            {module.difficulty}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="ws-text-xl font-bold mb-3">{module.title}</h3>
        <p className="ws-color-muted mb-6 line-clamp-2">{module.description}</p>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="ws-color-muted">Progress</span>
              <span className="font-medium text-brand-primary">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-brand-primary h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Meta Information */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm ws-color-muted">{module.estimatedMinutes} min</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <span className="text-sm ws-color-muted">{module.lessonsCount} lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-sm ws-color-muted">{module.pointsReward} pts</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
