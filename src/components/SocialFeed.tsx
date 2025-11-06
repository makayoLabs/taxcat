'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockPosts = [
  {
    id: 1,
    title: 'How to Save $1000 on Your Taxes 💰',
    thumbnail: '/images/tax-tips-1.jpg',
    views: '1.2M',
    likes: '250K',
    comments: '1.2K',
    shares: '15K',
  },
  {
    id: 2,
    title: "Tax Secrets They Don't Want You to Know! 🤫",
    thumbnail: '/images/tax-tips-2.jpg',
    views: '890K',
    likes: '180K',
    comments: '956',
    shares: '12K',
  },
  {
    id: 3,
    title: 'Student Tax Returns Made Easy 📚',
    thumbnail: '/images/tax-tips-3.jpg',
    views: '750K',
    likes: '145K',
    comments: '823',
    shares: '9.5K',
  },
  {
    id: 4,
    title: 'Self-Employed? Watch This! 💼',
    thumbnail: '/images/tax-tips-4.jpg',
    views: '680K',
    likes: '120K',
    comments: '745',
    shares: '8.2K',
  },
];

interface SocialFeedProps {
  className?: string;
}

export default function SocialFeed({ className }: SocialFeedProps): void {
  return (
    <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2', className)}>
      {mockPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative overflow-hidden rounded-2xl bg-white shadow-lg"
        >
          {/* Thumbnail */}
          <div className="relative aspect-[9/16] bg-gray-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-12 w-12 text-gray-400" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">{post.title}</h3>

            {/* Stats */}
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Share2 className="h-4 w-4" />
                <span>{post.shares}</span>
              </div>
            </div>

            {/* Views */}
            <div className="mt-2 text-sm text-gray-500">{post.views} views</div>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-200 hover:opacity-100">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-sm font-medium">Tap to watch</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
