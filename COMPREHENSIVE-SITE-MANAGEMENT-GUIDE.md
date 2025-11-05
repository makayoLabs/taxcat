# Complete Site Management Guide for EKBooks & TaxCat

## 🎯 **Easy Guide to Managing Your Websites**

This guide shows you how to update and customize both your EKBooks accounting website and TaxCat tax filing application. Think of it like editing a document, but for websites!

**What you'll learn:**
- How to change text and images on your websites
- How to update team information and pricing
- How to add new pages and content
- How to test your changes before going live

---

## 📋 **Table of Contents**

1. [Quick Start](#-quick-start)
2. [Adding Images & Photos](#-adding-images--photos)
3. [Editing Text Content](#-editing-text-content)
4. [Changing Colors & Styling](#-changing-colors--styling)
5. [Managing Team Information](#-managing-team-information)
6. [Updating Services & Pricing](#-updating-services--pricing)
7. [Adding Testimonials](#-adding-testimonials)
8. [Managing FAQ Content](#-managing-faq-content)
9. [Navigation & Menu Updates](#-navigation--menu-updates)
10. [Contact Information Updates](#-contact-information-updates)
11. [Testing Your Changes](#-testing-your-changes)
12. [Troubleshooting](#-troubleshooting)
13. [Advanced Customization](#-advanced-customization)
14. [Deployment & Publishing](#-deployment--publishing)

---

## 🚀 **Getting Started**

### **Step 1: Understanding Your Website Files**
Think of your websites like a house with different rooms:

```
your-project/ (This is your main folder)
├── ekbooks-website/          # Your accounting business website
│   ├── public/images/        # 📸 All your photos go here
│   ├── src/app/             # 📄 Your website pages (like rooms)
│   └── src/components/      # 🧩 Reusable parts (like furniture)
├── taxcat-app/              # Your tax filing application
│   ├── public/images/        # 📸 Photos for the tax app
│   ├── src/app/             # 📄 Pages in the tax app
│   └── src/components/      # 🧩 Reusable parts
└── shared-design-system/     # 🎨 Shared colors and styles
```

### **Step 2: Starting Your Websites (Like Turning on Your Computer)**
Open your computer's terminal (command prompt) and type these commands:

```bash
# First, start your EKBooks website
cd ekbooks-website && npm run dev

# Then, in a new terminal window, start your TaxCat app
cd taxcat-app && npm run dev
```

**What this does:** This starts your websites so you can see them and make changes.

### **Step 3: Viewing Your Websites**
After starting them, you can see your websites by opening these links in your browser:
- **EKBooks Website**: http://localhost:3000
- **TaxCat App**: http://localhost:3001

**Tip:** Keep these terminal windows open while you're working on your websites!

---

## 📸 **Adding Images & Photos**

### **How to Add Photos to Your Website**

**What you need to know:** Images make your website look professional and help visitors understand what you do.

### **Method 1: Replace the Main Banner Image**

#### **Hero Images (The Big Picture at the Top)**
The "hero image" is the big picture visitors see first when they visit your website.

**Step-by-step instructions:**

1. **Prepare your image:**
   - Save your photo as `hero-image.jpg`
   - Make sure it's not too big (under 500KB)
   - Make it wide (about 1920 pixels wide)

2. **Put the image in the right folder:**
   - For EKBooks: Copy to `ekbooks-website/public/images/`
   - For TaxCat: Copy to `taxcat-app/public/images/`

3. **Tell your website to use the new image:**
   Find this code in your HeroSection.tsx file:
   ```tsx
   // This shows an emoji instead of a real photo:
   <div className="text-center text-6xl p-12 bg-background-hero rounded-2xl">
     📚
   </div>

   // Replace it with this (this shows your actual photo):
   <div className="ws-media ws-media-rounded">
     <img
       src="/images/hero-image.jpg"
       alt="Professional accounting services"
       className="w-full h-full object-cover rounded-2xl"
     />
   </div>
   ```

**What this does:** Changes the emoji (📚) to your actual photo.

#### **Team Photos (Adding Photos of Your Staff)**

**What this is:** Photos of the people who work at your company.

**Step-by-step instructions:**

1. **Prepare your team photos:**
   - Save each person's photo with their name: `sarah-johnson.jpg`, `michael-chen.jpg`, etc.
   - Make sure photos are square (same width and height)
   - Keep file sizes small (under 200KB each)

2. **Put photos in the right folder:**
   - Copy all team photos to: `ekbooks-website/public/images/team/`

3. **Update the team member code:**
   Find this code in TeamMemberCard.tsx:
   ```tsx
   // This shows initials instead of photos:
   <div className="w-24 h-24 lg:w-32 lg:h-32 bg-background-alt rounded-full mx-auto mb-4 flex items-center justify-center">
     <span className="text-text-muted text-2xl lg:text-4xl font-bold">
       {name.split(' ').map(n => n[0]).join('')}
     </span>
   </div>

   // Replace with this (this shows actual photos):
   <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full mx-auto mb-4 overflow-hidden">
     <img
       src="/images/team/sarah-johnson.jpg"
       alt={`${name} - ${role}`}
       className="w-full h-full object-cover"
     />
   </div>
   ```

**What this does:** Changes the initials (like "SJ" for Sarah Johnson) to actual photos.

### **Method 2: Add New Image Sections**

#### **Client Logos Section**
Add this code after testimonials in `ekbooks-website/src/app/page.tsx`:
```tsx
{/* Client Logos */}
<section className="ws-section ws-section-primary">
  <div className="ws-container">
    <div className="text-center mb-8">
      <p className="ws-text-lg ws-color-muted">Trusted by leading Canadian businesses</p>
    </div>
    <div className="flex justify-center items-center space-x-8 opacity-60">
      <img src="/images/client-logo-1.png" alt="Client 1" className="h-8 w-auto" />
      <img src="/images/client-logo-2.png" alt="Client 2" className="h-8 w-auto" />
      <img src="/images/client-logo-3.png" alt="Client 3" className="h-8 w-auto" />
    </div>
  </div>
</section>
```

---

## ✏️ **Editing Text Content**

### **How to Change Words on Your Website**

**What you need to know:** Text content is the words visitors read on your website. You can change titles, descriptions, and any other text.

### **Changing the Main Title (Hero Section)**

**What this is:** The big title at the top of your website that visitors see first.

**Step-by-step instructions:**

1. **Find the file:** Open `ekbooks-website/src/components/HeroSection.tsx`

2. **Look for these lines:**
   ```tsx
   <span className="ws-eyebrow-sm">Professional Accounting Services</span>
   <h1 className="ws-display-xl ws-balance mt-4">
     Expert bookkeeping that grows with your business
   </h1>
   <p className="ws-text-lg ws-color-muted mt-6">
     Trusted financial solutions for entrepreneurs and corporations across Canada.
   </p>
   ```

3. **Change the text:**
   - Change "Professional Accounting Services" to your own tagline
   - Change "Expert bookkeeping that grows with your business" to your main headline
   - Change "Trusted financial solutions..." to your description

**Example of what you might change it to:**
```tsx
<span className="ws-eyebrow-sm">Your Trusted Accounting Partner</span>
<h1 className="ws-display-xl ws-balance mt-4">
  Professional bookkeeping services for growing businesses
</h1>
<p className="ws-text-lg ws-color-muted mt-6">
  We help small businesses stay organized and compliant with expert accounting services.
</p>
```

### **Changing Your Services List**

**What this is:** The list of services you offer (like "Tax Services", "Bookkeeping", etc.)

**Step-by-step instructions:**

1. **Find the file:** Open `ekbooks-website/src/components/ServicesOverview.tsx`

2. **Look for this code:**
   ```tsx
   const services = [
     {
       title: 'Tax Services',           // ← Change service name
       description: 'Professional tax...', // ← Change description
       icon: '📊',                      // ← Change emoji or use image
       features: [                      // ← Edit bullet points
         'T1, T2, T3, and T5013 preparation',
         'Tax planning and optimization',
         // Add or remove features
       ],
     },
   ];
   ```

3. **Change the information:**
   - **title:** Change "Tax Services" to your service name
   - **description:** Write what this service does
   - **icon:** Change the emoji (📊) to a different one, or use an image
   - **features:** Add or remove bullet points about what's included

**Example of what you might change it to:**
```tsx
const services = [
  {
    title: 'Small Business Bookkeeping',
    description: 'Complete bookkeeping services for small businesses',
    icon: '📚',
    features: [
      'Monthly financial statements',
      'Accounts payable and receivable',
      'Bank reconciliation',
      'Tax preparation support',
    ],
  },
];
```

### **Updating Team Information**

**What this is:** Information about the people who work at your company.

**Step-by-step instructions:**

1. **Find the file:** Open `ekbooks-website/src/components/TeamSection.tsx`

2. **Look for this code:**
   ```tsx
   const teamMembers = [
     {
       name: 'Sarah Johnson',           // ← Change name
       role: 'Founder & Lead Accountant', // ← Change role
       bio: 'With over 15 years of experience...', // ← Change bio
       linkedinUrl: 'https://linkedin.com/in/sarah-johnson-ekbooks',
       email: 'sarah@ekbooks.ca',
     },
     // Add more team members here
   ];
   ```

3. **Change the information:**
   - **name:** Change to the person's real name
   - **role:** Change to their job title
   - **bio:** Write a short description about them
   - **linkedinUrl:** Change to their LinkedIn profile (or remove if they don't have one)
   - **email:** Change to their work email

**Example of what you might change it to:**
```tsx
const teamMembers = [
  {
    name: 'John Smith',
    role: 'Senior Accountant',
    bio: 'John has 10 years of experience helping small businesses with their accounting needs.',
    linkedinUrl: 'https://linkedin.com/in/john-smith-accountant',
    email: 'john@yourcompany.com',
  },
  {
    name: 'Mary Johnson',
    role: 'Tax Specialist',
    bio: 'Mary specializes in tax preparation and planning for individuals and small businesses.',
    linkedinUrl: '',
    email: 'mary@yourcompany.com',
  },
];
```

### **Updating Pricing Information**

**What this is:** The prices you charge for your services.

**Step-by-step instructions:**

1. **Find the file:** Open `ekbooks-website/src/components/PricingSection.tsx`

2. **Look for this code:**
   ```tsx
   const pricingPlans = [
     {
       name: 'Bookkeeping',             // ← Change plan name
       price: 'Starting at $150',       // ← Change price
       period: '/month',                // ← Change billing period
       description: 'Professional bookkeeping...', // ← Change description
       features: [                      // ← Edit features
         'Monthly bookkeeping',
         'Financial reports',
         // Add or remove features
       ],
       cta: 'Learn More',               // ← Change button text
     },
   ];
   ```

3. **Change the information:**
   - **name:** Change to your service name
   - **price:** Change to your actual price
   - **period:** Change how often you charge (per month, per year, etc.)
   - **description:** Write what this service includes
   - **features:** List what's included in this price
   - **cta:** Change the button text (like "Get Started" or "Contact Us")

**Example of what you might change it to:**
```tsx
const pricingPlans = [
  {
    name: 'Basic Bookkeeping',
    price: '$200',
    period: '/month',
    description: 'Essential bookkeeping services for small businesses',
    features: [
      'Monthly transaction recording',
      'Bank reconciliation',
      'Basic financial reports',
      'Email support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Premium Package',
    price: '$350',
    period: '/month',
    description: 'Complete accounting services with tax preparation',
    features: [
      'Everything in Basic',
      'Tax preparation',
      'Quarterly reports',
      'Phone support',
      'Tax planning consultation',
    ],
    cta: 'Contact Us',
  },
];
```

### **FAQ Content**
**File**: `ekbooks-website/src/components/FAQSection.tsx`
```tsx
const faqs = [
  {
    question: 'How long does bookkeeping take?', // ← Change question
    answer: 'Most bookkeeping services are completed within 5-7 business days.', // ← Change answer
  },
  // Add more FAQs here
];
```

### **Testimonials**
**File**: `ekbooks-website/src/components/Testimonials.tsx`
```tsx
const testimonials = [
  {
    quote: 'EKBooks transformed our financial management...', // ← Change quote
    author: 'Jane Smith',           // ← Change name
    role: 'CEO',                    // ← Change role
    company: 'Tech Startup Inc.',   // ← Change company
    rating: 5,                      // ← Change rating (1-5)
  },
];
```

---

## 🎨 **Changing Colors & Styling**

### **Brand Colors**
**File**: `shared-design-system/src/tokens/colors.ts`
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

### **Fonts**
**File**: `shared-design-system/src/tokens/typography.ts`
```tsx
export const fonts = {
  primary: ['Inter', 'sans-serif'],     // ← Change main font
  secondary: ['Inter', 'sans-serif'],   // ← Change secondary font
};
```

### **Button Styles**
**File**: `shared-design-system/styles/components.css`
```css
/* Change button colors */
.ws-button-primary {
  background-color: var(--color-brand-primary);
  /* Add your custom styles */
}
```

---

## 👥 **Managing Team Information**

### **Add New Team Member**
1. **Add photo** to `ekbooks-website/public/images/team/`
2. **Update TeamSection.tsx**:
```tsx
const teamMembers = [
  // Existing members...
  {
    name: 'New Member Name',
    role: 'New Position',
    bio: 'Professional background and expertise...',
    linkedinUrl: 'https://linkedin.com/in/new-member',
    email: 'newmember@ekbooks.ca',
  },
];
```

### **Remove Team Member**
Simply delete the team member object from the array.

### **Update Team Member Info**
Edit the properties in the team member object.

---

## 💼 **Updating Services & Pricing**

### **Add New Service**
**File**: `ekbooks-website/src/components/ServicesOverview.tsx`
```tsx
const services = [
  // Existing services...
  {
    title: 'New Service',
    description: 'Description of the new service...',
    icon: '🎯',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
  },
];
```

### **Modify Pricing**
**File**: `ekbooks-website/src/components/PricingSection.tsx`
```tsx
const pricingPlans = [
  {
    name: 'Premium Plan',           // ← Change name
    price: '$299',                  // ← Change price
    period: '/month',               // ← Change period
    description: 'Advanced features...', // ← Change description
    features: [                     // ← Edit features
      'Everything in Pro',
      'Priority support',
      'Custom integrations',
    ],
    popular: true,                  // ← Mark as popular
  },
];
```

---

## 💬 **Adding Testimonials**

### **Add New Testimonial**
**File**: `ekbooks-website/src/components/Testimonials.tsx`
```tsx
const testimonials = [
  // Existing testimonials...
  {
    quote: 'Outstanding service and expertise!',
    author: 'John Doe',
    role: 'Business Owner',
    company: 'Local Business Ltd.',
    rating: 5,
  },
];
```

### **Add Client Photo**
1. **Save photo** as `john-doe.jpg` in `ekbooks-website/public/images/testimonials/`
2. **Update testimonial**:
```tsx
{
  quote: 'Outstanding service!',
  author: 'John Doe',
  role: 'Business Owner',
  company: 'Local Business Ltd.',
  rating: 5,
  image: '/images/testimonials/john-doe.jpg', // ← Add this line
},
```

---

## ❓ **Managing FAQ Content**

### **Add New FAQ**
**File**: `ekbooks-website/src/components/FAQSection.tsx`
```tsx
const faqs = [
  // Existing FAQs...
  {
    question: 'New frequently asked question?',
    answer: 'Comprehensive answer explaining the topic in detail.',
  },
];
```

### **Reorder FAQs**
Simply rearrange the objects in the array.

### **Remove FAQ**
Delete the FAQ object from the array.

---

## 🧭 **Navigation & Menu Updates**

### **Update Main Navigation**
**File**: `ekbooks-website/src/components/Header.tsx`
```tsx
// Update navigation links:
<ul className="flex space-x-6 lg:space-x-8">
  <li><Link href="/" className="text-gray-600 hover:text-brand-primary font-medium transition-colors duration-200">Home</Link></li>
  <li><Link href="/about" className="text-gray-600 hover:text-brand-primary font-medium transition-colors duration-200">About</Link></li>
  <li><Link href="/services" className="text-gray-600 hover:text-brand-primary font-medium transition-colors duration-200">Services</Link></li>
  <li><Link href="/new-page" className="text-gray-600 hover:text-brand-primary font-medium transition-colors duration-200">New Page</Link></li>
  <li><Link href="http://localhost:3001" target="_blank" className="text-brand-primary hover:text-brand-primary/80 font-semibold transition-colors duration-200">TaxCat App →</Link></li>
</ul>
```

### **Add New Page**
1. **Create page**: `ekbooks-website/src/app/new-page/page.tsx`
2. **Add to navigation** as shown above
3. **Update footer links** if needed

---

## 📞 **Contact Information Updates**

### **Update Contact Details**
**File**: `ekbooks-website/src/app/contact/page.tsx`
```tsx
// Update contact information:
<div className="bg-white rounded-xl p-6 shadow-sm">
  <div className="text-4xl mb-4">📞</div>
  <h3 className="font-bold text-primary mb-2">Call us</h3>
  <p className="text-text-muted">(123) 456-7890</p>
  <p className="text-sm text-text-muted mt-1">Mon-Fri: 9am - 5pm EST</p>
</div>
<div className="bg-white rounded-xl p-6 shadow-sm">
  <div className="text-4xl mb-4">✉️</div>
  <h3 className="font-bold text-primary mb-2">Email us</h3>
  <p className="text-text-muted">your.email@ekbooks.ca</p>
  <p className="text-sm text-text-muted mt-1">24-hour response time</p>
</div>
<div className="bg-white rounded-xl p-6 shadow-sm">
  <div className="text-4xl mb-4">📍</div>
  <h3 className="font-bold text-primary mb-2">Visit us</h3>
  <p className="text-text-muted">123 Your Street</p>
  <p className="text-text-muted">Your City, Province</p>
</div>
```

### **Update Footer Contact**
**File**: Footer component (if exists)
```tsx
// Update footer contact information
<div>
  <h4 className="font-semibold mb-4">Contact</h4>
  <p className="text-sm text-gray-600 mb-2">Phone: (123) 456-7890</p>
  <p className="text-sm text-gray-600 mb-2">Email: info@ekbooks.ca</p>
  <p className="text-sm text-gray-600">Address: 123 Your Street, Your City</p>
</div>
```

---

## 🧪 **Testing Your Changes**

### **Step 1: Start Development Servers**
```bash
# Terminal 1: EKBooks
cd ekbooks-website && npm run dev

# Terminal 2: TaxCat
cd taxcat-app && npm run dev
```

### **Step 2: Check Responsiveness**
1. **Open browser** to http://localhost:3000 (EKBooks) or http://localhost:3001 (TaxCat)
2. **Press F12** to open developer tools
3. **Click mobile icon** to test different screen sizes
4. **Check all breakpoints**: 640px, 768px, 1024px, 1280px

### **Step 3: Test Functionality**
- Click all navigation links
- Test contact forms
- Check image loading
- Verify mobile menu (if applicable)

### **Step 4: Cross-Browser Testing**
- Test in Chrome, Firefox, Safari, Edge
- Check on different devices if possible

---

## 🔧 **Troubleshooting**

### **Images Not Showing**
1. **Check file path**: `/images/your-image.jpg`
2. **Verify file location**: Must be in `public/images/` folder
3. **Check file name**: Case-sensitive, no spaces
4. **Clear cache**: Ctrl+F5 or hard refresh

### **Text Not Updating**
1. **Save the file** after changes
2. **Check correct file**: Edit the right component
3. **Restart dev server** if needed: `Ctrl+C` then `npm run dev`

### **Colors Not Changing**
1. **Edit right theme file**: `colors.ts` for brand colors
2. **Check CSS variables**: Components use `var(--color-brand-primary)`
3. **Clear browser cache**

### **Layout Breaking**
1. **Check HTML structure**: All tags properly closed
2. **Verify class names**: No typos in Tailwind classes
3. **Test responsive breakpoints**

### **Build Errors**
1. **Check console**: Look for TypeScript/syntax errors
2. **Verify imports**: All components properly imported
3. **Check file paths**: Relative paths correct

---

## 🚀 **Advanced Customization**

### **Add New Components**
1. **Create component** in `shared-design-system/src/components/`
2. **Export from** `index.tsx`
3. **Use in pages** with `<YourComponent />`

### **Custom Styling**
1. **Add CSS** to `shared-design-system/styles/components.css`
2. **Use CSS variables** for theming
3. **Follow BEM naming** convention

### **Add New Pages**
1. **Create folder**: `src/app/new-page/`
2. **Add page.tsx**: Export default React component
3. **Update navigation**: Add link to header

---

## 🌐 **Deployment & Publishing**

### **Build for Production**
```bash
# EKBooks
cd ekbooks-website && npm run build

# TaxCat
cd taxcat-app && npm run build
```

### **Deploy Commands**
```bash
# Deploy EKBooks
cd ekbooks-website && npm run deploy

# Deploy TaxCat
cd taxcat-app && npm run deploy
```

### **Environment Variables**
Create `.env.local` files for production settings:
```
# EKBooks
NEXT_PUBLIC_SITE_URL=https://ekbooks.ca
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# TaxCat
NEXT_PUBLIC_SITE_URL=https://taxcat.ca
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## 📞 **Support & Resources**

### **Quick Reference**
- **EKBooks**: http://localhost:3000
- **TaxCat**: http://localhost:3001
- **Design System**: `shared-design-system/`
- **Images**: `public/images/` in each project

### **File Organization**
```
ekbooks-website/
├── public/images/          # All images
├── src/app/               # Pages
├── src/components/        # Components
└── src/styles/            # Custom styles

taxcat-app/
├── public/images/          # All images
├── src/app/               # App pages
├── src/components/        # App components
└── src/styles/            # Custom styles
```

### **Common Tasks**
1. **Add image**: Save to `public/images/`, update component
2. **Edit text**: Find component file, change content
3. **Change colors**: Edit `colors.ts`, update CSS variables
4. **Add page**: Create folder in `src/app/`, add to navigation

---

## 🎯 **Final Tips**

1. **Small Changes First**: Make one change at a time, test, then proceed
2. **Backup Files**: Keep copies of working versions
3. **Use Version Control**: Commit changes regularly
4. **Test Everything**: Check desktop, mobile, and all browsers
5. **Ask for Help**: This guide covers most scenarios, but I'm here if you need assistance!

---

## 📚 **Quick Reference - What You Need to Remember**

### **The Most Important Things to Know:**

1. **Your websites are like houses with rooms:**
   - Each page is a room
   - Images go in the `public/images/` folder
   - Text is stored in component files

2. **To make changes:**
   - Find the right file (like finding the right room)
   - Change the text or code
   - Save the file
   - Look at your website to see the changes

3. **Always test your changes:**
   - Start your websites (`npm run dev`)
   - Open them in your browser
   - Make sure everything looks good
   - Fix any problems before going live

### **Common Tasks Made Simple:**

| **What you want to do** | **Where to go** | **What to change** |
|------------------------|-----------------|-------------------|
| Change the main title | `HeroSection.tsx` | The text inside `<h1>` |
| Add team photos | `public/images/team/` | Save photos, update `TeamMemberCard.tsx` |
| Change prices | `PricingSection.tsx` | The `price` and `features` |
| Update contact info | `ContactSection.tsx` | Phone, email, address |
| Add new service | `ServicesOverview.tsx` | Add new item to `services` array |

### **If You Get Stuck:**

1. **Check the file names** - Make sure you're editing the right file
2. **Look for typos** - Even small mistakes can break things
3. **Save your files** - Changes don't work until you save
4. **Refresh your browser** - Sometimes you need to reload the page
5. **Ask for help** - It's okay to get assistance when you need it

### **Remember:**
- **Start small** - Make one change at a time
- **Test often** - Check your website after each change
- **Keep backups** - Save copies of your files before making big changes
- **Be patient** - Learning takes time, but you'll get better with practice

**You've got this!** 🎉

**Your websites are now fully customizable! You can update content, add images, change colors, and manage all aspects of both EKBooks and TaxCat with confidence. 🎨✨**