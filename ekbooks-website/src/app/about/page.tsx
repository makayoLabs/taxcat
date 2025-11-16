import React from 'react';
import TeamSection from '../../components/TeamSection';
import CTASection from '../../components/CTASection';

export default function About() {
  return (
    <div className="theme-ekbooks">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container">
          <div className="text-center">
            <span className="ws-eyebrow-sm">About EKBooks</span>
            <h1 className="ws-display-xl ws-balance mt-4 mb-6">
              Empowering Canadian businesses with trusted financial expertise
            </h1>
            <p className="ws-text-xl ws-color-muted">
              Innovative solutions and personalized service that drives success and peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="mb-12">
            <img
              src="/images/office/modern-office.jpg"
              alt="EKBooks modern professional accounting office"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6">
              <h2 className="ws-display-md ws-balance mb-6">Our Story</h2>
              <div className="space-y-6 ws-text-lg ws-color-muted leading-relaxed">
                <p>
                  Founded with a vision to revolutionize accounting services in Canada, EKBooks
                  combines deep-rooted financial expertise with cutting-edge technology to deliver
                  exceptional results for businesses of all sizes.
                </p>
                <p>
                  Our team of certified professionals brings decades of combined experience in
                  Canadian tax law, corporate finance, and business advisory services. We understand
                  that every business is unique, which is why we tailor our approach to meet your
                  specific needs and goals.
                </p>
                <p>
                  From startups to established enterprises, we partner with our clients to navigate
                  complex financial landscapes, optimize tax strategies, and build sustainable
                  financial foundations for long-term success.
                </p>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-5 md:ws-col-start-8">
              <div className="ws-card">
                <h3 className="ws-text-2xl font-bold mb-6">Why choose EKBooks?</h3>
                <ul className="space-y-4">
                  {[
                    'Deep Canadian financial expertise and CRA compliance knowledge',
                    'Modern technology integrated with traditional accounting wisdom',
                    'Client-focused approach with personalized attention',
                    'Proven track record of helping businesses thrive',
                    'Transparent pricing with no hidden fees',
                    'Responsive support when you need it most',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-brand-primary mr-3 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Our Values</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ws-text-xl font-bold mb-3">Trust</h3>
                <p className="ws-color-muted leading-relaxed">
                  Building lasting relationships through integrity, transparency, and reliable service.
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
                <h3 className="ws-text-xl font-bold mb-3">Innovation</h3>
                <p className="ws-color-muted leading-relaxed">
                  Embracing technology and modern methods to deliver cutting-edge financial solutions.
                </p>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="ws-text-xl font-bold mb-3">Personalized Service</h3>
                <p className="ws-color-muted leading-relaxed">
                  Treating every client as a partner, with customized solutions for their unique needs.
                </p>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <h3 className="ws-text-xl font-bold mb-3">Canadian Excellence</h3>
                <p className="ws-color-muted leading-relaxed">
                  Delivering world-class service with deep knowledge of Canadian business and tax laws.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-grid max-w-5xl mx-auto">
            <div className="ws-col-6 md:ws-col-3 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-brand-primary mb-2">500+</div>
              <div className="ws-text-sm ws-color-muted">Happy Clients</div>
            </div>
            <div className="ws-col-6 md:ws-col-3 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-brand-primary mb-2">15+</div>
              <div className="ws-text-sm ws-color-muted">Years Experience</div>
            </div>
            <div className="ws-col-6 md:ws-col-3 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-brand-primary mb-2">100%</div>
              <div className="ws-text-sm ws-color-muted">Accuracy Rate</div>
            </div>
            <div className="ws-col-6 md:ws-col-3 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-brand-primary mb-2">24/7</div>
              <div className="ws-text-sm ws-color-muted">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}