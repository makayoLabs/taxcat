# 🚀 TAXCAT DEPLOYMENT: MORNING COFFEE GUIDE
## (Super Simple - Just Read & Click - No Thinking Required)

---

## ☕ **GOOD MORNING! READY FOR YOUR COFFEE BREAK PROJECT?**

This guide is written for someone doing this during work - super simple, step-by-step, with ZERO thinking required. Just read each line and do exactly what it says.

**Time needed: 30-45 minutes**
**Skill level: Can use a computer and follow recipes**

---

## 📋 **BEFORE YOU START: YOUR INFO**

### **Write these down on a piece of paper:**
- Your server IP: `192.168.2.125` (your Unraid server)
- Your domains: `makayohub.com`, `ekbooks.ca`, `taxcat.ca`
- Your Cloudflare tunnel is already set up ✅
- You have Nextcloud running ✅
- You have Authentik running ✅

### **What you'll have when done:**
- `https://ekbooks.ca` - Your professional website
- `https://taxcat.ca` - Your tax app (if you want it separate)
- Business email: `admin@ekbooks.ca`
- Login system that works

---

## 🏠 **STEP 1: COPY FILES TO YOUR SERVER**
*(Like copying homework from school computer to home computer)*

### **Step 1A: Find your TaxCat folder**
1. On your **work computer**, open **File Explorer**
2. Go to where you saved the `taxcat-app` folder
3. **Right-click** the `taxcat-app` folder
4. Click **"Copy"**

### **Step 1B: Open Command Window**
1. Press **Windows key + R**
2. Type `cmd` and press **Enter**
3. You should see a black window with `C:\Users\YourName>`

### **Step 1C: Copy the files**
1. In the black window, type this (replace `C:\path\to\taxcat-app` with your actual path):
   ```
   scp -r C:\Users\YourName\Desktop\taxcat-app root@192.168.2.125:/mnt/user/appdata/
   ```
