# 🎨 TaxCat - Wealthsimple-Inspired Design System

**Version:** 1.0  
**Date:** November 7, 2025  
**Inspiration:** Wealthsimple, Modern FinTech

---

## 🎯 Design Philosophy

**Wealthsimple's Key Principles:**
1. **Simple & Clean** - Minimalist, uncluttered interfaces
2. **Friendly & Approachable** - Warm, human, not corporate
3. **Bold & Confident** - Strong typography, clear hierarchy
4. **Playful** - Subtle animations, delightful interactions
5. **Trustworthy** - Professional but not stuffy

---

## 🎨 Color Palette

### **Primary Colors (Wealthsimple-Inspired)**

```css
/* Brand Colors */
--color-primary: #00D3A0;        /* Wealthsimple Teal/Green */
--color-primary-dark: #00B388;   /* Darker teal */
--color-primary-light: #66E6C7;  /* Lighter teal */

/* Secondary Colors */
--color-secondary: #191919;      /* Almost black */
--color-secondary-light: #2D2D2D; /* Dark gray */

/* Accent Colors */
--color-accent-purple: #7B61FF;  /* Wealthsimple purple */
--color-accent-pink: #FF6B9D;    /* Playful pink */
--color-accent-yellow: #FFD166;  /* Warm yellow */
--color-accent-blue: #4A90E2;    /* Trust blue */

/* Neutrals */
--color-white: #FFFFFF;
--color-gray-50: #F9FAFB;
--color-gray-100: #F3F4F6;
--color-gray-200: #E5E7EB;
--color-gray-300: #D1D5DB;
--color-gray-400: #9CA3AF;
--color-gray-500: #6B7280;
--color-gray-600: #4B5563;
--color-gray-700: #374151;
--color-gray-800: #1F2937;
--color-gray-900: #111827;

/* Semantic Colors */
--color-success: #10B981;        /* Green */
--color-warning: #F59E0B;        /* Orange */
--color-error: #EF4444;          /* Red */
--color-info: #3B82F6;           /* Blue */
```

---

## 📝 Typography

### **Font Stack (Wealthsimple uses Grilli Type)**

```css
/* Primary Font - Clean, Modern Sans-Serif */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Display Font - For headlines */
--font-display: 'Inter', sans-serif;

/* Mono Font - For numbers and code */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### **Font Sizes (Fluid Typography)**

```css
/* Display Sizes */
--text-display-2xl: clamp(3.5rem, 5vw, 4.5rem);   /* 56-72px */
--text-display-xl: clamp(3rem, 4vw, 3.75rem);     /* 48-60px */
--text-display-lg: clamp(2.5rem, 3vw, 3rem);      /* 40-48px */

/* Heading Sizes */
--text-h1: clamp(2rem, 2.5vw, 2.5rem);            /* 32-40px */
--text-h2: clamp(1.75rem, 2vw, 2rem);             /* 28-32px */
--text-h3: clamp(1.5rem, 1.75vw, 1.75rem);        /* 24-28px */
--text-h4: clamp(1.25rem, 1.5vw, 1.5rem);         /* 20-24px */

/* Body Sizes */
--text-xl: 1.25rem;    /* 20px */
--text-lg: 1.125rem;   /* 18px */
--text-base: 1rem;     /* 16px */
--text-sm: 0.875rem;   /* 14px */
--text-xs: 0.75rem;    /* 12px */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-black: 900;

/* Line Heights */
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

---

## 🎭 Component Styles

### **Buttons (Wealthsimple Style)**

```css
/* Primary Button - Bold, Confident */
.btn-primary {
  background: var(--color-primary);
  color: var(--color-secondary);
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 211, 160, 0.3);
}

/* Secondary Button - Outlined */
.btn-secondary {
  background: transparent;
  color: var(--color-secondary);
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: 2px solid var(--color-secondary);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--color-secondary);
  color: var(--color-white);
}

/* Ghost Button - Minimal */
.btn-ghost {
  background: transparent;
  color: var(--color-gray-700);
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  background: var(--color-gray-100);
}
```

### **Cards (Clean, Elevated)**

```css
.card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.card-interactive {
  cursor: pointer;
  border: 2px solid transparent;
}

.card-interactive:hover {
  border-color: var(--color-primary);
}
```

### **Inputs (Minimal, Clean)**

```css
.input {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--color-gray-200);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 211, 160, 0.1);
}

.input-large {
  padding: 1.25rem;
  font-size: 1.125rem;
  font-weight: 500;
}
```

---

## 🌊 Layout & Spacing

### **Container Widths**
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### **Spacing Scale (8px base)**
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### **Border Radius**
```css
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Fully rounded */
```

---

## ✨ Animations & Transitions

### **Wealthsimple-Style Animations**

