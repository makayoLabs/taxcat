# 📸 VISUAL STEP-BY-STEP GUIDE
## (Pictures in Words - Since I Can't Show Real Photos)

---

## 🖥️ **STEP 1: COPYING FILES TO YOUR SERVER**

### **What it looks like:**
```
Your Computer                    →                    Unraid Server
---------------                  →                  -------------
📁 taxcat-app/                   →                  📁 /mnt/user/appdata/
  ├── src/                       →                    ├── src/
  ├── package.json               →                    ├── package.json
  ├── docker-compose...          →                    ├── docker-compose...
  └── .env.production            →                    └── .env.production
```

### **Commands to type:**
```
# On your computer (Command Prompt/Terminal):
scp -r C:\Users\YourName\Desktop\taxcat-app root@192.168.2.125:/mnt/user/appdata/

# It will ask for password - type your server password
```

---

## 📧 **STEP 2: NEXTCLOUD EMAIL SETUP**

### **What Nextcloud looks like:**
```
┌─────────────────────────────────────────────────────────────┐
│ 🔗 https://nextcloud.yourdomain.com                        │
├─────────────────────────────────────────────────────────────┤
│ 👤 [Your Name] ▼              ⚙️ Settings         🚪 Logout │
├─────────────────────────────────────────────────────────────┤
│ 🏠 Files    📧 Mail    📅 Calendar    👥 Contacts    📊 │
├─────────────────────────────────────────────────────────────┤
│ 📧 MAIL SECTION:                                           │
│ ┌─────────────────────────────────────────────────────┐    │
│ │ 📧 Mail Settings                                    │    │
│ │                                                     │    │
│ │ Accounts:                                           │    │
│ │ ┌─────────────────────────────────────────────┐     │    │
│ │ │ ➕ Create account                           │     │    │
│ │ └─────────────────────────────────────────────┘     │    │
│ │                                                     │    │
│ │ Send mode: SMTP                                    │    │
│ │ Server: nextcloud-aio-mailserver                   │    │
│ │ Port: 587                                          │    │
│ │ Security: STARTTLS                                 │    │
│ │ Username: admin@ekbooks.ca                         │    │
│ │ Password: [your-password]                          │    │
│ └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### **Click Sequence:**
1. **Click** the person icon (top right) → **Settings**
2. **Click** "Administration" (left menu)
3. **Scroll down** → **Click** "Mail"
4. **Click** "Create account" button
5. **Fill in** email and password
6. **Click** "Send test email" to test

---

## 🔐 **STEP 3: AUTHENTIK SETUP**

### **What Authentik Admin looks like:**
```
┌─────────────────────────────────────────────────────────────┐
│ 🔗 https://authentik.yourdomain.com/if/admin/              │
├─────────────────────────────────────────────────────────────┤
│ 🏠 Dashboard    📱 Applications    🔧 Providers    👥 │
├─────────────────────────────────────────────────────────────┤
│ 📱 APPLICATIONS SECTION:                                  │
│ ┌─────────────────────────────────────────────────────┐    │
│ │ ➕ Create application                              │    │
│ │                                                     │    │
│ │ Name: TaxCat                                       │    │
│ │ Slug: taxcat                                       │    │
│ │ Provider: OAuth2/OpenID ▼                          │    │
│ │ Client ID: taxcat (auto-filled)                    │    │
│ │ Client Secret: [copy-this-secret!]                 │    │
│ │ Redirect URIs:                                     │    │
│ │ https://ekbooks.ca/api/auth/callback/authentik     │    │
│ │                                                     │    │
│ │ [Create] button                                    │    │
│ └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### **Click Sequence:**
1. **Login** to Authentik admin
2. **Click** "Applications" (left menu)
3. **Click** the blue "+" button
4. **Fill in** the form as shown above
5. **Copy** the Client Secret (very important!)
6. **Click** "Create"

---

## ⚙️ **STEP 4: EDITING FILES ON SERVER**

### **What the terminal looks like:**
```
root@unraid-server:~# cd /mnt/user/appdata/taxcat
root@unraid-server:/mnt/user/appdata/taxcat# nano .env.production

┌─────────────────────────────────────────────────────────────┐
│ File: .env.production                                      │
│                                                             │
│ # Authentik OAuth                                          │
│ AUTHENTIK_CLIENT_ID="taxcat"                               │
│ AUTHENTIK_CLIENT_SECRET="paste-your-secret-here"          │
│ AUTHENTIK_ISSUER="https://authentik.yourdomain.com/..."    │
│                                                             │
│ # Email Configuration                                      │
│ NEXTCLOUD_MAIL_PASSWORD="your-email-password"              │
│                                                             │
│ # Website URL                                              │
│ NEXTAUTH_URL="https://ekbooks.ca"                          │
│                                                             │
│ ^G Get Help  ^O Write Out  ^R Read File  ^Y Prev Page      │
│ ^X Exit     ^J Justify    ^W Where Is   ^V Next Page      │
└─────────────────────────────────────────────────────────────┘
```

### **How to edit:**
1. Use arrow keys to move cursor
2. Type to change text
3. **Ctrl+X** to exit
4. **Y** to save
5. **Enter** to confirm

---

## 🚀 **STEP 5: RUNNING THE DEPLOYMENT**

