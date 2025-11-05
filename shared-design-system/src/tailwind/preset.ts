/**
 * Tailwind CSS Preset
 * Shared configuration for TaxCat and EKBooks
 * Based on Wealthsimple design system
 */

import type { Config } from 'tailwindcss';

export const designSystemPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        // Base colors
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
        background: {
          DEFAULT: '#fcfcfc',
          alt: '#eeece7',
          dark: '#f6f8fa',
          hero: '#e9f2f9',
          card: '#ffffff',
          section: '#eff6d1',
        },
        text: {
          DEFAULT: '#32302f',
          muted: '#6b6b6b',
          light: '#8a8a8a',
          inverse: '#ffffff',
        },
        success: '#00a950',
        warning: '#f5a623',
        error: '#e8291c',
        info: '#0077c5',
      },

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
        ],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: ['"SF Mono"', 'Monaco', '"Cascadia Code"', '"Roboto Mono"', 'Consolas', 'monospace'],
      },

      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],
        'heading-3xl': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-2xl': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-xl': ['1.5rem', { lineHeight: '1.35', fontWeight: '600' }],
        'heading-lg': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'text-2xl': ['1.5rem', { lineHeight: '1.5' }],
        'text-xl': ['1.25rem', { lineHeight: '1.5' }],
        'text-lg': ['1.125rem', { lineHeight: '1.6' }],
      },

      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },

      maxWidth: {
        '8xl': '1400px',
      },

      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'primary-sm': '0 4px 12px rgba(0, 169, 80, 0.25)',
        'primary-md': '0 6px 16px rgba(0, 169, 80, 0.35)',
      },

      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '3rem',
      },

      transitionDuration: {
        DEFAULT: '200ms',
      },

      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-up': 'slide-up 300ms ease-out',
      },
    },
  },
  plugins: [],
};

export default designSystemPreset;