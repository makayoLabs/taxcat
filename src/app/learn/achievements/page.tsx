'use client';

import React from 'react';
import { Award, Lock } from 'lucide-react';

const allBadges = [
  { id: 1, name: 'Tax Basics Master', description: 'Complete Tax Basics for Teens module', unlocked: true },
  { id: 2, name: 'First Steps', description: 'Complete your first lesson', unlocked: true },
  { id: 3, name: '7-Day Streak', description: 'Learn for 7 days in a row', unlocked: false },
  { id: 4, name: 'Perfect Score', description: 'Get 100% on any quiz', unlocked: false },
  { id: 5, name: 'Fast Learner', description: 'Complete a module in under 30 minutes', unlocked: false },
  { id: 6, name: 'Quiz Master', description: 'Pass 5 quizzes', unlocked: false },
];

export default function AchievementsPage() {
  return (
    <div className="theme-taxcat min-h-screen">
      <section className="ws-section-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
        <div className="ws-container text-center">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h1 className="ws-display-xl mb-4">Achievements & Badges</h1>
          <p className="ws-text-xl text-white/90">Collect badges as you master financial literacy!</p>
        </div>
      </section>

      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBadges.map((badge) => (
              <div
                key={badge.id}
                className={`ws-card ${badge.unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300' : 'opacity-50'}`}
              >
                <div className="text-center">
                  {badge.unlocked ? (
                    <Award className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                  ) : (
                    <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  )}
                  <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                  {badge.unlocked && (
                    <div className="mt-4 text-sm text-green-600 font-medium">✓ Unlocked</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
