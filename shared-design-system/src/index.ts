/**
 * @taxcat/design-system
 * Shared design system for TaxCat and EKBooks
 * Based on Wealthsimple's design principles
 */

// Export all tokens
export * from './tokens';

// Export Tailwind preset
export { designSystemPreset } from './tailwind/preset';

// Re-export for convenience
export { colors } from './tokens/colors';
export { typography } from './tokens/typography';
export { spacing } from './tokens/spacing';
export { effects } from './tokens/effects';