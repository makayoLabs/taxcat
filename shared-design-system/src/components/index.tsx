/**
 * Shared Design System Components
 * Wealthsimple-style component library for TaxCat and EKBooks
 *
 * All components are fully typed, responsive, accessible, and support both brand themes.
 */

// Layout Components
export { default as Navigation } from './Navigation';
export type { default as NavigationProps } from './Navigation';

export { default as Footer } from './Footer';
export type { default as FooterProps } from './Footer';

// Content Components
export { default as SplitHero } from './SplitHero';
export type { default as SplitHeroProps } from './SplitHero';

export { default as FeatureSection } from './FeatureSection';
export type { default as FeatureSectionProps } from './FeatureSection';

export { default as CTABanner } from './CTABanner';
export type { default as CTABannerProps } from './CTABanner';

// Interactive Components
export { default as FAQAccordion } from './FAQAccordion';
export type { default as FAQAccordionProps } from './FAQAccordion';

export { default as PricingCards } from './PricingCards';
export type { default as PricingCardsProps } from './PricingCards';

// Media Components
export { default as Media } from './Media';
export type { default as MediaProps } from './Media';

// Re-export design tokens for convenience
export { colors, typography, spacing, effects } from '../tokens';
export type { ColorToken, TypographyToken, SpacingToken, EffectsToken } from '../tokens';

// Component Types
export interface BaseComponentProps {
  /** Brand theme (taxcat or ekbooks) */
  brand?: 'taxcat' | 'ekbooks';

  /** Custom class name */
  className?: string;

  /** Additional props */
  [key: string]: any;
}

export interface SectionComponentProps extends BaseComponentProps {
  /** Background color */
  backgroundColor?: string;

  /** Section ID for anchor linking */
  id?: string;
}

// Import tokens for utility functions
import { colors, typography, spacing, effects } from '../tokens';

// Utility functions
export const getBrandColors = (brand: 'taxcat' | 'ekbooks' = 'taxcat') => {
  return brand === 'taxcat' ? colors.taxcat : colors.ekbooks;
};

export const getBrandTokens = (brand: 'taxcat' | 'ekbooks' = 'taxcat') => {
  const brandColors = getBrandColors(brand);
  return {
    colors: brandColors,
    typography,
    spacing,
    effects,
  };
};

// Default component configurations
export const defaultConfigs = {
  navigation: {
    brand: 'taxcat' as const,
    sticky: true,
    skipToMain: true,
  },

  footer: {
    brand: 'taxcat' as const,
  },

  splitHero: {
    brand: 'taxcat' as const,
    textAlign: 'left' as const,
    reverse: false,
  },

  featureSection: {
    brand: 'taxcat' as const,
    layout: 'grid' as const,
    columns: 3 as const,
    textAlign: 'left' as const,
  },

  ctaBanner: {
    brand: 'taxcat' as const,
    align: 'center' as const,
    size: 'lg' as const,
  },

  faqAccordion: {
    brand: 'taxcat' as const,
    allowMultiple: false,
  },

  pricingCards: {
    brand: 'taxcat' as const,
    columns: 'auto' as const,
    showComparison: false,
  },

  media: {
    brand: 'taxcat' as const,
    type: 'image' as const,
    lazy: true,
    borderRadius: 'lg' as const,
    objectFit: 'cover' as const,
  },
};