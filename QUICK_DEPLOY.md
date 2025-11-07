# 🚀 Quick Deployment Guide - TaxCat & EKBooks

## Prerequisites
- Vercel account: [vercel.com](https://vercel.com)
- GitHub repository access

---

## TaxCat Deployment (5 minutes)

### 1. Import to Vercel
```
1. Go to vercel.com/new
2. Import GitHub repo: makayoLabs/taxcat
3. Branch: claude/taxcat-w-review-011CUqVD5XLpW1ZwBtXKCzTY
4. Framework: Next.js ✓
```

### 2. Add Environment Variables
Click "Environment Variables" and add:

```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-here
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
```

**Generate secrets:**
```bash
openssl rand -base64 32
```

### 3. Set Up Database
**Option A - Vercel Postgres (Easiest)**
```
1. In Vercel project → Storage tab
2. Create Database → Postgres
3. DATABASE_URL will auto-populate
```

**Option B - Supabase (Free)**
```
1. supabase.com → New Project
2. Settings → Database → Connection String
3. Copy to Vercel environment variables
```

### 4. Deploy!
```
Click "Deploy" button
Wait 2-3 minutes
Done! 🎉
```

---

## EKBooks Deployment (3 minutes)

### 1. Import to Vercel
```
1. Go to vercel.com/new
2. Import same repo: makayoLabs/taxcat
3. Root Directory: ekbooks-website
4. Framework: Next.js ✓
```

### 2. Add Environment Variable
```env
NEXT_PUBLIC_APP_URL=https://ekbooks.vercel.app
```

### 3. Deploy!
```
Click "Deploy"
Wait 2 minutes
Done! 🎉
```

---

## Post-Deployment Checklist

### Test These URLs:
- [ ] TaxCat homepage: `https://your-taxcat.vercel.app`
- [ ] RRSP Calculator: `https://your-taxcat.vercel.app/tools/rrsp`
- [ ] TFSA Calculator: `https://your-taxcat.vercel.app/tools/tfsa`
- [ ] EKBooks homepage: `https://your-ekbooks.vercel.app`

### Initial Database Setup (TaxCat):
After first deployment, run migrations:
```bash
# In Vercel project settings → Deployments → Latest → Terminal
npx prisma generate
npx prisma db push
```

---

## Custom Domains (Optional)

### Add Custom Domain to Vercel:
```
1. Go to project Settings → Domains
2. Add domain: taxcat.ca (or your domain)
3. Update DNS records as shown
4. Wait for SSL certificate (automatic)
```

---

## Costs

| Service | Free Tier | Recommended |
|---------|-----------|-------------|
| Vercel | ✓ 100GB bandwidth | $0/mo |
| Database | ✓ Supabase 500MB | $5-10/mo |
| **Total** | **$0/mo** | **$5-10/mo** |

---

## Need Help?

See full guide: `DEPLOYMENT_GUIDE.md`

## Status: ✅ Ready to Deploy!

All bugs fixed, calculators tested, design enhanced.
