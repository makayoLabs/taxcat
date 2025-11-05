# TaxCat + EKBooks Unraid Deployment Preparation Script
# Run this script from your Windows machine to prepare files for Unraid deployment

param(
    [Parameter(Mandatory=$true)]
    [string]$UnraidIP,
    
    [Parameter(Mandatory=$false)]
    [string]$UnraidUser = "root",
    
    [Parameter(Mandatory=$false)]
    [string]$ProjectPath = "/mnt/user/apps/taxcat-app"
)

Write-Host "TaxCat + EKBooks Unraid Deployment Preparation" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "docker-compose.unraid.yml")) {
    Write-Host "Error: docker-compose.unraid.yml not found!" -ForegroundColor Red
    Write-Host "Please run this script from the taxcat-app project directory." -ForegroundColor Yellow
        exit 1
    }
    
Write-Host "Found project files" -ForegroundColor Green

# Create necessary directories
Write-Host "Creating necessary directories..." -ForegroundColor Yellow
    $directories = @(
        "data\uploads",
        "data\logs",
        "config",
    "scripts"
    )
    
    foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -Path $dir -ItemType Directory -Force | Out-Null
        Write-Host "  Created: $dir" -ForegroundColor Cyan
    }
}

# Create environment file template
Write-Host "Creating environment configuration..." -ForegroundColor Yellow
        $envContent = @"
# ===========================================
# CORE APPLICATION CONFIGURATION
# ===========================================

# Application Environment
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NEXT_TELEMETRY_DISABLED=1

# ===========================================
# DATABASE CONFIGURATION
# ===========================================

# TaxCat Database
DATABASE_URL=postgresql://taxcat:secure_password123@$UnraidIP:5432/taxcat_prod

# EKBooks Database (if separate)
EKBOOKS_DATABASE_URL=postgresql://ekbooks:secure_password456@$UnraidIP:5432/ekbooks_prod

# Redis Configuration
REDIS_URL=redis://:your_redis_password_here@$UnraidIP:6379

# ===========================================
# APPLICATION URLs
# ===========================================

# TaxCat URLs
NEXT_PUBLIC_APP_URL=https://taxcat.yourdomain.com
NEXTAUTH_URL=https://taxcat.yourdomain.com

# EKBooks URLs
EKBOOKS_URL=https://ekbooks.ca
EKBOOKS_NEXTAUTH_URL=https://ekbooks.ca

# ===========================================
# SECURITY CONFIGURATION
# ===========================================

# Authentication Secrets (generate new ones!)
NEXTAUTH_SECRET=k1Ab2QCpVvYxdI86iFTih3OGBpbQch6hhGPhJmuOICg=
JWT_SECRET=G6FaulLEsy+U/zkttG/0x4/K9ZdTkwPn7X3gXTpybe4=
ENCRYPTION_KEY=rMYK/WMKcOsaADMeNF53s2a+olCUrx+01/hrcj02zHE=

# ===========================================
# ADMIN CONFIGURATION
# ===========================================

# TaxCat Admin
CMS_ADMIN_EMAIL=admin@taxcat.yourdomain.com
CMS_ADMIN_PASSWORD=W91+ruwroFa#uwaY#

# EKBooks Admin
EKBOOKS_ADMIN_EMAIL=admin@ekbooks.ca
EKBOOKS_ADMIN_PASSWORD=EkBooks2024!Secure

# ===========================================
# EMAIL CONFIGURATION
# ===========================================

# SMTP Settings (configure with your email provider)
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_USER=admin@yourdomain.com
SMTP_PASSWORD=your_smtp_password
BUSINESS_EMAIL=admin@yourdomain.com
NOTIFICATION_EMAIL=notifications@yourdomain.com

# ===========================================
# PAYMENT PROCESSING (Optional)
# ===========================================

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# ===========================================
# MONITORING & ANALYTICS (Optional)
# ===========================================

# Sentry Error Tracking
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# ===========================================
# FILE UPLOAD CONFIGURATION
# ===========================================

MAX_FILE_SIZE=10485760
UPLOAD_DIRECTORY=/app/uploads

# ===========================================
# RATE LIMITING
# ===========================================

RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000

# ===========================================
# LOGGING CONFIGURATION
# ===========================================

LOG_LEVEL=info
LOG_FILE_PATH=/app/logs
"@

$envContent | Out-File -FilePath ".env.production" -Encoding UTF8
Write-Host "  Created: .env.production" -ForegroundColor Cyan

# Create deployment script for Unraid
Write-Host "Creating Unraid deployment script..." -ForegroundColor Yellow
$deployScript = @"
#!/bin/bash
# TaxCat + EKBooks Unraid Deployment Script
# This script will be run on the Unraid server

set -e

echo "Starting TaxCat + EKBooks deployment on Unraid"
echo "================================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker first."
    exit 1
fi

