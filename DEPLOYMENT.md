# 🚀 TaxCat Unraid Deployment Guide

## Prerequisites
- Unraid server with Docker installed
- At least 4GB RAM available
- 10GB free disk space

## Quick Start Deployment

### Step 1: Upload TaxCat to Your Unraid Server

1. **Copy the entire `taxcat-app` folder** to your Unraid server (via SMB share or SSH)

2. **Place it in your preferred location**, e.g.:
   ```
   /mnt/user/apps/taxcat-app/
   ```

### Step 2: Configure Environment Variables

Create `.env.local` file in the project root:

```bash
# Copy this content to .env.local
DATABASE_URL="postgresql://taxcat_user:secure_password123@postgres:5432/taxcat_prod"
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NEXT_PUBLIC_APP_URL=http://YOUR-UNRAID-IP:3000
NEXTAUTH_SECRET=generate-a-random-32-char-secret-here
NEXTAUTH_URL=http://YOUR-UNRAID-IP:3000
CMS_ADMIN_EMAIL=admin@taxcat.ca
CMS_ADMIN_PASSWORD=your_admin_password_here
REDIS_URL=redis://redis:6379
NEXT_TELEMETRY_DISABLED=1
```

### Step 3: Deploy Using Docker Compose

1. **SSH into your Unraid server**:
   ```bash
   ssh root@your-unraid-ip
   ```

2. **Navigate to the project directory**:
   ```bash
   cd /mnt/user/apps/taxcat-app
   ```

3. **Start the services**:
   ```bash
   docker-compose up -d
   ```

4. **Check if services are running**:
   ```bash
   docker-compose ps
   ```

### Step 4: Verify Deployment

1. **Open your browser** and navigate to:
   ```
   http://YOUR-UNRAID-IP:3000
   ```

2. **Check health endpoint**:
   ```
   http://YOUR-UNRAID-IP:3000/api/health
   ```

## Available Services

After deployment, these services will be running:

| Service | Port | Description |
|---------|------|-------------|
| TaxCat App | 3000 | Main Next.js application |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache |
| Prometheus | 9090 | Monitoring (optional) |
| Grafana | 3001 | Dashboard (optional) |

## First-Time Setup

1. **Access the application** at `http://YOUR-UNRAID-IP:3000`

2. **Register your first admin account** by visiting `/auth/register`

3. **Login and configure**:
   - Go to `/dashboard`
   - Create your first tax return
   - Configure CMS settings at `/cms`

## Managing the Application

### Viewing Logs
```bash
docker-compose logs -f taxcat-app
```

### Restarting Services
```bash
docker-compose restart
```

### Stopping Services
```bash
docker-compose down
```

### Updating the Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Backup and Recovery

### Database Backup
```bash
docker-compose exec postgres pg_dump -U taxcat_user taxcat_prod > backup.sql
```

### Database Restore
```bash
docker-compose exec -T postgres psql -U taxcat_user taxcat_prod < backup.sql
```

## Security Considerations

1. **Change default passwords** in `.env.local`
2. **Use HTTPS** in production (setup reverse proxy)
3. **Regular backups** of database
4. **Monitor logs** for security issues
5. **Keep Docker images updated**

## Troubleshooting

### Application Won't Start
- Check logs: `docker-compose logs taxcat-app`
- Verify environment variables
- Ensure ports aren't occupied

### Database Connection Issues
- Check PostgreSQL container: `docker-compose logs postgres`
- Verify DATABASE_URL format
- Wait for database to fully initialize

### Port Conflicts
- Change ports in docker-compose.yml
- Update NEXT_PUBLIC_APP_URL accordingly

## Performance Optimization

### For Small Home Server:
- Modify docker-compose.yml to use less resources
- Consider disabling optional services (Prometheus, Grafana)

### For Production:
- Increase container resources
- Setup monitoring and alerting
- Configure log rotation

## Support

If you encounter issues:
1. Check application logs
2. Verify all environment variables
3. Ensure Docker and Docker Compose are updated
4. Check Unraid Docker configuration

---
**TaxCat is now ready for production use on your Unraid server!** 🎉