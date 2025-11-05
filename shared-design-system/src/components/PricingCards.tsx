/**
 * Pricing Cards Component
 * Flexible pricing card grid with featured/highlighted card option
 * Based on Wealthsimple's pricing section from tax.html
 */

import React from 'react';
import { colors, effects } from '../tokens';

interface PricingFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price?: {
    amount: string;
    period?: string;
    note?: string;
  };
  features: PricingFeature[];
  cta: {
    text: string;
    href: string;
    external?: boolean;
  };
  featured?: boolean;
  popular?: boolean;
}

interface PricingCardsProps {
  /** Array of pricing tiers */
  tiers: PricingTier[];

  /** Brand theme (taxcat or ekbooks) */
  brand?: 'taxcat' | 'ekbooks';

  /** Custom class name */
  className?: string;

  /** Layout columns (default: auto-fit) */
  columns?: number | 'auto';

  /** Show feature comparison table */
  showComparison?: boolean;

  /** Disclaimer text */
  disclaimer?: string;
}

const PricingCards: React.FC<PricingCardsProps> = ({
  tiers,
  brand = 'taxcat',
  className = '',
  columns = 'auto',
  showComparison = false,
  disclaimer
}) => {
  const brandColors = brand === 'taxcat' ? colors.taxcat : colors.ekbooks;

  const gridColumns = columns === 'auto'
    ? 'repeat(auto-fit, minmax(280px, 1fr))'
    : `repeat(${columns}, 1fr)`;

  return (
    <div className={`pricing-cards ${className}`}>
      <div className="pricing-grid" style={{ gridTemplateColumns: gridColumns }}>
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`pricing-card ${tier.featured ? 'featured' : ''} ${tier.popular ? 'popular' : ''}`}
          >
            {/* Card Header */}
            <div className="card-header">
              <div className="card-title-section">
                <h3 className="card-title">{tier.name}</h3>
                {tier.popular && (
                  <span className="popular-badge">Most Popular</span>
                )}
              </div>
              <p className="card-description">{tier.description}</p>
            </div>

            {/* Pricing */}
            {tier.price && (
              <div className="card-pricing">
                <div className="price-display">
                  <span className="price-amount">{tier.price.amount}</span>
                  {tier.price.period && (
                    <span className="price-period">{tier.price.period}</span>
                  )}
                </div>
                {tier.price.note && (
                  <p className="price-note">{tier.price.note}</p>
                )}
              </div>
            )}

            {/* Features */}
            <div className="card-features">
              <ul className="features-list">
                {tier.features.map((feature, index) => (
                  <li key={index} className={`feature-item ${feature.included ? 'included' : 'excluded'}`}>
                    <span className="feature-icon" aria-hidden="true">
                      {feature.included ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="feature-text">{feature.text}</span>
                    {feature.tooltip && (
                      <button
                        className="feature-tooltip-trigger"
                        aria-label={`More information about ${feature.text}`}
                        onClick={(e) => {
                          // Handle tooltip display
                          e.preventDefault();
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M7 0C3.134 0 0 3.134 0 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm.7 10.5H6.3v-4h1.4v4zm0-5.6H6.3V3.5h1.4v1.4z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="card-cta">
              <a
                href={tier.cta.href}
                className="cta-button"
                {...(tier.cta.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <span>{tier.cta.text}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      {disclaimer && (
        <div className="pricing-disclaimer">
          <p>{disclaimer}</p>
        </div>
      )}

      <style jsx>{`
        .pricing-cards {
          width: 100%;
        }

        .pricing-grid {
          display: grid;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .pricing-grid {
            gap: 1.5rem;
          }
        }

        .pricing-card {
          background: ${colors.base.white};
          border-radius: ${effects.borderRadius.xl};
          padding: 2rem;
          box-shadow: ${effects.boxShadow.DEFAULT};
          border: 2px solid transparent;
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .pricing-card:hover {
          box-shadow: ${effects.boxShadow.lg};
          transform: translateY(-4px);
        }

        .pricing-card.featured {
          border-color: ${brandColors.primary};
          box-shadow: ${effects.boxShadow['primary-sm']};
        }

        .pricing-card.popular {
          position: relative;
        }

        .pricing-card.popular::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, ${brandColors.primary}, ${brandColors.secondary});
        }

        /* Card Header */
        .card-header {
          margin-bottom: 2rem;
        }

        .card-title-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${colors.primary[800]};
          margin: 0;
        }

        .popular-badge {
          background: ${brandColors.primary};
          color: ${colors.base.white};
          padding: 0.25rem 0.75rem;
          border-radius: ${effects.borderRadius.full};
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .card-description {
          color: ${colors.primary[600]};
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0;
        }

        /* Pricing */
        .card-pricing {
          margin-bottom: 2rem;
          text-align: center;
        }

        .price-display {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .price-amount {
          font-size: 2.5rem;
          font-weight: 700;
          color: ${colors.primary[800]};
          line-height: 1;
        }

        @media (min-width: 768px) {
          .price-amount {
            font-size: 3rem;
          }
        }

        .price-period {
          font-size: 1rem;
          color: ${colors.primary[600]};
          font-weight: 400;
        }

        .price-note {
          font-size: 0.875rem;
          color: ${colors.primary[500]};
          margin: 0;
        }

        /* Features */
        .card-features {
          margin-bottom: 2rem;
        }

        .features-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.5rem 0;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .feature-item.included {
          color: ${colors.primary[700]};
        }

        .feature-item.excluded {
          color: ${colors.primary[400]};
        }

        .feature-icon {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          margin-top: 0.125rem;
        }

        .feature-item.included .feature-icon {
          color: ${colors.semantic.success};
        }

        .feature-item.excluded .feature-icon {
          color: ${colors.primary[400]};
        }

        .feature-text {
          flex: 1;
        }

        .feature-tooltip-trigger {
          background: none;
          border: none;
          color: ${colors.primary[400]};
          cursor: pointer;
          padding: 0.25rem;
          border-radius: ${effects.borderRadius.sm};
          transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-tooltip-trigger:hover,
        .feature-tooltip-trigger:focus {
          color: ${brandColors.primary};
          outline: none;
        }

        /* CTA Button */
        .card-cta {
          margin-top: auto;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 1rem 2rem;
          background: ${brandColors.primary};
          color: ${colors.base.white};
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          border-radius: ${effects.borderRadius.md};
          box-shadow: ${effects.boxShadow.sm};
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid ${brandColors.primary};
        }

        .cta-button:hover,
        .cta-button:focus {
          background: ${brandColors.primaryDark};
          border-color: ${brandColors.primaryDark};
          box-shadow: ${effects.boxShadow.md};
          transform: translateY(-1px);
          outline: none;
        }

        .pricing-card.featured .cta-button {
          background: ${brandColors.primary};
          border-color: ${brandColors.primary};
        }

        /* Disclaimer */
        .pricing-disclaimer {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid ${colors.primary[200]};
          text-align: center;
        }

        .pricing-disclaimer p {
          font-size: 0.875rem;
          color: ${colors.primary[500]};
          line-height: 1.4;
          margin: 0;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .pricing-card {
            padding: 1.5rem;
          }

          .card-title {
            font-size: 1.25rem;
          }

          .price-amount {
            font-size: 2rem;
          }

          .cta-button {
            padding: 0.875rem 1.5rem;
            font-size: 0.875rem;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .pricing-card {
            border: 2px solid ${colors.primary[300]};
          }

          .pricing-card.featured {
            border-color: ${brandColors.primary};
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .pricing-card,
          .cta-button {
            transition: none;
          }

          .pricing-card:hover {
            transform: none;
          }

          .cta-button:hover,
          .cta-button:focus {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PricingCards;