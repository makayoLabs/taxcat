import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "EKBooks transformed our financial operations. Their expertise in Canadian tax law saved us thousands and gave us peace of mind.",
      author: "Jennifer Martinez",
      role: "CEO",
      company: "TechStart Solutions",
      rating: 5,
    },
    {
      quote: "Professional, responsive, and incredibly knowledgeable. They've been our accounting partners for 3 years and we couldn't be happier.",
      author: "David Chen",
      role: "Founder",
      company: "GreenLeaf Consulting",
      rating: 5,
    },
    {
      quote: "The team's attention to detail and proactive approach to tax planning has been invaluable for our growing business.",
      author: "Sarah Thompson",
      role: "Operations Manager",
      company: "Northern Logistics",
      rating: 5,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="ws-section ws-section-alt">
      <div className="ws-container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="ws-display-md ws-balance mb-4">What Our Clients Say</h2>
          <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
            Don't just take our word for it. Here's what Canadian business owners say about working with EKBooks.
          </p>
        </div>

        <div className="ws-grid mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="ws-col-12 md:ws-col-4">
              <div className="ws-card text-center">
                <div className="flex justify-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <blockquote className="ws-text-lg leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-brand-primary ws-text-sm">{testimonial.role}</div>
                  <div className="ws-color-muted ws-text-sm">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-6 lg:space-x-8 bg-white rounded-lg shadow-sm px-6 lg:px-8 py-4">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-brand-primary">500+</div>
              <div className="ws-text-sm ws-color-muted">Happy Clients</div>
            </div>
            <div className="w-px h-10 lg:h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-brand-primary">98%</div>
              <div className="ws-text-sm ws-color-muted">Satisfaction Rate</div>
            </div>
            <div className="w-px h-10 lg:h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-brand-primary">15+</div>
              <div className="ws-text-sm ws-color-muted">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;