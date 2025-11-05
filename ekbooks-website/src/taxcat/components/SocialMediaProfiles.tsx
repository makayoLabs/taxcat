'use client';

import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Youtube, Linkedin } from 'lucide-react';
import TikTokIcon from './icons/TikTokIcon';
import { cn } from '@/lib/utils';

const socialLinks = [
  {
    name: 'TikTok',
    icon: TikTokIcon,
    href: 'https://tiktok.com/@taxcat',
    color: 'hover:text-[#000000]',
    followers: '250K',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/taxcat',
    color: 'hover:text-[#E4405F]',
    followers: '120K',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/taxcat',
    color: 'hover:text-[#1DA1F2]',
    followers: '85K',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://facebook.com/taxcat',
    color: 'hover:text-[#1877F2]',
    followers: '95K',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    href: 'https://youtube.com/@taxcat',
    color: 'hover:text-[#FF0000]',
    followers: '75K',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/company/taxcat',
    color: 'hover:text-[#0A66C2]',
    followers: '45K',
  },
];

interface SocialMediaProfilesProps {
  className?: string;
  showFollowers?: boolean;
}

export default function SocialMediaProfiles({
  className,
  showFollowers = false,
}: SocialMediaProfilesProps) {
  return (
    <div className={cn('grid grid-cols-3 gap-4 sm:grid-cols-6', className)}>
      {socialLinks.map((_social) => (
        <motion.a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex flex-col items-center justify-center p-4',
          'rounded-xl border border-gray-200 bg-white',
          'transition-all duration-200 ease-in-out',
          'hover:border-gray-300 hover:shadow-lg',
          social.color
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <social.icon className="h-6 w-6" />
        {showFollowers && (
          <div className="mt-2 text-center">
            <p className="text-sm font-semibold text-gray-900">{social.followers}</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
        )}
      </motion.a>
    ))}
    </div>
  );
}
