/**
 * Design Tokens - Main Export
 * Centralized design system tokens for TaxCat and EKBooks
 */

export { colors, type ColorToken } from './colors';
export { typography, type TypographyToken } from './typography';
export { spacing, type SpacingToken } from './spacing';
export { effects, type EffectsToken } from './effects';

// Combined tokens object
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { effects } from './effects';

export const tokens = {
  colors,
  typography,
  spacing,
  effects,
} as const;

export type DesignTokens = typeof tokens;