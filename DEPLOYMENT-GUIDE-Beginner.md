# 🚀 TaxCat Deployment Guide for Complete Beginners

Welcome! This guide will walk you through deploying TaxCat (a Canadian tax software system) on your Unraid server **step by step**. We'll assume you've never done this before, so I'll explain everything clearly.

## 📋 What You'll Need

### Hardware/Software Requirements
- ✅ **Unraid Server** (you have this at `192.168.2.125`)
- ✅ **Domain Name** (like `taxcat.yourdomain.com`)
- ✅ **Internet Connection**
- ✅ **Basic Computer Skills**

### What TaxCat Is
TaxCat is a web application that helps Canadians prepare and file their taxes. It includes:
- Tax calculation for T1, T2, T3, and T5013 forms
- Document upload and management
- User authentication and security
- Payment processing (optional)
- Admin dashboard

---

## 🏁 Step 1: Prepare Your Files

### 1.1 Download/Transfer TaxCat Files

You need to get the TaxCat files onto your Unraid server.

**Option A: If you're on Windows/Mac (easiest)**
1. Open File Explorer (Windows) or Finder (Mac)
2. Connect to your Unraid server: `\\192.168.2.125` (Windows) or `smb://192.168.2.125` (Mac)
3. Navigate to the `appdata` folder
4. Create a new folder called `taxcat`
5. Copy all the TaxCat files into this folder:
   - `docker-compose.unraid.yml`
   - `.env.production`
   - `nginx/taxcat.subdomain.conf`
   - `traefik-taxcat.yml`
   - `scripts/deploy-unraid.sh`
   - `scripts/backup-taxcat.sh`
   - `UNRAID-DEPLOYMENT.md`

**Option B: Using Command Line (Advanced)**
```bash
# On your local computer
scp -r /path/to/taxcat/files user@192.168.2.125:/mnt/user/appdata/taxcat/
```

### 1.2 Verify Files Are There
1. Open your Unraid web interface (usually `http://192.168.2.125`)
2. Go to **Shares** → **appdata**
3. Make sure you see a `taxcat` folder with all the files

---

## 🗄️ Step 2: Set Up the Database

TaxCat needs a database to store user data and tax information.

### 2.1 Check Your PostgreSQL Container

1. In Unraid web interface, go to **Docker** tab
2. Look for a container named something like:
   - `postgres` or `postgresql`
   - `postgres17` or similar
3. If you don't see one, you'll need to install it (see Step 2.2)

### 2.2 Install PostgreSQL (if needed)

1. In Unraid, go to **Apps** tab
2. Search for "PostgreSQL"
3. Click **Install** on the official PostgreSQL template
4. Configure it:
   - **Name**: `postgres17` (or whatever you prefer)
   - **Database**: `taxcat_prod`
   - **User**: `taxcat`
   - **Password**: `secure_password123` (you can change this later)
   - **Port**: `5432`
5. Click **Apply** and wait for it to install

### 2.3 Create the Database

You need to create the TaxCat database inside PostgreSQL.

**Method 1: Using Unraid Terminal**
1. In Unraid web interface, go to **Terminal** (top right)
2. Run this command:
```bash
docker exec -it postgres17 psql -U postgres
```

3. Once inside PostgreSQL, run these commands:
```sql
CREATE DATABASE taxcat_prod;
CREATE USER taxcat WITH ENCRYPTED PASSWORD 'secure_password123';
GRANT ALL PRIVILEGES ON DATABASE taxcat_prod TO taxcat;
\q
```

**Method 2: Using a Database Tool**
- If you have tools like pgAdmin, DBeaver, or Adminer installed, connect to:
  - Host: `192.168.2.125`
  - Port: `5432`
  - User: `postgres`
  - Create the database and user as shown above

---

## 🔄 Step 3: Set Up Redis (Cache)

Redis is like a fast memory storage for quick data access.

### 3.1 Check Your Redis Container

