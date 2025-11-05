/**
 * FAQ Accordion Component
 * Expandable/collapsible FAQ items with smooth animations
 * Based on Wealthsimple's FAQ section from tax.html
 */

import React, { useState, useRef, useEffect } from 'react';
import { colors, effects } from '../tokens';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
}

interface FAQAccordionProps {
  /** Array of FAQ items */
  items: FAQItem[];

  /** Allow multiple items to be open simultaneously */
  allowMultiple?: boolean;

  /** Brand theme (taxcat or ekbooks) */
  brand?: 'taxcat' | 'ekbooks';

  /** Custom class name */
  className?: string;

  /** Callback when an item is toggled */
  onToggle?: (id: string, isOpen: boolean) => void;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  allowMultiple = false,
  brand = 'taxcat',
  className = '',
  onToggle
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const initialOpen = new Set<string>();
    items.forEach(item => {
      if (item.isOpen) {
        initialOpen.add(item.id);
      }
    });
    return initialOpen;
  });

  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);

    if (allowMultiple) {
      if (newOpenItems.has(id)) {
        newOpenItems.delete(id);
      } else {
        newOpenItems.add(id);
      }
    } else {
      if (newOpenItems.has(id)) {
        newOpenItems.clear();
      } else {
        newOpenItems.clear();
        newOpenItems.add(id);
      }
    }

    setOpenItems(newOpenItems);
    onToggle?.(id, newOpenItems.has(id));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggleItem(id);
        break;
      case 'ArrowDown':
        e.preventDefault();
        const currentIndex = items.findIndex(item => item.id === id);
        const nextIndex = (currentIndex + 1) % items.length;
        const nextItem = items[nextIndex];
        if (nextItem) {
          const nextButton = document.getElementById(`faq-button-${nextItem.id}`);
          nextButton?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        const currentIndexUp = items.findIndex(item => item.id === id);
        const prevIndex = currentIndexUp === 0 ? items.length - 1 : currentIndexUp - 1;
        const prevItem = items[prevIndex];
        if (prevItem) {
          const prevButton = document.getElementById(`faq-button-${prevItem.id}`);
          prevButton?.focus();
        }
        break;
      case 'Home':
        e.preventDefault();
        const firstItem = items[0];
        if (firstItem) {
          const firstButton = document.getElementById(`faq-button-${firstItem.id}`);
          firstButton?.focus();
        }
        break;
      case 'End':
        e.preventDefault();
        const lastItem = items[items.length - 1];
        if (lastItem) {
          const lastButton = document.getElementById(`faq-button-${lastItem.id}`);
          lastButton?.focus();
        }
        break;
    }
  };

  const brandColors = brand === 'taxcat' ? colors.taxcat : colors.ekbooks;

  return (
    <div className={`faq-accordion ${className}`} role="region" aria-label="Frequently Asked Questions">
      <div className="faq-container">
        {items.map((item, index) => {
          const isOpen = openItems.has(item.id);

          return (
            <div key={item.id} className="faq-item">
              <details
                className="faq-details"
                open={isOpen}
                onToggle={(e) => {
                  // Prevent default behavior and handle manually
                  e.preventDefault();
                  toggleItem(item.id);
                }}
              >
                <summary
                  id={`faq-button-${item.id}`}
                  className="faq-summary"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${item.id}`}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleItem(item.id);
                  }}
                >
                  <span className="faq-question">
                    {item.question}
                  </span>
                  <span className="faq-icon" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>

                <div
                  id={`faq-content-${item.id}`}
                  className={`faq-content ${isOpen ? 'open' : ''}`}
                  ref={(el) => {
                    if (el) {
                      contentRefs.current.set(item.id, el);
                    } else {
                      contentRefs.current.delete(item.id);
                    }
                  }}
                  role="region"
                  aria-labelledby={`faq-button-${item.id}`}
                >
                  <div className="faq-answer">
                    <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </div>
                </div>
              </details>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .faq-accordion {
          width: 100%;
        }

        .faq-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          border-bottom: 1px solid ${colors.primary[100]};
        }

        .faq-details {
          width: 100%;
        }

        .faq-details[open] {
          /* Override default details behavior */
        }

        .faq-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 1.5rem 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-size: inherit;
          font-family: inherit;
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-summary:hover,
        .faq-summary:focus {
          background: ${colors.primary[50]};
          outline: none;
        }

        .faq-summary:focus-visible {
          outline: 2px solid ${brandColors.primary};
          outline-offset: 2px;
        }

        .faq-question {
          font-size: 1.125rem;
          font-weight: 600;
          line-height: 1.4;
          color: ${colors.primary[800]};
          flex: 1;
          margin-right: 1rem;
        }

        @media (min-width: 768px) {
          .faq-question {
            font-size: 1.25rem;
          }
        }

        .faq-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          color: ${colors.primary[600]};
          transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }

        .faq-chevron.rotated {
          transform: rotate(180deg);
        }

        .faq-content {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-content.open {
          max-height: 1000px; /* Large enough to accommodate content */
          opacity: 1;
          transform: translateY(0);
        }

        .faq-answer {
          padding-bottom: 1.5rem;
          color: ${colors.primary[600]};
          line-height: 1.6;
        }

        .faq-answer :global(p) {
          margin: 0 0 1rem 0;
        }

        .faq-answer :global(p:last-child) {
          margin-bottom: 0;
        }

        .faq-answer :global(a) {
          color: ${brandColors.primary};
          text-decoration: underline;
        }

        .faq-answer :global(a:hover),
        .faq-answer :global(a:focus) {
          color: ${brandColors.primaryDark};
        }

        .faq-answer :global(strong) {
          font-weight: 600;
          color: ${colors.primary[800]};
        }

        /* Focus management for keyboard navigation */
        .faq-summary:focus:not(:focus-visible) {
          outline: none;
        }

        /* Ensure smooth animations */
        .faq-content {
          will-change: max-height, opacity, transform;
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .faq-icon,
          .faq-content,
          .faq-chevron {
            transition: none;
          }

          .faq-content {
            transform: none;
          }

          .faq-content.open {
            max-height: none;
            opacity: 1;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .faq-summary:hover,
          .faq-summary:focus {
            background: ${colors.primary[100]};
          }

          .faq-question {
            color: ${colors.primary[900]};
          }

          .faq-icon {
            color: ${colors.primary[900]};
          }
        }

        /* Print styles */
        @media print {
          .faq-accordion {
            break-inside: avoid;
          }

          .faq-item {
            break-inside: avoid;
            border-bottom: 1px solid ${colors.primary[300]};
          }

          .faq-summary {
            break-inside: avoid;
            break-after: avoid;
          }

          .faq-content {
            break-inside: avoid;
            max-height: none !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .faq-icon {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQAccordion;