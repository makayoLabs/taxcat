# ⚡ Quick Unraid Deployment Checklist

## 📋 Before You Start - What You Need

1. **Your Unraid Server IP:** `_________________`
2. **SSH Username:** `_________________` (usually `root`)
3. **Your Domain:** `_________________` (e.g., taxcat.yourdomain.com)
4. **PostgreSQL Password:** `_________________`
5. **Redis Password:** `_________________` (if you have one)

---

## ✅ 10-Minute Deployment

### ☐ Step 1: Copy Files (2 min)
```bash
scp -r /home/user/taxcat root@YOUR_IP:/mnt/user/appdata/taxcat
```

### ☐ Step 2: Generate Secrets (1 min)
```bash
openssl rand -base64 32  # NEXTAUTH_SECRET
openssl rand -base64 32  # JWT_SECRET
openssl rand -hex 32     # ENCRYPTION_KEY
```

Save these! You'll need them in Step 4.

### ☐ Step 3: Create Database (1 min)

**Via Adminer:**
- Open Adminer → Login to PostgreSQL
- Create database: `taxcat`
- Create user: `taxcat` with strong password

**Or via CLI:**
```bash
ssh root@YOUR_IP
docker exec -it postgres_container psql -U postgres
CREATE DATABASE taxcat;
CREATE USER taxcat WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE taxcat TO taxcat;
\q
```

### ☐ Step 4: Configure Environment (3 min)

SSH to Unraid:
```bash
ssh root@YOUR_IP
cd /mnt/user/appdata/taxcat
cp .env.docker .env.docker.local
nano .env.docker.local
```

**Edit these lines:**
```bash
# 1. Database
DATABASE_URL=postgresql://taxcat:YOUR_PG_PASSWORD@postgres:5432/taxcat?schema=public

# 2. Redis (update if you have password)
REDIS_URL=redis://redis:6379

# 3. Your Domain
NEXT_PUBLIC_APP_URL=https://taxcat.yourdomain.com
NEXTAUTH_URL=https://taxcat.yourdomain.com

# 4. Secrets (from Step 2)
NEXTAUTH_SECRET=<paste from step 2>
JWT_SECRET=<paste from step 2>
ENCRYPTION_KEY=<paste from step 2>
```

Save and exit: `Ctrl+X`, `Y`, `Enter`

### ☐ Step 5: Update docker-compose.yml (1 min)

```bash
nano docker-compose.yml
```

**Find and update:**
```yaml
# Line ~50: Update your domain
- "traefik.http.routers.taxcat.rule=Host(`taxcat.yourdomain.com`)"

# Line ~67-68: Check network names match yours
networks:
  webstack_net:    # <-- Change if your Traefik network has different name
    external: true
```

Check your networks:
```bash
docker network ls | grep traefik
# Use whatever name appears
```

Save and exit: `Ctrl+X`, `Y`, `Enter`

### ☐ Step 6: Deploy! (2 min)

```bash
chmod +x docker/scripts/*.sh
./docker/scripts/deploy.sh
```

Watch the output. It should:
- ✅ Build Docker image
- ✅ Start containers
- ✅ Run database migrations
- ✅ Show "Deployment Complete!"

### ☐ Step 7: Verify (1 min)

```bash
# Check container is running
docker ps | grep taxcat

# Check logs
docker logs taxcat --tail 20

# Test health endpoint
curl http://localhost:3000/api/health
```

Should show: `{"status":"ok"}`

### ☐ Step 8: Access! (1 min)

Open browser: `https://taxcat.yourdomain.com`

You should see the TaxCat homepage!

### ☐ Step 9: Test Educational Platform (1 min)

Navigate to: `https://taxcat.yourdomain.com/learn/modules`

You should see:
- ✅ Beautiful module listing page
- ✅ "Tax Basics for Teens" module card
- ✅ Wealthsimple-inspired design

Click through:
- ✅ Module detail
- ✅ Open Lesson 1
- ✅ Read the content
- ✅ Mark lesson complete
- ✅ Take the quiz

---

## 🆘 Quick Troubleshooting

### Container won't start?
```bash
docker logs taxcat
# Read the error message
```

**Common fixes:**
- Database connection failed → Check DATABASE_URL in .env.docker.local
- Redis connection failed → Check REDIS_URL
- Port 3000 in use → Change in docker-compose.yml

### Can't access via domain?
```bash
# Check Traefik routing
docker logs traefik | grep taxcat

# Check container is on correct network
docker inspect taxcat | grep -A 10 Networks
```

**Common fixes:**
- Update Traefik labels in docker-compose.yml
- Ensure domain DNS points to your server
- Check Cloudflare Tunnel configuration

### Database migration failed?
```bash
# Run manually
docker exec -it taxcat npx prisma db push
```

---

## 📞 If You Get Stuck

Tell me:
1. What step you're on
2. What error message you see
3. Output of: `docker logs taxcat --tail 50`

I'll help debug!

---

## ✅ Success! What Next?

Once deployed:

1. **Set up backups:**
```bash
# Test backup
./docker/scripts/backup.sh

# Add to cron (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /mnt/user/appdata/taxcat/docker/scripts/backup.sh
```

2. **Optional: Add Stripe keys** (for payment processing)
- Get keys from stripe.com
- Add to `.env.docker.local`
- Restart: `docker restart taxcat`

3. **Optional: Configure email** (for notifications)
- Add SMTP details to `.env.docker.local`
- Restart: `docker restart taxcat`

4. **Add to Unraid dashboard:**
- Apps → Add Custom App
- Name: TaxCat
- WebUI: https://taxcat.yourdomain.com

---

## 🎉 You're Live!

Your students can now:
- ✅ Access educational modules
- ✅ Complete interactive lessons
- ✅ Take quizzes
- ✅ Earn badges
- ✅ Track progress
- ✅ View leaderboards

**All running on your Unraid server!** 🚀

---

*Time to complete: ~10 minutes*
*Difficulty: Easy (with this guide)*
*Cost: $0 (your hardware)*
