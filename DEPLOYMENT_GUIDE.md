# TaxCat & EKBooks Deployment Guide

Complete guide to deploy both applications to production with all enhancements.

## 🎯 Quick Start

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- PostgreSQL database (Vercel Postgres recommended)

### Deployment Steps

#### 1. Deploy TaxCat to Vercel

**Step 1: Push to GitHub** (Already Done ✓)
```bash
git push origin claude/taxcat-w-review-011CUqVD5XLpW1ZwBtXKCzTY
```

**Step 2: Import to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository `makayoLabs/taxcat`
4. Select branch: `claude/taxcat-w-review-011CUqVD5XLpW1ZwBtXKCzTY`
5. Framework Preset: **Next.js** (auto-detected)
6. Root Directory: `./` (default)

**Step 3: Configure Environment Variables**

In Vercel project settings, add these environment variables:

```env
# Database
DATABASE_URL=<your-postgres-connection-string>

# Application URLs
NEXT_PUBLIC_APP_URL=<your-vercel-url>
NEXTAUTH_URL=<your-vercel-url>

# Authentication (generate new secrets!)
NEXTAUTH_SECRET=<generate-with: openssl rand -base64 32>
JWT_SECRET=<generate-with: openssl rand -base64 32>
ENCRYPTION_KEY=<generate-with: openssl rand -base64 32>

# Optional: Stripe (if accepting payments)
STRIPE_SECRET_KEY=<your-stripe-secret>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-public-key>

# Optional: Email notifications
SMTP_HOST=<your-smtp-host>
SMTP_PORT=587
SMTP_USER=<your-smtp-user>
SMTP_PASSWORD=<your-smtp-password>
```

**Step 4: Set up Database**

Option A: **Vercel Postgres** (Recommended)
```bash
# In your Vercel project dashboard:
1. Go to Storage tab
2. Click "Create Database" → Select "Postgres"
3. Copy the DATABASE_URL and add to environment variables
4. Vercel will auto-inject connection strings
```

Option B: **Supabase** (Free tier available)
```bash
1. Go to supabase.com
2. Create new project
3. Go to Settings → Database → Connection string
4. Copy URI and add to Vercel environment variables
```

Option C: **Railway** (Free tier available)
```bash
1. Go to railway.app
2. Create new PostgreSQL database
3. Copy connection string
4. Add to Vercel environment variables
```

**Step 5: Initialize Database**
```bash
# After DATABASE_URL is configured in Vercel:
1. In Vercel project → Settings → Functions
2. Run database migration (will happen automatically on deploy)

# Or manually via local terminal:
npx prisma generate
npx prisma db push
```

**Step 6: Deploy!**
- Click "Deploy" in Vercel
- Wait 2-3 minutes for build
- Your site will be live at: `https://your-project.vercel.app`

---

#### 2. Deploy EKBooks to Vercel

**Step 1: Navigate to EKBooks directory**
```bash
cd ekbooks-website
```

**Step 2: Import to Vercel**
1. In Vercel dashboard: "Add New" → "Project"
2. Import repository: `makayoLabs/taxcat`
3. Root Directory: `ekbooks-website`
4. Framework: **Next.js**

**Step 3: Configure EKBooks Environment Variables**
```env
# Application URLs
NEXT_PUBLIC_APP_URL=<your-ekbooks-vercel-url>

# If EKBooks needs separate database:
EKBOOKS_DATABASE_URL=<separate-postgres-connection>

# Or use shared TaxCat database (recommended for MVP)
DATABASE_URL=<same-as-taxcat>
```

**Step 4: Deploy EKBooks**
- Click "Deploy"
- EKBooks will be live at: `https://ekbooks.vercel.app`

---

## 🔐 Security Checklist

Before going live, ensure:

