/**
 * Design Tokens - Typography
 * Based on Wealthsimple's design system
 * Uses system fonts for optimal performance
 */

export const typography = {
  // Font families
  fontFamily: {
    sans: [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
    ].join(', '),
    serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'].join(', '),
    mono: [
      '"SF Mono"',
      'Monaco',
      '"Cascadia Code"',
      '"Roboto Mono"',
      'Consolas',
      '"Courier New"',
      'monospace',
    ].join(', '),
  },

  // Font weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Font sizes with line heights (Wealthsimple scale)
  fontSize: {
    // Display sizes (hero headings)
    'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
    'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
    'display-sm': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],

    // Heading sizes
    'heading-3xl': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
    'heading-2xl': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
    'heading-xl': ['1.5rem', { lineHeight: '1.35', fontWeight: '600' }],
    'heading-lg': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
    'heading-md': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
    'heading-sm': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],

    // Body text sizes
    'text-2xl': ['1.5rem', { lineHeight: '1.5', fontWeight: '400' }],
    'text-xl': ['1.25rem', { lineHeight: '1.5', fontWeight: '400' }],
    'text-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
    'text-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
    'text-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
    'text-xs': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],

    // Eyebrow/label text
    'eyebrow-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '600', textTransform: 'uppercase' }],
    'eyebrow-md': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '600', textTransform: 'uppercase' }],
    'eyebrow-sm': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '600', textTransform: 'uppercase' }],
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.1',
    snug: '1.25',
    normal: '1.5',
    relaxed: '1.6',
    loose: '2',
  },
} as const;

export type TypographyToken = typeof typography;