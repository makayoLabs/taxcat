import React from 'react';

const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      stat: '500+',
      label: 'Happy Clients',
      icon: '👥',
    },
    {
      stat: '10+',
      label: 'Years Experience',
      icon: '📅',
    },
    {
      stat: '99%',
      label: 'Client Satisfaction',
      icon: '⭐',
    },
    {
      stat: '24/7',
      label: 'Support Available',
      icon: '💬',
    },
  ];

  return (
    <section className="section bg-background-alt">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {indicators.map((indicator, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{indicator.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-accent-green mb-2">
                {indicator.stat}
              </div>
              <div className="text-sm md:text-base text-text-muted uppercase tracking-wide">
                {indicator.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;