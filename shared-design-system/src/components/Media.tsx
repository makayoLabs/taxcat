/**
 * Media Component
 * Image/video display with rounded corners, lazy loading, and aspect ratio preservation
 * Based on Wealthsimple's media components from tax.html
 */

import React, { useState, useRef, useEffect } from 'react';
import { colors, effects } from '../tokens';

interface MediaProps {
  /** Media source */
  src: string;

  /** Alternative text for images */
  alt?: string;

  /** Media type */
  type?: 'image' | 'video';

  /** Video poster image */
  poster?: string;

  /** Video autoplay */
  autoplay?: boolean;

  /** Video loop */
  loop?: boolean;

  /** Video muted */
  muted?: boolean;

  /** Video controls */
  controls?: boolean;

  /** Aspect ratio (width/height) */
  aspectRatio?: number | string;

  /** Border radius */
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /** Object fit */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

  /** Object position */
  objectPosition?: string;

  /** Lazy loading */
  lazy?: boolean;

  /** Loading placeholder */
  placeholder?: React.ReactNode;

  /** Error fallback */
  errorFallback?: React.ReactNode;

  /** Caption */
  caption?: string;

  /** Brand theme (taxcat or ekbooks) */
  brand?: 'taxcat' | 'ekbooks';

  /** Custom class name */
  className?: string;

  /** Additional props */
  [key: string]: any;
}

const Media: React.FC<MediaProps> = ({
  src,
  alt = '',
  type = 'image',
  poster,
  autoplay = false,
  loop = false,
  muted = true,
  controls = false,
  aspectRatio,
  borderRadius = 'lg',
  objectFit = 'cover',
  objectPosition = 'center',
  lazy = true,
  placeholder,
  errorFallback,
  caption,
  brand = 'taxcat',
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const mediaRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Lazy loading intersection observer
  useEffect(() => {
    if (!lazy || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1
      }
    );

    if (mediaRef.current) {
      observerRef.current.observe(mediaRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, isInView]);

  // Handle media load
  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  // Handle media error
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Get border radius value
  const getBorderRadius = () => {
    switch (borderRadius) {
      case 'none': return effects.borderRadius.none;
      case 'sm': return effects.borderRadius.sm;
      case 'md': return effects.borderRadius.md;
      case 'lg': return effects.borderRadius.lg;
      case 'xl': return effects.borderRadius.xl;
      case 'full': return effects.borderRadius.full;
      default: return effects.borderRadius.lg;
    }
  };

  // Default placeholder
  const defaultPlaceholder = (
    <div className="media-placeholder">
      <div className="placeholder-shimmer" />
    </div>
  );

  // Default error fallback
  const defaultErrorFallback = (
    <div className="media-error">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          fill={colors.primary[400]}
        />
      </svg>
      <span>Failed to load media</span>
    </div>
  );

  return (
    <figure className={`media-wrapper ${className}`}>
      <div
        ref={mediaRef}
        className="media-container"
        style={{
          aspectRatio: aspectRatio ? (typeof aspectRatio === 'string' ? aspectRatio : `${aspectRatio}`) : undefined,
          borderRadius: getBorderRadius()
        }}
      >
        {/* Loading placeholder */}
        {lazy && !isInView && (placeholder || defaultPlaceholder)}

        {/* Error state */}
        {hasError && (errorFallback || defaultErrorFallback)}

        {/* Media content */}
        {!hasError && isInView && (
          <>
            {type === 'image' ? (
              <img
                src={src}
                alt={alt}
                className="media-image"
                style={{
                  objectFit,
                  objectPosition
                }}
                loading={lazy ? 'lazy' : 'eager'}
                onLoad={handleLoad}
                onError={handleError}
                {...props}
              />
            ) : (
              <video
                className="media-video"
                style={{
                  objectFit,
                  objectPosition
                }}
                poster={poster}
                autoPlay={autoplay}
                loop={loop}
                muted={muted}
                controls={controls}
                playsInline
                onLoadedData={handleLoad}
                onError={handleError}
                aria-label={alt}
                {...props}
              >
                <source src={src} type="video/mp4" />
                <source src={src.replace('.mp4', '.webm')} type="video/webm" />
                {/* Fallback content */}
                <div className="video-fallback">
                  <img
                    src={poster || '/fallback.jpg'}
                    alt={alt || 'Video content'}
                    className="media-image"
                  />
                </div>
              </video>
            )}
          </>
        )}

        {/* Loading overlay */}
        {lazy && isInView && !isLoaded && !hasError && (
          <div className="media-loading-overlay">
            {placeholder || defaultPlaceholder}
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <figcaption className="media-caption">
          {caption}
        </figcaption>
      )}

      <style jsx>{`
        .media-wrapper {
          margin: 0;
          width: 100%;
        }

        .media-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: ${colors.primary[100]};
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px; /* Minimum height for aspect ratio */
        }

        .media-image,
        .media-video {
          width: 100%;
          height: 100%;
          display: block;
          transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .media-image {
          opacity: ${isLoaded ? 1 : 0};
        }

        .media-video {
          opacity: ${isLoaded ? 1 : 0};
        }

        /* Placeholder */
        .media-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${colors.primary[50]};
        }

        .placeholder-shimmer {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            ${colors.primary[50]} 25%,
            ${colors.primary[100]} 50%,
            ${colors.primary[50]} 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Error state */
        .media-error {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: ${colors.primary[400]};
          text-align: center;
          padding: 2rem;
        }

        .media-error span {
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* Loading overlay */
        .media-loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${colors.base.white};
          z-index: 1;
        }

        /* Video fallback */
        .video-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${colors.primary[100]};
        }

        .video-fallback .media-image {
          width: 100%;
          height: 100%;
          opacity: 1;
        }

        /* Caption */
        .media-caption {
          margin-top: 1rem;
          font-size: 0.875rem;
          color: ${colors.primary[600]};
          text-align: center;
          line-height: 1.4;
        }

        /* Responsive adjustments */
        @media (max-width: 767px) {
          .media-container {
            min-height: 150px;
          }

          .media-error {
            padding: 1rem;
          }

          .media-error svg {
            width: 32px;
            height: 32px;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .media-container {
            border: 2px solid ${colors.primary[300]};
          }

          .media-placeholder {
            background: ${colors.primary[200]};
          }

          .placeholder-shimmer {
            background: linear-gradient(
              90deg,
              ${colors.primary[200]} 25%,
              ${colors.primary[300]} 50%,
              ${colors.primary[200]} 75%
            );
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .media-image,
          .media-video {
            transition: none;
          }

          .placeholder-shimmer {
            animation: none;
          }
        }

        /* Print styles */
        @media print {
          .media-wrapper {
            break-inside: avoid;
          }

          .media-container {
            border: 1px solid ${colors.primary[300]};
          }

          .media-video {
            display: none;
          }

          .video-fallback {
            display: block;
          }

          .media-loading-overlay,
          .media-placeholder {
            display: none;
          }
        }
      `}</style>
    </figure>
  );
};

export default Media;