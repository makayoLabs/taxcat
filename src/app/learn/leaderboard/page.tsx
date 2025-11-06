'use client';

import React from 'react';
import { Trophy, TrendingUp, Award } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Alex S.', points: 450, level: 5, badges: 8 },
  { rank: 2, name: 'Jordan M.', points: 380, level: 4, badges: 6 },
  { rank: 3, name: 'Taylor K.', points: 320, level: 4, badges: 5 },
  { rank: 4, name: 'Morgan L.', points: 280, level: 3, badges: 4 },
  { rank: 5, name: 'Casey R.', points: 250, level: 3, badges: 4 },
];

export default function LeaderboardPage() {
  return (
    <div className="theme-taxcat min-h-screen">
      <section className="ws-section-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="ws-container text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4" />
          <h1 className="ws-display-xl mb-4">Leaderboard</h1>
          <p className="ws-text-xl text-white/90">See how you rank against other learners!</p>
        </div>
      </section>

      <section className="ws-section ws-section-primary">
        <div className="ws-container max-w-4xl">
          <div className="ws-card">
            <div className="space-y-4">
              {leaderboardData.map((user, idx) => (
                <div
                  key={user.rank}
                  className={`flex items-center gap-6 p-6 rounded-lg ${
                    idx < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    idx === 0 ? 'bg-yellow-400 text-white' :
                    idx === 1 ? 'bg-gray-300 text-white' :
                    idx === 2 ? 'bg-orange-400 text-white' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {user.rank}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        Level {user.level}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {user.badges} badges
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-brand-primary">{user.points}</div>
                    <div className="text-sm text-gray-600">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>Keep learning to climb the leaderboard!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
