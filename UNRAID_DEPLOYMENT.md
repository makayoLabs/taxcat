# 🚀 TaxCat & EKBooks - Unraid Server Deployment Guide

Complete guide to deploy both applications on your Unraid server with Traefik, PostgreSQL, Redis, and Cloudflare Tunnel.

---

## 📋 Prerequisites Checklist

Before you begin, verify you have:

- ✅ Unraid server with Docker support
- ✅ Traefik reverse proxy (running)
- ✅ PostgreSQL 17 container (or will create new one)
- ✅ Redis container (or will create new one)
- ✅ Authentik (optional, for SSO)
- ✅ Cloudflare Tunnel configured
- ✅ Domains: `taxcat.ca` and `ekbooks.ca` pointing to your server
- ✅ Traefik networks: `webstack_net` and `makprox` (external networks)

---

## 🎯 Quick Start (10 Minutes)

### Step 1: Clone Repository to Unraid

SSH into your Unraid server and navigate to your docker compose directory:

```bash
cd /mnt/user/appdata/
git clone https://github.com/makayoLabs/taxcat.git
cd taxcat
git checkout claude/taxcat-w-review-011CUqVD5XLpW1ZwBtXKCzTY
```

### Step 2: Configure Environment Variables

```bash
# Copy and edit the environment file
cp .env.docker .env.docker.local
nano .env.docker.local
```

**IMPORTANT: Update these values:**

```bash
# Generate new secrets (run these commands):
openssl rand -base64 32  # Copy for NEXTAUTH_SECRET
openssl rand -base64 32  # Copy for JWT_SECRET
openssl rand -base64 32  # Copy for ENCRYPTION_KEY

# Database passwords
POSTGRES_PASSWORD=YOUR_SECURE_PASSWORD_HERE
REDIS_PASSWORD=YOUR_REDIS_PASSWORD_HERE

# Admin credentials
CMS_ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD_HERE
```

### Step 3: Connect to Existing PostgreSQL & Redis (Option A)

If you already have PostgreSQL and Redis running, edit `docker-compose.yml`:

```yaml
# Comment out the postgres and redis services (lines 114-151)
# Update the DATABASE_URL to point to your existing containers:

services:
  taxcat:
    environment:
      - DATABASE_URL=postgresql://user:pass@YOUR_POSTGRES_CONTAINER:5432/taxcat?schema=public
      - REDIS_URL=redis://:password@YOUR_REDIS_CONTAINER:6379
```

**Find your existing container names:**
```bash
docker ps | grep postgres
docker ps | grep redis
```

### Step 4: Use Bundled PostgreSQL & Redis (Option B)

If you want to use the included PostgreSQL and Redis containers, no changes needed! They're already configured in `docker-compose.yml`.

### Step 5: Verify Traefik Networks

Check your existing Traefik networks:

```bash
docker network ls | grep -E "webstack_net|makprox"
```

If they don't exist, create them:

```bash
docker network create webstack_net
docker network create makprox
```

Or update `docker-compose.yml` to match your existing network names.

### Step 6: Build and Deploy

```bash
# Build the Docker images
docker compose -f docker-compose.yml --env-file .env.docker.local build

# Start the services
docker compose -f docker-compose.yml --env-file .env.docker.local up -d

# Watch the logs
docker compose logs -f taxcat
```

### Step 7: Initialize Database

After containers are running, initialize the Prisma database:

```bash
# Generate Prisma client
docker exec taxcat npx prisma generate

# Push database schema
docker exec taxcat npx prisma db push

# Verify database connection
docker exec taxcat npx prisma db push --preview-feature
```

### Step 8: Verify Deployment

Check that services are running:

```bash
# Check container status
docker compose ps

# Check health
docker exec taxcat node -e "require('http').get('http://localhost:3000/api/health', (r) => console.log(r.statusCode))"

# Check Traefik routing
curl -I https://taxcat.ca
curl -I https://ekbooks.ca
```

Visit your domains:
- **TaxCat**: https://taxcat.ca
- **EKBooks**: https://ekbooks.ca

---

## 🔧 Detailed Configuration

### PostgreSQL Configuration

#### Option A: Use Existing PostgreSQL 17 Container

1. **Find your PostgreSQL container name:**
```bash
docker ps | grep postgres
# Example output: postgres17-official
```

