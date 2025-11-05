'use client';

import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    label: 'Happy Clients',
    value: '250K+',
    icon: Users,
    description: 'Trusted by creators and professionals',
  },
  {
    label: 'Average Refund',
    value: '$2,850',
    icon: DollarSign,
    description: 'Get the refund you deserve',
  },
  {
    label: 'Success Rate',
    value: '99.9%',
    icon: TrendingUp,
    description: 'Accurate and timely filing',
  },
];

const testimonials = [
  {
    id: 1,
    name: '@dancingaccountant',
    role: 'TikTok Creator',
    content:
      'TaxCat made filing my taxes so easy! Their interface is super intuitive and the support team is amazing. 🙌',
    rating: 5,
    platform: 'TikTok',
    followers: '1.2M',
  },
  {
    id: 2,
    name: '@techstartupguru',
    role: 'Entrepreneur',
    content:
      'Finally, a tax service that understands digital creators! The process was smooth and I got a bigger refund than expected.',
    rating: 5,
    platform: 'Instagram',
    followers: '500K',
  },
  {
    id: 3,
    name: '@financefluencer',
    role: 'Financial Advisor',
    content:
      "As someone who knows taxes, I'm impressed by TaxCat's attention to detail and modern approach. Highly recommend!",
    rating: 5,
    platform: 'YouTube',
    followers: '750K',
  },
];

interface SocialProofProps {
  className?: string;
}

export default function SocialProof({ className }: SocialProofProps): JSX.Element {
  return (
    <div className={cn('space-y-12', className)}>
      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <stat.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            <p className="mt-1 text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="mt-2 text-xs text-gray-400">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
              <div className="flex items-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <p className="mt-4 text-gray-600">{testimonial.content}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{testimonial.platform}</span>
              <span>{testimonial.followers} followers</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
