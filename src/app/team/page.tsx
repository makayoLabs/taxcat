import React from 'react';

export default function Team() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CPA, Tax Specialist',
      bio: '15+ years of experience in Canadian tax law with expertise in complex returns and audit defense.',
      certifications: ['CPA', 'T2 Specialist', 'Audit Certified'],
      image: '/images/team/sarah-johnson.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'CPA, Business Advisor',
      bio: 'Former Big 4 accountant specializing in corporate tax planning and business advisory services.',
      certifications: ['CPA', 'CBV', 'Tax Law Specialist'],
      image: '/images/team/michael-chen.jpg'
    },
    {
      name: 'Jennifer Smith',
      role: 'CPA, Senior Tax Consultant',
      bio: 'Expert in personal tax planning with a focus on maximizing deductions and credits for high-income earners.',
      certifications: ['CPA', 'Personal Tax Specialist', 'Wealth Management'],
      image: '/images/team/jennifer-smith.jpg'
    },
    {
      name: 'David Wilson',
      role: 'CPA, Technology Lead',
      bio: 'Combines accounting expertise with software development to create innovative tax solutions.',
      certifications: ['CPA', 'Software Engineering', 'Data Analytics'],
      image: '/images/team/david-wilson.jpg'
    }
  ];

  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">Expert Team</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            Meet the tax professionals behind TaxCat
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Our certified professionals bring decades of combined experience in Canadian tax law, ensuring your returns are accurate and optimized.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="ws-col-12 md:ws-col-6 lg:ws-col-3">
                <div className="ws-card text-center">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 bg-background-alt rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
                    <span className="text-text-muted text-4xl lg:text-5xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="ws-text-xl font-bold mb-2">{member.name}</h3>
                  <p className="ws-text-lg ws-color-muted mb-4">{member.role}</p>
                  <p className="ws-color-muted mb-6 leading-relaxed">{member.bio}</p>
                  <div className="space-y-2">
                    <p className="ws-text-sm font-semibold">Certifications:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.certifications.map((cert, idx) => (
                        <span key={idx} className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-medium">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Our Commitment to Excellence</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Every team member shares our core values that drive exceptional service and results.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Accuracy First</h3>
                <p className="ws-color-muted">
                  Every tax return undergoes rigorous review to ensure 100% accuracy and compliance.
                </p>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Fast Service</h3>
                <p className="ws-color-muted">
                  Quick turnaround without compromising quality. Most returns completed within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Expert Support</h3>
                <p className="ws-color-muted">
                  Direct access to certified tax professionals for personalized guidance and support.
                </p>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Maximum Refunds</h3>
                <p className="ws-color-muted">
                  Advanced algorithms find every possible deduction and credit to maximize your refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-3 text-center">
              <div className="text-4xl lg:text-5xl font-bold text-brand-primary mb-2">50K+</div>
              <div className="ws-text-sm ws-color-muted">Tax Returns Filed</div>
            </div>
            <div className="ws-col-12 md:ws-col-3 text-center">
              <div className="text-4xl lg:text-5xl font-bold text-brand-primary mb-2">$2.1M</div>
              <div className="ws-text-sm ws-color-muted">Refunds Maximized</div>
            </div>
            <div className="ws-col-12 md:ws-col-3 text-center">
              <div className="text-4xl lg:text-5xl font-bold text-brand-primary mb-2">99.8%</div>
              <div className="ws-text-sm ws-color-muted">Accuracy Rate</div>
            </div>
            <div className="ws-col-12 md:ws-col-3 text-center">
              <div className="text-4xl lg:text-5xl font-bold text-brand-primary mb-2">24/7</div>
              <div className="ws-text-sm ws-color-muted">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ws-section-lg ws-section-accent">
        <div className="ws-container text-center">
          <h2 className="ws-display-lg ws-balance mb-6">
            Work with our expert team
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-2xl mx-auto">
            Get personalized tax advice from certified professionals with decades of experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ws-button ws-button-primary ws-button-lg">
              Start Your Return
            </button>
            <button className="ws-button ws-button-secondary ws-button-lg">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}