```css
/* Smooth, Delightful Transitions */
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;

/* Easing Functions */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Hover Effects */
.hover-lift {
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

/* Fade In Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s var(--ease-out);
}

/* Slide In Animation */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in {
  animation: slideIn 0.4s var(--ease-out);
}
```

---

## 🎨 Wealthsimple Design Patterns

### **1. Hero Sections**
- Large, bold headlines
- Generous white space
- Gradient backgrounds (subtle)
- Floating elements
- Asymmetric layouts

### **2. Cards**
- Rounded corners (16px+)
- Subtle shadows
- Hover effects (lift + shadow)
- Clean borders (optional)
- Ample padding

### **3. Typography**
- Bold headlines (700-900 weight)
- Generous line height (1.5-1.6)
- Limited font sizes (type scale)
- Hierarchy through size + weight
- Dark text on light backgrounds

### **4. Buttons**
- Rounded (8px)
- Bold text (600 weight)
- Generous padding
- Hover effects (lift + darken)
- Clear primary action

### **5. Forms**
- Large input fields
- Clear labels
- Inline validation
- Helpful error messages
- Progress indicators

### **6. Colors**
- Teal/green primary (trust + growth)
- Dark text (not pure black)
- Subtle grays
- Accent colors sparingly
- High contrast for accessibility

---

## 📐 Layout Principles

### **Wealthsimple Layout Rules:**

1. **Generous White Space**
   - Don't crowd elements
   - Use padding liberally
   - Section spacing: 80-120px

2. **Asymmetric Grids**
   - 60/40 splits
   - Offset elements
   - Varied column widths

3. **Visual Hierarchy**
   - Size matters (big headlines)
   - Weight matters (bold = important)
   - Color matters (primary = action)

4. **Consistent Spacing**
   - Use 8px grid
   - Multiples of 8: 8, 16, 24, 32, 48, 64
   - Vertical rhythm

---

## 🖼️ Visual Elements

### **Illustrations**
- Simple, geometric
- Flat design (no gradients on illustrations)
- Limited color palette
- Playful but professional

### **Icons**
- Outlined style (not filled)
- Consistent stroke width
- 24px default size
- Lucide icons (similar to Wealthsimple's style)

### **Images**
- High quality
- Rounded corners
- Subtle shadows
- Lazy loading

---

## 💫 Micro-Interactions

### **Wealthsimple-Style Interactions:**

1. **Button Hover**
   - Lift up (translateY -2px)
   - Darken color slightly
   - Add shadow
   - 200ms transition

2. **Card Hover**
   - Lift up (translateY -4px)
   - Increase shadow
   - Border color change
   - 300ms transition

3. **Input Focus**
   - Border color to primary
   - Subtle glow (box-shadow)
   - Smooth transition

4. **Loading States**
   - Skeleton screens
   - Pulse animation
   - Smooth fade-in when loaded

5. **Success States**
   - Checkmark animation
   - Green color
   - Subtle bounce

---

## 📱 Responsive Design

### **Breakpoints:**
```css
--breakpoint-sm: 640px;   /* Mobile */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large Desktop */
--breakpoint-2xl: 1536px; /* Extra Large */
```

### **Mobile-First Approach:**
- Design for mobile first
- Progressive enhancement
- Touch-friendly (44px minimum tap targets)
- Readable text (16px minimum)

---

## 🎯 Component Examples

### **Hero Section (Wealthsimple Style)**

```tsx
<section className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-blue-50 py-20 md:py-32">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
          Learn taxes.
          <span className="text-primary"> Build wealth.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Free Canadian tax education and calculators. 
          Master your taxes in minutes, not hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn-primary">
            Start Learning →
          </button>
          <button className="btn-secondary">
            Try Calculators
          </button>
        </div>
      </div>
      <div className="relative">
        {/* Floating illustration or graphic */}
        <div className="aspect-square bg-gradient-to-br from-primary/20 to-purple/20 rounded-3xl" />
      </div>
    </div>
  </div>
</section>
```

### **Feature Card (Wealthsimple Style)**

```tsx
<div className="card hover-lift group">
  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
    <Calculator className="w-6 h-6 text-primary" />
  </div>
  <h3 className="text-xl font-bold text-gray-900 mb-2">
    Tax Calculators
  </h3>
  <p className="text-gray-600 mb-4">
    Free tools to estimate taxes, plan RRSP contributions, and more.
  </p>
  <a href="/calculators" className="text-primary font-semibold inline-flex items-center group-hover:gap-2 transition-all">
    Explore calculators
    <ArrowRight className="w-4 h-4 ml-1" />
  </a>
</div>
```

### **Stats Section (Wealthsimple Style)**

```tsx
<section className="bg-secondary text-white py-16">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="grid md:grid-cols-3 gap-12 text-center">
      <div>
        <div className="text-5xl font-black mb-2 text-primary">
          10,000+
        </div>
        <div className="text-gray-300">
          Students Learning
        </div>
      </div>
      <div>
        <div className="text-5xl font-black mb-2 text-primary">
          50,000+
        </div>
        <div className="text-gray-300">
          Calculations Made
        </div>
      </div>
      <div>
        <div className="text-5xl font-black mb-2 text-primary">
          100%
        </div>
        <div className="text-gray-300">
          Free Forever
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 🎨 Implementation Guide

### **Step 1: Update Tailwind Config**

Add to `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00D3A0',
          dark: '#00B388',
          light: '#66E6C7',
        },
        secondary: {
          DEFAULT: '#191919',
          light: '#2D2D2D',
        },
        accent: {
          purple: '#7B61FF',
          pink: '#FF6B9D',
          yellow: '#FFD166',
          blue: '#4A90E2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-2xl': 'clamp(3.5rem, 5vw, 4.5rem)',
        'display-xl': 'clamp(3rem, 4vw, 3.75rem)',
        'display-lg': 'clamp(2.5rem, 3vw, 3rem)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 40px rgba(0, 0, 0, 0.15)',
      }
    }
  }
}
```

### **Step 2: Create Global Styles**

Add to `src/app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');

