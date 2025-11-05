# TaxCat Production Deployment Guide for Unraid

This guide provides step-by-step instructions for deploying TaxCat on your Unraid server with full production readiness.

## 🚀 Quick Start

### Prerequisites
- Unraid server with IP: `192.168.2.125`
- PostgreSQL 17 container running
- Redis container running
- SWAG (Nginx Proxy Manager) or Traefik for reverse proxy
- Domain name configured (e.g., `taxcat.yourdomain.com`)

### One-Command Deployment
```bash
# Copy project files to your Unraid server
scp -r /path/to/taxcat user@unraid-server:/mnt/user/appdata/

# Run deployment script
cd /mnt/user/appdata/taxcat
chmod +x scripts/deploy-unraid.sh
./scripts/deploy-unraid.sh
```

## 📋 Detailed Setup Instructions

### Step 1: Database Preparation

#### PostgreSQL 17 Setup
1. Ensure PostgreSQL 17 is running on your Unraid server
2. Create the TaxCat database:
```sql
CREATE DATABASE taxcat_prod;
CREATE USER taxcat WITH ENCRYPTED PASSWORD 'secure_password123';
GRANT ALL PRIVILEGES ON DATABASE taxcat_prod TO taxcat;
```

#### Redis Setup
1. Ensure Redis is running with password authentication
2. Note the Redis password for configuration

### Step 2: Domain and SSL Configuration

#### DNS Setup
1. Point your domain `taxcat.yourdomain.com` to your public IP
2. Configure port forwarding for ports 80 and 443 to your Unraid server

#### SSL Certificate Setup
- **SWAG Users**: Certificates are automatically managed
- **Traefik Users**: Ensure Let's Encrypt is configured
- **Cloudflare Users**: Use Cloudflare tunnel for additional security

### Step 3: Environment Configuration

Update the `.env.production` file with your specific values:

```bash
# Edit the production environment file
nano .env.production

# Key values to update:
NEXTAUTH_URL="https://taxcat.yourdomain.com"
NEXTAUTH_SECRET="your-32-character-secret-here"
JWT_SECRET="your-jwt-secret-here"
DATABASE_URL="postgresql://taxcat:secure_password123@192.168.2.125:5432/taxcat_prod"
REDIS_URL="redis://:redis_password_123@192.168.2.125:6379"
```

### Step 4: Reverse Proxy Configuration

#### Option A: SWAG (Nginx Proxy Manager)
1. Copy the nginx configuration:
```bash
cp nginx/taxcat.subdomain.conf /mnt/user/appdata/swag/nginx/proxy-confs/
```

2. Restart SWAG container:
```bash
docker restart swag
```

#### Option B: Traefik
1. Copy the Traefik configuration:
```bash
cp traefik-taxcat.yml /mnt/user/appdata/traefik/config/
```

2. Restart Traefik container:
```bash
docker restart traefik
```

### Step 5: Deploy TaxCat

```bash
# Navigate to project directory
cd /mnt/user/appdata/taxcat

# Make scripts executable
chmod +x scripts/deploy-unraid.sh
chmod +x scripts/backup-taxcat.sh

# Run deployment
./scripts/deploy-unraid.sh
```

### Step 6: Verify Deployment

1. **Check container status:**
```bash
docker ps | grep taxcat
```

2. **Check application health:**
```bash
curl -f http://192.168.2.125:3000/api/health
```

3. **Test web interface:**
- Open `https://taxcat.yourdomain.com`
- Verify SSL certificate is valid
- Test user registration and login

## 🔧 Configuration Details

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `REDIS_URL` | Redis connection string | `redis://:password@host:6379` |
| `NEXTAUTH_URL` | Full domain URL | `https://taxcat.yourdomain.com` |
| `NEXTAUTH_SECRET` | 32-character random string | Auto-generated |
| `JWT_SECRET` | JWT signing secret | Auto-generated |
| `ENCRYPTION_KEY` | Data encryption key | Auto-generated |