2. **Create TaxCat database:**
```bash
docker exec -it postgres17-official psql -U postgres
CREATE DATABASE taxcat;
CREATE USER taxcat WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE taxcat TO taxcat;
\q
```

3. **Update docker-compose.yml:**
```yaml
services:
  taxcat:
    environment:
      - DATABASE_URL=postgresql://taxcat:your_password@postgres17-official:5432/taxcat?schema=public
    networks:
      - webstack_net
      - YOUR_POSTGRES_NETWORK  # Add your postgres network name
```

4. **Comment out bundled postgres service** (lines 114-134 in docker-compose.yml)

#### Option B: Use Bundled PostgreSQL

No configuration needed! The `docker-compose.yml` includes a PostgreSQL 17 container that will start automatically.

**Access the bundled database:**
```bash
docker exec -it taxcat_postgres psql -U taxcat -d taxcat
```

### Redis Configuration

#### Option A: Use Existing Redis Container

1. **Find Redis container:**
```bash
docker ps | grep redis
# Example: redis-official
```

2. **Update docker-compose.yml:**
```yaml
services:
  taxcat:
    environment:
      - REDIS_URL=redis://:your_redis_password@redis-official:6379
```

3. **Comment out bundled redis service** (lines 136-151 in docker-compose.yml)

#### Option B: Use Bundled Redis

No changes needed! A Redis 7 container is included.

**Test Redis connection:**
```bash
docker exec taxcat_redis redis-cli -a YOUR_REDIS_PASSWORD ping
# Should return: PONG
```

### Traefik Integration

Your `docker-compose.yml` already includes Traefik labels. Verify your Traefik configuration:

