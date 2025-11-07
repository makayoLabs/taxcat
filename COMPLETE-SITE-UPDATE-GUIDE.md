# 📖 Complete Site Update Guide - TaxCat & EKBooks

**The Ultimate Reference for Managing Both Websites**

**Version:** 1.0  
**Date:** November 7, 2025  
**For:** TaxCat.ca & EKBooks.ca

---

## 📋 Table of Contents

1. [Quick Reference](#quick-reference)
2. [Project Structure](#project-structure)
3. [How to Update Text Content](#how-to-update-text-content)
4. [How to Add/Change Images](#how-to-addchange-images)
5. [How to Update Navigation](#how-to-update-navigation)
6. [How to Add New Pages](#how-to-add-new-pages)
7. [How to Update Colors/Branding](#how-to-update-colorsbranding)
8. [How to Add Team Members](#how-to-add-team-members)
9. [How to Update Services/Pricing](#how-to-update-servicespricing)
10. [How to Add Blog Posts](#how-to-add-blog-posts)
11. [How to Update Calculators](#how-to-update-calculators)
12. [How to Deploy Changes](#how-to-deploy-changes)
13. [Troubleshooting](#troubleshooting)

---

## 🎯 Quick Reference

### **File Locations Cheat Sheet**

| What to Update | TaxCat File | EKBooks File |
|----------------|-------------|--------------|
| Navigation | `src/components/UnifiedNavigation.tsx` | `ekbooks-website/src/components/Header.tsx` |
| Homepage | `src/app/page.tsx` | `ekbooks-website/src/app/page.tsx` |
| Footer | `src/components/Footer.tsx` | `ekbooks-website/src/components/Footer.tsx` |
| Colors | `tailwind.config.ts` | `ekbooks-website/tailwind.config.ts` |
| Images | `public/images/` | `ekbooks-website/public/images/` |
| Team | N/A | `ekbooks-website/src/components/TeamSection.tsx` |
| Services | N/A | `ekbooks-website/src/components/ServicesOverview.tsx` |
| Calculators | `src/app/calculators/` | N/A |

---

## 📁 Project Structure

```
taxcat-app/                          ← Main repository
├── src/                             ← TaxCat source code
│   ├── app/                         ← TaxCat pages
│   │   ├── page.tsx                 ← Homepage
│   │   ├── calculators/             ← All 6 calculators
│   │   ├── mock-return/             ← Tax filing wizard
│   │   ├── faq/                     ← FAQ page
│   │   ├── glossary/                ← Glossary page
│   │   └── tools/                   ← Legacy tools
│   ├── components/                  ← TaxCat components
│   │   ├── UnifiedNavigation.tsx    ← Main navigation
│   │   └── [other components]
│   ├── lib/cra/                     ← Tax calculation library
│   └── styles/                      ← TaxCat styles
├── ekbooks-website/                 ← EKBooks Next.js app
│   ├── src/
│   │   ├── app/                     ← EKBooks pages
│   │   │   ├── page.tsx             ← Homepage
│   │   │   ├── about/               ← About page
│   │   │   ├── services/            ← Services page
│   │   │   └── contact/             ← Contact page
│   │   └── components/              ← EKBooks components
│   │       ├── Header.tsx           ← Navigation
│   │       ├── Footer.tsx           ← Footer
│   │       ├── HeroSection.tsx      ← Hero banner
│   │       ├── ServicesOverview.tsx ← Services list
│   │       ├── TeamSection.tsx      ← Team members
│   │       └── [other components]
│   └── public/images/               ← EKBooks images
├── shared-design-system/            ← Shared components
├── public/images/                   ← TaxCat images
└── [config files]
```

---

## ✏️ How to Update Text Content

### **TaxCat Homepage Text**

**File:** `src/app/page.tsx`

**To change the main headline:**
1. Open `src/app/page.tsx`
2. Find the `<h1>` tag (usually around line 20-30)
3. Change the text between the tags
4. Save (Ctrl+S)

**Example:**
```tsx
// BEFORE:
<h1 className="text-5xl font-bold">
  Really great tax software at a really great price
</h1>

// AFTER:
<h1 className="text-5xl font-bold">
  Your New Headline Here
</h1>
```

---

### **EKBooks Homepage Text**

**File:** `ekbooks-website/src/components/HeroSection.tsx`

**To change the main headline:**
1. Open `ekbooks-website/src/components/HeroSection.tsx`
2. Find the headline (look for `ws-display-xl` or `<h1>`)
3. Change the text
4. Save

**Example:**
```tsx
// BEFORE:
<h1 className="ws-display-xl">
  Expert bookkeeping that grows with your business
</h1>

// AFTER:
<h1 className="ws-display-xl">
  Your New EKBooks Headline
</h1>
```

---

### **Calculator Text**

**Files:** `src/app/calculators/[calculator-name]/page.tsx`

**To update calculator descriptions:**
1. Open the specific calculator file
2. Find the description text (usually near the top)
3. Change the text
4. Save

**Example for Tax Bracket Calculator:**
```tsx
// File: src/app/calculators/tax-bracket/page.tsx

// BEFORE:
<p className="text-lg text-gray-600">
  Find out which tax bracket you're in
</p>

// AFTER:
<p className="text-lg text-gray-600">
  Your new description here
</p>
```

---

## 🖼️ How to Add/Change Images

### **Adding Images to TaxCat**

**Step 1: Save your image**
- Place image in: `public/images/`
- Recommended format: `.jpg` or `.webp`
- Optimize size: Under 500KB

**Step 2: Use in code**
```tsx
<img
  src="/images/your-image.jpg"
  alt="Description of image"
  className="w-full h-auto rounded-lg"
/>
```

**Common Image Locations:**

**Hero Image:**
```tsx
// File: src/app/page.tsx or HeroSection component
<img
  src="/images/hero-image.jpg"
  alt="TaxCat tax education platform"
  className="w-full h-full object-cover rounded-2xl"
/>
```

**Feature Images:**
```tsx
// File: src/components/FeaturesSection.tsx
<img
  src="/images/feature-calculators.jpg"
  alt="Tax calculators"
  className="w-64 h-64 object-cover rounded-lg"
/>
```

---

### **Adding Images to EKBooks**

**Step 1: Save your image**
- Place image in: `ekbooks-website/public/images/`

**Step 2: Update component**

**Hero Image:**
```tsx
// File: ekbooks-website/src/components/HeroSection.tsx
<img
  src="/images/hero-image.jpg"
  alt="Professional bookkeeping services"
  className="w-full h-auto rounded-2xl shadow-lg"
/>
```

**Service Images:**
```tsx
// File: ekbooks-website/src/components/ServicesOverview.tsx

const services = [
  {
    title: 'Bookkeeping',
    description: '...',
    image: '/images/service-bookkeeping.jpg', // ← Add this
    icon: '📚',
  },
];

// In the component:
{service.image && (
  <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-lg mb-4" />
)}
```

**Team Photos:**
```tsx
// File: ekbooks-website/src/components/TeamMemberCard.tsx

<img
  src="/images/team/john-smith.jpg"
  alt="John Smith - Senior Accountant"
  className="w-32 h-32 rounded-full object-cover"
/>
```

---

## 🧭 How to Update Navigation

### **TaxCat Navigation**

**File:** `src/components/UnifiedNavigation.tsx`

**To add a new menu item:**

1. Find the desktop navigation section (around line 32)
2. Add your new link:

```tsx
<Link
  href="/your-new-page"
  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
    pathname === '/your-new-page' ? 'text-primary bg-white/10' : 'text-white hover:text-primary hover:bg-white/5'
  }`}
>
  New Page
</Link>
```

**To add item to Tools dropdown:**

Find the Tools dropdown section (around line 57) and add:

```tsx
<Link
  href="/tools/new-tool"
  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
>
  <Calculator className="w-5 h-5 mr-3 text-primary" />
  <div>
    <div className="font-medium">New Tool Name</div>
    <div className="text-xs text-gray-500">Description</div>
  </div>
</Link>
```

---

### **EKBooks Navigation**

**File:** `ekbooks-website/src/components/Header.tsx`

**To add a new menu item:**

Find the navigation section (around line 34) and add:

```tsx
<Link
  href="/new-page"
  className="text-gray-600 hover:text-brand-primary font-medium transition-colors duration-200"
>
  New Page
</Link>
```

---

## 📄 How to Add New Pages

### **Adding a Page to TaxCat**

**Step 1: Create the page file**
```bash
# Create directory
mkdir src/app/new-page

# Create page file
# File: src/app/new-page/page.tsx
```

**Step 2: Add basic page structure**
```tsx
export default function NewPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          New Page Title
        </h1>
        <p className="text-lg text-gray-600">
          Your content here
        </p>
      </div>
    </div>
  );
}
```

**Step 3: Add to navigation** (see Navigation section above)

**Step 4: Add to sitemap**
```tsx
// File: src/app/sitemap.ts
// Add to the routes array:
'/new-page',
```

---

### **Adding a Page to EKBooks**

**Step 1: Create the page file**
```bash
mkdir ekbooks-website/src/app/new-page
# Create: ekbooks-website/src/app/new-page/page.tsx
```

**Step 2: Add page structure**
```tsx
export default function NewPage() {
  return (
    <div className="ws-section">
      <div className="ws-container">
        <h1 className="ws-display-xl mb-6">
          New Page Title
        </h1>
        <p className="ws-text-lg ws-color-muted">
          Your content here
        </p>
      </div>
    </div>
  );
}
```

**Step 3: Add to Header navigation**

---

## 🎨 How to Update Colors/Branding

### **TaxCat Colors**

**File:** `tailwind.config.ts`

**Current Wealthsimple-inspired colors:**
```typescript
colors: {
  primary: {
    DEFAULT: '#00D3A0',  // Teal
    dark: '#00B388',
    light: '#66E6C7',
  },
}
```

**To change:**
1. Open `tailwind.config.ts`
2. Find the `colors` section
3. Change the hex values
4. Save
5. Restart dev server: `npm run dev`

---

### **EKBooks Colors**

**File:** `ekbooks-website/tailwind.config.ts` or `shared-design-system/src/tokens/colors.ts`

**Current colors:**
```typescript
ekbooks: {
  primary: '#1A9E52',    // Emerald green
  secondary: '#191919',  // Charcoal
  accent: '#D32F2F',     // Red
}
```

**To change:**
1. Open the config file
2. Update hex values
3. Save
4. Restart: `cd ekbooks-website && npm run dev`

---

## 👥 How to Add Team Members

### **EKBooks Team Section**

**File:** `ekbooks-website/src/components/TeamSection.tsx`

**Step 1: Add team member photo**
- Save photo as: `ekbooks-website/public/images/team/member-name.jpg`
- Recommended size: 800x800px (square)
- Format: JPG or WebP

**Step 2: Add to team array**

```tsx
const teamMembers = [
  // Existing members...
  {
    name: 'New Member Name',
    role: 'Position Title',
    bio: 'Brief bio about this person and their expertise...',
    image: '/images/team/member-name.jpg',  // ← Add this
    linkedinUrl: 'https://linkedin.com/in/username',
    email: 'member@ekbooks.ca',
  },
];
```

**Step 3: Save and refresh**

---

## 💼 How to Update Services/Pricing

### **EKBooks Services**

**File:** `ekbooks-website/src/components/ServicesOverview.tsx`

**To add a new service:**

```tsx
const services = [
  // Existing services...
  {
    title: 'New Service Name',
    description: 'What this service provides...',
    icon: '🎯',  // Choose an emoji or use image
    image: '/images/service-new.jpg',  // Optional
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
  },
];
```

---

### **EKBooks Pricing**

**File:** `ekbooks-website/src/components/PricingSection.tsx`

**To update pricing:**

```tsx
const pricingPlans = [
  {
    name: 'Basic Package',
    price: '$299',           // ← Change price
    period: '/month',        // ← Change period
    description: 'Perfect for small businesses...',
    features: [
      'Monthly bookkeeping',
      'Financial reports',
      'Email support',
    ],
    popular: false,          // Set true to highlight
  },
];
```

---

## 📝 How to Add Blog Posts

### **TaxCat Blog (If you add one)**

**Step 1: Create blog directory**
```bash
mkdir src/app/blog
mkdir src/app/blog/[slug]
```

**Step 2: Create blog post**
```tsx
// File: src/app/blog/[slug]/page.tsx

export default function BlogPost({ params }: { params: { slug: string } }) {
  // Fetch blog post data based on slug
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Blog Post Title</h1>
      <div className="prose lg:prose-xl">
        {/* Your content */}
      </div>
    </article>
  );
}
```

**Step 3: Create blog index**
```tsx
// File: src/app/blog/page.tsx

export default function BlogIndex() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tax Education Blog</h1>
      {/* List of blog posts */}
    </div>
  );
}
```

---

## 🧮 How to Update Calculators

### **Updating Tax Rates (Annual Update)**

**File:** `src/lib/cra/taxRates2025.ts`

**When CRA publishes new rates (usually January):**

1. Open `src/lib/cra/taxRates2025.ts`
2. Update the year:
```typescript
export const TAX_YEAR = 2026;  // ← Change year
```

3. Update federal brackets:
```typescript
export const FEDERAL_TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 56000, rate: 0.15 },  // ← Update amounts
  { min: 56000, max: 112000, rate: 0.205 },
  // ... update all brackets
];
```

4. Update provincial brackets for each province
5. Update CPP/EI maximums:
```typescript
export const CPP_MAX_PENSIONABLE_EARNINGS = 70000;  // ← Update
export const EI_MAX_INSURABLE_EARNINGS = 64000;     // ← Update
```

6. Save and test all calculators

---

### **Adding a New Calculator**

**Step 1: Create calculator directory**
```bash
mkdir src/app/calculators/new-calculator
```

**Step 2: Create page file**
```tsx
// File: src/app/calculators/new-calculator/page.tsx

'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/cra';

export default function NewCalculator() {
  const [input, setInput] = useState<number>(0);
  const result = input * 1.13; // Your calculation logic

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">New Calculator</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <label className="block mb-2">Input:</label>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg"
          />
          
          <div className="mt-6 text-2xl font-bold">
            Result: {formatCurrency(result)}
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Add to calculator index**
```tsx
// File: src/app/calculators/page.tsx

const calculators = [
  // Existing calculators...
  {
    title: 'New Calculator',
    description: 'What it calculates...',
    href: '/calculators/new-calculator',
    icon: <Calculator className="w-8 h-8" />,
    status: 'available',
    difficulty: 'beginner',
  },
];
```

---

## 🚀 How to Deploy Changes

### **Development (Testing)**

**TaxCat:**
```bash
cd taxcat-app
npm run dev
# Visit: http://localhost:3000
```

**EKBooks:**
```bash
cd ekbooks-website
npm run dev
# Visit: http://localhost:3001
```

---

### **Production Deployment**

**Step 1: Build both sites**
```bash
# TaxCat
cd taxcat-app
npm run build

# EKBooks
cd ekbooks-website
npm run build
```

**Step 2: Test production builds**
```bash
# TaxCat
npm start

# EKBooks
cd ekbooks-website
npm start
```

**Step 3: Deploy**
- Follow your deployment guide (DEPLOYMENT.md)
- Or use Docker Compose (docker-compose.yml)

---

## 🔧 Common Updates - Quick Guide

### **1. Change Phone Number (EKBooks)**

**Files to update:**
- `ekbooks-website/src/components/Header.tsx` (if shown)
- `ekbooks-website/src/components/Footer.tsx`
- `ekbooks-website/src/app/contact/page.tsx`

**Find and replace:**
```tsx
// OLD:
(123) 456-7890

// NEW:
(416) 555-1234
```

---

### **2. Change Email Address**

**TaxCat:**
- `src/app/contact/page.tsx`
- `src/components/Footer.tsx`

**EKBooks:**
- `ekbooks-website/src/app/contact/page.tsx`
- `ekbooks-website/src/components/Footer.tsx`

---

### **3. Update Social Media Links**

**File:** `ekbooks-website/src/components/Footer.tsx`

```tsx
<a href="https://facebook.com/yourpage" target="_blank">
  Facebook
</a>
<a href="https://linkedin.com/company/yourcompany" target="_blank">
  LinkedIn
</a>
```

---

### **4. Change Business Hours**

**File:** `ekbooks-website/src/app/contact/page.tsx`

```tsx
<p className="text-gray-600">
  Monday - Friday: 9:00 AM - 5:00 PM EST
</p>
```

---

### **5. Update Copyright Year**

**TaxCat Footer:**
```tsx
// File: src/components/Footer.tsx
© {new Date().getFullYear()} TaxCat
```

**EKBooks Footer:**
```tsx
// File: ekbooks-website/src/components/Footer.tsx
© {new Date().getFullYear()} EKBooks
```

---

## 🎨 Advanced Customization

### **Adding Custom CSS**

**TaxCat:**
```css
/* File: src/styles/globals.css */

.custom-class {
  background-color: var(--color-primary);
  padding: 2rem;
  border-radius: 1rem;
}
```

**EKBooks:**
```css
/* File: ekbooks-website/src/styles/globals.css */

.custom-ekbooks-class {
  background-color: var(--color-brand-primary);
  /* Your styles */
}
```

---

### **Adding Custom Components**

**Step 1: Create component file**
```tsx
// File: src/components/CustomComponent.tsx

export default function CustomComponent() {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="font-bold mb-2">Custom Component</h3>
      <p>Your content here</p>
    </div>
  );
}
```

**Step 2: Import and use**
```tsx
// In any page file:
import CustomComponent from '@/components/CustomComponent';

export default function Page() {
  return (
    <div>
      <CustomComponent />
    </div>
  );
}
```

---

## 🔍 Troubleshooting

### **Images Not Showing**

**Check:**
1. ✅ Image is in `public/images/` folder
2. ✅ Path starts with `/images/` (not `public/images/`)
3. ✅ Filename matches exactly (case-sensitive)
4. ✅ Image format is supported (.jpg, .png, .webp, .svg)

**Fix:**
```tsx
// WRONG:
<img src="public/images/photo.jpg" />
<img src="images/photo.jpg" />

// CORRECT:
<img src="/images/photo.jpg" />
```

---

### **Changes Not Appearing**

**Try:**
1. **Hard refresh:** Ctrl+F5 or Cmd+Shift+R
2. **Clear cache:** Browser settings → Clear cache
3. **Restart dev server:** 
   - Stop: Ctrl+C
   - Start: `npm run dev`
4. **Check console:** F12 → Console tab for errors

---

### **Navigation Not Updating**

**Check:**
1. ✅ File saved (Ctrl+S)
2. ✅ No syntax errors (check console)
3. ✅ Dev server running
4. ✅ Correct file edited

**Common issue:** Editing wrong navigation file
- TaxCat uses: `UnifiedNavigation.tsx`
- EKBooks uses: `Header.tsx`

---

### **Styles Not Applying**

**Check:**
1. ✅ Tailwind classes spelled correctly
2. ✅ Custom CSS in globals.css
3. ✅ No conflicting styles
4. ✅ Purge cache: Delete `.next` folder and rebuild

**Fix:**
```bash
# Delete build cache
rm -rf .next
rm -rf node_modules/.cache

# Rebuild
npm run dev
```

---

## 📊 Content Update Checklist

### **When Adding New Content:**

- [ ] Create/update the file
- [ ] Add images to `public/images/`
- [ ] Update navigation if needed
- [ ] Add to sitemap
- [ ] Test on desktop
- [ ] Test on mobile
- [ ] Check all links work
- [ ] Proofread text
- [ ] Optimize images (<500KB)
- [ ] Commit to Git
- [ ] Push to GitHub
- [ ] Deploy to production

---

## 🎯 Quick Tasks Reference

| Task | TaxCat File | EKBooks File | Time |
|------|-------------|--------------|------|
| Change headline | `src/app/page.tsx` | `ekbooks-website/src/components/HeroSection.tsx` | 2 min |
| Add image | `public/images/` | `ekbooks-website/public/images/` | 5 min |
| Add team member | N/A | `ekbooks-website/src/components/TeamSection.tsx` | 10 min |
| Update pricing | N/A | `ekbooks-website/src/components/PricingSection.tsx` | 5 min |
| Add nav link | `src/components/UnifiedNavigation.tsx` | `ekbooks-website/src/components/Header.tsx` | 5 min |
| Add new page | `src/app/new-page/page.tsx` | `ekbooks-website/src/app/new-page/page.tsx` | 30 min |
| Update colors | `tailwind.config.ts` | `ekbooks-website/tailwind.config.ts` | 10 min |
| Add calculator | `src/app/calculators/new/page.tsx` | N/A | 2-4 hours |

---

## 📚 File Reference Guide

### **TaxCat Key Files:**

**Pages:**
- `src/app/page.tsx` - Homepage
- `src/app/calculators/page.tsx` - Calculator index
- `src/app/calculators/[name]/page.tsx` - Individual calculators
- `src/app/mock-return/page.tsx` - Mock return landing
- `src/app/mock-return/wizard/page.tsx` - Tax wizard
- `src/app/faq/page.tsx` - FAQ
- `src/app/glossary/page.tsx` - Glossary

**Components:**
- `src/components/UnifiedNavigation.tsx` - Main navigation
- `src/components/Footer.tsx` - Footer
- `src/components/[others]` - Various components

**Libraries:**
- `src/lib/cra/taxRates2025.ts` - Tax rates and calculations
- `src/lib/cra/tfsaRates.ts` - TFSA data

**Styles:**
- `src/styles/globals.css` - Global styles
- `tailwind.config.ts` - Tailwind configuration

---

### **EKBooks Key Files:**

**Pages:**
- `ekbooks-website/src/app/page.tsx` - Homepage
- `ekbooks-website/src/app/about/page.tsx` - About
- `ekbooks-website/src/app/services/page.tsx` - Services
- `ekbooks-website/src/app/contact/page.tsx` - Contact

**Components:**
- `ekbooks-website/src/components/Header.tsx` - Navigation
- `ekbooks-website/src/components/Footer.tsx` - Footer
- `ekbooks-website/src/components/HeroSection.tsx` - Hero banner
- `ekbooks-website/src/components/ServicesOverview.tsx` - Services
- `ekbooks-website/src/components/TeamSection.tsx` - Team
- `ekbooks-website/src/components/PricingSection.tsx` - Pricing
- `ekbooks-website/src/components/Testimonials.tsx` - Testimonials

**Styles:**
- `ekbooks-website/src/styles/globals.css` - Global styles
- `ekbooks-website/tailwind.config.ts` - Tailwind config

---

## 🎨 Design System Reference

### **TaxCat Design Tokens:**

**Colors:**
- Primary: `#00D3A0` (Teal) - Use: `bg-primary`, `text-primary`
- Secondary: `#191919` (Dark) - Use: `bg-secondary`, `text-secondary`
- Accent: `#7B61FF` (Purple) - Use: `bg-accent-purple`

**Typography:**
- Font: Inter
- Headings: `text-4xl font-bold`
- Body: `text-lg text-gray-600`

**Spacing:**
- Sections: `py-16` or `ws-section`
- Cards: `p-6` or `p-8`
- Gaps: `gap-6` or `gap-8`

---

### **EKBooks Design Tokens:**

**Colors:**
- Primary: `#1A9E52` (Green) - Use: `bg-brand-primary`
- Secondary: `#191919` (Charcoal) - Use: `bg-brand-secondary`
- Accent: `#D32F2F` (Red) - Use: `bg-brand-accent`

**Typography:**
- Font: Inter
- Headings: `ws-display-xl`, `ws-heading-lg`
- Body: `ws-text-lg`, `ws-color-muted`

**Components:**
- Buttons: `ws-button ws-button-primary`
- Cards: `ws-card`
- Sections: `ws-section`

---

## 💡 Best Practices

### **When Making Changes:**

1. **Always test locally first**
   - Run `npm run dev`
   - Check in browser
   - Test on mobile (F12 → Device toolbar)

2. **Commit frequently**
   ```bash
   git add .
   git commit -m "Descriptive message"
   git push origin v2.0-development
   ```

3. **Keep backups**
   - Git handles this automatically
   - But keep important files backed up

4. **Test before deploying**
   - Run `npm run build`
   - Fix any build errors
   - Test production build

5. **Update documentation**
   - Keep README.md current
   - Document major changes
   - Update version numbers

---

## 🆘 Getting Help

### **Resources:**

**Documentation:**
- This guide (COMPLETE-SITE-UPDATE-GUIDE.md)
- COMPREHENSIVE-SITE-MANAGEMENT-GUIDE.md
- WEALTHSIMPLE-DESIGN-GUIDE.md
- VISUAL-ASSETS-GUIDE.md

**Official Docs:**
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React: https://react.dev

**CRA Resources:**
- Tax Rates: https://www.canada.ca/en/revenue-agency.html
- Forms: https://www.canada.ca/en/revenue-agency/services/forms-publications.html

---

## ✅ Final Checklist

### **Before Deploying Changes:**

- [ ] All changes tested locally
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Images optimized
- [ ] Links work
- [ ] Text proofread
- [ ] Git committed
- [ ] Build successful (`npm run build`)
- [ ] Production tested (`npm start`)
- [ ] Backup created

---

**This guide covers everything you need to manage both TaxCat and EKBooks! Bookmark it and refer back whenever you need to make updates! 📖✨**