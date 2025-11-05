# TaxCat App - Wealthsimple Design Deployment Guide

## 🎨 Design System Implementation Complete

The TaxCat app now features a complete Wealthsimple-inspired design system with:
- ✅ Modern color palette
- ✅ Typography system
- ✅ Component library
- ✅ Responsive grid system
- ✅ Accessibility features

---

## 🚀 Deployment Options

### Option 1: Docker (Current Setup - Recommended)

Your TaxCat app is already configured for Docker deployment.

#### Quick Start:
```bash
# Build and run
docker-compose up -d

# Or for production
docker-compose -f docker-compose.production.yml up -d
```

#### Access:
- Local: http://localhost:3000
- Production: Configure nginx reverse proxy

---

### Option 2: Unraid Server (Your Current Setup)

You already have Unraid deployment scripts configured!

#### Deploy to Unraid:
```bash
# Use your existing script
./deploy-unraid-complete.sh

# Or step by step
./scripts/deploy-unraid.sh
```

#### Configuration:
- Check `docker-compose.unraid.yml` for settings
- Nginx config: `nginx/taxcat.subdomain.conf`
- Environment: `.env.production`

---

### Option 3: Traditional VPS/Server

#### Requirements:
- Node.js 18+ installed
- PostgreSQL database
- Nginx (for reverse proxy)
- PM2 (for process management)

#### Steps:

1. **Install Dependencies**:
   ```bash
   npm install
   npm run build
   ```

2. **Setup Database**:
   ```bash
   # Run Prisma migrations
   npx prisma migrate deploy
   npx prisma generate
   ```

3. **Start with PM2**:
   ```bash
   npm install -g pm2
   pm2 start npm --name "taxcat" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**:
   ```nginx
   server {
       listen 80;
       server_name taxcat.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

5. **Enable HTTPS** (Let's Encrypt):
   ```bash
   sudo certbot --nginx -d taxcat.yourdomain.com
   ```

---

### Option 4: Cloud Platforms

#### Vercel:
```bash
npm install -g vercel
vercel
```

#### Railway:
1. Connect GitHub repo
2. Add PostgreSQL database
3. Set environment variables
4. Deploy automatically

#### Render:
1. Create new Web Service
2. Connect repository
3. Build command: `npm run build`
4. Start command: `npm start`
5. Add PostgreSQL database

---

## 🔐 Environment Variables

### Required Variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/taxcat"

# App
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://taxcat.yourdomain.com

# Authentication (if using)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://taxcat.yourdomain.com

# Email (if using)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Payment (if using)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## 📦 Build Process

### Development:
```bash
npm run dev
```

### Production Build:
```bash
npm run build
npm start
```

### Docker Build:
```bash
docker build -t taxcat-app .
docker run -p 3000:3000 taxcat-app
```

---

## 🎯 WordPress Integration (If Needed)

### Option A: Subdomain
- Deploy TaxCat on subdomain: `app.ekbooks.com`
- Keep WordPress on main domain: `ekbooks.com`
- Link between them with navigation

### Option B: Reverse Proxy
```nginx
# WordPress on main domain
server {
    server_name ekbooks.com;
    root /var/www/wordpress;
    # WordPress config...
}

# TaxCat on /app path
location /app {
    proxy_pass http://localhost:3000;
    # Proxy config...
}
```

### Option C: Static Export in WordPress
1. Build static version: `npm run build`
2. Upload `out` folder to WordPress: `/wp-content/taxcat/`
3. Create WordPress page that iframes or redirects to it

---

## 🔄 Continuous Deployment

### GitHub Actions (Automated):

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy TaxCat

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run deploy # Your deploy script
```

---

## 📊 Monitoring & Analytics

### Add Analytics:
```typescript
// In app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🧪 Testing Checklist

Before deploying:
- [ ] All pages load correctly
- [ ] Forms submit properly
- [ ] Database connections work
- [ ] Environment variables set
- [ ] HTTPS configured
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Performance optimized

---

## 🚨 Rollback Plan

### Docker:
```bash
# List images
docker images

# Rollback to previous version
docker run -d -p 3000:3000 taxcat-app:previous-tag
```

### Vercel/Netlify:
- Use dashboard to rollback to previous deployment
- Instant rollback with one click

---

## 📞 Quick Reference

### Current Setup:
- **Development**: http://localhost:3000
- **Unraid**: Configured with docker-compose.unraid.yml
- **Database**: PostgreSQL with Prisma ORM
- **Nginx**: Reverse proxy configured

### Useful Commands:
```bash
# Check logs
docker logs taxcat-app

# Restart service
docker-compose restart

# Update and redeploy
git pull
docker-compose up -d --build

# Database backup
./scripts/backup-taxcat.sh
```

---

## 🎉 Recommended Deployment for TaxCat

Given your existing Unraid setup:

1. **Keep using Unraid** for TaxCat (you're already set up!)
2. **Deploy EKBooks to Netlify** (free, easy, professional)
3. **Link them together** with cross-navigation
4. **Use same design system** (already implemented!)

This gives you:
- TaxCat: Full-featured app on your server
- EKBooks: Fast, globally-distributed marketing site
- Consistent branding across both