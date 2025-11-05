/**
 * Design Tokens - Colors
 * Based on Wealthsimple's design system
 * Extracted from tax.html analysis
 */

export const colors = {
  // Base palette - Wealthsimple inspired
  base: {
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
  },

  // Primary - Deep charcoal for text and primary elements
  primary: {
    DEFAULT: '#32302f',
    50: '#f9f9f9',
    100: '#f3f3f2',
    200: '#e8e7e6',
    300: '#d4d3d1',
    400: '#a8a6a3',
    500: '#7c7a76',
    600: '#5f5d5a',
    700: '#4a4846',
    800: '#32302f',
    900: '#1a1918',
  },

  // Accent - Soft green (Wealthsimple signature)
  accent: {
    DEFAULT: '#e4e9d3',
    50: '#f9faf5',
    100: '#f3f5eb',
    200: '#e9edd9',
    300: '#e4e9d3',
    400: '#d4dbb8',
    500: '#c4cd9d',
    600: '#a8b574',
    700: '#8c9d4b',
    800: '#6d7a3a',
    900: '#4e5729',
  },

  // Background colors
  background: {
    DEFAULT: '#fcfcfc',
    alt: '#eeece7',
    dark: '#f6f8fa',
    hero: '#e9f2f9',
    card: '#ffffff',
    section: '#eff6d1',
  },

  // Text colors
  text: {
    DEFAULT: '#32302f',
    muted: '#6b6b6b',
    light: '#8a8a8a',
    inverse: '#ffffff',
  },

  // Semantic colors
  semantic: {
    success: '#00a950',
    warning: '#f5a623',
    error: '#e8291c',
    info: '#0077c5',
  },

  // Brand-specific colors for TaxCat
  taxcat: {
    primary: '#00A950',      // H&R Block inspired green
    primaryDark: '#008040',
    primaryLight: '#E6F7ED',
    primaryHover: '#00BD5E',
    secondary: '#134A8E',    // Blue Jays blue
    secondaryDark: '#0F3A6F',
    secondaryLight: '#E3EBF5',
    accent: '#F5A623',
    accentDark: '#D68910',
    accentLight: '#FEF5E7',
  },

  // Brand-specific colors for EKBooks
  ekbooks: {
    primary: '#1A9E52',      // Forest green
    primaryDark: '#157A41',
    primaryLight: '#E8F5EE',
    primaryHover: '#1FB35F',
    secondary: '#191919',    // Deep charcoal
    secondaryDark: '#000000',
    secondaryLight: '#F5F5F5',
    accent: '#D32F2F',       // Maple red
    accentDark: '#B71C1C',
    accentLight: '#FFEBEE',
  },
} as const;

export type ColorToken = typeof colors;