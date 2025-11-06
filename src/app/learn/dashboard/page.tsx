'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Award, TrendingUp, Clock, CheckCircle, Target } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalPoints: 0,
    level: 1,
    modulesCompleted: 0,
    lessonsCompleted: 0,
    badges: [] as any[],
    currentStreak: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
    loadModules();
  }, []);

  const loadStats = () => {
    const progress = JSON.parse(localStorage.getItem('taxcat-edu-progress') || '{}');
    const quizResults = JSON.parse(localStorage.getItem('taxcat-quiz-results') || '{}');

    const lessonsCompleted = Object.keys(progress).filter(key => progress[key].completed).length;
    const modulesCompleted = Object.keys(quizResults).filter(key => quizResults[key].passed).length;

    let totalPoints = 0;
    Object.values(quizResults).forEach((result: any) => {
      if (result.pointsAwarded) {
        totalPoints += result.pointsAwarded;
      }
    });

    const badges: any[] = [];
    if (modulesCompleted > 0) {
      badges.push({
        type: 'TAX_BASICS',
        name: 'Tax Basics Master',
        earnedAt: new Date().toISOString(),
      });
    }
    if (lessonsCompleted >= 1) {
      badges.push({
        type: 'FIRST_MODULE',
        name: 'First Steps',
        earnedAt: new Date().toISOString(),
      });
    }

    const level = Math.floor(totalPoints / 100) + 1;

    setStats({
      totalPoints,
      level,
      modulesCompleted,
      lessonsCompleted,
      badges,
      currentStreak: 1, // Would calculate from actual activity dates
    });
  };

  const loadModules = async () => {
    try {
      const response = await fetch('/api/education/modules');
      const data = await response.json();
      if (data.success) {
        setModules(data.modules);
      }
    } catch (error) {
      console.error('Error loading modules:', error);
    }
  };

  const pointsToNextLevel = (stats.level * 100) - stats.totalPoints;

  return (
    <div className="theme-taxcat min-h-screen">
      {/* Header */}
      <section className="ws-section-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="ws-container">
          <h1 className="ws-display-xl mb-4">Learning Dashboard</h1>
          <p className="ws-text-xl text-white/90">Track your progress and continue your financial literacy journey!</p>
        </div>
      </section>

      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Level */}
            <div className="ws-card bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8" />
                <span className="text-sm opacity-80">Level</span>
              </div>
              <div className="text-4xl font-bold mb-2">{stats.level}</div>
              <div className="text-sm opacity-90">
                {pointsToNextLevel} pts to level {stats.level + 1}
              </div>
            </div>

            {/* Total Points */}
            <div className="ws-card bg-gradient-to-br from-green-500 to-teal-500 text-white">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8" />
                <span className="text-sm opacity-80">Total Points</span>
              </div>
              <div className="text-4xl font-bold mb-2">{stats.totalPoints}</div>
              <div className="text-sm opacity-90">Keep earning!</div>
            </div>

            {/* Modules Completed */}
            <div className="ws-card bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8" />
                <span className="text-sm opacity-80">Modules</span>
              </div>
              <div className="text-4xl font-bold mb-2">{stats.modulesCompleted}</div>
              <div className="text-sm opacity-90">{modules.length} available</div>
            </div>

            {/* Badges */}
            <div className="ws-card bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8" />
                <span className="text-sm opacity-80">Badges</span>
              </div>
              <div className="text-4xl font-bold mb-2">{stats.badges.length}</div>
              <div className="text-sm opacity-90">Achievements earned</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Continue Learning */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>

              {stats.modulesCompleted === 0 ? (
                <div className="ws-card bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-brand-primary text-white flex items-center justify-center text-2xl font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Start with Tax Basics</h3>
                      <p className="text-gray-600 mb-4">
                        Learn the fundamentals of Canadian taxes in just 45 minutes
                      </p>
                      <Link href="/learn/modules/tax-basics-for-teens">
                        <button className="ws-button ws-button-primary">
                          Start Module
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {modules.map((module) => (
                    <Link key={module.id} href={`/learn/modules/${module.slug}`}>
                      <div className="ws-card hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center">
                            <BookOpen className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold">{module.title}</h3>
                            <p className="text-sm text-gray-600">
                              {module.lessonsCount} lessons • {module.estimatedMinutes} min
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600 mb-1">{module.progress || 0}%</div>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-brand-primary h-2 rounded-full"
                                style={{ width: `${module.progress || 0}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Recent Activity */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                {stats.lessonsCompleted > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Completed {stats.lessonsCompleted} lessons</span>
                    </div>
                    {stats.badges.length > 0 && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <Award className="w-5 h-5 text-yellow-600" />
                        <span>Earned {stats.badges.length} badges</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">Start learning to see your activity here!</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Badges */}
              <div className="ws-card mb-6">
                <h3 className="font-bold text-lg mb-4">Your Badges</h3>
                {stats.badges.length > 0 ? (
                  <div className="space-y-3">
                    {stats.badges.map((badge, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                        <Award className="w-8 h-8 text-yellow-600" />
                        <div>
                          <div className="font-medium">{badge.name}</div>
                          <div className="text-xs text-gray-600">
                            {new Date(badge.earnedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">
                    Complete modules to earn badges!
                  </p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="ws-card">
                <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/learn/modules">
                    <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      Browse Modules
                    </button>
                  </Link>
                  <Link href="/learn/achievements">
                    <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      View Achievements
                    </button>
                  </Link>
                  <Link href="/learn/leaderboard">
                    <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      Leaderboard
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