2. Press **Enter**
3. When it asks for password, type your **server root password**
4. Press **Enter**
5. Wait for it to finish (you'll see progress)

### **Step 1D: Check files copied**
1. In the same black window, type:
   ```
   ssh root@192.168.2.125
   ```
2. Type your password again
3. Type: `ls -la /mnt/user/appdata/taxcat`
4. You should see lots of files. If you do, great! ✅

---

## 📧 **STEP 2: SET UP BUSINESS EMAIL**
*(Like setting up your work email)*

### **Step 2A: Open Nextcloud**
1. Open your **web browser** (Chrome, Firefox, Edge)
2. In the address bar, type: `https://makayohub.com` (or your Nextcloud URL)
3. Press **Enter**
4. Login with your **Nextcloud admin username and password**

### **Step 2B: Go to Settings**
1. Look at the **top right corner** of the screen
2. Click the **person icon** (👤)
3. Click **"Settings"** from the dropdown menu

### **Step 2C: Go to Mail Settings**
1. In the left menu, scroll down
2. Click **"Administration"**
3. Scroll down more
4. Click **"Mail"**

### **Step 2D: Create First Email Account**
1. Find the section called **"Accounts"**
2. Click the **blue "Create account"** button
3. Fill in these exact fields:
   - **Email**: `admin@ekbooks.ca`
   - **Display name**: `EKBooks Admin`
   - **Password**: Make up a strong password (like `MySecurePass123!`)
4. Click the **"Create"** button

### **Step 2E: Create Second Email Account**
1. Click **"Create account"** again
2. Fill in:
   - **Email**: `notifications@ekbooks.ca`
   - **Display name**: `EKBooks Notifications`
   - **Password**: Make up another password
3. Click **"Create"** button

### **Step 2F: Set Up Email Sending**
1. Find **"Send mode"** section
2. Change it to **"SMTP"**
3. Fill in these settings:
   - **Server**: `nextcloud-aio-mailserver`
   - **Port**: `587`
   - **Security**: `STARTTLS`
   - **Authentication**: `Login`
   - **Username**: `admin@ekbooks.ca`
   - **Password**: (the password you just created for admin)
4. Click **"Save"**

### **Step 2G: Test Email**
1. Find **"Send test email"** section
2. In the **"To"** field, put your **personal email address**
3. Click **"Send"**
4. Check your personal email - you should get a test message!

---

## 🔐 **STEP 3: SET UP LOGIN SYSTEM**
*(Like setting up a new work account)*

### **Step 3A: Open Authentik**
1. Open a **new browser tab**
2. In address bar, type: `https://makayohub.com/auth` (or your Authentik URL)
3. Press **Enter**
4. Login with your **Authentik admin username and password**

### **Step 3B: Go to Applications**
1. In the left menu, click **"Applications"**
2. Click the **blue "+" button** to create new application

### **Step 3C: Fill Application Details**
1. **Name**: Type `TaxCat`
2. **Slug**: Type `taxcat`
3. **Provider**: Click the dropdown and choose **"OAuth2/OpenID"**
4. **Client ID**: It should auto-fill as `taxcat`
5. **Client Secret**: (Copy this secret - it's a long random string!)
6. **Redirect URIs**: Type `https://ekbooks.ca/api/auth/callback/authentik`
7. Click **"Create"**

### **Step 3D: Create User Groups (Optional)**
1. In left menu, click **"Directory"** → **"Groups"**
2. Click **"Create"**
3. **Name**: `taxcat-users`
4. Click **"Create"**
5. Repeat for `taxcat-admins` and `ekbooks-clients`

---

## 🌐 **STEP 4: SET UP CLOUDFLARE TUNNEL**
*(Since you already have this set up, just add the domains)*

### **Step 4A: Go to Cloudflare Dashboard**
1. Open browser, go to: `https://dash.cloudflare.com`
2. Login to your Cloudflare account

### **Step 4B: Go to Tunnels**
1. In left menu, click **"Zero Trust"**
2. Click **"Networks"** → **"Tunnels"**
3. Find your **makayohub tunnel**
4. Click on it

### **Step 4C: Add Routes for Domains**
1. Click **"Add a route"**
2. For **ekbooks.ca**:
   - **Domain**: `ekbooks.ca`
   - **Service**: `http://ekbooks-app:3000`
3. Click **"Save route"**

4. Add another route for **taxcat.ca** (if you want it separate):
   - **Domain**: `taxcat.ca`
   - **Service**: `http://ekbooks-app:3000`
5. Click **"Save route"**

### **Step 4D: Update DNS**
1. In Cloudflare, go to **"DNS"** section
2. For **ekbooks.ca**:
   - Add **CNAME record**
   - **Name**: `ekbooks.ca`
   - **Target**: `makayohub.com`
3. For **taxcat.ca** (if using):
   - Add **CNAME record**
   - **Name**: `taxcat.ca`
   - **Target**: `makayohub.com`

---

## ⚙️ **STEP 5: SET UP PASSWORDS AND SETTINGS**
*(Like filling out a form)*

### **Step 5A: Open Settings File**
1. Go back to your **SSH terminal** (the black window)
2. Type: `cd /mnt/user/appdata/taxcat`
3. Type: `nano .env.production`

### **Step 5B: Update the Settings**
Find these lines and change them:

```
# Authentik settings
AUTHENTIK_CLIENT_SECRET="paste-the-secret-you-copied-from-authentik-here"

# Email settings
NEXTCLOUD_MAIL_PASSWORD="the-admin-password-you-created-in-nextcloud"

# Website URL
NEXTAUTH_URL="https://ekbooks.ca"
```

### **Step 5C: Save and Exit**
1. Press **Ctrl + X** (hold Ctrl, press X)
2. Press **Y** to save
3. Press **Enter** to confirm

---

## 🚀 **STEP 6: DEPLOY EVERYTHING**
*(The magic button that does all the work)*

### **Step 6A: Make Script Executable**
1. In SSH terminal, type: `chmod +x deploy-unraid-complete.sh`

### **Step 6B: Run the Deployment**
1. Type: `./deploy-unraid-complete.sh`
2. Press **Enter**
3. Watch the messages scroll by
4. When it asks **"Start monitoring services?"**, type `y` and press **Enter**
5. Wait 2-3 minutes
6. When you see **"DEPLOYMENT COMPLETED SUCCESSFULLY!"**, it's done! 🎉

---

## ✅ **STEP 7: TEST EVERYTHING WORKS**
*(Like quality control at work)*

### **Test 7A: Check Website**
1. Open browser
2. Go to: `https://ekbooks.ca`
3. You should see the EKBooks website with professional design

### **Test 7B: Test Login**
1. On the website, find the **"Login"** button
2. Click it
3. You should go to Authentik login page
4. Login with your Authentik credentials
5. You should return to the TaxCat dashboard

### **Test 7C: Test Contact Form**
1. Find the **contact form** on the website
2. Fill it out with test information:
   - Name: `Test User`
   - Email: `test@example.com`
   - Message: `This is a test message`
3. Click **"Submit"**
4. Check `admin@ekbooks.ca` email - you should get the message!

### **Test 7D: Test Tax Filing**
1. Login to the app
2. Try to **"Start New Tax Return"**
3. Fill out basic information
4. Make sure it saves without errors

### **Test 7E: Test Professional Documents**
1. Go to **"Documents"** section
2. Try downloading different templates:
   - CVITP Engagement Letter
   - Privacy Policy
   - Client Document Checklist
   - T183 Consent Form
   - Professional Invoice Template
3. Verify files download correctly

---

## 🔧 **IF SOMETHING GOES WRONG**

### **Check if Services are Running**
1. In SSH terminal, type:
   ```
   docker ps | grep -E "(ekbooks|taxcat|nextcloud|authentik)"
   ```
2. You should see several lines with "Up" status

### **Check Logs**
1. For main app: `docker logs ekbooks-app`
2. For email: `docker logs nextcloud-aio-mailserver`
3. For auth: `docker logs authentik-server`

### **Restart Everything**
1. `cd /mnt/user/appdata/taxcat`
2. `docker-compose -f docker-compose.unraid.yml restart`

### **Common Issues:**
- **"Can't login"**: Check Authentik client secret in `.env.production`
- **"Emails not working"**: Check Nextcloud SMTP password
- **"Website not loading"**: Check Cloudflare tunnel routes

---

## 🎯 **SUCCESS CHECKLIST**

- [ ] Files copied to server ✅
- [ ] Nextcloud email accounts created ✅
- [ ] Authentik application created ✅
- [ ] Cloudflare routes added ✅
- [ ] Environment variables updated ✅
- [ ] Deployment script ran successfully ✅
- [ ] Website loads at https://ekbooks.ca ✅
- [ ] Login works ✅
- [ ] Contact form sends emails ✅
- [ ] Tax filing works ✅

---

## 📊 **DAILY OPERATIONS**

### **Check Status:**
```bash
cd /mnt/user/appdata/taxcat
./health-check.sh
```

### **Backup Data:**
```bash
./scripts/backup-taxcat.sh
```

### **View Logs:**
```bash
docker logs ekbooks-app
```

### **Update App:**
```bash
docker-compose -f docker-compose.unraid.yml pull
docker-compose -f docker-compose.unraid.yml up -d
```

---

## 🎉 **CONGRATULATIONS!**

You now have:
- ✅ **Professional website** at `https://ekbooks.ca`
- ✅ **Tax filing application** for your clients
- ✅ **Business email system** with `admin@ekbooks.ca`
- ✅ **Secure login** with Authentik
- ✅ **Cloudflare protection** and SSL

**You built a complete professional accounting platform!** 🚀

**Share `https://ekbooks.ca` with your clients and start helping them with their taxes!**

---

*P.S. If you follow this guide step-by-step during your coffee break, you'll have everything working perfectly. Each step is designed to take 2-5 minutes, so the whole process should fit nicely into your morning routine!* ☕⏰