1. In Unraid **Docker** tab, look for a container named `redis`
2. If you don't have one, install it (see Step 3.2)

### 3.2 Install Redis (if needed)

1. In Unraid **Apps** tab, search for "Redis"
2. Install the official Redis template
3. Configure it:
   - **Name**: `redis`
   - **Password**: `redis_password_123` (you can change this)
   - **Port**: `6379`
4. Click **Apply**

---

## 🌐 Step 4: Set Up Your Domain

You need a domain name for secure access.

### 4.1 Buy a Domain (if you don't have one)

1. Go to a domain registrar like:
   - Namecheap.com
   - GoDaddy.com
   - Google Domains
2. Buy a domain (something like `yourname.com`)
3. Set up DNS records to point to your public IP address

### 4.2 Configure DNS

In your domain registrar's control panel:
1. Create an **A record** for `taxcat`
2. Point it to your **public IP address** (not 192.168.2.125)
3. Example:
   - Type: A
   - Name: taxcat
   - Value: `YOUR_PUBLIC_IP_ADDRESS`

### 4.3 Port Forwarding

In your router settings:
1. Forward **port 80** to `192.168.2.125:80`
2. Forward **port 443** to `192.168.2.125:443`

---

## 🔒 Step 5: Set Up Reverse Proxy (SWAG or Traefik)

This handles secure connections and SSL certificates.

### 5.1 Check What You Have

You mentioned you have SWAG and Traefik. Let's use SWAG since it's simpler for beginners.

### 5.2 Configure SWAG

1. In Unraid **Docker** tab, find your SWAG container
2. Go to its settings and make sure:
   - Domain is set to your domain
   - Email is set for Let's Encrypt
3. Copy the nginx config file:
   - Go to Unraid terminal
   - Run: `cp /mnt/user/appdata/taxcat/nginx/taxcat.subdomain.conf /mnt/user/appdata/swag/nginx/proxy-confs/`

### 5.3 Restart SWAG

1. In Docker tab, click the SWAG container
2. Click **Restart**
3. Wait a few minutes for SSL certificates to generate

---

## ⚙️ Step 6: Configure TaxCat Settings

### 6.1 Edit Environment Variables

1. In Unraid file manager, go to `/mnt/user/appdata/taxcat/`
2. Open `.env.production` file
3. Update these values:

```bash
# Change this to your actual domain
NEXT_PUBLIC_APP_URL="https://taxcat.yourdomain.com"
NEXTAUTH_URL="https://taxcat.yourdomain.com"

# Change these to secure random strings (32 characters each)
NEXTAUTH_SECRET="your-32-character-secret-here-change-this"
JWT_SECRET="your-jwt-secret-here-change-this"
ENCRYPTION_KEY="32-character-encryption-key-change-this"

# Change this to your admin email
CMS_ADMIN_EMAIL="admin@yourdomain.com"
```

