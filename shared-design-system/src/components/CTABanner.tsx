/**
 * CTA Banner Component
 * Full-width call-to-action section with background image support
 * Based on Wealthsimple's CTA section from tax.html
 */

import React from 'react';
import { colors, effects } from '../tokens';

interface CTABannerProps {
  /** Banner heading */
  heading: string;

  /** Banner subheading */
  subheading?: string;

  /** Primary CTA button */
  primaryCTA: {
    text: string;
    href: string;
    external?: boolean;
  };

  /** Secondary CTA button (optional) */
  secondaryCTA?: {
    text: string;
    href: string;
    external?: boolean;
  };

  /** Background image */
  backgroundImage?: {
    src: string;
    alt?: string;
    position?: string;
  };

  /** Background color (fallback or overlay) */
  backgroundColor?: string;

  /** Text color */
  textColor?: string;

  /** Content alignment */
  align?: 'left' | 'center' | 'right';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Brand theme (taxcat or ekbooks) */
  brand?: 'taxcat' | 'ekbooks';

  /** Custom class name */
  className?: string;
}

const CTABanner: React.FC<CTABannerProps> = ({
  heading,
  subheading,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundColor,
  textColor,
  align = 'center',
  size = 'lg',
  brand = 'taxcat',
  className = ''
}) => {
  const brandColors = brand === 'taxcat' ? colors.taxcat : colors.ekbooks;

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: '3rem 0',
          headingSize: '2rem',
          subheadingSize: '1rem'
        };
      case 'md':
        return {
          padding: '4rem 0',
          headingSize: '2.5rem',
          subheadingSize: '1.125rem'
        };
      case 'lg':
      default:
        return {
          padding: '6rem 0',
          headingSize: '3rem',
          subheadingSize: '1.25rem'
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <section
      className={`cta-banner ${className}`}
      style={{
        backgroundColor: backgroundColor || brandColors.primary,
        backgroundImage: backgroundImage ? `url(${backgroundImage.src})` : undefined,
        backgroundPosition: backgroundImage?.position || 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: textColor || colors.base.white,
        padding: sizeStyles.padding
      }}
    >
      {/* Background overlay for better text readability */}
      {backgroundImage && (
        <div
          className="banner-overlay"
          style={{
            backgroundColor: backgroundColor || 'rgba(0, 0, 0, 0.5)'
          }}
        />
      )}

      <div className="banner-container">
        <div
          className="banner-content"
          style={{
            textAlign: align,
            maxWidth: align === 'center' ? '800px' : '600px'
          }}
        >
          {/* Heading */}
          <h2
            className="banner-heading"
            style={{
              fontSize: sizeStyles.headingSize,
              color: textColor || colors.base.white
            }}
          >
            {heading}
          </h2>

          {/* Subheading */}
          {subheading && (
            <p
              className="banner-subheading"
              style={{
                fontSize: sizeStyles.subheadingSize,
                color: textColor || colors.base.white,
                opacity: 0.9
              }}
            >
              {subheading}
            </p>
          )}

          {/* CTA Buttons */}
          <div
            className="banner-ctas"
            style={{
              justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'
            }}
          >
            {secondaryCTA && (
              <a
                href={secondaryCTA.href}
                className="cta-secondary"
                {...(secondaryCTA.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <span>{secondaryCTA.text}</span>
              </a>
            )}
            <a
              href={primaryCTA.href}
              className="cta-primary"
              {...(primaryCTA.external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <span>{primaryCTA.text}</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-banner {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          min-height: 300px;
          overflow: hidden;
        }

        .banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .banner-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        @media (min-width: 640px) {
          .banner-container {
            padding: 0 2rem;
          }
        }

        @media (min-width: 1024px) {
          .banner-container {
            padding: 0 3rem;
          }
        }

        .banner-content {
          margin: 0 auto;
        }

        .banner-heading {
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0 0 1rem 0;
          text-wrap: balance;
        }

        @media (min-width: 768px) {
          .banner-heading {
            margin-bottom: 1.5rem;
          }
        }

        .banner-subheading {
          line-height: 1.6;
          margin: 0 0 2rem 0;
          text-wrap: balance;
        }

        @media (min-width: 768px) {
          .banner-subheading {
            margin-bottom: 2.5rem;
          }
        }

        /* CTA Buttons */
        .banner-ctas {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        @media (min-width: 480px) {
          .banner-ctas {
            flex-direction: row;
          }
        }

        .cta-secondary,
        .cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2rem;
          font-weight: 500;
          font-size: 1rem;
          text-decoration: none;
          border-radius: ${effects.borderRadius.md};
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
          white-space: nowrap;
        }

        .cta-secondary {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: ${colors.base.white};
          border-color: rgba(255, 255, 255, 0.3);
        }

        .cta-secondary:hover,
        .cta-secondary:focus {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          outline: none;
        }

        .cta-primary {
          background: ${colors.base.white};
          color: ${brandColors.primary};
          box-shadow: ${effects.boxShadow.sm};
        }

        .cta-primary:hover,
        .cta-primary:focus {
          background: ${colors.primary[50]};
          box-shadow: ${effects.boxShadow.md};
          transform: translateY(-1px);
          outline: none;
        }

        /* Size variants */
        .cta-banner[data-size="sm"] {
          padding: 3rem 0;
        }

        .cta-banner[data-size="md"] {
          padding: 4rem 0;
        }

        .cta-banner[data-size="lg"] {
          padding: 6rem 0;
        }

        /* Responsive adjustments */
        @media (max-width: 767px) {
          .cta-banner {
            padding: 3rem 0;
          }

          .banner-heading {
            font-size: 1.75rem !important;
          }

          .banner-subheading {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }

          .cta-secondary,
          .cta-primary {
            padding: 0.875rem 1.5rem;
            font-size: 0.875rem;
          }

          .banner-content {
            max-width: none !important;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .cta-secondary {
            background: ${colors.base.white};
            color: ${colors.primary[800]};
            border-color: ${colors.primary[300]};
          }

          .cta-primary {
            background: ${brandColors.primary};
            color: ${colors.base.white};
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .cta-primary,
          .cta-secondary {
            transition: none;
          }

          .cta-primary:hover,
          .cta-primary:focus {
            transform: none;
          }
        }

        /* Print styles */
        @media print {
          .cta-banner {
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .banner-overlay {
            display: none;
          }

          .cta-secondary,
          .cta-primary {
            display: none;
          }

          .banner-heading {
            color: black !important;
          }

          .banner-subheading {
            color: black !important;
          }
        }

        /* Focus management */
        .cta-secondary:focus-visible,
        .cta-primary:focus-visible {
          outline: 2px solid ${colors.base.white};
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
};

export default CTABanner;