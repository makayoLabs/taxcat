# @taxcat/design-system

Shared design system for TaxCat and EKBooks applications, inspired by Wealthsimple's clean and modern aesthetic.

## Overview

This design system provides:
- **Design tokens** (colors, typography, spacing, effects)
- **Tailwind CSS preset** for consistent styling
- **Brand-specific themes** for TaxCat and EKBooks
- **Reusable component styles**

## Installation

### For TaxCat

```bash
# From taxcat-app directory
npm install file:./shared-design-system
```

### For EKBooks

```bash
# From ekbooks-website directory
npm install file:../taxcat-app/shared-design-system
```

## Usage

### 1. Tailwind Configuration

Update your `tailwind.config.ts`:

```typescript
import { designSystemPreset } from '@taxcat/design-system';

export default {
  presets: [designSystemPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Add brand-specific overrides here
      colors: {
        brand: {
          primary: '#00A950', // TaxCat green
          // or
          primary: '#1A9E52', // EKBooks green
        },
      },
    },
  },
};
```

### 2. Import Styles

In your main CSS file:

```css
/* For TaxCat */
@import '@taxcat/design-system/styles/components.css';
@import '@taxcat/design-system/styles/brands/taxcat.css';

/* For EKBooks */
@import '@taxcat/design-system/styles/components.css';
@import '@taxcat/design-system/styles/brands/ekbooks.css';
```

### 3. Apply Theme

Add the theme class to your root element:

```tsx
// TaxCat
<body className="theme-taxcat">
  {children}
</body>

// EKBooks
<body className="theme-ekbooks">
  {children}
</body>
```

### 4. Use Design Tokens in TypeScript

```typescript
import { colors, typography, spacing } from '@taxcat/design-system';

const MyComponent = () => {
  return (
    <div style={{ 
      color: colors.taxcat.primary,
      fontSize: typography.fontSize['text-lg'][0],
      padding: spacing[8],
    }}>
      Content
    </div>
  );
};
```

## Component Classes

### Buttons

```html
<!-- Primary button -->
<button class="ws-button ws-button-primary">
  Start Filing
</button>

<!-- Secondary button -->
<button class="ws-button ws-button-secondary">
  Learn More
</button>

<!-- Button sizes -->
<button class="ws-button ws-button-primary ws-button-sm">Small</button>
<button class="ws-button ws-button-primary ws-button-lg">Large</button>
```

### Cards

```html
<!-- Standard card with hover effect -->
<div class="ws-card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

<!-- Flat card with border -->
<div class="ws-card-flat">
  <h3>Flat Card</h3>
</div>
```

### Sections

```html
<!-- Standard section -->
<section class="ws-section ws-section-primary">
  <div class="ws-container">
    <!-- Content -->
  </div>
</section>

<!-- Large section with alternate background -->
<section class="ws-section-lg ws-section-alt">
  <div class="ws-container">
    <!-- Content -->
  </div>
</section>
```

### Grid System

```html
<!-- 12-column grid -->
<div class="ws-grid">
  <div class="ws-col-12 md:ws-col-6">
    Half width on desktop
  </div>
  <div class="ws-col-12 md:ws-col-6">
    Half width on desktop
  </div>
</div>
```

### Typography

```html
<!-- Display headings -->
<h1 class="ws-display-xl">Hero Heading</h1>
<h2 class="ws-display-md">Section Heading</h2>

<!-- Body text -->
<p class="ws-text-lg">Large body text</p>
<p class="ws-text-md">Regular body text</p>

<!-- Eyebrow text -->
<span class="ws-eyebrow-sm">Made for Canadians</span>
```

### Forms

```html
<div>
  <label class="ws-label" for="email">Email</label>
  <input 
    type="email" 
    id="email" 
    class="ws-input"
    placeholder="name@example.com"
  />
</div>
```

## Design Principles

Based on Wealthsimple's design philosophy:

1. **Simplicity First** - Clean, uncluttered interfaces
2. **Generous Spacing** - Ample whitespace for breathing room
3. **Subtle Shadows** - Refined depth without heavy effects
4. **Smooth Transitions** - 200ms cubic-bezier for all interactions
5. **System Fonts** - Fast-loading, native typography
6. **Accessible Colors** - WCAG AA compliant contrast ratios
7. **Mobile-First** - Responsive by default

## Color Palette

### TaxCat
- **Primary**: `#00A950` (H&R Block inspired green)
- **Secondary**: `#134A8E` (Blue Jays blue)
- **Accent**: `#F5A623` (Warm gold)

### EKBooks
- **Primary**: `#1A9E52` (Forest green)
- **Secondary**: `#191919` (Deep charcoal)
- **Accent**: `#D32F2F` (Maple red)

### Shared Neutrals
- **Background**: `#fcfcfc` (Off-white)
- **Background Alt**: `#eeece7` (Warm beige)
- **Text**: `#32302f` (Warm dark)
- **Text Muted**: `#6b6b6b` (Gray)

## Typography Scale

- **Display 2XL**: 72px / 4.5rem
- **Display XL**: 56px / 3.5rem
- **Display LG**: 48px / 3rem
- **Display MD**: 40px / 2.5rem
- **Display SM**: 32px / 2rem
- **Text 2XL**: 24px / 1.5rem
- **Text XL**: 20px / 1.25rem
- **Text LG**: 18px / 1.125rem
- **Text MD**: 16px / 1rem (base)
- **Text SM**: 14px / 0.875rem
- **Text XS**: 12px / 0.75rem

## Spacing Scale

Based on 8px base unit with responsive clamp values:
- **ws-default**: `clamp(1.5rem, 2.86vw + 0.93rem, 3.5rem)`
- **ws-sm**: `clamp(1rem, 1.43vw + 0.71rem, 2rem)`
- **ws-lg**: `clamp(2rem, 4.29vw + 1.14rem, 5rem)`

## Contributing

When adding new components or tokens:
1. Follow Wealthsimple's design principles
2. Ensure accessibility (WCAG AA minimum)
3. Test in both TaxCat and EKBooks contexts
4. Document usage examples

## License

MIT