echo "Docker is running"

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "docker-compose is not installed. Please install docker-compose first."
    exit 1
fi

echo "docker-compose is available"

# Create necessary directories
echo "Creating directories..."
mkdir -p data/uploads
mkdir -p data/logs
mkdir -p config
mkdir -p scripts

# Set proper permissions
chmod 755 data/uploads
chmod 755 data/logs
chmod 755 config
chmod 755 scripts

echo "Directories created with proper permissions"

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo ".env.production file not found!"
    echo "Please ensure you've run the Windows preparation script first."
    exit 1
fi

echo "Environment file found"

# Stop any existing containers
echo "Stopping existing containers..."
docker-compose -f docker-compose.unraid.yml down 2>/dev/null || true

# Build and start the application
echo "Building and starting application..."
docker-compose -f docker-compose.unraid.yml up -d --build

# Wait for application to start
echo "Waiting for application to start..."
sleep 30

# Check if application is running
if docker ps | grep -q "ekbooks-app"; then
    echo "Application is running!"
    echo ""
    echo "Deployment completed successfully!"
    echo ""
    echo "Access your applications:"
    echo "  TaxCat: https://taxcat.yourdomain.com"
    echo "  EKBooks: https://ekbooks.ca"
    echo "  Health Check: https://taxcat.yourdomain.com/api/health"
    echo ""
    echo "To view logs: docker logs ekbooks-app"
    echo "To restart: docker-compose -f docker-compose.unraid.yml restart"
else
    echo "Application failed to start. Check logs:"
    docker logs ekbooks-app
    exit 1
fi
"@

$deployScript | Out-File -FilePath "scripts\deploy-unraid.sh" -Encoding UTF8
Write-Host "  Created: scripts\deploy-unraid.sh" -ForegroundColor Cyan

# Create backup script
Write-Host "Creating backup script..." -ForegroundColor Yellow
$backupScript = @"
#!/bin/bash
# TaxCat + EKBooks Backup Script

BACKUP_DIR="/mnt/user/apps/taxcat-backups"
DATE=$(date +%Y%m%d_%H%M%S)

echo "Starting backup process..."

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
echo "Backing up database..."
docker exec postgres pg_dump -U taxcat taxcat_prod > "$BACKUP_DIR/database_$DATE.sql"

# Application data backup
echo "Backing up application data..."
tar -czf "$BACKUP_DIR/data_$DATE.tar.gz" data/

# Configuration backup
echo "Backing up configuration..."
tar -czf "$BACKUP_DIR/config_$DATE.tar.gz" .env.production docker-compose.unraid.yml

echo "Backup completed: $BACKUP_DIR"
echo "Files created:"
echo "  - database_$DATE.sql"
echo "  - data_$DATE.tar.gz"
echo "  - config_$DATE.tar.gz"
"@

$backupScript | Out-File -FilePath "scripts\backup-taxcat.sh" -Encoding UTF8
Write-Host "  Created: scripts\backup-taxcat.sh" -ForegroundColor Cyan

# Create file transfer instructions
Write-Host "Creating transfer instructions..." -ForegroundColor Yellow
$transferInstructions = @"
# File Transfer Instructions for Windows to Unraid

## Method 1: SCP (Recommended)
1. Open PowerShell as Administrator
2. Navigate to your project directory
3. Run the following command:

scp -r . root@${UnraidIP}:/mnt/user/apps/taxcat-app/

## Method 2: SMB Share
1. Open File Explorer
2. Navigate to: \\${UnraidIP}\apps\
3. Create folder: taxcat-app
4. Copy all project files to this folder

## Method 3: WinSCP (GUI)
1. Download and install WinSCP
2. Connect to: ${UnraidIP} as root
3. Navigate to: /mnt/user/apps/
4. Create folder: taxcat-app
5. Upload all project files

## After Transfer
1. SSH into Unraid: ssh root@${UnraidIP}
2. Navigate to: cd /mnt/user/apps/taxcat-app
3. Run: chmod +x scripts/deploy-unraid.sh
4. Run: ./scripts/deploy-unraid.sh
"@

$transferInstructions | Out-File -FilePath "TRANSFER-INSTRUCTIONS.md" -Encoding UTF8
Write-Host "  Created: TRANSFER-INSTRUCTIONS.md" -ForegroundColor Cyan

    Write-Host ""
Write-Host "Windows preparation completed!" -ForegroundColor Green
    Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review and edit .env.production with your specific values" -ForegroundColor White
Write-Host "2. Transfer files to Unraid server (see TRANSFER-INSTRUCTIONS.md)" -ForegroundColor White
Write-Host "3. SSH into Unraid and run the deployment script" -ForegroundColor White
    Write-Host ""
Write-Host "Unraid Server IP: $UnraidIP" -ForegroundColor Cyan
Write-Host "Target Path: $ProjectPath" -ForegroundColor Cyan