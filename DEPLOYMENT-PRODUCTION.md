# TaxCat Production Deployment Guide

This guide provides step-by-step instructions for deploying TaxCat to production on Unraid with full security and performance optimizations.

## 📋 Prerequisites

- Unraid server with SSH access
- PostgreSQL 17 database running
- Redis server running
- Domain name configured
- Cloudflare account (for tunnel)

## 🚀 Quick Deployment

### 1. Prepare Configuration Files

```bash
# Copy the production template
cp .env.production.template .env.production

# Edit with your actual values
nano .env.production
```

**Required Updates:**
- `YOUR_DB_PASSWORD` → Your PostgreSQL password
- `YOUR_REDIS_PASSWORD` → Your Redis password
- `YOUR_DOMAIN.com` → Your actual domain
- `YOUR_*_SECRET` → Generated 32-character secrets

### 2. Generate Secure Secrets

```bash
# Generate secrets for your .env.production file
openssl rand -base64 32  # For NEXTAUTH_SECRET
openssl rand -base64 32  # For JWT_SECRET
openssl rand -base64 32  # For ENCRYPTION_KEY
```

### 3. Transfer Files to Unraid

```bash
# From your local machine
scp -i %USERPROFILE%\.ssh\id_rsa_unraid -r src root@192.168.2.125:/mnt/user/appdata/taxcat/
scp -i %USERPROFILE%\.ssh\id_rsa_unraid package.json package-lock.json tsconfig.json root@192.168.2.125:/mnt/user/appdata/taxcat/
scp -i %USERPROFILE%\.ssh\id_rsa_unraid docker-compose.production.yml root@192.168.2.125:/mnt/user/appdata/taxcat/docker-compose.yml
scp -i %USERPROFILE%\.ssh\id_rsa_unraid Dockerfile.production next.config.production.js root@192.168.2.125:/mnt/user/appdata/taxcat/
scp -i %USERPROFILE%\.ssh\id_rsa_unraid -r prisma public root@192.168.2.125:/mnt/user/appdata/taxcat/
scp -i %USERPROFILE%\.ssh\id_rsa_unraid .env.production deploy-production.sh root@192.168.2.125:/mnt/user/appdata/taxcat/
```

### 4. Deploy on Unraid

```bash
# On your Unraid server
cd /mnt/user/appdata/taxcat

# Make script executable
chmod +x deploy-production.sh

# Run deployment
./deploy-production.sh
```

## 🔧 Manual Configuration

### Environment Variables

Copy `.env.production.template` to `.env.production` and update:

```bash
# Database
DATABASE_URL=postgresql://taxcat:your_actual_password@192.168.2.125:5432/taxcat_prod

# Redis
REDIS_URL=redis://:your_actual_password@192.168.2.125:6379

# Domain
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Secrets (32 characters each)
NEXTAUTH_SECRET=generated_secret_here
JWT_SECRET=generated_secret_here
ENCRYPTION_KEY=generated_secret_here
```

### Database Setup

Ensure PostgreSQL is running with:
- Database: `taxcat_prod`
- User: `taxcat`
- Password: Your configured password

### Redis Setup

Ensure Redis is running with password authentication.

## 🌐 Cloudflare Tunnel Setup

1. **Create Tunnel:**
   - Go to Cloudflare Zero Trust → Networks → Tunnels
   - Create new tunnel connected to your Unraid server

2. **Add Public Hostname:**
   - **Hostname:** `yourdomain.com`
   - **Service:** `http://192.168.2.125:3000`

3. **DNS Configuration:**
   - Ensure `yourdomain.com` is proxied through Cloudflare
   - Add CNAME record if needed

## 🔍 Testing Deployment

### Health Checks
```bash
# Container status
docker ps | grep taxcat

# Application health
curl http://192.168.2.125:3000/api/health

# Logs
docker logs taxcat-app
```

### Access Testing
- **Direct:** http://192.168.2.125:3000
- **Via Tunnel:** https://yourdomain.com
- **Health:** https://yourdomain.com/api/health

## 🔒 Security Features

- Non-root container user
- Security headers configured
- Rate limiting enabled
- Encrypted environment variables
- HTTPS via Cloudflare

## 📊 Monitoring

### Health Checks
- Container health checks every 30 seconds
- Application health endpoint monitoring
- Automatic restart on failure

### Logs
```bash
# View application logs
docker logs taxcat-app

# Follow logs in real-time
docker logs -f taxcat-app
```

## 🚨 Troubleshooting

### Common Issues

**Database Connection Failed:**
- Verify PostgreSQL credentials
- Check database is running: `docker ps | grep postgres`
- Test connection: `psql -h 192.168.2.125 -U taxcat -d taxcat_prod`

**Redis Connection Failed:**
- Verify Redis password
- Check Redis is running: `docker ps | grep redis`

**Build Fails:**
- Check Docker has sufficient resources
- Verify all files transferred correctly
- Check build logs: `docker logs <build_container>`

**Application Won't Start:**
- Check environment variables
- Verify all secrets are set
- Check application logs

### Performance Tuning

**Resource Limits:**
```yaml
# In docker-compose.production.yml
deploy:
  resources:
    limits:
      memory: 2G
      cpus: '1.0'
```

**Database Optimization:**
- Regular VACUUM operations
- Connection pooling
- Index optimization

## 🔄 Updates and Maintenance

### Application Updates
```bash
# Stop application
docker-compose down

# Update code and rebuild
# [transfer new files]

# Deploy
docker-compose up --build -d
```

### Database Backups
```bash
# PostgreSQL backup
pg_dump -h 192.168.2.125 -U taxcat taxcat_prod > backup.sql

# Automated backup script
0 2 * * * pg_dump -h 192.168.2.125 -U taxcat taxcat_prod > /mnt/user/backups/taxcat_$(date +\%Y\%m\%d).sql
```

## 📞 Support

For deployment issues:
1. Check application logs: `docker logs taxcat-app`
2. Verify environment variables
3. Test database connectivity
4. Check Cloudflare tunnel status

## ✅ Deployment Checklist

- [ ] Environment variables configured
- [ ] Database credentials verified
- [ ] Redis connection tested
- [ ] Domain DNS configured
- [ ] Cloudflare tunnel active
- [ ] SSL certificate valid
- [ ] Application accessible
- [ ] Health checks passing
- [ ] Backup strategy implemented

---

**🎉 Deployment Complete!**

Your TaxCat application is now running in production with:
- Secure HTTPS access via Cloudflare
- Optimized Docker containers
- Database persistence
- Automatic health monitoring
- Production-ready security