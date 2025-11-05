import React from 'react';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$299',
    period: '/month',
    description: 'Perfect for small businesses and startups getting established.',
    features: [
      'Monthly bookkeeping',
      'Basic tax preparation',
      'Email support',
      'Financial reports',
      'Up to 50 transactions/month',
    ],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$599',
    period: '/month',
    description: 'Comprehensive services for growing businesses with complex needs.',
    features: [
      'All Starter benefits',
      'Advanced tax planning',
      'Payroll processing',
      'Priority support',
      'Unlimited transactions',
      'Quarterly reviews',
    ],
    cta: 'Get started',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: '$1,299',
    period: '/month',
    description: 'Full-service financial management with dedicated CFO support.',
    features: [
      'All Professional benefits',
      'Dedicated CFO services',
      'Strategic planning',
      'Audit protection',
      'Custom reporting',
      'Monthly consultations',
    ],
    cta: 'Contact us',
    highlighted: false,
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="ws-section-lg ws-section-dark">
      <div className="ws-container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="ws-display-md ws-balance mb-4 lg:mb-6">
            Pick the plan that's right for you
          </h2>
          <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
            Transparent pricing with no hidden fees. All plans include our maximum value guarantee.
          </p>
        </div>

        <div className="ws-grid max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="ws-col-12 md:ws-col-4">
              <div className={`ws-card h-full flex flex-col ${plan.highlighted ? 'border-2 border-brand-primary' : ''}`}>
                {plan.badge && (
                  <div className="bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-semibold inline-block self-start mb-4">
                    {plan.badge}
                  </div>
                )}

                <h3 className="ws-text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="ws-text-md ws-color-muted mb-6 min-h-[3rem]">{plan.description}</p>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl lg:text-5xl font-bold">{plan.price}</span>
                    <span className="ws-text-lg ws-color-muted ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm ws-color-muted">
                      <span className="text-brand-primary mr-2 flex-shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`ws-button w-full ${plan.highlighted ? 'ws-button-primary' : 'ws-button-secondary'}`}>
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center ws-text-sm ws-color-muted mt-12 max-w-3xl mx-auto">
          All plans include our maximum value guarantee. Custom enterprise solutions available for larger organizations.
          <a href="/contact" className="text-brand-primary hover:underline ml-1">Contact us</a> to discuss your needs.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;