**How to generate secure secrets:**
- Go to a website like `https://www.uuidgenerator.net/`
- Generate a UUID and remove the dashes (that's 32 characters)

### 6.2 Update Docker Compose (if needed)

The `docker-compose.unraid.yml` file should already be configured for your setup, but double-check:

1. Open `docker-compose.unraid.yml`
2. Make sure the database URL points to your server:
```yaml
DATABASE_URL="postgresql://taxcat:secure_password123@192.168.2.125:5432/taxcat_prod"
REDIS_URL="redis://:redis_password_123@192.168.2.125:6379"
```

---

## 🚀 Step 7: Deploy TaxCat

### 7.1 Make Scripts Executable

1. Open Unraid terminal
2. Run these commands:
```bash
cd /mnt/user/appdata/taxcat
chmod +x scripts/deploy-unraid.sh
chmod +x scripts/backup-taxcat.sh
```

### 7.2 Run the Deployment Script

1. In the terminal, run:
```bash
./scripts/deploy-unraid.sh
```

2. The script will:
   - Create necessary folders
   - Set up the database
   - Build and start TaxCat
   - Configure everything automatically

3. Wait for it to complete (it might take 5-10 minutes)

### 7.3 Check If It Worked

1. In Unraid **Docker** tab, look for `taxcat-app` container
2. It should be running (green status)
3. Check logs if there are any errors

---

## ✅ Step 8: Test Your Installation

### 8.1 Test Basic Access

1. Open a web browser
2. Go to `https://taxcat.yourdomain.com`
3. You should see the TaxCat homepage
4. Look for the green lock icon (SSL working)

### 8.2 Test Health Check

1. In browser, go to `https://taxcat.yourdomain.com/api/health`
2. You should see `{"status":"ok"}` or similar

### 8.3 Test User Registration

1. Go back to `https://taxcat.yourdomain.com`
2. Click "Start Your Tax Return" or "Register"
3. Try creating a test account
4. Make sure login/logout works

---

## 🔧 Step 9: Set Up Backups (Important!)

### 9.1 Run Your First Backup

1. In Unraid terminal:
```bash
cd /mnt/user/appdata/taxcat
./scripts/backup-taxcat.sh
```

2. Check that backup files were created in `/mnt/user/backups/taxcat/`

### 9.2 Schedule Automatic Backups

1. In Unraid web interface, go to **Settings** → **User Scripts**
2. Create a new script called "TaxCat Backup"
3. Add this content:
```bash
#!/bin/bash
cd /mnt/user/appdata/taxcat
./scripts/backup-taxcat.sh
```

4. Set it to run daily at 2 AM

---

## 🆘 Troubleshooting Common Problems

### Problem: "Database connection failed"
**Solution:**
1. Check if PostgreSQL container is running
2. Verify database credentials in `.env.production`
3. Test connection: `docker exec -it postgres17 psql -U taxcat -d taxcat_prod`

### Problem: "SSL certificate not working"
**Solution:**
1. Check SWAG logs for errors
2. Make sure domain DNS is pointing to your public IP
3. Wait 24 hours for DNS changes to propagate

### Problem: "Application won't start"
**Solution:**
1. Check TaxCat logs: `docker logs taxcat-app`
2. Make sure all environment variables are set correctly
3. Verify database and Redis are accessible

### Problem: "Can't access from internet"
**Solution:**
1. Check router port forwarding (ports 80, 443)
2. Verify domain DNS settings
3. Test local access first: `http://192.168.2.125:3000`

---

## 🎉 You're Done!

Congratulations! You now have a fully functional tax preparation website running on your Unraid server.

### What You Can Do Now:
- ✅ **Access TaxCat**: `https://taxcat.yourdomain.com`
- ✅ **Create User Accounts**: Let people register and prepare taxes
- ✅ **Upload Documents**: Users can upload T4, T5 slips, etc.
- ✅ **Calculate Taxes**: Automatic tax calculations for Canadian forms
- ✅ **Secure & Encrypted**: All data is protected with SSL

### Next Steps (Optional):
1. **Add Payment Processing**: Set up Stripe for tax filing fees
2. **Email Notifications**: Configure SMTP for user emails
3. **Advanced Monitoring**: Set up Grafana dashboards
4. **User Support**: Create help documentation

### Daily Maintenance:
- Check that containers are running (Unraid Docker tab)
- Monitor disk space usage
- Review backup success
- Keep Unraid and containers updated

---

## 📞 Need Help?

If something doesn't work:

1. **Check the logs**:
   - TaxCat: `docker logs taxcat-app`
   - PostgreSQL: `docker logs postgres17`
   - Redis: `docker logs redis`

2. **Common fixes**:
   - Restart containers
   - Check file permissions
   - Verify network connectivity

3. **Get help**:
   - Check the `UNRAID-DEPLOYMENT.md` file for advanced troubleshooting
   - Search Unraid forums for similar issues
   - Check Docker documentation

**Remember**: Take it slow, double-check each step, and you'll have a working tax website! 🎯