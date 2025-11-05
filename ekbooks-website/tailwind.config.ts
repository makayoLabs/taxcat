import type { Config } from 'tailwindcss';
import { designSystemPreset } from '../taxcat-app/shared-design-system/src/tailwind/preset';

const config: Config = {
  presets: [designSystemPreset],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // EKBooks brand-specific overrides
      colors: {
        brand: {
          primary: '#1A9E52',
          'primary-dark': '#157A41',
          'primary-light': '#E8F5EE',
          'primary-hover': '#1FB35F',
          secondary: '#191919',
          'secondary-dark': '#000000',
          'secondary-light': '#F5F5F5',
          accent: '#D32F2F',
          'accent-dark': '#B71C1C',
          'accent-light': '#FFEBEE',
        },
        // Legacy compatibility
        'forest-green': '#1A9E52',
        'navy': '#191919',
        'warm-sand': '#eeece7',
        'cloud-white': '#FFFFFF',
        'slate-gray': '#6b6b6b',
        'maple-red': '#D32F2F',
      },
    },
  },
};

export default config;