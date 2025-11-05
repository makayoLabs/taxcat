# Design System Implementation Guide

## Quick Start

### For TaxCat

The design system is already integrated into TaxCat. The theme is applied via the `theme-taxcat` class on the `<body>` element in [`src/app/layout.tsx`](../src/app/layout.tsx:42).

**Key files:**
- [`tailwind.config.ts`](../tailwind.config.ts:1) - Uses the design system preset
- [`src/app/globals.css`](../src/app/globals.css:1) - Imports design system styles
- [`src/app/layout.tsx`](../src/app/layout.tsx:42) - Applies `theme-taxcat` class

### For EKBooks

The design system is integrated into EKBooks. The theme is applied via the `theme-ekbooks` class on the `<body>` element in [`../ekbooks-website/src/app/layout.tsx`](../../ekbooks-website/src/app/layout.tsx:78).

**Key files:**
- [`../ekbooks-website/tailwind.config.ts`](../../ekbooks-website/tailwind.config.ts:1) - Uses the design system preset
- [`../ekbooks-website/src/app/globals.css`](../../ekbooks-website/src/app/globals.css:1) - Imports design system styles
- [`../ekbooks-website/src/app/layout.tsx`](../../ekbooks-website/src/app/layout.tsx:78) - Applies `theme-ekbooks` class

## Using Component Classes

### Buttons

```tsx
// Primary CTA button
<button className="ws-button ws-button-primary ws-button-lg">
  Start Filing
</button>

// Secondary button
<button className="ws-button ws-button-secondary">
  Learn More
</button>

// Small button
<button className="ws-button ws-button-primary ws-button-sm">
  Sign Up
</button>
```

### Cards

```tsx
// Hover-enabled card
<div className="ws-card">
  <h3 className="ws-text-xl font-semibold mb-2">Card Title</h3>
  <p className="ws-text-md ws-color-muted">Card description</p>
</div>

// Flat card with border
<div className="ws-card-flat">
  <h3>Pricing Plan</h3>
  <p>$0 - Pay what you want</p>
</div>
```

### Sections

```tsx
// Standard section
<section className="ws-section ws-section-primary">
  <div className="ws-container">
    <h2 className="ws-display-md mb-8">Section Heading</h2>
    {/* Content */}
  </div>
</section>

// Large section with alternate background
<section className="ws-section-lg ws-section-alt">
  <div className="ws-container">
    {/* Content */}
  </div>
</section>

// Accent background section
<section className="ws-section ws-section-accent">
  <div className="ws-container">
    {/* Content */}
  </div>
</section>
```

### Grid Layout

```tsx
// 12-column responsive grid
<div className="ws-grid">
  <div className="ws-col-12 md:ws-col-6">
    <h3>Left Column</h3>
  </div>
  <div className="ws-col-12 md:ws-col-6">
    <h3>Right Column</h3>
  </div>
</div>

// Split hero layout (like Wealthsimple)
<div className="ws-split-hero">
  <div>
    <h1 className="ws-display-xl ws-balance">
      Really great tax software
    </h1>
    <p className="ws-text-lg ws-color-muted">
      File with confidence
    </p>
    <button className="ws-button ws-button-primary ws-button-lg">
      Get Started
    </button>
  </div>
  <div className="ws-media ws-media-rounded">
    <img src="/hero-image.jpg" alt="Hero" />
  </div>
</div>
```

### Typography

```tsx
// Display headings (hero sections)
<h1 className="ws-display-2xl ws-balance">Largest Heading</h1>
<h1 className="ws-display-xl ws-balance">Hero Heading</h1>
<h2 className="ws-display-md">Section Heading</h2>

// Body text
<p className="ws-text-2xl">Large intro text</p>
<p className="ws-text-lg">Standard body text</p>
<p className="ws-text-md ws-color-muted">Muted text</p>

// Eyebrow text (labels above headings)
<span className="ws-eyebrow-sm">Made for Canadians</span>
<h2 className="ws-display-md">Main Heading</h2>
```

### Forms

```tsx
<div>
  <label className="ws-label" htmlFor="email">
    Email Address
  </label>
  <input
    type="email"
    id="email"
    className="ws-input"
    placeholder="name@example.com"
  />
</div>

<div>
  <label className="ws-label" htmlFor="province">
    Province
  </label>
  <select id="province" className="ws-input">
    <option>Ontario</option>
    <option>British Columbia</option>
  </select>
</div>
```

## Color Usage

### TaxCat Colors

```css
/* Primary green (H&R Block inspired) */
--color-brand-primary: #00A950
--color-brand-primary-dark: #008040
--color-brand-primary-light: #E6F7ED

/* Secondary blue (Blue Jays) */
--color-brand-secondary: #134A8E

/* Accent gold */
--color-brand-accent: #F5A623
```

### EKBooks Colors

