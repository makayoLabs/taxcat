import React from 'react';

const TrustIndicators: React.FC = () => {
  const stats = [
    { number: '500+', label: 'Happy clients' },
    { number: '10+', label: 'Years experience' },
    { number: '99%', label: 'Client satisfaction' },
    { number: '24/7', label: 'Support available' },
  ];

  return (
    <section className="ws-section ws-section-primary">
      <div className="ws-container">
        <div className="ws-grid">
          {stats.map((stat, index) => (
            <div key={index} className="ws-col-6 md:ws-col-3 text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="ws-text-sm uppercase tracking-wide font-medium ws-color-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;