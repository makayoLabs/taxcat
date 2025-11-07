import type { Config } from 'tailwindcss';
import { designSystemPreset } from './shared-design-system/src/tailwind/preset';

const config: Config = {
  presets: [designSystemPreset],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/web/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Wealthsimple-inspired TaxCat brand colors
      colors: {
        primary: {
          DEFAULT: '#00D3A0',  // Wealthsimple teal
          50: '#E6FBF5',
          100: '#CCF7EB',
          200: '#99EFD7',
          300: '#66E6C7',
          400: '#33DEB3',
          500: '#00D3A0',
          600: '#00B388',
          700: '#008F6D',
          800: '#006B52',
          900: '#004737',
        },
        secondary: {
          DEFAULT: '#191919',  // Almost black
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#191919',
        },
        accent: {
          purple: '#7B61FF',
          pink: '#FF6B9D',
          yellow: '#FFD166',
          blue: '#4A90E2',
        },
        // Legacy compatibility
        brand: {
          primary: '#00D3A0',
          'primary-dark': '#00B388',
          'primary-light': '#E6FBF5',
          'primary-hover': '#00E6B0',
          secondary: '#191919',
          'secondary-dark': '#0F0F0F',
          'secondary-light': '#F5F5F5',
          accent: '#7B61FF',
          'accent-dark': '#6347E8',
          'accent-light': '#F0EDFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(3rem, 4vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 3vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 40px rgba(0, 0, 0, 0.15)',
        'primary': '0 4px 20px rgba(0, 211, 160, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
};

export default config;
