'use client';

import React, { useEffect, useState } from 'react';
import ModuleCard from '@/components/education/ModuleCard';
import { BookOpen, TrendingUp, Award } from 'lucide-react';

export default function ModulesPage() {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await fetch('/api/education/modules');
      const data = await response.json();
      if (data.success) {
        setModules(data.modules);
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="theme-taxcat min-h-screen">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary border-b border-gray-200">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">TAXCAT LEARNING</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Master Tax & Financial Literacy
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 max-w-3xl mx-auto leading-relaxed">
            Interactive courses designed for high school students. Learn about Canadian taxes,
            understand your paycheque, and build essential money management skills.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <BookOpen className="w-8 h-8 text-brand-primary" />
              </div>
              <div className="ws-display-md text-brand-primary mb-2">{modules.length}</div>
              <p className="ws-text-md ws-color-muted">Learning Modules</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-brand-primary" />
              </div>
              <div className="ws-display-md text-brand-primary mb-2">45+</div>
              <p className="ws-text-md ws-color-muted">Minutes of Content</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Award className="w-8 h-8 text-brand-primary" />
              </div>
              <div className="ws-display-md text-brand-primary mb-2">10+</div>
              <p className="ws-text-md ws-color-muted">Badges to Earn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="mb-8">
            <h2 className="ws-display-md mb-4">Available Modules</h2>
            <p className="ws-text-lg ws-color-muted">
              Start with Tax Basics and unlock more modules as you progress!
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading modules...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          )}

          {modules.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-600">
              <p>No modules available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="ws-section-lg ws-section-accent">
        <div className="ws-container text-center">
          <h2 className="ws-display-lg ws-balance mb-6">
            Ready to start learning?
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 max-w-2xl mx-auto">
            Begin your financial literacy journey today and earn badges along the way!
          </p>
          <button
            onClick={() => window.location.href = '/learn/dashboard'}
            className="ws-button ws-button-primary ws-button-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </section>
    </div>
  );
}