**Check Traefik dashboard:**
- Find your Traefik container: `docker ps | grep traefik`
- Access dashboard (usually at https://traefik.yourdomain.com)
- Look for `taxcat` and `ekbooks` routers

**Traefik labels explained:**
```yaml
labels:
  - "traefik.enable=true"  # Enable Traefik for this container
  - "traefik.http.routers.taxcat.rule=Host(`taxcat.ca`)"  # Domain routing
  - "traefik.http.routers.taxcat.entrypoints=websecure"  # HTTPS entry point
  - "traefik.http.routers.taxcat.tls.certresolver=cloudflare"  # SSL via Cloudflare
  - "traefik.http.services.taxcat.loadbalancer.server.port=3000"  # Container port
```

**If using different cert resolver:**
```yaml
# Change from cloudflare to your resolver name
- "traefik.http.routers.taxcat.tls.certresolver=YOUR_RESOLVER_NAME"
```

### Cloudflare Tunnel Configuration

If using Cloudflare Tunnel (recommended), your traffic flow is:

```
Internet → Cloudflare Tunnel → Traefik → TaxCat/EKBooks Container
```

**Verify tunnel:**
```bash
# Check tunnel status in Cloudflare dashboard
# Or check cloudflared container logs
docker logs cloudflared
```

**DNS Configuration:**
```
Type: CNAME
Name: taxcat
Content: your-tunnel-id.cfargotunnel.com

Type: CNAME
Name: ekbooks
Content: your-tunnel-id.cfargotunnel.com
```

### Authentik SSO Integration (Optional)

To use Authentik instead of NextAuth:

1. **Create OAuth2/OIDC Provider in Authentik:**
   - Name: TaxCat
   - Client Type: Confidential
   - Redirect URIs: `https://taxcat.ca/api/auth/callback/authentik`

2. **Update `.env.docker.local`:**
```bash
# Authentik Configuration
AUTHENTIK_URL=https://authentik.yourdomain.com
AUTHENTIK_CLIENT_ID=your-client-id-from-authentik
AUTHENTIK_CLIENT_SECRET=your-client-secret
AUTHENTIK_ISSUER=https://authentik.yourdomain.com/application/o/taxcat/
```

3. **Restart containers:**
```bash
docker compose restart taxcat
```

---

## 🛠️ Management Commands

### Viewing Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f taxcat
docker compose logs -f ekbooks
docker compose logs -f postgres
```

### Restarting Services

```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart taxcat
```

### Updating Application

```bash
# Pull latest code
git pull origin claude/taxcat-w-review-011CUqVD5XLpW1ZwBtXKCzTY

# Rebuild and restart
docker compose build taxcat
docker compose up -d taxcat

# Or rebuild both
docker compose build
docker compose up -d
```

### Database Management

```bash
# Run Prisma migrations
docker exec taxcat npx prisma migrate dev --name description

# Push schema changes
docker exec taxcat npx prisma db push

# Open Prisma Studio (GUI for database)
docker exec -it taxcat npx prisma studio
# Access at: http://YOUR_UNRAID_IP:5555

# Backup database
docker exec taxcat_postgres pg_dump -U taxcat taxcat > backup_$(date +%Y%m%d).sql

# Restore database
cat backup_20241106.sql | docker exec -i taxcat_postgres psql -U taxcat taxcat
```

### Using Adminer (Database GUI)

If you have Adminer running on Unraid:

1. Access Adminer: http://YOUR_UNRAID_IP:8080
2. **System:** PostgreSQL
3. **Server:** taxcat_postgres (or your container name)
4. **Username:** taxcat
5. **Password:** (from .env.docker.local)
6. **Database:** taxcat

---

## 📊 Monitoring & Health Checks

### Container Health

```bash
# Check health status
docker compose ps

# Should show "healthy" for all services
docker inspect --format='{{.State.Health.Status}}' taxcat
```

### Application Health Endpoint

```bash
# TaxCat health check
curl http://localhost:3000/api/health

# Through Traefik
curl https://taxcat.ca/api/health
```

### Resource Usage

```bash
# View resource usage
docker stats taxcat ekbooks taxcat_postgres taxcat_redis

# Top processes in container
docker exec taxcat top
```

### Unraid Dashboard Integration

Add custom containers to Unraid dashboard:

1. Go to Unraid Dashboard → Docker
2. Your containers should appear automatically
3. Click on container icon → Edit
4. Add custom icon URL if desired
5. Set WebUI: `https://taxcat.ca` for easy access

---

## 🔒 Security Best Practices

### 1. Update Default Passwords

```bash
# Generate strong passwords
openssl rand -base64 32

# Update in .env.docker.local:
POSTGRES_PASSWORD=<generated>
REDIS_PASSWORD=<generated>
NEXTAUTH_SECRET=<generated>
JWT_SECRET=<generated>
ENCRYPTION_KEY=<generated>
CMS_ADMIN_PASSWORD=<generated>
```

### 2. Enable Firewall Rules

```bash
# Only allow Traefik to access containers (already configured via Docker networks)
# Verify network isolation
docker network inspect database_net
```

### 3. Regular Backups

Set up automated backups:

```bash
# Create backup script
cat > /mnt/user/scripts/backup-taxcat.sh <<'EOF'
#!/bin/bash
BACKUP_DIR=/mnt/user/backups/taxcat
mkdir -p $BACKUP_DIR
DATE=$(date +%Y%m%d_%H%M%S)

# Backup database
docker exec taxcat_postgres pg_dump -U taxcat taxcat | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Backup uploads
docker cp taxcat:/app/uploads $BACKUP_DIR/uploads_$DATE

# Keep only last 30 days
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete
EOF

chmod +x /mnt/user/scripts/backup-taxcat.sh

# Add to Unraid User Scripts plugin (daily at 2 AM)
```

### 4. Update Containers Regularly

```bash
# Pull latest images
docker compose pull

# Rebuild with latest code
git pull && docker compose build && docker compose up -d
```

---

## 🐛 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker compose logs taxcat

# Common issues:
# 1. Port already in use
docker ps | grep 3000
# Solution: Stop conflicting container or change port in docker-compose.yml

# 2. Network doesn't exist
docker network ls
# Solution: Create missing networks or update docker-compose.yml

# 3. Permission issues
ls -la uploads/ logs/
# Solution: Fix permissions
chmod -R 755 uploads logs
```

### Database Connection Failed

```bash
# Test database connection
docker exec taxcat npx prisma db push --preview-feature

# Check PostgreSQL is running
docker exec taxcat_postgres pg_isready -U taxcat

# Verify DATABASE_URL
docker exec taxcat printenv DATABASE_URL
```

### Traefik Not Routing

```bash
# Check Traefik logs
docker logs traefik | grep taxcat

# Verify container is on correct network
docker inspect taxcat | grep -A 10 Networks

# Check Traefik dashboard for router
# Look for taxcat@docker router
```

### Can't Access via Domain

```bash
# Test local access first
curl http://localhost:3000/api/health

# Check DNS resolution
nslookup taxcat.ca

# Check Cloudflare Tunnel
docker logs cloudflared | grep taxcat

# Verify in Traefik dashboard that router exists
```

### High Memory Usage

```bash
# Check memory usage
docker stats taxcat

# Restart if needed
docker compose restart taxcat

# Adjust Node.js memory limit in docker-compose.yml:
environment:
  - NODE_OPTIONS=--max-old-space-size=2048
```

---

## 📈 Performance Optimization

### 1. Enable Redis Session Storage

Already configured! Redis is used for:
- Session storage
- Rate limiting
- Caching

### 2. Configure Nginx Reverse Proxy Cache (if using)

If you have Nginx in front of Traefik:

```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=taxcat_cache:10m max_size=1g inactive=60m;
proxy_cache_key "$scheme$request_method$host$request_uri";
```

### 3. Database Optimization

```sql
-- Run these in PostgreSQL
docker exec -it taxcat_postgres psql -U taxcat -d taxcat

-- Analyze tables for query optimization
ANALYZE;

-- Vacuum to reclaim storage
VACUUM ANALYZE;

-- Check database size
SELECT pg_size_pretty(pg_database_size('taxcat'));
```

### 4. Container Resource Limits

Add resource limits to `docker-compose.yml`:

```yaml
services:
  taxcat:
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M
```

---

## 🆙 Upgrading

### Minor Updates (Bug Fixes)

```bash
cd /mnt/user/appdata/taxcat
git pull
docker compose build taxcat ekbooks
docker compose up -d
```

### Major Updates (Breaking Changes)

```bash
# 1. Backup first!
./scripts/backup-taxcat.sh

# 2. Pull changes
git pull

# 3. Check for migration notes
cat MIGRATION_NOTES.md

# 4. Update database schema
docker exec taxcat npx prisma migrate deploy

# 5. Rebuild
docker compose build
docker compose up -d
```

---

## 📝 Post-Deployment Checklist

After deployment, verify:

- [ ] TaxCat loads at https://taxcat.ca
- [ ] EKBooks loads at https://ekbooks.ca
- [ ] HTTPS works (SSL certificate valid)
- [ ] Health check passes: https://taxcat.ca/api/health
- [ ] Can register new user at https://taxcat.ca/auth/register
- [ ] Can login at https://taxcat.ca/auth/login
- [ ] RRSP calculator works: https://taxcat.ca/tools/rrsp
- [ ] TFSA calculator works: https://taxcat.ca/tools/tfsa
- [ ] Database connection working (check Adminer)
- [ ] Redis connection working (session persistence)
- [ ] Container health checks passing
- [ ] Logs look clean (no errors)
- [ ] Backups configured and tested

---

## 📞 Need Help?

### Log Files Location
- Application logs: `/mnt/user/appdata/taxcat/logs/`
- Container logs: `docker compose logs`
- Unraid logs: `/var/log/`

### Useful Commands
```bash
# Container shell access
docker exec -it taxcat sh

# Run npm commands
docker exec taxcat npm run <command>

# Database shell
docker exec -it taxcat_postgres psql -U taxcat -d taxcat
```

### Resources
- Unraid Forums: https://forums.unraid.net/
- Docker Compose Docs: https://docs.docker.com/compose/
- Traefik Docs: https://doc.traefik.io/traefik/
- Next.js Docs: https://nextjs.org/docs

---

## ✅ You're Live!

Your TaxCat and EKBooks applications are now running on your Unraid server with:
- ✅ Professional Traefik reverse proxy
- ✅ PostgreSQL 17 database
- ✅ Redis caching
- ✅ SSL via Cloudflare
- ✅ Automated health checks
- ✅ Docker container isolation

**Access your applications:**
- 🎯 TaxCat: https://taxcat.ca
- 📚 EKBooks: https://ekbooks.ca

**Monitor status:**
```bash
docker compose ps
docker stats taxcat ekbooks
```

Enjoy your self-hosted Canadian tax and accounting platform! 🚀🇨🇦