### **What the deployment looks like:**
```
root@unraid-server:/mnt/user/appdata/taxcat# ./deploy-unraid-complete.sh

🔍 Running pre-deployment checks...
✅ Pre-deployment checks passed

💾 Creating backup of existing deployment...
✅ Backup completed

🔧 Setting up environment...
✅ Environment setup completed

🚀 Deploying services...
Starting mail services...
Starting main application...
✅ Services deployed successfully

🔍 Verifying deployment...
✅ Application health check passed
✅ Website is accessible

🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!

📋 Next Steps:
1. Configure Authentik application ✓
2. Set up Nextcloud email accounts ✓
3. Update DNS records
4. Test authentication flow
5. Test contact forms and email functionality
```

### **What happens during deployment:**
```
🐳 Docker Containers Starting:
├── nextcloud-aio-mailserver  [Starting...]
├── ekbooks-app              [Starting...]
├── postgresql17             [Already running]
├── redis                    [Already running]
├── authentik-server         [Already running]
└── traefik                  [Already running]
```

---

## ✅ **STEP 6: TESTING EVERYTHING**

### **What success looks like:**

#### **Website Test:**
```
🌐 Browser: https://ekbooks.ca
┌─────────────────────────────────────────────────────────────┐
│ 🏠 EKBooks - Professional Accounting Services             │
│                                                           │
│ Welcome to EKBooks!                                       │
│ Professional tax and accounting services...              │
│                                                           │
│ [Get Started Today]  [Our Services]                       │
│                                                           │
│ ✅ SSL Certificate: Valid (🔒)                           │
│ ✅ Domain: ekbooks.ca (🌍)                               │
└─────────────────────────────────────────────────────────────┘
```

#### **Login Test:**
```
1. Click "Login" button
2. Redirect to: https://authentik.yourdomain.com
3. Enter username/password
4. Redirect back to: https://ekbooks.ca/dashboard
5. Shows: "Welcome to TaxCat!"
```

#### **Email Test:**
```
📧 Contact Form Submission:
┌─────────────────────────────────────────────────────────────┐
│ To: admin@ekbooks.ca                                       │
│ Subject: New Contact Form Submission from John Doe        │
│                                                           │
│ Name: John Doe                                           │
│ Email: john@example.com                                  │
│ Message: I need help with my taxes...                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 **TROUBLESHOOTING VISUAL GUIDE**

### **Check if everything is running:**
```
root@unraid-server:~# docker ps

CONTAINER ID   IMAGE                          STATUS         NAMES
a1b2c3d4e5f6   taxcat-app:latest              Up 5 minutes   ekbooks-app
f6e5d4c3b2a1   nextcloud/aio-mailserver       Up 5 minutes   nextcloud-aio-mailserver
2b3c4d5e6f7a   authentik-server               Up 2 hours     authentik-server
7a8b9c0d1e2f   traefik:latest                 Up 2 hours     traefik
```

### **Check logs if something's wrong:**
```
# Main app logs:
docker logs ekbooks-app

# Email logs:
docker logs nextcloud-aio-mailserver

# Authentication logs:
docker logs authentik-server

# Web traffic logs:
docker logs traefik
```

### **Common problems and solutions:**

#### **Problem: Website shows "Connection Refused"**
```
🔍 Check: docker ps | grep ekbooks-app
🔧 Fix: docker-compose -f docker-compose.unraid.yml restart
```

#### **Problem: Can't login**
```
🔍 Check: docker logs authentik-server
🔧 Fix: Verify client secret in .env.production
```

#### **Problem: Emails not sending**
```
🔍 Check: docker logs nextcloud-aio-mailserver
🔧 Fix: Verify SMTP password in Nextcloud settings
```

---

## 🎯 **FINAL RESULT VISUAL**

### **What you'll have:**
```
🌐 Internet
    ↓
🔒 Traefik (SSL, Security, Routing)
    ↓
🔐 Authentik (Login System)
    ↓
📧 Nextcloud (Email & Files)
    ↓
💼 TaxCat App (Your Website)
    ├── 🏠 Marketing Pages
    ├── 📊 Tax Filing App
    ├── 📧 Contact Forms
    └── 👥 Client Dashboard
```

### **Daily Management:**
```
📊 Check Status: ./health-check.sh
💾 Backup Data: ./scripts/backup-taxcat.sh
📝 View Logs: docker logs ekbooks-app
🔄 Update App: docker-compose pull && docker-compose up -d
```

---

## 📞 **GETTING HELP**

### **If you get stuck:**
1. **Check the logs** (commands above)
2. **Verify passwords** are copied correctly
3. **Check domain names** are right
4. **Make sure services are running** (`docker ps`)

### **Helpful commands:**
```
# See all running containers
docker ps

# Restart everything
cd /mnt/user/appdata/taxcat
docker-compose -f docker-compose.unraid.yml restart

# Check disk space
df -h

# Check memory usage
free -h
```

### **Who to ask for help:**
- **Server issues**: Check Unraid forums
- **Nextcloud issues**: Nextcloud documentation
- **Authentik issues**: Authentik GitHub
- **TaxCat issues**: The deployment logs

---

## 🎉 **SUCCESS CHECKLIST**

- [ ] Can access https://ekbooks.ca
- [ ] SSL certificate shows lock icon
- [ ] Can login with Authentik
- [ ] Contact form sends emails
- [ ] Tax filing app works
- [ ] All services show "Up" in docker ps

**When all boxes are checked: CONGRATULATIONS!** 🎊

You now have a professional accounting website that big companies would be proud of! Share your success with friends and start helping clients with their taxes.

**Remember: You built this!** 💪🚀