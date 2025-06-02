import React from 'react'
import BlogCard from './BlogCard'
import { ArrowRight } from 'lucide-react'

const InsightsSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: '2024 Tax Filing Deadlines: Everything You Need to Know',
      excerpt: 'Stay on top of important tax deadlines this year and avoid costly penalties. We break down all the key dates for personal and business tax filings.',
      category: 'Tax Planning',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'March 15, 2024',
      readTime: '5 min read',
      slug: '2024-tax-filing-deadlines'
    },
    {
      id: 2,
      title: 'Maximizing Small Business Tax Deductions',
      excerpt: 'Discover often-overlooked business expenses that could significantly reduce your tax burden. From home office costs to professional development.',
      category: 'Small Business',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'March 10, 2024',
      readTime: '7 min read',
      slug: 'maximizing-small-business-deductions'
    },
    {
      id: 3,
      title: 'Freelancer Tax Guide: What You Need to Track',
      excerpt: 'Essential tax tips for freelancers and independent contractors. Learn about quarterly payments, expense tracking, and avoiding common mistakes.',
      category: 'Freelance',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'March 5, 2024',
      readTime: '6 min read',
      slug: 'freelancer-tax-guide'
    },
    {
      id: 4,
      title: 'Retirement Planning: Tax-Efficient Strategies',
      excerpt: 'How to structure your retirement savings to minimize tax impact. RRSPs, TFSAs, and other tax-advantaged accounts explained.',
      category: 'Personal',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'February 28, 2024',
      readTime: '8 min read',
      slug: 'retirement-tax-strategies'
    }
  ]

  const categories = ['All', 'Tax Planning', 'Small Business', 'Freelance', 'Personal']

  return (
    <section id="insights" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mb-4">
            Tax Tips & Insights
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Stay informed with our latest tax advice, insights, and strategies to help you 
            file smarter and save more money.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                category === 'All'
                  ? 'bg-primary-navy text-white'
                  : 'bg-gray-100 text-text-dark hover:bg-primary-navy hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="btn-secondary flex items-center gap-2 mx-auto">
            Explore All Insights
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-br from-primary-navy to-primary-blue rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest tax tips, deadlines, and insights delivered straight to your inbox. 
            Join thousands of Canadians who trust TaxCat for their tax advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-gold"
            />
            <button className="btn-secondary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InsightsSection 