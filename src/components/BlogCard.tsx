import React from 'react'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  image: string
  date: string
  readTime: string
  slug: string
}

interface BlogCardProps {
  post: BlogPost
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="card overflow-hidden group hover:shadow-xl">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-accent-gold text-white text-xs font-medium rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-text-light mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-text-dark mb-3 line-clamp-2 group-hover:text-primary-navy transition-colors duration-200">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-light text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read More */}
        <button className="flex items-center gap-2 text-primary-navy font-medium text-sm hover:text-primary-blue transition-colors duration-200">
          Read More
          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </article>
  )
}

export default BlogCard 