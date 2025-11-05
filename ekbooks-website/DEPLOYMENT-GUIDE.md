# EKBooks Website - Deployment Guide

## 🚀 Deployment Options

This Next.js application can be deployed in multiple ways. Choose the option that best fits your needs.

---

## Option 1: Netlify (Recommended - Easiest)

### Why Netlify?
- ✅ Free tier available
- ✅ Automatic deployments from Git
- ✅ Built-in CDN
- ✅ Easy custom domain setup
- ✅ Automatic HTTPS

### Steps:

1. **Push to GitHub** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ekbooks-website.git
   git push -u origin main
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select the ekbooks-website repository
   - Build settings (auto-detected):
     - Build command: `npm run build`
     - Publish directory: `out` or `.next`
   - Click "Deploy site"

3. **Custom Domain** (Optional)
   - In Netlify dashboard: Site settings → Domain management
   - Add custom domain (e.g., ekbooks.com)
   - Update DNS records as instructed

### Using the Deploy Script:
```bash
chmod +x scripts/deploy-netlify.sh
./scripts/deploy-netlify.sh
```

---

## Option 2: Vercel (Next.js Native Platform)

### Why Vercel?
- ✅ Made by Next.js creators
- ✅ Optimized for Next.js
- ✅ Free tier available
- ✅ Automatic deployments
- ✅ Edge functions support

### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Link to existing project or create new
   - Confirm build settings

3. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Using the Deploy Script:
```bash
chmod +x scripts/deploy-vercel.sh
./scripts/deploy-vercel.sh
```

---

## Option 3: WordPress Hosting (Static Export)

### Why WordPress Hosting?
- ✅ Use existing hosting
- ✅ No additional costs
- ✅ Full control

### Requirements:
- WordPress hosting with SSH access
- Node.js installed on server (or build locally)

### Steps:

#### A. Export as Static Site

1. **Update next.config.ts** to enable static export:
   ```typescript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true, // Required for static export
     },
   };
   ```

2. **Build the static site**:
   ```bash
   npm run build
   ```
   This creates an `out` directory with static HTML/CSS/JS files.

3. **Upload to WordPress hosting**:
   ```bash
   # Via FTP/SFTP
   # Upload contents of 'out' directory to:
   # public_html/ekbooks/ (or your desired subdirectory)
   
   # Via SSH
   scp -r out/* user@yourserver.com:/path/to/public_html/ekbooks/
   ```

#### B. WordPress Integration (Advanced)

If you want to integrate with WordPress:

1. **Create a WordPress plugin** to serve the Next.js app
2. **Use WordPress as headless CMS** with Next.js frontend
3. **Proxy requests** through WordPress

**Note:** This is complex and typically not recommended. Static export (Option A) is simpler.

---

## Option 4: Your Own Server (Docker)

### Why Docker?
- ✅ Full control
- ✅ Easy to manage
- ✅ Portable
- ✅ Can run alongside other services

### Steps:

1. **Create Dockerfile** (already exists in project)

2. **Build Docker image**:
   ```bash
   docker build -t ekbooks-website .
   ```

3. **Run container**:
   ```bash
   docker run -d -p 3000:3000 --name ekbooks ekbooks-website
   ```

4. **With Docker Compose**:
   ```bash
   docker-compose up -d
   ```

5. **Setup Nginx reverse proxy** (optional):
   ```nginx
   server {
       listen 80;
       server_name ekbooks.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Option 5: Traditional Web Hosting (Shared Hosting)

### For hosts like Bluehost, HostGator, etc.

1. **Build static export** (see Option 3A above)

2. **Upload via cPanel**:
   - Log into cPanel
   - Go to File Manager
   - Navigate to public_html
   - Upload contents of `out` directory
   - Set permissions (755 for directories, 644 for files)

3. **Configure .htaccess** for clean URLs:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## 🔧 Environment Variables

Create `.env.local` file for local development:
```env
NEXT_PUBLIC_SITE_URL=https://ekbooks.com
NEXT_PUBLIC_CONTACT_EMAIL=info@ekbooks.com
NEXT_PUBLIC_PHONE=+1234567890
```

For production, set these in your hosting platform's environment variables section.

---

## 📊 Performance Optimization

### Before Deployment:

1. **Optimize Images**:
   ```bash
   npm install sharp
   ```

2. **Enable Compression**:
   - Netlify/Vercel: Automatic
   - Self-hosted: Enable gzip in Nginx/Apache

3. **Add Analytics** (Optional):
   - Google Analytics
   - Plausible
   - Fathom

---

## 🔒 Security Checklist

- [ ] HTTPS enabled (automatic on Netlify/Vercel)
- [ ] Environment variables secured
- [ ] Contact form has rate limiting
- [ ] CSP headers configured
- [ ] Dependencies updated (`npm audit fix`)

---

## 🧪 Testing Before Deployment

```bash
# Build locally
npm run build

# Test production build
npm start

# Check for errors
npm run lint
```

---

## 📱 Mobile Testing

Test on multiple devices:
- iPhone (Safari)
- Android (Chrome)
- Tablet (iPad)
- Desktop (Chrome, Firefox, Safari, Edge)

Use browser dev tools responsive mode for quick testing.

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next
npm run build
```

### Images Not Loading
- Check `next.config.ts` has `images.unoptimized: true` for static export
- Verify image paths are correct

### Styles Not Applying
```bash
# Rebuild Tailwind
npm run build
```

---

## 📞 Support

For deployment issues:
- Check Next.js docs: https://nextjs.org/docs/deployment
- Netlify docs: https://docs.netlify.com
- Vercel docs: https://vercel.com/docs

---

## 🎯 Recommended Deployment Path

**For EKBooks:**
1. **Start with Netlify** (easiest, free, professional)
2. **Add custom domain** (ekbooks.com)
3. **Monitor with Netlify Analytics**
4. **Scale to Vercel** if you need more advanced features

**Current Status:**
- ✅ Development server running on http://localhost:3000
- ✅ Ready for deployment
- ✅ All pages responsive
- ✅ Wealthsimple design system implemented