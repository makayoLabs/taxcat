'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Clock, BookOpen, Award, CheckCircle, Lock, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function ModuleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<any>({});

  useEffect(() => {
    fetchModule();
    loadProgress();
  }, [slug]);

  const fetchModule = async () => {
    try {
      const response = await fetch(`/api/education/modules/${slug}`);
      const data = await response.json();
      if (data.success) {
        setModule(data.module);
      }
    } catch (error) {
      console.error('Error fetching module:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = () => {
    const saved = JSON.parse(localStorage.getItem('taxcat-edu-progress') || '{}');
    setProgress(saved);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading module...</p>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
          <Link href="/learn/modules" className="ws-button ws-button-primary">
            Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  const completedLessons = module.lessons.filter((l: any) => progress[l.id]?.completed).length;
  const progressPercent = Math.round((completedLessons / module.lessons.length) * 100);

  return (
    <div className="theme-taxcat min-h-screen">
      {/* Module Header */}
      <section className="ws-section-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="ws-container">
          <Link href="/learn/modules" className="text-white/80 hover:text-white mb-4 inline-block">
            ← Back to Modules
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                  {module.category.replace(/_/g, ' ')}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                  {module.difficulty}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">{module.title}</h1>
              <p className="text-xl text-white/90 mb-8">{module.description}</p>

              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{module.estimatedMinutes} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{module.lessons.length} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>{module.pointsReward} points</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Your Progress</h3>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>{completedLessons} of {module.lessons.length} lessons</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div
                    className="bg-white h-3 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {completedLessons === 0 ? (
                <Link href={`/learn/modules/${slug}/lessons/${module.lessons[0].slug}`}>
                  <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                    <PlayCircle className="w-5 h-5" />
                    Start Learning
                  </button>
                </Link>
              ) : completedLessons < module.lessons.length ? (
                <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
                  Continue Learning
                </button>
              ) : (
                <Link href={`/learn/modules/${slug}/quiz`}>
                  <button className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                    <Award className="w-5 h-5" />
                    Take Final Quiz
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="ws-section ws-section-primary border-b border-gray-200">
        <div className="ws-container">
          <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {module.learningObjectives.map((objective: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lessons List */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <h2 className="text-2xl font-bold mb-8">Course Content</h2>

          <div className="space-y-4">
            {module.lessons.map((lesson: any, idx: number) => {
              const isCompleted = progress[lesson.id]?.completed;
              const isLocked = idx > 0 && !progress[module.lessons[idx - 1].id]?.completed;

              return (
                <Link
                  key={lesson.id}
                  href={isLocked ? '#' : `/learn/modules/${slug}/lessons/${lesson.slug}`}
                  className={`block ${isLocked ? 'cursor-not-allowed' : ''}`}
                >
                  <div className={`ws-card hover:shadow-md transition-all ${
                    isLocked ? 'opacity-50' : ''
                  }`}>
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        isCompleted ? 'bg-green-500 text-white' : isLocked ? 'bg-gray-300 text-gray-600' : 'bg-brand-primary text-white'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : isLocked ? (
                          <Lock className="w-6 h-6" />
                        ) : (
                          lesson.order
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{lesson.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {lesson.estimatedMinutes} min
                          </span>
                          <span className="capitalize">{lesson.contentType}</span>
                          {lesson.hasInteractive && (
                            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs font-medium">
                              Interactive
                            </span>
                          )}
                        </div>
                      </div>

                      {isCompleted && (
                        <div className="text-green-600 font-medium text-sm">
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quiz Card */}
          <div className="mt-8">
            <div className={`ws-card bg-gradient-to-r from-green-50 to-blue-50 border-2 ${
              completedLessons === module.lessons.length ? 'border-green-300' : 'border-gray-300 opacity-50'
            }`}>
              <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  completedLessons === module.lessons.length ? 'bg-green-500' : 'bg-gray-400'
                } text-white`}>
                  <Award className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{module.quiz.title}</h3>
                  <p className="text-sm text-gray-600">
                    {module.quiz.questions.length} questions • {module.quiz.passingScore}% to pass
                  </p>
                </div>

                {completedLessons === module.lessons.length ? (
                  <Link href={`/learn/modules/${slug}/quiz`}>
                    <button className="ws-button ws-button-primary">
                      Start Quiz
                    </button>
                  </Link>
                ) : (
                  <button className="ws-button ws-button-secondary cursor-not-allowed" disabled>
                    Complete All Lessons
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
