# 🐱 TaxCat - Unraid Deployment Quick Start

## ⚡ Quick Start (5 Minutes)

### Step 1: Prepare on Windows
```powershell
# Run the PowerShell preparation script
.\install-unraid.ps1 -UnraidIP YOUR-UNRAID-IP
```

### Step 2: Transfer to Unraid
1. Copy the entire `taxcat-app` folder to `/mnt/user/apps/` on your Unraid server
2. Use SMB share or SCP to transfer files

### Step 3: Deploy on Unraid
```bash
# SSH into Unraid
ssh root@YOUR-UNRAID-IP

# Navigate to project
cd /mnt/user/apps/taxcat-app

# Run installation
chmod +x install-unraid.sh
./install-unraid.sh
```

### Step 4: Access TaxCat
- **Main App**: http://YOUR-UNRAID-IP:3000
- **Health Check**: http://YOUR-UNRAID-IP:3000/api/health

## 🗂️ File Structure After Setup

```
taxcat-app/
├── 🔧 Configuration
│   ├── .env.local                    # Environment variables
│   ├── docker-compose.unraid.yml     # Docker services config
│   └── Dockerfile.unraid            # Optimized container
├── 📁 Nginx (Optional)
│   └── nginx.conf                   # Reverse proxy config
├── 📦 Scripts
│   ├── install-unraid.sh            # Linux installation
│   └── install-unraid.ps1           # Windows preparation
├── 📊 Data Persistence
│   └── data/                        # Uploads, logs, configs
└── 📋 Documentation
    ├── DEPLOYMENT.md                # Detailed deployment guide
    └── README-UNRAID.md             # This quick start
```

## 🔧 Configuration Options

### Basic Configuration (.env.local)
```bash
# Update these values for production
NEXT_PUBLIC_APP_URL=http://YOUR-UNRAID-IP:3000
CMS_ADMIN_PASSWORD=your_secure_password
DATABASE_PASSWORD=secure_db_password
```

### Security Considerations
- ✅ Change default passwords
- ✅ Use HTTPS in production (setup reverse proxy)
- ✅ Regular database backups
- ✅ Monitor application logs

## 📊 Service Management

### Check Status
```bash
docker-compose -f docker-compose.unraid.yml ps
```

### View Logs
```bash
# All services
docker-compose -f docker-compose.unraid.yml logs -f

# Specific service
docker-compose -f docker-compose.unraid.yml logs -f taxcat-app
```

### Restart Services
```bash
docker-compose -f docker-compose.unraid.yml restart
```

### Stop All Services
```bash
docker-compose -f docker-compose.unraid.yml down
```

## 🆘 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Check what's using port 3000
netstat -tulpn | grep :3000
# Kill the process or change port in compose file
```

**Database Connection Issues**
```bash
# Check PostgreSQL container
docker-compose logs postgres
# Ensure DATABASE_URL is correct
```

**Application Won't Start**
```bash
# Check application logs
docker-compose logs taxcat-app
# Verify all environment variables are set
```

### Getting Help
1. Check application logs: `docker-compose logs taxcat-app`
2. Verify environment configuration
3. Ensure Docker and Docker Compose are updated
4. Check Unraid Docker configuration

## 🎯 What TaxCat Provides

### Core Features
- ✅ **Tax Return Management** - Individual and corporate tax filing
- ✅ **Document Upload** - Secure file storage and management  
- ✅ **User Authentication** - Secure login and registration
- ✅ **CMS System** - Content management for website pages
- ✅ **Payment Processing** - Stripe integration for services
- ✅ **API Endpoints** - RESTful API for all functionality

### Admin Features
- 🔐 **Admin Dashboard** - Management interface
- 📊 **User Management** - Customer account oversight  
- 📄 **Tax Return Review** - Staff review and approval
- 💳 **Payment Processing** - Transaction management
- 📈 **Analytics** - Usage and performance metrics

## 🔄 Updates and Maintenance

### Update Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Backup Database
```bash
docker-compose exec postgres pg_dump -U taxcat_user taxcat_prod > backup-$(date +%Y%m%d).sql
```

### Restore Database
```bash
docker-compose exec -T postgres psql -U taxcat_user taxcat_prod < backup-YYYYMMDD.sql
```

---

## 🎉 Success!

**TaxCat is now running on your Unraid server!**

Access your application at: **http://YOUR-UNRAID-IP:3000**

Need help? Check the detailed [DEPLOYMENT.md](DEPLOYMENT.md) guide for comprehensive instructions.
