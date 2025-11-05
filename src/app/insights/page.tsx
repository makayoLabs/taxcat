import React from 'react';

export default function Insights() {
  const articles = [
    {
      title: '2024 Canadian Tax Changes: What You Need to Know',
      excerpt: 'Stay ahead of the curve with our comprehensive guide to the latest tax legislation changes affecting Canadians.',
      category: 'Tax Updates',
      readTime: '5 min read',
      date: '2024-01-15',
      featured: true
    },
    {
      title: 'Maximizing RRSP Contributions: A Complete Guide',
      excerpt: 'Learn how to optimize your RRSP contributions to reduce your tax liability and build retirement savings.',
      category: 'Planning',
      readTime: '8 min read',
      date: '2024-01-10',
      featured: false
    },
    {
      title: 'Self-Employment Taxes: Everything Freelancers Need to Know',
      excerpt: 'A comprehensive guide to GST/HST, income tax, and deductions for self-employed Canadians.',
      category: 'Business',
      readTime: '12 min read',
      date: '2024-01-08',
      featured: false
    },
    {
      title: 'Medical Expense Tax Credits: Don\'t Leave Money on the Table',
      excerpt: 'Discover all eligible medical expenses and how to claim the tax credit for maximum savings.',
      category: 'Deductions',
      readTime: '6 min read',
      date: '2024-01-05',
      featured: false
    },
    {
      title: 'CRA Audit Triggers: How to Avoid Common Pitfalls',
      excerpt: 'Understanding what flags your return for audit and how to minimize your risk.',
      category: 'Compliance',
      readTime: '7 min read',
      date: '2024-01-03',
      featured: false
    },
    {
      title: 'Capital Gains Tax: Strategies for Investors',
      excerpt: 'Optimize your investment portfolio with tax-efficient strategies for long-term wealth building.',
      category: 'Investing',
      readTime: '10 min read',
      date: '2024-01-01',
      featured: false
    }
  ];

  const categories = ['All', 'Tax Updates', 'Planning', 'Business', 'Deductions', 'Compliance', 'Investing'];

  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">Tax Insights & Education</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Stay informed with expert tax knowledge
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Comprehensive guides, tax updates, and planning strategies to help you make informed financial decisions.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className="ws-button ws-button-secondary"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {articles.find(article => article.featured) && (
        <section className="ws-section ws-section-alt">
          <div className="ws-container">
            <div className="ws-card">
              <div className="ws-grid">
                <div className="ws-col-12 md:ws-col-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-brand-primary text-white rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="ws-text-sm ws-color-muted">
                      {articles.find(article => article.featured)?.category}
                    </span>
                  </div>
                  <h2 className="ws-display-md ws-balance mb-4">
                    {articles.find(article => article.featured)?.title}
                  </h2>
                  <p className="ws-text-lg ws-color-muted mb-6">
                    {articles.find(article => article.featured)?.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="ws-text-sm ws-color-muted">
                      {articles.find(article => article.featured)?.readTime}
                    </span>
                    <span className="ws-text-sm ws-color-muted">
                      {new Date(articles.find(article => article.featured)?.date || '').toLocaleDateString()}
                    </span>
                  </div>
                  <button className="ws-button ws-button-primary">
                    Read Full Article
                  </button>
                </div>
                <div className="ws-col-12 md:ws-col-4">
                  <div className="bg-background-alt rounded-lg p-8 text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="ws-text-lg font-semibold">Tax Updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-grid">
            {articles.filter(article => !article.featured).map((article, index) => (
              <div key={index} className="ws-col-12 md:ws-col-6 lg:ws-col-4">
                <div className="ws-card h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-background-alt text-brand-primary rounded text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="ws-text-xl font-bold mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="ws-color-muted mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm ws-color-muted mb-4">
                    <span>{article.readTime}</span>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <button className="ws-button ws-button-secondary w-full">
                    Read Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="ws-section ws-section-accent">
        <div className="ws-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="ws-display-md ws-balance mb-4">
              Stay updated with tax insights
            </h2>
            <p className="ws-text-lg ws-color-muted mb-8">
              Get the latest tax news, planning tips, and expert advice delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="ws-input flex-1"
              />
              <button className="ws-button ws-button-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Popular Topics</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Frequently searched tax topics and common questions answered.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Tax Deductions</h3>
                <p className="ws-color-muted mb-4">
                  Complete guide to eligible deductions and credits.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Business Taxes</h3>
                <p className="ws-color-muted mb-4">
                  Everything self-employed individuals need to know.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Tax Deadlines</h3>
                <p className="ws-color-muted mb-4">
                  Important dates and filing requirements.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">CRA Compliance</h3>
                <p className="ws-color-muted mb-4">
                  Understanding CRA rules and requirements.
                </p>
                <button className="ws-button ws-button-secondary w-full">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ws-section-lg ws-section-accent">
        <div className="ws-container text-center">
          <h2 className="ws-display-lg ws-balance mb-6">
            Need personalized tax advice?
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-2xl mx-auto">
            Our certified tax professionals are here to help with your specific situation and questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ws-button ws-button-primary ws-button-lg">
              Get Expert Help
            </button>
            <button className="ws-button ws-button-secondary ws-button-lg">
              Start Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}