- [ ] All secrets are regenerated (don't use defaults from .env.production)
- [ ] Google Fonts imports are re-enabled in `src/app/layout.tsx`:
  ```typescript
  // Uncomment these lines:
  import { Inter, DM_Serif_Display } from 'next/font/google';
  const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
  const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-dm-serif' });
  ```
- [ ] DATABASE_URL uses SSL: Add `?sslmode=require` at the end
- [ ] CORS is configured for your domain
- [ ] Rate limiting is enabled
- [ ] Error monitoring is set up (Sentry recommended)

---

## 🧪 Testing Production Deployment

After deployment, test these critical features:

### TaxCat Features to Test:
1. **Homepage** - Should load with Wealthsimple-inspired design ✓
2. **RRSP Calculator** - `/tools/rrsp` ✓
3. **TFSA Calculator** - `/tools/tfsa` ✓
4. **User Registration** - `/auth/register`
5. **User Login** - `/auth/login`
6. **Tax Return Filing** - `/file`
7. **Document Upload** - `/documents/upload`

### EKBooks Features to Test:
1. **Homepage** - Modern blue theme ✓
2. **Services Pages** - All service links
3. **Contact Form** - Should send emails
4. **Pricing Page** - Should display correctly

---

## 🚀 Post-Deployment Tasks

### Immediate (Day 1):
1. Set up custom domains:
   - TaxCat: `taxcat.ca` or `www.taxcat.ca`
   - EKBooks: `ekbooks.ca` or `www.ekbooks.ca`
2. Configure DNS in Vercel
3. Enable automatic HTTPS (Vercel does this automatically)
4. Set up error monitoring (Sentry.io)
5. Configure Google Analytics (optional)

### Week 1:
1. Monitor error logs in Vercel dashboard
2. Test all forms and user flows
3. Verify email notifications work
4. Check database connections are stable
5. Run performance tests (Lighthouse)

### Week 2-4:
1. Implement educational features (see IMPLEMENTATION_ROADMAP.md)
2. Add beta user signup forms
3. Create first learning module
4. Set up community features

---

## 📊 Monitoring & Maintenance

### Vercel Dashboard
- **Deployment**: Monitor build times and success rates
- **Analytics**: Track page views and user engagement
- **Logs**: Check function execution logs for errors
- **Metrics**: Monitor bandwidth and function invocations

### Database Monitoring
```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('your_database'));

-- Monitor active connections
SELECT count(*) FROM pg_stat_activity;

-- Check slow queries
SELECT * FROM pg_stat_statements
ORDER BY mean_exec_time DESC LIMIT 10;
```

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **API Response Time**: < 500ms

---

## 🐛 Troubleshooting

### Build Failures

**Error: "Cannot find module 'next/font/google'"**
```bash
Solution: Uncomment font imports in src/app/layout.tsx (line 3)
```

**Error: "Database connection failed"**
```bash
Solution: Verify DATABASE_URL is set correctly in Vercel environment variables
Add ?sslmode=require to connection string if using external Postgres
```

**Error: "Module not found: Can't resolve '@/...'"**
```bash
Solution: Check tsconfig.json has correct path mappings
Verify all imports use correct casing (case-sensitive in production)
```

### Runtime Errors

**Error: "NEXTAUTH_URL is not set"**
```bash
Solution: Add NEXTAUTH_URL to environment variables
Should match your production domain
```

**Error: "Prisma Client not generated"**
```bash
Solution: In Vercel, go to Settings → General → Build & Development
Add to Build Command: npm run build && npx prisma generate
```

---

## 💰 Cost Estimates

### Vercel (Both Apps)
- **Free Tier**: 100GB bandwidth, unlimited deployments
- **Pro Tier**: $20/mo - 1TB bandwidth, team features
- **Estimated**: $0-20/month for MVP

### Database
- **Vercel Postgres**: $0.20/month (512MB) to $45/month (8GB)
- **Supabase**: Free tier (500MB) to $25/month (8GB)
- **Railway**: $5/month (512MB) to $50/month (8GB)
- **Estimated**: $5-25/month for MVP

### Total Monthly Cost (MVP)
- **Minimum**: $5-10/month (Vercel Free + Basic DB)
- **Recommended**: $25-45/month (Vercel Pro + Good DB)
- **Scale to 1000 users**: $50-100/month

---

## 🎓 Educational Features Deployment

After core app is live, deploy educational features:

### Phase 1: Database Schema (Week 2)
```bash
# Add educational models to prisma/schema.prisma
# Run migration:
npx prisma migrate dev --name add_educational_features
npx prisma db push
```

### Phase 2: Learning Modules (Week 3-4)
- Deploy first module: "Introduction to Canadian Taxes"
- Add quiz components
- Implement progress tracking

### Phase 3: Gamification (Week 5-6)
- Deploy points system
- Add badges and achievements
- Create leaderboard

See IMPLEMENTATION_ROADMAP.md for complete timeline.

---

## 🆘 Support & Resources

### Documentation
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs

### Community
- Next.js Discord: https://nextjs.org/discord
- Vercel Community: https://github.com/vercel/vercel/discussions

### Need Help?
- Check GitHub Issues: github.com/makayoLabs/taxcat/issues
- Review implementation roadmap: IMPLEMENTATION_ROADMAP.md
- Check technical guide: TECHNICAL_IMPLEMENTATION_GUIDE.md

---

## ✅ Deployment Checklist

### Pre-Deployment
- [x] All syntax errors fixed (44 catch blocks)
- [x] Build succeeds locally
- [x] RRSP calculator tested ✓
- [x] TFSA calculator tested ✓
- [x] Wealthsimple design applied ✓
- [ ] Google Fonts re-enabled for production
- [ ] Environment variables documented

### Deployment
- [ ] GitHub repository pushed
- [ ] Vercel account created
- [ ] TaxCat imported to Vercel
- [ ] EKBooks imported to Vercel
- [ ] Database created and configured
- [ ] Environment variables set
- [ ] First deployment successful
- [ ] Custom domains configured

### Post-Deployment
- [ ] All pages load correctly
- [ ] Calculators work in production
- [ ] Forms submit successfully
- [ ] Error monitoring active
- [ ] Performance metrics tracked
- [ ] Database backups enabled

---

**Ready to deploy!** 🚀

Start with Step 1: Import TaxCat to Vercel, then follow the guide sequentially.
