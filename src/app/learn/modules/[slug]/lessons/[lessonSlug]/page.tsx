'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import LessonViewer from '@/components/education/LessonViewer';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const [module, setModule] = useState<any>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [params.slug, params.lessonSlug]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/education/modules/${params.slug}`);
      const data = await response.json();

      if (data.success) {
        setModule(data.module);
        const foundLesson = data.module.lessons.find((l: any) => l.slug === params.lessonSlug);
        setLesson(foundLesson);
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (lesson && module) {
      const currentIndex = module.lessons.findIndex((l: any) => l.id === lesson.id);
      if (currentIndex < module.lessons.length - 1) {
        const nextLesson = module.lessons[currentIndex + 1];
        router.push(`/learn/modules/${params.slug}/lessons/${nextLesson.slug}`);
      } else {
        router.push(`/learn/modules/${params.slug}/quiz`);
      }
    }
  };

  const handlePrevious = () => {
    if (lesson && module) {
      const currentIndex = module.lessons.findIndex((l: any) => l.id === lesson.id);
      if (currentIndex > 0) {
        const prevLesson = module.lessons[currentIndex - 1];
        router.push(`/learn/modules/${params.slug}/lessons/${prevLesson.slug}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!lesson || !module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <button
            onClick={() => router.push(`/learn/modules/${params.slug}`)}
            className="ws-button ws-button-primary"
          >
            Back to Module
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = module.lessons.findIndex((l: any) => l.id === lesson.id);

  return (
    <div className="theme-taxcat min-h-screen">
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <LessonViewer
            lesson={lesson}
            onNext={handleNext}
            onPrevious={handlePrevious}
            hasNext={currentIndex < module.lessons.length - 1}
            hasPrevious={currentIndex > 0}
          />
        </div>
      </section>
    </div>
  );
}
