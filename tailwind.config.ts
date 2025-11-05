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
      // TaxCat brand-specific overrides
      colors: {
        brand: {
          primary: '#00A950',
          'primary-dark': '#008040',
          'primary-light': '#E6F7ED',
          'primary-hover': '#00BD5E',
          secondary: '#134A8E',
          'secondary-dark': '#0F3A6F',
          'secondary-light': '#E3EBF5',
          accent: '#F5A623',
          'accent-dark': '#D68910',
          'accent-light': '#FEF5E7',
        },
        // Legacy compatibility
        taxcat: {
          blue: '#00A950',
          white: '#ffffff',
          gray: '#6b6b6b',
          success: '#00A950',
          orange: '#f59e0b',
        },
      },
    },
  },
};

export default config;
