'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import QuizEngine from '@/components/education/QuizEngine';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModule();
  }, [params.slug]);

  const fetchModule = async () => {
    try {
      const response = await fetch(`/api/education/modules/${params.slug}`);
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

  const handleComplete = (result: any) => {
    console.log('Quiz completed:', result);
    // Result is already saved in QuizEngine component
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!module || !module.quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz Not Found</h1>
          <button
            onClick={() => router.push('/learn/modules')}
            className="ws-button ws-button-primary"
          >
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-taxcat min-h-screen">
      <section className="ws-section ws-section-primary">
        <div className="ws-container py-12">
          <QuizEngine
            quiz={module.quiz}
            moduleId={module.id}
            onComplete={handleComplete}
          />
        </div>
      </section>
    </div>
  );
}
