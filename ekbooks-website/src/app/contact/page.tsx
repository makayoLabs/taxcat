'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="theme-ekbooks">
      {/* Hero Section */}
      <section className="ws-section-lg ws-section-primary">
        <div className="ws-container">
          <div className="max-w-4xl mx-auto text-center">
            <span className="ws-eyebrow-sm">Get in Touch</span>
            <h1 className="ws-display-xl ws-balance mt-4 mb-6">
              Let's talk about your business
            </h1>
            <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 leading-relaxed">
              Ready to take your business finances to the next level? Our expert team is here to help.
            </p>

            <div className="ws-grid max-w-4xl mx-auto">
              <div className="ws-col-12 md:ws-col-4">
                <div className="ws-card text-center">
                  <div className="text-4xl mb-4">📞</div>
                  <h3 className="ws-text-lg font-bold mb-2">Call us</h3>
                  <p className="ws-color-muted">(123) 456-7890</p>
                  <p className="ws-text-sm ws-color-muted mt-1">Mon-Fri: 9am - 5pm EST</p>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-4">
                <div className="ws-card text-center">
                  <div className="text-4xl mb-4">✉️</div>
                  <h3 className="ws-text-lg font-bold mb-2">Email us</h3>
                  <p className="ws-color-muted">info@ekbooks.com</p>
                  <p className="ws-text-sm ws-color-muted mt-1">24-hour response time</p>
                </div>
              </div>
              <div className="ws-col-12 md:ws-col-4">
                <div className="ws-card text-center">
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="ws-text-lg font-bold mb-2">Visit us</h3>
                  <p className="ws-color-muted">123 Main St</p>
                  <p className="ws-color-muted">Toronto, ON M5V 1A1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="ws-section ws-section-primary">
        <div className="ws-container">
          <div className="ws-grid">
            {/* Contact Form */}
            <div className="ws-col-12 lg:ws-col-7">
              <h2 className="ws-display-md mb-8">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-text font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green transition-all ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-text font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-text font-medium mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green transition-all ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="(123) 456-7890"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-text font-medium mb-2">
                      Service inquiry *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green transition-all ${
                        errors.service ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a service</option>
                      <option value="tax">Tax Preparation</option>
                      <option value="bookkeeping">Bookkeeping</option>
                      <option value="payroll">Payroll</option>
                      <option value="cfo">CFO Services</option>
                      <option value="general">General Inquiry</option>
                    </select>
                    {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-text font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green transition-all ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your needs..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-background-accent border border-accent-green rounded-lg p-4 text-center">
                    <p className="text-accent-green font-semibold">Thank you! We'll get back to you within 24 hours.</p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-500 rounded-lg p-4 text-center">
                    <p className="text-red-500 font-semibold">Something went wrong. Please try again.</p>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="ws-col-12 lg:ws-col-5">
              <div className="ws-card sticky top-8">
                <h2 className="ws-text-2xl font-bold mb-8">Contact information</h2>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-background-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">Phone</h3>
                      <p className="text-text-muted">(123) 456-7890</p>
                      <p className="text-sm text-text-muted mt-1">Mon-Fri: 9am - 5pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-background-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">Email</h3>
                      <p className="text-text-muted">info@ekbooks.com</p>
                      <p className="text-sm text-text-muted mt-1">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-background-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">Office</h3>
                      <p className="text-text-muted">123 Main Street</p>
                      <p className="text-text-muted">Toronto, ON M5V 1A1</p>
                      <p className="text-text-muted">Canada</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-background-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">Business hours</h3>
                      <p className="text-text-muted">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-text-muted">Saturday: By appointment</p>
                      <p className="text-text-muted">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-primary mb-4">Follow us</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-background-accent rounded-full flex items-center justify-center hover:bg-accent-green hover:text-white transition-all"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-background-accent rounded-full flex items-center justify-center hover:bg-accent-green hover:text-white transition-all"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-background-accent rounded-full flex items-center justify-center hover:bg-accent-green hover:text-white transition-all"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="ws-col-12 lg:ws-col-5">
              <div className="ws-card">
                <h3 className="ws-text-2xl font-bold mb-6">Why choose EKBooks?</h3>
                <ul className="space-y-4">
                  {[
                    {
                      title: 'Fast response time',
                      description: 'Get answers to your questions within 24 hours, guaranteed.',
                    },
                    {
                      title: 'Expert guidance',
                      description: 'Work with certified professionals who understand Canadian business.',
                    },
                    {
                      title: 'Transparent pricing',
                      description: 'No hidden fees or surprise charges. Clear quotes upfront.',
                    },
                    {
                      title: 'Proven results',
                      description: 'Join 500+ businesses who trust us with their finances.',
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-6 h-6 text-accent-green mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <div className="font-semibold text-primary">{item.title}</div>
                        <div className="text-sm text-text-muted mt-1">{item.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}