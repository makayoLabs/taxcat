'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface LessonViewerProps {
  lesson: {
    id: string;
    title: string;
    order: number;
    estimatedMinutes: number;
    contentType: string;
    content: any;
    hasInteractive?: boolean;
  };
  onComplete?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export default function LessonViewer({
  lesson,
  onComplete,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: LessonViewerProps) {
  const [startTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    setIsCompleted(true);

    // Save to localStorage
    const progress = JSON.parse(localStorage.getItem('taxcat-edu-progress') || '{}');
    progress[lesson.id] = {
      completed: true,
      timeSpent,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem('taxcat-edu-progress', JSON.stringify(progress));

    if (onComplete) {
      onComplete();
    }
  };

  // Check if already completed
  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem('taxcat-edu-progress') || '{}');
    if (progress[lesson.id]?.completed) {
      setIsCompleted(true);
    }
  }, [lesson.id]);

  const renderContent = () => {
    const { content } = lesson;

    return (
      <div className="prose max-w-none">
        {/* Introduction */}
        {content.introduction && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r">
            <p className="text-lg leading-relaxed mb-0">{content.introduction}</p>
          </div>
        )}

        {/* Sections */}
        {content.sections && content.sections.map((section: any, idx: number) => (
          <div key={idx} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>

            {section.content && (
              <p className="text-gray-700 leading-relaxed mb-6">{section.content}</p>
            )}

            {/* Examples */}
            {section.examples && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-green-900 mb-3">Examples:</h4>
                <ul className="space-y-2">
                  {section.examples.map((example: string, i: number) => (
                    <li key={i} className="text-gray-700" dangerouslySetInnerHTML={{ __html: example }} />
                  ))}
                </ul>
              </div>
            )}

            {/* Types/Categories */}
            {section.types && (
              <div className="space-y-4 mb-6">
                {section.types.map((type: any, i: number) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-5">
                    <h4 className="font-bold text-brand-primary mb-2">{type.name}</h4>
                    <p className="text-gray-700 mb-3">{type.description}</p>
                    {type.example && (
                      <div className="bg-gray-50 rounded p-3 text-sm text-gray-600">
                        <strong>Example:</strong> {type.example}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Terms/Definitions */}
            {section.terms && (
              <div className="space-y-4 mb-6">
                {section.terms.map((term: any, i: number) => (
                  <div key={i} className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r">
                    <dt className="font-bold text-purple-900 mb-1">{term.term}</dt>
                    <dd className="text-gray-700 mb-2">{term.definition}</dd>
                    {term.example && (
                      <dd className="text-sm text-purple-700 italic">Example: {term.example}</dd>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Deductions/Items List */}
            {section.deductions && (
              <div className="grid gap-4 mb-6">
                {section.deductions.map((item: any, i: number) => (
                  <div key={i} className="border border-gray-300 rounded-lg p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      {item.required && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Required</span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <div className="bg-gray-50 rounded p-3 text-sm space-y-1">
                      <div><strong>Calculation:</strong> {item.calculation}</div>
                      <div><strong>Example:</strong> {item.example}</div>
                      {item.note && (
                        <div className="text-blue-600 mt-2">💡 {item.note}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tip/Note */}
            {section.tip && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-900"><strong>💡 Tip:</strong> {section.tip}</p>
              </div>
            )}
          </div>
        ))}

        {/* Interactive Element Placeholder */}
        {content.interactive && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-8 mb-8 text-center">
            <h3 className="text-2xl font-bold mb-4">{content.interactive.title}</h3>
            <p className="text-gray-700 mb-6">{content.interactive.instruction || content.interactive.description}</p>
            <div className="bg-white rounded-lg p-6 inline-block">
              <p className="text-gray-500 italic">🎮 Interactive element: {content.interactive.type}</p>
              <p className="text-sm text-gray-400 mt-2">(Full interactive version coming soon!)</p>
            </div>
          </div>
        )}

        {/* Key Takeaways */}
        {content.keyTakeaways && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-8 mt-10">
            <h3 className="text-2xl font-bold mb-6 text-center">🎯 Key Takeaways</h3>
            <ul className="space-y-3">
              {content.keyTakeaways.map((takeaway: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800 text-lg">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-medium">
            Lesson {lesson.order}
          </span>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{lesson.estimatedMinutes} minutes</span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Completed</span>
            </div>
          )}
        </div>
        <h1 className="ws-display-lg mb-4">{lesson.title}</h1>
      </div>

      {/* Lesson Content */}
      <div className="ws-card mb-8">
        {renderContent()}
      </div>

      {/* Navigation & Actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            hasPrevious
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Previous Lesson
        </button>

        <div className="flex gap-4">
          {!isCompleted && (
            <button
              onClick={handleComplete}
              className="ws-button ws-button-secondary"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Mark Complete
            </button>
          )}

          {hasNext && (
            <button
              onClick={onNext}
              className="ws-button ws-button-primary flex items-center gap-2"
            >
              Next Lesson
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {!hasNext && isCompleted && (
            <button
              onClick={() => window.location.href = `/learn/modules/${lesson.id.split('-')[0]}/quiz`}
              className="ws-button ws-button-primary flex items-center gap-2"
            >
              Take Quiz
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
