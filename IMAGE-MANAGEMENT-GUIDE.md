# Image & Content Management Guide for EKBooks & TaxCat

## 🎯 **For Non-Technical Users: How to Add Your Own Pictures and Edit Text**

This guide will walk you through adding your own images and editing content on both the EKBooks website and TaxCat app. No coding experience required!

---

## 📸 **Part 1: Adding Images to Your Website**

### **Step 1: Prepare Your Images**
Before adding images, make sure they are:
- **High quality** (at least 1920px wide for hero images)
- **Web optimized** (under 500KB each)
- **Correct format** (JPG, PNG, or WebP)
- **Properly named** (descriptive names like `team-photo-sarah.jpg`)

### **Step 2: Upload Images to the Correct Folder**

#### **For EKBooks Website:**
1. Open your file explorer
2. Navigate to: `ekbooks-website/public/images/`
3. Copy your image files into this folder

#### **For TaxCat App:**
1. Open your file explorer
2. Navigate to: `taxcat-app/public/images/`
3. Copy your image files into this folder

### **Step 3: Update the Code to Use Your Images**

#### **Adding a Hero Image (Main Banner):**
Find this code in `ekbooks-website/src/components/HeroSection.tsx`:

```tsx
// Change this line:
<div className="text-center text-6xl p-12 bg-background-hero rounded-2xl">
  📚
</div>

// To this (replace 'your-hero-image.jpg' with your actual filename):
<div className="ws-media ws-media-rounded">
  <img
    src="/images/your-hero-image.jpg"
    alt="Professional accounting services"
    className="w-full h-full object-cover rounded-2xl"
  />
</div>
```

#### **Adding Team Photos:**
Find this code in `ekbooks-website/src/components/TeamMemberCard.tsx`:

```tsx
// Change this placeholder:
<div className="w-24 h-24 lg:w-32 lg:h-32 bg-background-alt rounded-full mx-auto mb-4 flex items-center justify-center">
  <span className="text-text-muted text-2xl lg:text-4xl font-bold">
    {name.split(' ').map(n => n[0]).join('')}
  </span>
</div>

// To this (replace 'sarah-johnson.jpg' with your actual filename):
<div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full mx-auto mb-4 overflow-hidden">
  <img
    src="/images/sarah-johnson.jpg"
    alt={`${name} - ${role}`}
    className="w-full h-full object-cover"
  />
</div>
```

#### **Adding Client Logos:**
Find this code in `ekbooks-website/src/components/TrustIndicators.tsx`:

```tsx
// Add this after the stats section:
<div className="mt-12 pt-8 border-t border-gray-200">
  <p className="text-center ws-text-sm ws-color-muted mb-6">Trusted by leading Canadian businesses</p>
  <div className="flex justify-center items-center space-x-8 opacity-60">
    <img src="/images/client-logo-1.png" alt="Client 1" className="h-8 w-auto" />
    <img src="/images/client-logo-2.png" alt="Client 2" className="h-8 w-auto" />
    <img src="/images/client-logo-3.png" alt="Client 3" className="h-8 w-auto" />
  </div>
</div>
```

---

## ✏️ **Part 2: Editing Text Content**

### **Method 1: Direct Text Editing (Simplest)**

#### **Edit Hero Section Text:**
Open `ekbooks-website/src/components/HeroSection.tsx` and find:

```tsx
<span className="ws-eyebrow-sm">Professional Accounting Services</span>
<h1 className="ws-display-xl ws-balance mt-4">
  Expert bookkeeping that grows with your business
</h1>
<p className="ws-text-lg ws-color-muted mt-6">
  Trusted financial solutions for entrepreneurs and corporations across Canada.
</p>
```

Simply replace the text between the quotes with your own content.

#### **Edit Team Member Information:**
Open `ekbooks-website/src/components/TeamSection.tsx` and find the `teamMembers` array:

```tsx
const teamMembers = [
  {
    name: 'Sarah Johnson',           // ← Change this
    role: 'Founder & Lead Accountant', // ← Change this
    bio: 'With over 15 years of experience...', // ← Change this
    linkedinUrl: 'https://linkedin.com/in/sarah-johnson-ekbooks',
    email: 'sarah@ekbooks.ca',
  },
  // Add more team members here
];
```

#### **Edit Services Information:**
Open `ekbooks-website/src/components/ServicesOverview.tsx` and find the `services` array:

```tsx
const services = [
  {
    title: 'Tax Services',           // ← Change this
    description: 'Professional tax...', // ← Change this
    icon: '📊',                      // ← Change emoji or use image
    features: [                      // ← Edit these bullet points
      'T1, T2, T3, and T5013 preparation',
      'Tax planning and optimization',
      // Add or remove features
    ],
  },
];
```

