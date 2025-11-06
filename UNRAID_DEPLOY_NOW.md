# 🚀 Deploy TaxCat to Unraid - Step by Step

## Pre-Flight Checklist

You mentioned you have:
- ✅ Unraid server
- ✅ Traefik (reverse proxy)
- ✅ Authentik (SSO)
- ✅ Cloudflare Tunnel
- ✅ Redis
- ✅ PostgreSQL 17
- ✅ Adminer
- ✅ MariaDB

Perfect! We'll integrate with all of this.

---

## Step 1: Copy Files to Unraid (5 minutes)

### Option A: Direct SCP (if you have SSH access)

```bash
# From your current machine
scp -r /home/user/taxcat user@YOUR_UNRAID_IP:/mnt/user/appdata/taxcat

# Example:
# scp -r /home/user/taxcat root@192.168.1.100:/mnt/user/appdata/taxcat
```

### Option B: Via Unraid Shares (if you have network shares mounted)

```bash
# Copy to your Unraid appdata share
cp -r /home/user/taxcat /path/to/unraid/mnt/user/appdata/taxcat

# Example if mounted at /mnt/unraid:
# cp -r /home/user/taxcat /mnt/unraid/appdata/taxcat
```

### Option C: Git Clone (if Unraid has git)

```bash
# SSH into Unraid first
ssh user@YOUR_UNRAID_IP

# Then on Unraid:
cd /mnt/user/appdata
git clone YOUR_REPO_URL taxcat
cd taxcat
git checkout claude/taxcat-w-review-011CUqVD5XLpW1ZwBtXKCzTY
```

**Which method works best for you?**

---

## Step 2: Verify Your Existing Services (2 minutes)

SSH into your Unraid server and check what you have:

```bash
ssh user@YOUR_UNRAID_IP

# Check Docker networks
docker network ls | grep -E "webstack|makprox|traefik"

# Check PostgreSQL
docker ps | grep postgres

# Check Redis
docker ps | grep redis

# Check Traefik
docker ps | grep traefik
```

**Tell me the output so I can help configure the connections!**

---

## Step 3: Configure Environment Variables (5 minutes)

On your Unraid server:

```bash
cd /mnt/user/appdata/taxcat

# Create your local environment file
cp .env.docker .env.docker.local

# Edit it
nano .env.docker.local
```

### Required Configuration:

**1. Database Connection**

Find your PostgreSQL container name/network:
```bash
docker ps | grep postgres
# Note the container name and network
```

Then update in `.env.docker.local`:
```bash
# If PostgreSQL is in a container named "postgres"
DATABASE_URL=postgresql://taxcat:YOUR_PG_PASSWORD@postgres:5432/taxcat?schema=public

# Or if it's on host network:
DATABASE_URL=postgresql://taxcat:YOUR_PG_PASSWORD@YOUR_UNRAID_IP:5432/taxcat?schema=public
```

**2. Redis Connection**

Find your Redis container:
```bash
docker ps | grep redis
# Note the container name
```

Update:
```bash
# If Redis has a password:
REDIS_URL=redis://:YOUR_REDIS_PASSWORD@redis:6379

# If no password:
REDIS_URL=redis://redis:6379
```

**3. Domain & URLs**

```bash
# Your domain (configured in Traefik/Cloudflare)
NEXT_PUBLIC_APP_URL=https://taxcat.yourdomain.com
NEXTAUTH_URL=https://taxcat.yourdomain.com
```

**4. Secrets (GENERATE NEW ONES!)**

```bash
# Generate secrets
openssl rand -base64 32  # Use for NEXTAUTH_SECRET
openssl rand -base64 32  # Use for JWT_SECRET
openssl rand -hex 32     # Use for ENCRYPTION_KEY
```

Update in `.env.docker.local`:
```bash
NEXTAUTH_SECRET=<paste generated value>
JWT_SECRET=<paste generated value>
ENCRYPTION_KEY=<paste generated value>
```

**5. Optional: Stripe (if you want payments)**

```bash
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_... # Your Stripe public key
```

**6. Optional: Email (for notifications)**

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@taxcat.com
```

---

## Step 4: Update docker-compose.yml Networks (2 minutes)

Edit `docker-compose.yml` to match YOUR network names:

```bash
nano docker-compose.yml
```

**Find the networks section at the bottom:**

```yaml
networks:
  webstack_net:
    external: true    # <-- Your Traefik network name
  makprox:
    external: true    # <-- Your proxy network (if different)
  database_net:
    driver: bridge
```

**What are your actual network names?** Run this to find out:
```bash
docker network ls
```

Common names:
- `traefik_default`
- `proxy`
- `web`
- `npm_proxy` (if using Nginx Proxy Manager)

Update the `docker-compose.yml` to match.

---

## Step 5: Create Database (2 minutes)

You need to create a database in PostgreSQL for TaxCat.

### Option A: Using Adminer (you have this!)

1. Open Adminer in browser: `http://YOUR_UNRAID_IP:8080` (or your Adminer URL)
2. Login to PostgreSQL
3. Create database: `taxcat`
4. Create user: `taxcat` with password (use this in DATABASE_URL)

### Option B: Using CLI

```bash
# Access your PostgreSQL container
docker exec -it YOUR_POSTGRES_CONTAINER_NAME psql -U postgres

# In PostgreSQL:
CREATE DATABASE taxcat;
CREATE USER taxcat WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE taxcat TO taxcat;
\q
```

---

## Step 6: Configure Traefik Labels (2 minutes)

