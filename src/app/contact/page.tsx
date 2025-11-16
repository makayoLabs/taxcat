import React from 'react';

export default function Contact() {
  return (
    <div className="theme-taxcat">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container text-center">
          <span className="ws-eyebrow-sm">Get in Touch</span>
          <h1 className="ws-display-xl ws-balance mt-4 mb-6">
            We're here to help with your taxes
          </h1>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Have questions about your tax return? Need help getting started? Our expert team is ready to assist you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Call Us</h3>
                <p className="ws-color-muted mb-4">
                  Speak directly with a tax professional for immediate assistance.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">1-800-TAX-CAT-1</p>
                  <p className="ws-text-sm ws-color-muted">Mon-Fri: 9AM-6PM EST</p>
                </div>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Email Support</h3>
                <p className="ws-color-muted mb-4">
                  Send us your questions and we'll respond within 24 hours.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">support@taxcat.ca</p>
                  <p className="ws-text-sm ws-color-muted">24/7 email support</p>
                </div>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card text-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="ws-text-lg font-bold mb-3">Live Chat</h3>
                <p className="ws-color-muted mb-4">
                  Chat with our tax experts in real-time during business hours.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">Available Now</p>
                  <p className="ws-text-sm ws-color-muted">Mon-Fri: 9AM-6PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="ws-display-md ws-balance mb-4">
                Send us a message
              </h2>
              <p className="ws-text-lg ws-color-muted">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="ws-card">
              <form className="space-y-6">
                <div className="ws-grid">
                  <div className="ws-col-12 md:ws-col-6">
                    <label className="ws-label" htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className="ws-input"
                      placeholder="John"
                    />
                  </div>
                  <div className="ws-col-12 md:ws-col-6">
                    <label className="ws-label" htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className="ws-input"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="ws-label" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="ws-input"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="ws-label" htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="ws-input"
                    placeholder="(416) 555-0123"
                  />
                </div>

                <div>
                  <label className="ws-label" htmlFor="subject">Subject</label>
                  <select id="subject" className="ws-input">
                    <option>General Inquiry</option>
                    <option>Tax Filing Help</option>
                    <option>Business Taxes</option>
                    <option>Self-Employment Taxes</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="ws-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    className="ws-input"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button type="submit" className="ws-button ws-button-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Visit Our Office</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Located in the heart of downtown Toronto, our office is easily accessible by public transit.
            </p>
          </div>

          <div className="ws-grid">
            <div className="ws-col-12 md:ws-col-8">
              <div className="ws-card">
                <div className="ws-grid">
                  <div className="ws-col-12 md:ws-col-6">
                    <h3 className="ws-text-xl font-bold mb-4">Toronto Office</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <p className="font-semibold">Address</p>
                          <p className="ws-color-muted">123 King Street East<br />Toronto, ON M5C 1G6</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                          <p className="font-semibold">Phone</p>
                          <p className="ws-color-muted">1-800-TAX-CAT-1</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-semibold">Hours</p>
                          <p className="ws-color-muted">Mon-Fri: 9AM-6PM EST<br />Sat-Sun: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ws-col-12 md:ws-col-6">
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src="/images/contact/meeting-room.jpg"
                        alt="Modern professional conference room"
                        className="w-full h-full object-cover"
                      />
                      <div className="bg-background-alt p-4 text-center">
                        <p className="ws-text-md font-semibold">Modern Office Building</p>
                        <p className="ws-text-sm ws-color-muted mt-1">
                          Located in the financial district with easy access to Union Station
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ws-col-12 md:ws-col-4">
              <div className="ws-card">
                <h3 className="ws-text-lg font-bold mb-4">Getting Here</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-1">By Subway</p>
                    <p className="ws-text-sm ws-color-muted">King Station (Line 1) - 2 minute walk</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">By Streetcar</p>
                    <p className="ws-text-sm ws-color-muted">504 King, 505 Dundas - Direct routes</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">By Car</p>
                    <p className="ws-text-sm ws-color-muted">Paid parking available on-site</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">By Bike</p>
                    <p className="ws-text-sm ws-color-muted">Bike racks available at entrance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="ws-section ws-section-alt">
        <div className="ws-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">Frequently Asked Questions</h2>
            <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
              Quick answers to common questions about our services and processes.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="ws-card">
              <h3 className="ws-text-lg font-bold mb-2">How long does tax filing take?</h3>
              <p className="ws-color-muted">Most personal returns are completed within 24-48 hours. Complex business returns may take 3-5 business days.</p>
            </div>

            <div className="ws-card">
              <h3 className="ws-text-lg font-bold mb-2">Do you guarantee maximum refunds?</h3>
              <p className="ws-color-muted">Yes! Our advanced algorithms find every possible deduction and credit. If we don't maximize your refund, you pay nothing.</p>
            </div>

            <div className="ws-card">
              <h3 className="ws-text-lg font-bold mb-2">What documents do I need?</h3>
              <p className="ws-color-muted">We'll guide you through exactly what you need. Common documents include T4s, receipts, and investment statements.</p>
            </div>

            <div className="ws-card">
              <h3 className="ws-text-lg font-bold mb-2">Is my data secure?</h3>
              <p className="ws-color-muted">Absolutely. We use bank-level encryption and comply with PIPEDA privacy regulations. Your data is never shared.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ws-section-lg ws-section-accent">
        <div className="ws-container text-center">
          <h2 className="ws-display-lg ws-balance mb-6">
            Ready to get started?
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 max-w-2xl mx-auto">
            Contact us today and let our tax experts help you maximize your refund and minimize your stress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ws-button ws-button-primary ws-button-lg">
              Start Your Return
            </button>
            <button className="ws-button ws-button-secondary ws-button-lg">
              Call 1-800-TAX-CAT-1
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}