```css
/* Primary green (Forest) */
--color-brand-primary: #1A9E52
--color-brand-primary-dark: #157A41
--color-brand-primary-light: #E8F5EE

/* Secondary charcoal */
--color-brand-secondary: #191919

/* Accent red (Maple) */
--color-brand-accent: #D32F2F
```

### Shared Neutrals

```css
--color-background: #fcfcfc (off-white)
--color-background-alt: #eeece7 (warm beige)
--color-background-dark: #f6f8fa (light gray)
--color-text: #32302f (warm dark)
--color-text-muted: #6b6b6b (gray)
```

## Responsive Design

The design system uses Wealthsimple's responsive approach:

```tsx
// Mobile-first responsive grid
<div className="ws-grid">
  <div className="ws-col-12 md:ws-col-6 lg:ws-col-4">
    {/* Full width on mobile, half on tablet, third on desktop */}
  </div>
</div>

// Responsive typography (automatically scales down on mobile)
<h1 className="ws-display-xl">
  {/* 56px on desktop, 36px on mobile */}
</h1>
```

## Best Practices

1. **Use semantic HTML** - Proper heading hierarchy, sections, articles
2. **Apply theme class** - Always use `theme-taxcat` or `theme-ekbooks` on body
3. **Consistent spacing** - Use ws-section classes for vertical rhythm
4. **Accessible colors** - All color combinations meet WCAG AA standards
5. **Smooth transitions** - All interactive elements have 200ms transitions
6. **Mobile-first** - Design for mobile, enhance for desktop

## Migration from Old Styles

### Replace old button classes:

```tsx
// Old
<button className="btn-primary">Click</button>

// New
<button className="ws-button ws-button-primary">Click</button>
```

### Replace old color classes:

```tsx
// Old
<div className="bg-taxcat-blue text-white">

// New  
<div className="bg-brand-primary text-white">
```

### Replace old typography:

```tsx
// Old
<h1 className="text-4xl font-bold">

// New
<h1 className="ws-display-lg">
```

## Component Examples

### Hero Section (Wealthsimple Style)

```tsx
<section className="ws-section-lg ws-section-primary">
  <div className="ws-container">
    <div className="ws-split-hero">
      <div>
        <span className="ws-eyebrow-sm">Made for Canadians</span>
        <h1 className="ws-display-xl ws-balance mt-4">
          Really great tax software at a really great price
        </h1>
        <p className="ws-text-lg ws-color-muted mt-6">
          File with confidence and get the most out of your return
        </p>
        <button className="ws-button ws-button-primary ws-button-lg mt-8">
          Start Filing
        </button>
      </div>
      <div className="ws-media ws-media-rounded">
        <img src="/hero.jpg" alt="Tax filing" />
      </div>
    </div>
  </div>
</section>
```

### Pricing Cards

```tsx
<div className="ws-grid">
  <div className="ws-col-12 md:ws-col-4">
    <div className="ws-card">
      <h3 className="ws-text-2xl font-bold mb-2">Basic</h3>
      <p className="ws-text-lg ws-color-muted mb-4">
        Pay what you want
      </p>
      <div className="text-4xl font-bold mb-6">$0</div>
      <button className="ws-button ws-button-primary w-full">
        Get Started
      </button>
    </div>
  </div>
  {/* More pricing cards */}
</div>
```

### Feature Section

```tsx
<section className="ws-section ws-section-alt">
  <div className="ws-container">
    <div className="ws-grid">
      <div className="ws-col-12 md:ws-col-5">
        <h2 className="ws-display-md ws-balance">
          We guarantee your maximum refund
        </h2>
      </div>
      <div className="ws-col-12 md:ws-col-6 md:ws-col-start-7">
        <div className="space-y-6">
          <div>
            <h3 className="ws-text-xl font-semibold mb-2">
              Sophisticated features made simple
            </h3>
            <p className="ws-text-lg ws-color-muted">
              Every tool you need to optimize your return
            </p>
          </div>
          {/* More features */}
        </div>
      </div>
    </div>
  </div>
</section>
```

## Troubleshooting

### Styles not applying?

1. Check that theme class is on `<body>`: `theme-taxcat` or `theme-ekbooks`
2. Verify CSS imports in [`globals.css`](../src/app/globals.css:1)
3. Ensure Tailwind config uses the preset

### Colors not showing?

1. Use CSS variables: `var(--color-brand-primary)`
2. Or use Tailwind classes: `bg-brand-primary`
3. Check theme class is applied to body element

### TypeScript errors?

1. The preset is typed as `Partial<Config>`
2. Import from the correct path
3. Ensure `tailwindcss` is installed

## Support

For questions or issues with the design system:
- Check the [README.md](./README.md)
- Review component examples above
- Inspect [`tax.html`](../tax.html:1) for reference implementation