# 📋 TaxCat Deployment Checklist

Use this checklist to track your deployment progress. Check off each item as you complete it.

## ✅ Pre-Deployment Preparation
- [ ] Transfer TaxCat files to Unraid server (`/mnt/user/appdata/taxcat/`)
- [ ] Verify all files are present:
  - [ ] `docker-compose.unraid.yml`
  - [ ] `.env.production`
  - [ ] `nginx/taxcat.subdomain.conf`
  - [ ] `scripts/deploy-unraid.sh`
  - [ ] `scripts/backup-taxcat.sh`

## 🗄️ Database Setup
- [ ] PostgreSQL 17 container is running on Unraid
- [ ] Created `taxcat_prod` database
- [ ] Created `taxcat` user with password `secure_password123`
- [ ] Granted all privileges to taxcat user on taxcat_prod database
- [ ] Verified PostgreSQL is accessible at `192.168.2.125:5432`

## 🔄 Cache Setup (Redis)
- [ ] Redis container is running on Unraid
- [ ] Redis password is set to `redis_password_123`
- [ ] Verified Redis is accessible at `192.168.2.125:6379`

## 🌐 Domain & Network
- [ ] Domain name purchased (e.g., `yourdomain.com`)
- [ ] DNS A record created for `taxcat.yourdomain.com`
- [ ] DNS pointing to your public IP address
- [ ] Router port forwarding configured:
  - [ ] Port 80 → `192.168.2.125:80`
  - [ ] Port 443 → `192.168.2.125:443`

## 🔒 Reverse Proxy Setup
- [ ] SWAG container is running and configured
- [ ] Copied `nginx/taxcat.subdomain.conf` to SWAG proxy-confs
- [ ] SWAG restarted to apply new configuration
- [ ] SSL certificates generated (may take a few minutes)

## ⚙️ Configuration
- [ ] Updated `.env.production` with your domain:
  - [ ] `NEXT_PUBLIC_APP_URL="https://taxcat.yourdomain.com"`
  - [ ] `NEXTAUTH_URL="https://taxcat.yourdomain.com"`
- [ ] Generated secure secrets (32 characters each):
  - [ ] `NEXTAUTH_SECRET`
  - [ ] `JWT_SECRET`
  - [ ] `ENCRYPTION_KEY`
- [ ] Updated admin email in `CMS_ADMIN_EMAIL`

## 🚀 Deployment
- [ ] Made deployment scripts executable:
  - [ ] `chmod +x scripts/deploy-unraid.sh`
  - [ ] `chmod +x scripts/backup-taxcat.sh`
- [ ] Ran deployment script: `./scripts/deploy-unraid.sh`
- [ ] Waited for deployment to complete (5-10 minutes)
- [ ] Verified `taxcat-app` container is running in Docker tab

## ✅ Testing & Verification
- [ ] TaxCat accessible at `https://taxcat.yourdomain.com`
- [ ] SSL certificate working (green lock icon)
- [ ] Health check working: `https://taxcat.yourdomain.com/api/health`
- [ ] User registration working
- [ ] Login/logout working
- [ ] Can access admin panel

## 💾 Backup Setup
- [ ] Ran initial backup: `./scripts/backup-taxcat.sh`
- [ ] Verified backup files created in `/mnt/user/backups/taxcat/`
- [ ] Set up automated daily backups (User Scripts plugin)

## 🔧 Optional Enhancements
- [ ] Configure Stripe payments (if accepting payments)
- [ ] Set up email notifications (SMTP configuration)
- [ ] Configure monitoring (Prometheus/Grafana)
- [ ] Set up Authentik integration (if using SSO)
- [ ] Configure Cloudflare tunnel (additional security)

---

## 🚨 Emergency Contacts

If something goes wrong:

**Check logs:**
- TaxCat: `docker logs taxcat-app`
- PostgreSQL: `docker logs postgres17`
- Redis: `docker logs redis`
- SWAG: `docker logs swag`

**Common fixes:**
- Restart containers
- Check file permissions
- Verify network connectivity
- Review configuration files

**Get help:**
- Read `DEPLOYMENT-GUIDE-Beginner.md` for detailed steps
- Check `UNRAID-DEPLOYMENT.md` for advanced troubleshooting
- Search Unraid forums for similar issues

---

## 🎉 Success Checklist

Once everything is working:
- [ ] Users can access `https://taxcat.yourdomain.com`
- [ ] SSL certificate is valid
- [ ] User registration and login work
- [ ] Tax calculations function properly
- [ ] Document uploads work
- [ ] Admin panel is accessible
- [ ] Backups are running automatically
- [ ] All containers are running stably

**Congratulations! Your TaxCat deployment is complete! 🎯**