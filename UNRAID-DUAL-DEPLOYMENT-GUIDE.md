# 🚀 Complete Unraid Deployment Guide: TaxCat + EKBooks

This comprehensive guide will help you deploy both **TaxCat** (Canadian tax software) and **EKBooks** (marketing website) on your Unraid server with full production readiness.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Detailed Setup](#detailed-setup)
4. [Configuration](#configuration)
5. [Domain & SSL Setup](#domain--ssl-setup)
6. [Deployment](#deployment)
7. [Verification](#verification)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Troubleshooting](#troubleshooting)
10. [Advanced Configuration](#advanced-configuration)

---

## 🔧 Prerequisites

### Hardware Requirements
- **CPU**: 2+ cores (4+ recommended for production)
- **RAM**: 4GB minimum (8GB+ recommended)
- **Storage**: 20GB+ free space
- **Network**: Stable internet connection

### Software Requirements
- **Unraid OS**: 6.8+ (latest recommended)
- **Docker**: Enabled and updated
- **Docker Compose**: v2.0+
- **Domain Name**: For SSL certificates (e.g., `taxcat.yourdomain.com`, `ekbooks.ca`)

### Required Containers
Before starting, ensure these containers are running on your Unraid server:

1. **PostgreSQL 17** (Database)
2. **Redis** (Caching & Sessions)
3. **Traefik** or **SWAG** (Reverse Proxy & SSL)
4. **Authentik** (Optional - Authentication)

---

## ⚡ Quick Start (15 Minutes)

### Step 1: Prepare Files on Windows
```powershell
# Run the PowerShell preparation script
.\install-unraid.ps1 -UnraidIP YOUR-UNRAID-IP
```

### Step 2: Transfer to Unraid
```bash
# Copy project files to your Unraid server
scp -r /path/to/taxcat-app user@unraid-server:/mnt/user/apps/
```

### Step 3: Deploy Both Applications
```bash
# SSH into Unraid
ssh root@YOUR-UNRAID-IP

# Navigate to project
cd /mnt/user/apps/taxcat-app

# Run installation
chmod +x install-unraid.sh
./install-unraid.sh
```

### Step 4: Access Applications
- **TaxCat**: `https://taxcat.yourdomain.com`
- **EKBooks**: `https://ekbooks.ca`
- **Health Check**: `https://taxcat.yourdomain.com/api/health`

---

## 📋 Detailed Setup

### Step 1: Database Preparation

#### PostgreSQL 17 Setup
1. **Create TaxCat Database**:
```sql
-- Connect to PostgreSQL
psql -h YOUR-UNRAID-IP -p 5432 -U postgres

-- Create database and user
CREATE DATABASE taxcat_prod;
CREATE USER taxcat WITH ENCRYPTED PASSWORD 'secure_password123';
GRANT ALL PRIVILEGES ON DATABASE taxcat_prod TO taxcat;

-- Create EKBooks database (if separate)
CREATE DATABASE ekbooks_prod;
CREATE USER ekbooks WITH ENCRYPTED PASSWORD 'secure_password456';
GRANT ALL PRIVILEGES ON DATABASE ekbooks_prod TO ekbooks;
```

2. **Verify Database Connection**:
```bash
# Test TaxCat database
psql -h YOUR-UNRAID-IP -p 5432 -U taxcat -d taxcat_prod -c "SELECT version();"

# Test EKBooks database
psql -h YOUR-UNRAID-IP -p 5432 -U ekbooks -d ekbooks_prod -c "SELECT version();"
```

#### Redis Setup
1. **Configure Redis with Authentication**:
```bash
# Connect to Redis container
docker exec -it redis-container redis-cli

# Set password (if not already set)
CONFIG SET requirepass "your_redis_password_here"
```

2. **Test Redis Connection**:
```bash
redis-cli -h YOUR-UNRAID-IP -p 6379 -a your_redis_password_here ping
```

### Step 2: Domain Configuration

#### DNS Setup
Configure your DNS records:
```
# TaxCat
taxcat.yourdomain.com    A    YOUR-PUBLIC-IP
www.taxcat.yourdomain.com A   YOUR-PUBLIC-IP

# EKBooks
ekbooks.ca               A    YOUR-PUBLIC-IP
www.ekbooks.ca           A    YOUR-PUBLIC-IP
```

#### Port Forwarding
Configure your router to forward:
- **Port 80** → Unraid Server (HTTP)
- **Port 443** → Unraid Server (HTTPS)

---

## ⚙️ Configuration

### Environment Variables

Create `.env.production` file with your specific values:

```bash
# ===========================================
# CORE APPLICATION CONFIGURATION
# ===========================================

# Application Environment
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NEXT_TELEMETRY_DISABLED=1

# ===========================================
# DATABASE CONFIGURATION
# ===========================================

# TaxCat Database
DATABASE_URL=postgresql://taxcat:secure_password123@192.168.2.125:5432/taxcat_prod

# EKBooks Database (if separate)
EKBOOKS_DATABASE_URL=postgresql://ekbooks:secure_password456@192.168.2.125:5432/ekbooks_prod

# Redis Configuration
REDIS_URL=redis://:your_redis_password_here@192.168.2.125:6379

# ===========================================
# APPLICATION URLs
# ===========================================

# TaxCat URLs
NEXT_PUBLIC_APP_URL=https://taxcat.yourdomain.com
NEXTAUTH_URL=https://taxcat.yourdomain.com

# EKBooks URLs
EKBOOKS_URL=https://ekbooks.ca
EKBOOKS_NEXTAUTH_URL=https://ekbooks.ca

# ===========================================
# SECURITY CONFIGURATION
# ===========================================

# Authentication Secrets (generate new ones!)
NEXTAUTH_SECRET=k1Ab2QCpVvYxdI86iFTih3OGBpbQch6hhGPhJmuOICg=
JWT_SECRET=G6FaulLEsy+U/zkttG/0x4/K9ZdTkwPn7X3gXTpybe4=
ENCRYPTION_KEY=rMYK/WMKcOsaADMeNF53s2a+olCUrx+01/hrcj02zHE=

# ===========================================
# ADMIN CONFIGURATION
# ===========================================

# TaxCat Admin
CMS_ADMIN_EMAIL=admin@taxcat.yourdomain.com
CMS_ADMIN_PASSWORD=W91+ruwroFa#uwaY#

# EKBooks Admin
EKBOOKS_ADMIN_EMAIL=admin@ekbooks.ca
EKBOOKS_ADMIN_PASSWORD=EkBooks2024!Secure

# ===========================================
# EMAIL CONFIGURATION
# ===========================================

# SMTP Settings (configure with your email provider)
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_USER=admin@yourdomain.com
SMTP_PASSWORD=your_smtp_password
BUSINESS_EMAIL=admin@yourdomain.com
NOTIFICATION_EMAIL=notifications@yourdomain.com

# ===========================================
# PAYMENT PROCESSING (Optional)
# ===========================================

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# ===========================================
# MONITORING & ANALYTICS (Optional)
# ===========================================

# Sentry Error Tracking
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# ===========================================
# FILE UPLOAD CONFIGURATION
# ===========================================

MAX_FILE_SIZE=10485760
UPLOAD_DIRECTORY=/app/uploads

# ===========================================
# RATE LIMITING
# ===========================================

RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000

# ===========================================
# LOGGING CONFIGURATION
# ===========================================

LOG_LEVEL=info
LOG_FILE_PATH=/app/logs
```

### Docker Compose Configuration

The `docker-compose.unraid.yml` file is already configured for both applications:

```yaml
# Key services included:
services:
  ekbooks-app:          # Main application (TaxCat + EKBooks)
    ports:
      - "3000:3000"     # Main application port
    environment:        # All environment variables
    volumes:            # Data persistence
    networks:          # Network configuration
    healthcheck:        # Health monitoring

  nextcloud-aio-mailserver:  # Email server (optional)
    profiles:
      - mail           # Enable with --profile mail

  nginx:               # Reverse proxy (optional)
    profiles:
      - production     # Enable with --profile production

  prometheus:          # Monitoring (optional)
    profiles:
      - monitoring     # Enable with --profile monitoring

  grafana:             # Dashboards (optional)
    profiles:
      - monitoring     # Enable with --profile monitoring
```

---

## 🌐 Domain & SSL Setup

### Option A: Traefik Configuration

1. **Copy Traefik Configuration**:
```bash
# Copy TaxCat Traefik config
cp traefik-taxcat.yml /mnt/user/appdata/traefik/config/

# Copy EKBooks Traefik config
cp traefik-ekbooks.yml /mnt/user/appdata/traefik/config/
```

2. **Restart Traefik**:
```bash
docker restart traefik
```

### Option B: SWAG Configuration

1. **Copy Nginx Configuration**:
```bash
# Copy TaxCat config
cp nginx/taxcat.subdomain.conf /mnt/user/appdata/swag/nginx/proxy-confs/

# Copy EKBooks config (create if needed)
cp nginx/ekbooks.subdomain.conf /mnt/user/appdata/swag/nginx/proxy-confs/
```

2. **Restart SWAG**:
```bash
docker restart swag
```

### SSL Certificate Verification

After deployment, verify SSL certificates:
```bash
# Check certificate status
curl -I https://taxcat.yourdomain.com
curl -I https://ekbooks.ca

# Should return HTTP/2 200 with valid SSL
```

---

## 🚀 Deployment

### Method 1: Automated Deployment Script

```bash
# Navigate to project directory
cd /mnt/user/apps/taxcat-app

# Make scripts executable
chmod +x scripts/deploy-unraid.sh
chmod +x scripts/backup-taxcat.sh

# Run deployment
./scripts/deploy-unraid.sh
```

### Method 2: Manual Docker Compose

```bash
# Navigate to project directory
cd /mnt/user/apps/taxcat-app

# Start basic services
docker-compose -f docker-compose.unraid.yml up -d

# Start with email server
docker-compose -f docker-compose.unraid.yml --profile mail up -d

# Start with monitoring
docker-compose -f docker-compose.unraid.yml --profile monitoring up -d

# Start full production stack
docker-compose -f docker-compose.unraid.yml --profile production --profile mail --profile monitoring up -d
```

### Method 3: Unraid Docker GUI

1. **Open Unraid Web Interface**
2. **Go to Docker tab**
3. **Add Container** → **Add from Template**
4. **Use docker-compose.unraid.yml** as template
5. **Configure environment variables**
6. **Start container**

---

## ✅ Verification

### Health Checks

1. **Container Status**:
```bash
# Check all containers
docker ps | grep -E "(ekbooks|taxcat)"

# Check specific container logs
docker logs ekbooks-app
```

2. **Application Health**:
```bash
# TaxCat health check
curl -f https://taxcat.yourdomain.com/api/health

# EKBooks health check
curl -f https://ekbooks.ca/api/health
```

3. **Database Connectivity**:
```bash
# Test database connections
docker exec ekbooks-app npm run db:test
```

### Web Interface Tests

1. **TaxCat Application**:
   - Visit: `https://taxcat.yourdomain.com`
   - Test user registration
   - Test login functionality
   - Test tax return creation

2. **EKBooks Marketing Site**:
   - Visit: `https://ekbooks.ca`
   - Test navigation
   - Test contact forms
   - Test responsive design

3. **Admin Dashboard**:
   - Visit: `https://taxcat.yourdomain.com/admin`
   - Login with admin credentials
   - Test user management
   - Test system settings

---

## 📊 Monitoring & Maintenance

### Health Monitoring

#### Application Health Endpoints
- **TaxCat**: `https://taxcat.yourdomain.com/api/health`
- **EKBooks**: `https://ekbooks.ca/api/health`

#### Container Health Checks
```bash
# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# View health check logs
docker inspect ekbooks-app | grep -A 10 Health
```

### Log Management

#### Application Logs
```bash
# View application logs
docker logs -f ekbooks-app

# View specific log files
tail -f /mnt/user/apps/taxcat-app/data/logs/all.log
tail -f /mnt/user/apps/taxcat-app/data/logs/error.log
```

#### System Logs
```bash
# View Docker logs
journalctl -u docker.service -f

# View Unraid system logs
tail -f /var/log/syslog
```

### Backup Strategy

#### Automated Backup Script
```bash
# Run backup script
./scripts/backup-taxcat.sh

# Schedule daily backups (add to crontab)
echo "0 2 * * * /mnt/user/apps/taxcat-app/scripts/backup-taxcat.sh" | crontab -
```

#### Manual Backup
```bash
# Database backup
docker exec postgres pg_dump -U taxcat taxcat_prod > backup-$(date +%Y%m%d).sql

# Application data backup
tar -czf data-backup-$(date +%Y%m%d).tar.gz data/

# Full system backup
tar -czf full-backup-$(date +%Y%m%d).tar.gz /mnt/user/apps/taxcat-app/
```

### Performance Monitoring

#### Resource Usage
```bash
# Check container resource usage
docker stats ekbooks-app

# Check system resources
htop
df -h
free -h
```

#### Database Performance
```bash
# Check database connections
docker exec postgres psql -U taxcat -d taxcat_prod -c "SELECT count(*) FROM pg_stat_activity;"

# Check slow queries
docker exec postgres psql -U taxcat -d taxcat_prod -c "SELECT query, mean_time FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;"
```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Database Connection Failed

**Symptoms**:
- Application won't start
- Database connection errors in logs

**Solutions**:
```bash
# Check PostgreSQL status
docker ps | grep postgres

# Test database connectivity
psql -h YOUR-UNRAID-IP -p 5432 -U taxcat -d taxcat_prod

# Check database credentials in .env.production
grep DATABASE_URL .env.production

# Restart PostgreSQL container
docker restart postgres-container
```

#### 2. Redis Connection Failed

**Symptoms**:
- Session management issues
- Cache errors

**Solutions**:
```bash
# Check Redis status
docker ps | grep redis

# Test Redis connection
redis-cli -h YOUR-UNRAID-IP -p 6379 -a your_password ping

# Check Redis configuration
docker exec redis-container redis-cli CONFIG GET requirepass
```

#### 3. SSL Certificate Issues

**Symptoms**:
- HTTPS not working
- Certificate errors

**Solutions**:
```bash
# Check Traefik logs
docker logs traefik

# Check certificate status
docker exec traefik cat /etc/traefik/acme.json

# Verify DNS configuration
nslookup taxcat.yourdomain.com
nslookup ekbooks.ca

# Check port forwarding
telnet YOUR-PUBLIC-IP 443
```

#### 4. Application Won't Start

**Symptoms**:
- Container exits immediately
- Application errors

**Solutions**:
```bash
# Check application logs
docker logs ekbooks-app

# Check environment variables
docker exec ekbooks-app env | grep -E "(DATABASE|REDIS|NEXTAUTH)"

# Verify file permissions
ls -la /mnt/user/apps/taxcat-app/data/

# Check Docker resources
docker system df
docker system prune
```

#### 5. Performance Issues

**Symptoms**:
- Slow page loads
- High resource usage

**Solutions**:
```bash
# Check resource limits
docker inspect ekbooks-app | grep -A 10 Resources

# Monitor resource usage
docker stats ekbooks-app

# Check database performance
docker exec postgres psql -U taxcat -d taxcat_prod -c "SELECT * FROM pg_stat_activity;"

# Optimize database
docker exec postgres psql -U taxcat -d taxcat_prod -c "VACUUM ANALYZE;"
```

### Log Analysis

#### Application Logs
```bash
# Search for errors
grep -i error /mnt/user/apps/taxcat-app/data/logs/all.log

# Search for specific issues
grep -i "database" /mnt/user/apps/taxcat-app/data/logs/all.log
grep -i "redis" /mnt/user/apps/taxcat-app/data/logs/all.log
```

#### System Logs
```bash
# Check Docker daemon logs
journalctl -u docker.service --since "1 hour ago"

# Check system resource issues
dmesg | grep -i "out of memory"
```

### Recovery Procedures

#### Database Recovery
```bash
# Stop application
docker-compose -f docker-compose.unraid.yml down

# Restore database
docker exec -T postgres psql -U taxcat taxcat_prod < backup-YYYYMMDD.sql

# Restart application
docker-compose -f docker-compose.unraid.yml up -d
```

#### Application Recovery
```bash
# Rebuild application
docker-compose -f docker-compose.unraid.yml down
docker-compose -f docker-compose.unraid.yml build --no-cache
docker-compose -f docker-compose.unraid.yml up -d
```

---

## 🔧 Advanced Configuration

### Scaling Configuration

#### Horizontal Scaling
```yaml
# In docker-compose.unraid.yml
services:
  ekbooks-app:
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
```

#### Load Balancing
```yaml
# Add to Traefik configuration
services:
  ekbooks-service:
    loadBalancer:
      servers:
        - url: "http://ekbooks-app-1:3000"
        - url: "http://ekbooks-app-2:3000"
```

### Security Hardening

#### Network Security
```yaml
# Restrict network access
networks:
  ekbooks-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
    internal: true  # No external access
```

#### Container Security
```yaml
# Add security options
services:
  ekbooks-app:
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
      - /var/cache
```

### Performance Optimization

#### Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX CONCURRENTLY idx_tax_returns_user_id ON tax_returns(user_id);
CREATE INDEX CONCURRENTLY idx_documents_user_id ON documents(user_id);
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);

-- Configure connection pooling
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
```

#### Application Optimization
```bash
# Enable compression
# In nginx configuration
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

# Enable caching
# In Traefik configuration
middlewares:
  cache:
    headers:
      customResponseHeaders:
        Cache-Control: "public, max-age=3600"
```

---

## 📞 Support & Resources

### Getting Help

1. **Check Logs First**:
   ```bash
   docker logs ekbooks-app
   tail -f /mnt/user/apps/taxcat-app/data/logs/all.log
   ```

2. **Verify Configuration**:
   ```bash
   # Check environment variables
   docker exec ekbooks-app env | grep -E "(DATABASE|REDIS|NEXTAUTH)"
   
   # Check network connectivity
   docker exec ekbooks-app ping postgres
   docker exec ekbooks-app ping redis
   ```

3. **Test Components Individually**:
   ```bash
   # Test database
   psql -h YOUR-UNRAID-IP -p 5432 -U taxcat -d taxcat_prod
   
   # Test Redis
   redis-cli -h YOUR-UNRAID-IP -p 6379 -a your_password ping
   
   # Test application
   curl -f https://taxcat.yourdomain.com/api/health
   ```

### Useful Commands

```bash
# Quick status check
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Resource usage
docker stats --no-stream

# Log monitoring
docker logs -f ekbooks-app

# Database maintenance
docker exec postgres psql -U taxcat -d taxcat_prod -c "VACUUM ANALYZE;"

# Backup everything
./scripts/backup-taxcat.sh

# Restart services
docker-compose -f docker-compose.unraid.yml restart
```

---

## 🎉 Success!

**Congratulations!** You now have both TaxCat and EKBooks running on your Unraid server.

### What You've Deployed

✅ **TaxCat Application** - Full-featured Canadian tax software
- User authentication and management
- Tax return creation and filing
- Document upload and management
- Payment processing integration
- Admin dashboard

✅ **EKBooks Marketing Site** - Professional business website
- Modern, responsive design
- Contact forms and lead generation
- SEO-optimized content
- Integration with TaxCat backend

✅ **Production Infrastructure**
- SSL certificates with automatic renewal
- Database with automated backups
- Monitoring and health checks
- Security hardening
- Performance optimization

### Access Your Applications

- **TaxCat**: `https://taxcat.yourdomain.com`
- **EKBooks**: `https://ekbooks.ca`
- **Admin Dashboard**: `https://taxcat.yourdomain.com/admin`
- **Health Check**: `https://taxcat.yourdomain.com/api/health`

### Next Steps

1. **Configure Email**: Set up SMTP for notifications
2. **Add Payments**: Configure Stripe for tax filing payments
3. **Set up Monitoring**: Enable Prometheus/Grafana dashboards
4. **Enable Backups**: Schedule automated backups
5. **Security Audit**: Review and harden security settings
6. **Performance Testing**: Load test with realistic user scenarios

---

**Need help?** Check the troubleshooting section above or review the application logs for specific error messages.

**Happy deploying!** 🚀
