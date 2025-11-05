/**
 * Split Hero Component
 * Two-column hero layout with text content on left, media on right
 * Based on Wealthsimple's hero section from tax.html
 */

import React from 'react';
import { colors, effects } from '../tokens';

interface SplitHeroProps {
  /** Hero heading */
  heading: string;

  /** Hero subheading/description */
  subheading?: string;

  /** Eyebrow text above heading */
  eyebrow?: string;

  /** Primary CTA button */
  primaryCTA?: {
    text: string;
    href: string;
    external?: boolean;
  };

  /** Secondary CTA button */
  secondaryCTA?: {
    text: string;
    href: string;
    external?: boolean;
  };

  /** Media content (image or video) */
  media?: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    poster?: string; // For video
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
  };

  /** Background color */
  backgroundColor?: string;

  /** Text alignment */
  textAlign?: 'left' | 'center';

  /** Reverse layout (media on left) */
  reverse?: boolean;

  /** Brand theme (taxcat or ekbooks) */
  brand?: 'taxcat' | 'ekbooks';

  /** Custom class name */
  className?: string;
}

const SplitHero: React.FC<SplitHeroProps> = ({
  heading,
  subheading,
  eyebrow,
  primaryCTA,
  secondaryCTA,
  media,
  backgroundColor,
  textAlign = 'left',
  reverse = false,
  brand = 'taxcat',
  className = ''
}) => {
  const brandColors = brand === 'taxcat' ? colors.taxcat : colors.ekbooks;

  return (
    <section
      className={`split-hero ${className}`}
      style={{
        backgroundColor: backgroundColor || colors.background.DEFAULT,
        '--section-bg': backgroundColor || colors.background.DEFAULT
      } as React.CSSProperties}
    >
      <div className="hero-container">
        <div className={`hero-content ${reverse ? 'reverse' : ''}`}>
          {/* Text Content */}
          <div className="text-content">
            {eyebrow && (
              <div className="eyebrow">
                <span>{eyebrow}</span>
              </div>
            )}

            <h1 className="hero-heading" style={{ textAlign }}>
              {heading}
            </h1>

            {subheading && (
              <div className="hero-subheading" style={{ textAlign }}>
                <p>{subheading}</p>
              </div>
            )}

            {(primaryCTA || secondaryCTA) && (
              <div className="hero-ctas" style={{
                justifyContent: textAlign === 'center' ? 'center' : 'flex-start'
              }}>
                {secondaryCTA && (
                  <a
                    href={secondaryCTA.href}
                    className="cta-secondary"
                    {...(secondaryCTA.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    <span>{secondaryCTA.text}</span>
                  </a>
                )}
                {primaryCTA && (
                  <a
                    href={primaryCTA.href}
                    className="cta-primary"
                    {...(primaryCTA.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    <span>{primaryCTA.text}</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Media Content */}
          {media && (
            <div className="media-content">
              <div className="media-wrapper">
                {media.type === 'image' ? (
                  <img
                    src={media.src}
                    alt={media.alt || ''}
                    className="hero-image"
                    loading="lazy"
                  />
                ) : (
                  <video
                    className="hero-video"
                    poster={media.poster}
                    autoPlay={media.autoplay}
                    loop={media.loop}
                    muted={media.muted}
                    playsInline
                    aria-label={media.alt}
                  >
                    <source src={media.src} type="video/mp4" />
                    {/* Fallback content */}
                    <div className="video-fallback">
                      <img
                        src={media.poster || '/fallback.jpg'}
                        alt={media.alt || 'Video content'}
                        className="hero-image"
                      />
                    </div>
                  </video>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .split-hero {
          position: relative;
          width: 100%;
          padding: 4rem 0;
          background: var(--section-bg, ${colors.background.DEFAULT});
        }

        @media (min-width: 768px) {
          .split-hero {
            padding: 6rem 0;
          }
        }

        @media (min-width: 1024px) {
          .split-hero {
            padding: 8rem 0;
          }
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        @media (min-width: 640px) {
          .hero-container {
            padding: 0 2rem;
          }
        }

        @media (min-width: 1024px) {
          .hero-container {
            padding: 0 3rem;
          }
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        .hero-content.reverse {
          direction: rtl;
        }

        .hero-content.reverse .text-content,
        .hero-content.reverse .media-content {
          direction: ltr;
        }

        /* Text Content */
        .text-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .eyebrow {
          margin-bottom: 0.5rem;
        }

        .eyebrow span {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: ${colors.accent[100]};
          color: ${colors.accent[800]};
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: ${effects.borderRadius.full};
        }

        .hero-heading {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: ${colors.primary[800]};
          margin: 0;
          text-wrap: balance;
        }

        @media (min-width: 768px) {
          .hero-heading {
            font-size: 3.5rem;
          }
        }

        @media (min-width: 1024px) {
          .hero-heading {
            font-size: 4.5rem;
          }
        }

        .hero-subheading {
          margin: 0;
        }

        .hero-subheading p {
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${colors.primary[600]};
          margin: 0;
          text-wrap: balance;
        }

        @media (min-width: 768px) {
          .hero-subheading p {
            font-size: 1.5rem;
          }
        }

        /* CTA Buttons */
        .hero-ctas {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        @media (min-width: 480px) {
          .hero-ctas {
            flex-direction: row;
            align-items: center;
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
          background: transparent;
          color: ${colors.primary[800]};
          border-color: ${colors.primary[200]};
        }

        .cta-secondary:hover,
        .cta-secondary:focus {
          background: ${colors.primary[50]};
          border-color: ${brandColors.primary};
          color: ${brandColors.primary};
          outline: none;
        }

        .cta-primary {
          background: ${brandColors.primary};
          color: ${colors.base.white};
          box-shadow: ${effects.boxShadow.sm};
        }

        .cta-primary:hover,
        .cta-primary:focus {
          background: ${brandColors.primaryDark};
          box-shadow: ${effects.boxShadow.md};
          transform: translateY(-1px);
          outline: none;
        }

        /* Media Content */
        .media-content {
          position: relative;
          width: 100%;
        }

        .media-wrapper {
          position: relative;
          width: 100%;
          border-radius: ${effects.borderRadius.xl};
          overflow: hidden;
          box-shadow: ${effects.boxShadow.lg};
        }

        .hero-image,
        .hero-video {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .hero-video {
          background: ${colors.primary[100]};
        }

        .video-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${colors.primary[100]};
          min-height: 300px;
        }

        /* Responsive adjustments */
        @media (max-width: 767px) {
          .hero-content {
            gap: 2rem;
          }

          .hero-heading {
            font-size: 2rem;
          }

          .hero-subheading p {
            font-size: 1rem;
          }

          .cta-secondary,
          .cta-primary {
            padding: 0.875rem 1.5rem;
            font-size: 0.875rem;
          }

          .eyebrow span {
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .cta-secondary {
            border-color: ${colors.primary[600]};
          }

          .eyebrow span {
            background: ${colors.primary[200]};
            color: ${colors.primary[900]};
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
          .split-hero {
            break-inside: avoid;
            background: white !important;
          }

          .hero-video {
            display: none;
          }

          .video-fallback {
            display: block;
          }

          .cta-secondary,
          .cta-primary {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default SplitHero;