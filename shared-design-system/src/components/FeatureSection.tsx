/**
 * Feature Section Component
 * Grid layout with heading and feature list
 * Based on Wealthsimple's feature sections from tax.html
 */

import React from 'react';
import { colors, effects } from '../tokens';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
  };
}

interface FeatureSectionProps {
  /** Section heading */
  heading: string;

  /** Section subheading */
  subheading?: string;

  /** Array of feature items */
  features: FeatureItem[];

  /** Layout variant */
  layout?: 'grid' | 'list' | 'cards';

  /** Number of columns (for grid layout) */
  columns?: 2 | 3 | 4;

  /** Background color */
  backgroundColor?: string;

  /** Text alignment */
  textAlign?: 'left' | 'center';

  /** Brand theme (taxcat or ekbooks) */
  brand?: 'taxcat' | 'ekbooks';

  /** Custom class name */
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  heading,
  subheading,
  features,
  layout = 'grid',
  columns = 3,
  backgroundColor,
  textAlign = 'left',
  brand = 'taxcat',
  className = ''
}) => {
  const brandColors = brand === 'taxcat' ? colors.taxcat : colors.ekbooks;

  const getGridColumns = () => {
    switch (columns) {
      case 2: return 'repeat(2, 1fr)';
      case 3: return 'repeat(auto-fit, minmax(280px, 1fr))';
      case 4: return 'repeat(auto-fit, minmax(240px, 1fr))';
      default: return 'repeat(auto-fit, minmax(280px, 1fr))';
    }
  };

  return (
    <section
      className={`feature-section ${className}`}
      style={{
        backgroundColor: backgroundColor || colors.background.DEFAULT,
        '--section-bg': backgroundColor || colors.background.DEFAULT
      } as React.CSSProperties}
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header" style={{ textAlign }}>
          <h2 className="section-heading">{heading}</h2>
          {subheading && (
            <p className="section-subheading">{subheading}</p>
          )}
        </div>

        {/* Features */}
        <div
          className={`features-container ${layout}`}
          style={{
            gridTemplateColumns: layout === 'grid' ? getGridColumns() : undefined
          }}
        >
          {features.map((feature) => (
            <div key={feature.id} className="feature-item">
              {/* Icon or Image */}
              {(feature.icon || feature.image) && (
                <div className="feature-media">
                  {feature.icon ? (
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                  ) : feature.image ? (
                    <img
                      src={feature.image.src}
                      alt={feature.image.alt}
                      className="feature-image"
                      loading="lazy"
                    />
                  ) : null}
                </div>
              )}

              {/* Content */}
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .feature-section {
          position: relative;
          width: 100%;
          padding: 4rem 0;
          background: var(--section-bg, ${colors.background.DEFAULT});
        }

        @media (min-width: 768px) {
          .feature-section {
            padding: 6rem 0;
          }
        }

        @media (min-width: 1024px) {
          .feature-section {
            padding: 8rem 0;
          }
        }

        .section-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        @media (min-width: 640px) {
          .section-container {
            padding: 0 2rem;
          }
        }

        @media (min-width: 1024px) {
          .section-container {
            padding: 0 3rem;
          }
        }

        /* Section Header */
        .section-header {
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .section-header {
            margin-bottom: 4rem;
          }
        }

        .section-heading {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: ${colors.primary[800]};
          margin: 0 0 1rem 0;
          text-wrap: balance;
        }

        @media (min-width: 768px) {
          .section-heading {
            font-size: 2.5rem;
          }
        }

        @media (min-width: 1024px) {
          .section-heading {
            font-size: 3rem;
          }
        }

        .section-subheading {
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${colors.primary[600]};
          margin: 0;
          text-wrap: balance;
          max-width: 600px;
        }

        @media (min-width: 768px) {
          .section-subheading {
            font-size: 1.25rem;
          }
        }

        /* Features Container */
        .features-container {
          display: grid;
          gap: 2rem;
        }

        .features-container.grid {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .features-container.list {
          grid-template-columns: 1fr;
          max-width: 800px;
          margin: 0 auto;
        }

        .features-container.cards {
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }

        @media (min-width: 768px) {
          .features-container.grid {
            gap: 3rem;
          }

          .features-container.cards {
            gap: 2rem;
          }
        }

        /* Feature Item */
        .feature-item {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2rem;
          background: ${colors.base.white};
          border-radius: ${effects.borderRadius.lg};
          box-shadow: ${effects.boxShadow.sm};
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-item:hover {
          box-shadow: ${effects.boxShadow.md};
          transform: translateY(-2px);
        }

        .features-container.list .feature-item {
          flex-direction: row;
          align-items: flex-start;
          padding: 0;
          background: transparent;
          box-shadow: none;
          border-radius: 0;
        }

        .features-container.list .feature-item:hover {
          box-shadow: none;
          transform: none;
        }

        /* Feature Media */
        .feature-media {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          flex-shrink: 0;
        }

        .features-container.list .feature-media {
          margin-top: 0.25rem;
        }

        .feature-icon {
          width: 100%;
          height: 100%;
          color: ${brandColors.primary};
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-icon svg {
          width: 32px;
          height: 32px;
        }

        .feature-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: ${effects.borderRadius.md};
        }

        /* Feature Content */
        .feature-content {
          flex: 1;
        }

        .features-container.list .feature-content {
          margin-left: 1.5rem;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.3;
          color: ${colors.primary[800]};
          margin: 0 0 0.75rem 0;
          text-wrap: balance;
        }

        .features-container.list .feature-title {
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
        }

        @media (min-width: 768px) {
          .feature-title {
            font-size: 1.5rem;
          }

          .features-container.list .feature-title {
            font-size: 1.25rem;
          }
        }

        .feature-description {
          font-size: 1rem;
          line-height: 1.6;
          color: ${colors.primary[600]};
          margin: 0;
          text-wrap: balance;
        }

        .features-container.list .feature-description {
          font-size: 1.125rem;
        }

        /* Responsive adjustments */
        @media (max-width: 767px) {
          .section-heading {
            font-size: 1.75rem;
          }

          .section-subheading {
            font-size: 1rem;
          }

          .features-container.grid {
            grid-template-columns: 1fr;
          }

          .features-container.cards {
            grid-template-columns: 1fr;
          }

          .feature-item {
            padding: 1.5rem;
          }

          .features-container.list .feature-item {
            flex-direction: column;
            gap: 1rem;
          }

          .features-container.list .feature-content {
            margin-left: 0;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .feature-item {
            border: 1px solid ${colors.primary[300]};
          }

          .features-container.list .feature-item {
            border: none;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .feature-item {
            transition: none;
          }

          .feature-item:hover {
            transform: none;
          }
        }

        /* Print styles */
        @media print {
          .feature-section {
            break-inside: avoid;
            background: white !important;
          }

          .feature-item {
            break-inside: avoid;
            box-shadow: none !important;
            border: 1px solid ${colors.primary[300]};
          }

          .feature-item:hover {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FeatureSection;