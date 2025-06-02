# 🚀 TaxCat Website Deployment Guide for Unraid

Complete guide to deploy your TaxCat website on Unraid server with `taxcat.ca` domain.

## 📋 Prerequisites

### Unraid Server Requirements
- Unraid 6.9+ with Docker support enabled
- Community Applications plugin installed
- At least 2GB RAM available for the container
- Port 9847 available or reverse proxy setup

### Domain Setup
- Domain: `taxcat.ca` 
- DNS access to configure A records
- SSL certificate (automatically handled if using reverse proxy)

## 🏗️ Deployment Options

### Option 1: Using Reverse Proxy (Recommended)

This method uses Nginx Proxy Manager or Traefik for SSL and domain management.

#### Step 1: Install Reverse Proxy
1. **Install Nginx Proxy Manager** from Community Applications
2. Configure it with ports:
   - Admin Port: `81`
   - HTTP Port: `80` 
   - HTTPS Port: `443`

#### Step 2: Deploy TaxCat Website
1. **Create Docker Container** in Unraid:
   ```bash
   Container Name: taxcat-website
   Repository: your-dockerhub-username/taxcat-website:latest
   Network Type: Bridge
   Port Mappings:
     - Container Port: 3000
     - Host Port: 9847 (obscure port to avoid conflicts)
   ```

2. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=3000
   HOSTNAME=0.0.0.0
   ```

#### Step 3: Configure Domain in Nginx Proxy Manager
1. Access NPM admin panel: `http://your-unraid-ip:81`
2. Add Proxy Host:
   - **Domain:** `taxcat.ca`
   - **Forward Hostname/IP:** `your-unraid-ip`
   - **Forward Port:** `9847`
   - **Enable SSL:** Yes (Let's Encrypt)
   - **Force SSL:** Yes

### Option 2: Direct Port Mapping (Simple)

#### Step 1: Configure DNS
Point your domain to your Unraid server:
```
A Record: taxcat.ca → your-public-ip
A Record: www.taxcat.ca → your-public-ip
```

#### Step 2: Port Forwarding
Forward ports on your router:
- Port 80 → Unraid IP:9847
- Port 443 → Unraid IP:9847 (if using SSL)

#### Step 3: Deploy Container
```bash
Container Name: taxcat-website
Repository: your-dockerhub-username/taxcat-website:latest
Network Type: Bridge
Port Mappings:
  - Container Port: 3000
  - Host Port: 9847
```

## 🐳 Building and Deploying with Docker

### Method 1: Build on Unraid (Recommended)

1. **Upload Project Files**
   ```bash
   # Copy project to Unraid share (e.g., /mnt/user/appdata/taxcat)
   # Use Unraid SMB share or SCP
   ```

2. **Build Docker Image**
   ```bash
   # SSH into Unraid
   cd /mnt/user/appdata/taxcat
   docker build -t taxcat-website .
   ```

3. **Run Container**
   ```bash
   docker run -d \
     --name taxcat-website \
     --restart unless-stopped \
     -p 9847:3000 \
     -e NODE_ENV=production \
     taxcat-website
   ```

### Method 2: Build Locally and Push

1. **Build and Push to Docker Hub**
   ```bash
   # On your local machine
   docker build -t your-username/taxcat-website:latest .
   docker push your-username/taxcat-website:latest
   ```

2. **Pull and Run on Unraid**
   ```bash
   # SSH into Unraid
   docker pull your-username/taxcat-website:latest
   docker run -d \
     --name taxcat-website \
     --restart unless-stopped \
     -p 9847:3000 \
     your-username/taxcat-website:latest
   ```

## 🔧 Unraid Docker Template

Create a custom template for easy deployment:

```xml
<?xml version="1.0"?>
<Container version="2">
  <Name>TaxCat-Website</Name>
  <Repository>your-username/taxcat-website:latest</Repository>
  <Registry>https://hub.docker.com/</Registry>
  <Network>bridge</Network>
  <MyIP/>
  <Shell>sh</Shell>
  <Privileged>false</Privileged>
  <Support>https://github.com/your-repo/taxcat-app</Support>
  <Project>https://taxcat.ca</Project>
  <Overview>Professional Tax Advisory Website for TaxCat</Overview>
  <Category>Productivity:</Category>
  <WebUI>http://[IP]:[PORT:9847]</WebUI>
  <TemplateURL/>
  <Icon>https://via.placeholder.com/64x64/1e3a8a/ffffff?text=🐱</Icon>
  <ExtraParams/>
  <PostArgs/>
  <CPUset/>
  <DateInstalled>1234567890</DateInstalled>
  <DonateText/>
  <DonateLink/>
  <Description>TaxCat Professional Tax Advisory Website - Clean, modern website for Canadian tax preparation services.</Description>
  <Networking>
    <Mode>bridge</Mode>
    <Publish>
      <Port>
        <HostPort>9847</HostPort>
        <ContainerPort>3000</ContainerPort>
        <Protocol>tcp</Protocol>
      </Port>
    </Publish>
  </Networking>
  <Data/>
  <Environment>
    <Variable>
      <Value>production</Value>
      <Name>NODE_ENV</Name>
      <Mode/>
    </Variable>
    <Variable>
      <Value>3000</Value>
      <Name>PORT</Name>
      <Mode/>
    </Variable>
  </Environment>
  <Labels/>
  <Config Name="WebUI Port" Target="3000" Default="9847" Mode="tcp" Description="Web interface port" Type="Port" Display="always" Required="true" Mask="false">9847</Config>
  <Config Name="Environment" Target="NODE_ENV" Default="production" Mode="" Description="Node environment" Type="Variable" Display="always" Required="true" Mask="false">production</Config>
</Container>
```

## 🌐 DNS Configuration

### Configure DNS Records
1. **Access your domain registrar** (e.g., Namecheap, GoDaddy, Cloudflare)
2. **Add A Records:**
   ```
   Type: A
   Name: @
   Value: your-public-ip
   TTL: 300

   Type: A  
   Name: www
   Value: your-public-ip
   TTL: 300
   ```

### Using Cloudflare (Recommended)
1. **Add domain to Cloudflare**
2. **Configure DNS:**
   - `A` record: `taxcat.ca` → `your-public-ip`
   - `CNAME` record: `www` → `taxcat.ca`
3. **Enable proxy (orange cloud)** for DDoS protection
4. **SSL/TLS setting:** Full (Strict)

## 🔒 SSL Certificate Setup

### Option 1: Automatic SSL (with Reverse Proxy)
- Nginx Proxy Manager automatically handles Let's Encrypt certificates
- Certificates auto-renew every 90 days

### Option 2: Cloudflare SSL
- Enable SSL in Cloudflare dashboard
- Use "Full (Strict)" SSL mode
- Automatic certificate management

### Option 3: Manual Let's Encrypt
```bash
# Install certbot on Unraid
docker run -it --rm \
  -v /mnt/user/appdata/letsencrypt:/etc/letsencrypt \
  certbot/certbot certonly --standalone \
  -d taxcat.ca -d www.taxcat.ca
```

## 📊 Monitoring and Maintenance

### Health Checks
Add health check to docker-compose:
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Monitoring Tools
1. **Unraid Docker tab** - Monitor container status
2. **Nginx Proxy Manager logs** - Check access logs
3. **Uptime monitoring** - Use UptimeRobot or similar

### Backup Strategy
```bash
# Backup Docker image
docker save taxcat-website > /mnt/user/backups/taxcat-website.tar

# Backup configuration
cp -r /mnt/user/appdata/taxcat /mnt/user/backups/
```

## 🚨 Troubleshooting

### Common Issues

1. **Container won't start:**
   ```bash
   docker logs taxcat-website
   ```

2. **Domain not resolving:**
   - Check DNS propagation: `nslookup taxcat.ca`
   - Verify A records point to correct IP
   - Wait for DNS propagation (up to 48 hours)

3. **SSL certificate issues:**
   - Check Nginx Proxy Manager logs
   - Verify domain ownership
   - Ensure ports 80/443 are open

4. **Website not loading:**
   - Verify container is running: `docker ps`
   - Check port mappings
   - Test local access: `http://unraid-ip:9847`

### Performance Optimization

1. **Enable Gzip compression** in reverse proxy
2. **Set up CDN** with Cloudflare
3. **Monitor resource usage** in Unraid
4. **Optimize images** for faster loading

## 📞 Support

For deployment issues:
1. Check Unraid community forums
2. Review Docker container logs
3. Verify network connectivity
4. Test DNS resolution

---

**Your TaxCat website will be live at https://taxcat.ca once deployment is complete!** 🎉 