### Database Schema

TaxCat uses Prisma ORM with the following main entities:
- **Users**: Authentication and user management
- **TaxReturns**: Tax return documents and status
- **Documents**: File uploads and document management
- **T4Slips/T5Slips**: Tax slip data
- **Deductions/Dependents**: Tax calculation components

### File Structure

```
/mnt/user/appdata/taxcat/
├── docker-compose.unraid.yml    # Production compose file
├── .env.production             # Production environment
├── data/
│   ├── uploads/                 # User uploaded files
│   └── logs/                    # Application logs
├── nginx/
│   └── taxcat.subdomain.conf    # SWAG configuration
├── traefik-taxcat.yml          # Traefik configuration
└── scripts/
    ├── deploy-unraid.sh         # Deployment script
    └── backup-taxcat.sh         # Backup script
```

## 🔒 Security Configuration

### SSL/TLS
- Automatic SSL certificate management via Let's Encrypt
- HTTP to HTTPS redirection
- Secure headers configured

### Authentication
- NextAuth.js with multiple providers
- JWT-based session management
- Role-based access control

### Network Security
- All services communicate internally
- External access only through reverse proxy
- Rate limiting enabled

## 📊 Monitoring and Maintenance

### Health Checks
- Application health endpoint: `/api/health`
- Container health checks configured
- Automatic restart on failure

### Logging
- Application logs: `/mnt/user/appdata/taxcat/data/logs/`
- Docker logs: `docker logs taxcat-app`
- Centralized logging available

### Backup Strategy
```bash
# Run backup script
./scripts/backup-taxcat.sh

# Automated backup (add to cron):
# 0 2 * * * /mnt/user/appdata/taxcat/scripts/backup-taxcat.sh
```

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Failed
```bash
# Check PostgreSQL connectivity
psql -h 192.168.2.125 -p 5432 -U taxcat -d taxcat_prod

# Verify database exists
psql -h 192.168.2.125 -p 5432 -U postgres -c "\l"
```

#### Redis Connection Failed
```bash
# Test Redis connection
redis-cli -h 192.168.2.125 -p 6379 -a redis_password_123 ping
```

#### SSL Certificate Issues
- Check SWAG/Traefik logs
- Verify domain DNS configuration
- Ensure ports 80/443 are forwarded correctly

#### Application Won't Start
```bash
# Check application logs
docker logs taxcat-app

# Verify environment variables
docker exec taxcat-app env | grep -E "(DATABASE|REDIS|NEXTAUTH)"
```

### Performance Tuning

#### Resource Limits
```yaml
# In docker-compose.unraid.yml
deploy:
  resources:
    limits:
      memory: 2G
      cpus: '1.0'
    reservations:
      memory: 1G
      cpus: '0.5'
```

#### Database Optimization
- Regular VACUUM operations
- Connection pooling configuration
- Index optimization

## 📈 Scaling and High Availability

### Horizontal Scaling
- Multiple TaxCat instances behind load balancer
- Shared Redis for session management
- Database read replicas for performance

### Backup and Recovery
- Automated daily backups
- Point-in-time recovery capability
- Off-site backup storage

## 🎯 Next Steps

After successful deployment:

1. **Configure Email**: Set up SMTP for notifications
2. **Add Payments**: Configure Stripe for tax filing payments
3. **Set up Monitoring**: Configure Prometheus/Grafana dashboards
4. **Enable Backups**: Schedule automated backups
5. **Security Audit**: Review and harden security settings
6. **Performance Testing**: Load test with realistic user scenarios

## 📞 Support

For issues or questions:
- Check application logs: `docker logs taxcat-app`
- Review deployment logs: `./scripts/deploy-unraid.sh` (with verbose output)
- Verify network connectivity between containers
- Check Unraid Docker settings and permissions

---

**Deployment completed successfully!** 🎉

Your TaxCat instance is now running at `https://taxcat.yourdomain.com`