:root {
  /* Wealthsimple-inspired colors */
  --color-primary: #00D3A0;
  --color-primary-dark: #00B388;
  --color-primary-light: #66E6C7;
  --color-secondary: #191919;
  --color-accent-purple: #7B61FF;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Selection color */
::selection {
  background-color: var(--color-primary);
  color: var(--color-secondary);
}
```

### **Step 3: Update Components**

Apply Wealthsimple styling to existing components:

**Before:**
```tsx
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
  Click Me
</button>
```

**After (Wealthsimple Style):**
```tsx
<button className="px-8 py-4 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
  Click Me →
</button>
```

---

## 🎯 Quick Wins for Wealthsimple Look

### **1. Update Color Scheme**
Replace all `bg-blue-600` with `bg-primary`
Replace all `text-blue-600` with `text-primary`

### **2. Increase Border Radius**
Change `rounded-lg` to `rounded-xl` or `rounded-2xl`

### **3. Add Hover Effects**
Add `hover:-translate-y-1 hover:shadow-lg transition-all` to cards and buttons

### **4. Bold Headlines**
Change `font-bold` to `font-black` on h1/h2
Increase font sizes

### **5. Generous Spacing**
Increase padding: `p-6` → `p-8` or `p-10`
Increase gaps: `gap-4` → `gap-6` or `gap-8`

### **6. Subtle Gradients**
Use `bg-gradient-to-br from-teal-50 to-blue-50` for backgrounds

---

## 📚 Resources

**Wealthsimple Design Inspiration:**
- Website: https://www.wealthsimple.com
- Magazine: https://www.wealthsimple.com/magazine
- Tax: https://www.wealthsimple.com/tax

**Design Tools:**
- Figma (for mockups)
- Coolors (color palette generator)
- Google Fonts (Inter font)

**Similar Brands:**
- Stripe (clean, developer-friendly)
- Linear (modern, fast)
- Vercel (minimalist, bold)

---

## 🎨 Color Usage Guide

### **When to Use Each Color:**

**Primary (Teal #00D3A0):**
- Primary CTAs
- Links
- Active states
- Success messages
- Brand elements

**Secondary (Dark #191919):**
- Body text
- Headlines
- Buttons (secondary)
- Backgrounds (dark mode)

**Accent Purple (#7B61FF):**
- Special features
- Premium elements
- Highlights

**Accent Pink (#FF6B9D):**
- Playful elements
- Celebrations
- Achievements

**Accent Yellow (#FFD166):**
- Warnings
- Important notices
- Highlights

**Grays:**
- Text hierarchy
- Borders
- Backgrounds
- Disabled states

---

## ✅ Implementation Checklist

### **Phase 1: Foundation**
- [ ] Update Tailwind config with Wealthsimple colors
- [ ] Add Inter font to project
- [ ] Create global CSS variables
- [ ] Update base styles

### **Phase 2: Components**
- [ ] Redesign buttons (primary, secondary, ghost)
- [ ] Redesign cards (hover effects, shadows)
- [ ] Redesign inputs (larger, cleaner)
- [ ] Update navigation
- [ ] Update footer

### **Phase 3: Pages**
- [ ] Redesign homepage
- [ ] Update calculator pages
- [ ] Update mock return wizard
- [ ] Update FAQ page
- [ ] Update glossary page

### **Phase 4: Polish**
- [ ] Add animations
- [ ] Add hover effects
- [ ] Optimize spacing
- [ ] Test mobile experience
- [ ] Add loading states

---

## 🚀 Next Steps

1. **Review this guide**
2. **Update Tailwind config**
3. **Create Wealthsimple-style global CSS**
4. **Redesign one page as proof of concept**
5. **Apply to all pages**
6. **Test and refine**

---

**This design system will make TaxCat look as polished and professional as Wealthsimple! 🎨✨**