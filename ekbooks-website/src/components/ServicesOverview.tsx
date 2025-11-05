import React from 'react';

const services = [
  {
    title: 'Tax Services',
    description: 'Professional tax preparation and compliance services for individuals, businesses, partnerships, and trusts.',
    icon: '📊',
    features: [
      'T1, T2, T3, and T5013 preparation',
      'Tax planning and optimization',
      'CRA compliance and audit support',
    ],
  },
  {
    title: 'Bookkeeping',
    description: 'Accurate and timely bookkeeping to keep your financial records organized and compliant.',
    icon: '📈',
    features: [
      'Monthly reconciliation',
      'Financial reporting',
      'Accounts payable/receivable',
    ],
  },
  {
    title: 'Payroll',
    description: 'Complete payroll processing and compliance management for businesses of all sizes.',
    icon: '💰',
    features: [
      'Payroll processing',
      'Government compliance',
      'Direct deposit and pay stubs',
    ],
  },
  {
    title: 'CFO Services',
    description: 'Strategic financial leadership and executive-level guidance for growing businesses.',
    icon: '🎯',
    features: [
      'Strategic planning',
      'Budgeting and forecasting',
      'Cash flow optimization',
    ],
  },
];

const ServicesOverview: React.FC = () => {
  return (
    <section className="ws-section ws-section-alt">
      <div className="ws-container">
        <div className="ws-grid">
          <div className="ws-col-12 md:ws-col-5">
            <h2 className="ws-display-md ws-balance">
              We guarantee your maximum value
            </h2>
          </div>
          <div className="ws-col-12 md:ws-col-6 md:ws-col-start-7">
            <div className="space-y-6">
              <div>
                <h3 className="ws-text-xl font-semibold mb-2">
                  Sophisticated features made simple
                </h3>
                <p className="ws-text-lg ws-color-muted">
                  Effective yet easy-to-use, every tool you need to seamlessly optimize your business finances is built right into our service.
                </p>
              </div>
              <div>
                <h3 className="ws-text-xl font-semibold mb-2">
                  Services that meet your needs
                </h3>
                <p className="ws-text-lg ws-color-muted">
                  Business finances aren't one size fits all. From tax filing to CFO services, pick what suits you best, and we'll take care of the rest.
                </p>
              </div>
              <div>
                <h3 className="ws-text-xl font-semibold mb-2">
                  Transparent pricing
                </h3>
                <p className="ws-text-lg ws-color-muted">
                  No hidden fees or surprise charges. Our services are priced fairly, with clear communication every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ws-grid mt-16">
          {services.map((service, index) => (
            <div key={index} className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <div className="ws-card">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="ws-text-xl font-bold mb-3">{service.title}</h3>
                <p className="ws-text-md ws-color-muted mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm ws-color-muted">
                      <span className="text-brand-primary mr-2 flex-shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;