#### **Edit Pricing Information:**
Open `ekbooks-website/src/components/PricingSection.tsx` and find the `pricingPlans` array:

```tsx
const pricingPlans = [
  {
    name: 'Bookkeeping',             // ← Change this
    price: 'Starting at $150',       // ← Change this
    period: '/month',                // ← Change this
    description: 'Professional bookkeeping...', // ← Change this
    features: [                      // ← Edit these
      'Monthly bookkeeping',
      'Financial reports',
      // Add or remove features
    ],
    cta: 'Learn More',               // ← Change button text
  },
];
```

### **Method 2: Using a Content Management System (Advanced)**

If you want to edit content without touching code, we can set up a simple content management system. Let me know if you'd like this option.

---

## 🎨 **Part 3: Changing Colors and Styling**

### **Update Brand Colors:**
Open `shared-design-system/src/tokens/colors.ts`:

```tsx
// For EKBooks colors:
export const ekbooks = {
  primary: '#1A9E52',        // ← Change this green
  secondary: '#191919',      // ← Change this charcoal
  accent: '#D32F2F',         // ← Change this red
};

// For TaxCat colors:
export const taxcat = {
  primary: '#00A950',        // ← Change this green
  secondary: '#134A8E',      // ← Change this blue
  accent: '#F5A623',         // ← Change this gold
};
```

### **Update Fonts:**
Open `shared-design-system/src/tokens/typography.ts`:

```tsx
export const fonts = {
  primary: ['Inter', 'sans-serif'],     // ← Change main font
  secondary: ['Inter', 'sans-serif'],   // ← Change secondary font
};
```

---

## 🚀 **Part 4: Testing Your Changes**

### **Step 1: Start the Development Server**
Open a terminal and run:
```bash
# For EKBooks:
cd ekbooks-website && npm run dev

# For TaxCat (in another terminal):
cd taxcat-app && npm run dev
```

### **Step 2: View Your Changes**
- EKBooks: http://localhost:3000
- TaxCat: http://localhost:3001

### **Step 3: Check Mobile Responsiveness**
- Press `F12` to open developer tools
- Click the mobile icon to test different screen sizes
- Make sure images and text look good on all devices

---

## 📋 **Part 5: File Organization Guide**

### **Image File Structure:**
```
ekbooks-website/public/images/
├── hero/
│   ├── main-hero.jpg
│   └── hero-mobile.jpg
├── team/
│   ├── sarah-johnson.jpg
│   ├── michael-chen.jpg
│   └── emma-thompson.jpg
├── clients/
│   ├── client-logo-1.png
│   ├── client-logo-2.png
│   └── client-logo-3.png
└── services/
    ├── bookkeeping.jpg
    ├── tax-services.jpg
    └── consulting.jpg

taxcat-app/public/images/
├── hero/
│   └── tax-filing-hero.jpg
├── icons/
│   ├── calculator.svg
│   └── shield.svg
└── testimonials/
    ├── client-1.jpg
    └── client-2.jpg
```

### **Content File Structure:**
```
shared-design-system/src/content/
├── ekbooks/
│   ├── hero.json
│   ├── services.json
│   ├── team.json
│   └── pricing.json
└── taxcat/
    ├── hero.json
    ├── features.json
    └── pricing.json
```

---

## 🆘 **Part 6: Troubleshooting**

### **Images Not Showing:**
1. Check the file path is correct: `/images/your-image.jpg`
2. Make sure the file is in the `public/images/` folder
3. Check the file name matches exactly (case-sensitive)
4. Try refreshing the page (Ctrl+F5)

### **Text Not Updating:**
1. Save the file after making changes
2. Check that you're editing the right component file
3. Restart the development server if needed

### **Colors Not Changing:**
1. Make sure you're editing the right theme file
2. Check that the component uses the correct CSS variables
3. Clear browser cache and refresh

### **Layout Breaking:**
1. Check that all HTML tags are properly closed
2. Make sure class names are spelled correctly
3. Test on different screen sizes

---

## 📞 **Need Help?**

If you get stuck:
1. Check this guide again
2. Look at the existing code for examples
3. Ask me specific questions about what you're trying to do

Remember: **Small changes first!** Make one change at a time, test it, then move to the next change. This way you can always go back if something breaks.

---

## 🎯 **Quick Reference Commands**

```bash
# Start EKBooks development server
cd ekbooks-website && npm run dev

# Start TaxCat development server
cd taxcat-app && npm run dev

# Build for production
npm run build

# Deploy to production
npm run deploy
```

**Happy customizing! Your website should now reflect your unique brand and content. 🎨✨**