In `docker-compose.yml`, update the Traefik labels for your domain:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.docker.network=YOUR_TRAEFIK_NETWORK"  # <-- Change this
  - "traefik.http.routers.taxcat.rule=Host(`taxcat.yourdomain.com`)"  # <-- Your domain
  - "traefik.http.routers.taxcat.entrypoints=websecure"
  - "traefik.http.routers.taxcat.tls=true"
  - "traefik.http.routers.taxcat.tls.certresolver=cloudflare"  # <-- Match your cert resolver name
  - "traefik.http.services.taxcat.loadbalancer.server.port=3000"
```

**What's your Traefik cert resolver called?** Check your Traefik config.

Common names:
- `cloudflare`
- `letsencrypt`
- `cf-dns`

---

## Step 7: Deploy! (3 minutes)

Make the deployment script executable:

```bash
cd /mnt/user/appdata/taxcat
chmod +x docker/scripts/deploy.sh
chmod +x docker/scripts/backup.sh
chmod +x docker/scripts/manage.sh
```

Run the deployment:

```bash
./docker/scripts/deploy.sh
```

**This will:**
1. Check your `.env.docker.local` exists
2. Create Docker networks if needed
3. Build the TaxCat Docker image
4. Start all services
5. Run database migrations (Prisma)
6. Health check

---

## Step 8: Verify Deployment (2 minutes)

### Check containers are running:

```bash
docker ps | grep taxcat
```

You should see:
- `taxcat` container running
- Status: Up
- Port: 3000

### Check logs:

```bash
docker logs taxcat -f
```

Look for:
```
✓ Ready in XXms
✓ Listening on 0.0.0.0:3000
```

### Check health:

```bash
curl http://localhost:3000/api/health
```

Should return: `{"status":"ok"}`

---

## Step 9: Access TaxCat! (1 minute)

### Via Traefik (public URL):

Open browser: `https://taxcat.yourdomain.com`

### Via Cloudflare Tunnel (if configured):

Your Cloudflare Tunnel should route to the Traefik hostname.

### Via Internal IP (for testing):

`http://YOUR_UNRAID_IP:3000`

---

## Troubleshooting

### Issue: Container won't start

Check logs:
```bash
docker logs taxcat --tail 50
```

Common issues:
- Database connection failed → Check DATABASE_URL
- Redis connection failed → Check REDIS_URL
- Port already in use → Change port mapping

### Issue: Can't access via domain

1. Check Traefik is routing:
```bash
docker logs traefik | grep taxcat
```

2. Check DNS:
```bash
nslookup taxcat.yourdomain.com
```

3. Check Cloudflare Tunnel is running:
```bash
docker ps | grep cloudflared
```

### Issue: Database migration failed

Run manually:
```bash
docker exec -it taxcat npx prisma db push
```

### Issue: Build failed

Check if you have enough space:
```bash
df -h
```

Check Docker logs:
```bash
docker-compose logs taxcat
```

---

## Post-Deployment

### 1. Test the Educational Platform

Visit: `https://taxcat.yourdomain.com/learn/modules`

You should see:
- Module listing page
- "Tax Basics for Teens" module card
- Beautiful Wealthsimple-inspired design

Click through:
- Module detail
- Lesson 1: What Are Taxes?
- Complete the lesson
- Take the quiz

### 2. Set Up Backups

The backup script is ready:
```bash
# Test backup
./docker/scripts/backup.sh

# Schedule with cron (run daily at 2 AM)
crontab -e
# Add:
0 2 * * * /mnt/user/appdata/taxcat/docker/scripts/backup.sh
```

### 3. Monitor Logs

```bash
# Follow logs
docker logs taxcat -f

# Or use Unraid's built-in log viewer
```

### 4. Optional: Add to Unraid Dashboard

Add TaxCat to your Unraid dashboard:
- Name: TaxCat
- Icon: Use tax/education icon
- WebUI: `https://taxcat.yourdomain.com`

---

## Management Commands

```bash
# View logs
docker logs taxcat -f

# Restart TaxCat
docker restart taxcat

# Stop TaxCat
docker stop taxcat

# Start TaxCat
docker start taxcat

# Rebuild and restart
docker-compose build taxcat
docker-compose up -d taxcat

# Database backup
./docker/scripts/backup.sh

# Full management script
./docker/scripts/manage.sh
```

---

## Environment Variables Reference

**Required:**
- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- `NEXTAUTH_SECRET` - Auth secret (generate with openssl)
- `JWT_SECRET` - JWT secret (generate with openssl)
- `ENCRYPTION_KEY` - Encryption key (generate with openssl)
- `NEXT_PUBLIC_APP_URL` - Your public URL
- `NEXTAUTH_URL` - Your public URL

**Optional:**
- `STRIPE_SECRET_KEY` - For payments
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` - For payments
- `SMTP_HOST` - Email server
- `SMTP_PORT` - Email port
- `SMTP_USER` - Email username
- `SMTP_PASSWORD` - Email password
- `SMTP_FROM` - From address

---

## Success Checklist

- ✅ Files copied to Unraid
- ✅ `.env.docker.local` configured
- ✅ Database created
- ✅ Networks configured
- ✅ Traefik labels updated
- ✅ Deployment script executed
- ✅ Container running
- ✅ Health check passing
- ✅ Accessible via domain
- ✅ Educational platform loads
- ✅ Can complete a lesson
- ✅ Can take a quiz

---

## What to Tell Me

As you go through each step, let me know:

1. **After Step 1:** Did files copy successfully?
2. **After Step 2:** What are your network names? Container names?
3. **After Step 7:** What does `docker logs taxcat` show?
4. **After Step 9:** Can you access the site? What do you see?

I'll help troubleshoot any issues! Let's start with **Step 1** - which method do you want to use to copy the files?
