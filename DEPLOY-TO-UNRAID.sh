#!/bin/bash

# EKBooks + TaxCat Deployment Script for Unraid
# This script transfers the integrated application to your Unraid server

set -e

# Configuration - UPDATED FOR YOUR SERVER
UNRAID_IP="192.168.2.125"
UNRAID_USER="root"
PROJECT_NAME="ekbooks-website"
REMOTE_PATH="/mnt/user/appdata/${PROJECT_NAME}"
DOMAIN_NAME="ekbooks.ca"
SERVER_DOMAIN="makayohub.com"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

success() {
    echo -e "${GREEN}✓ $1${NC}"
}

error() {
    echo -e "${RED}✗ $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if we're in the right directory
check_directory() {
    if [[ ! -d "../ekbooks-website" ]]; then
        error "EKBooks website directory not found. Please run this script from the taxcat-app directory."
    fi
    success "Found EKBooks website directory"
}

# Check SSH connection
check_ssh_connection() {
    log "Testing SSH connection to Unraid server..."

    if ! ssh -i ~/.ssh/id_rsa_unraid -o ConnectTimeout=10 -o BatchMode=yes "${UNRAID_USER}@${UNRAID_IP}" "echo 'SSH connection successful'" >/dev/null 2>&1; then
        error "Cannot connect to Unraid server via SSH. Please ensure:"
        echo "  1. SSH is enabled on your Unraid server"
        echo "  2. Your SSH key is added to authorized_keys on the server"
        echo "  3. The username '${UNRAID_USER}' has SSH access"
        echo ""
        echo "To set up SSH key authentication:"
        echo "  1. Generate SSH key: ssh-keygen -t rsa -b 4096"
        echo "  2. Copy to Unraid: ssh-copy-id ${UNRAID_USER}@${UNRAID_IP}"
        exit 1
    fi

    success "SSH connection verified"
}

# Create backup of existing deployment
create_backup() {
    log "Checking for existing deployment..."

    if ssh -i ~/.ssh/id_rsa_unraid "${UNRAID_USER}@${UNRAID_IP}" "[ -d '${REMOTE_PATH}' ]"; then
        warning "Existing deployment found. Creating backup..."

        ssh -i ~/.ssh/id_rsa_unraid "${UNRAID_USER}@${UNRAID_IP}" "
            if [ -d '${REMOTE_PATH}' ]; then
                BACKUP_NAME='${PROJECT_NAME}_backup_$(date +%Y%m%d_%H%M%S)'
                mv '${REMOTE_PATH}' '/mnt/user/appdata/${BACKUP_NAME}'
                echo 'Backup created: /mnt/user/appdata/${BACKUP_NAME}'
            fi
        "

        success "Backup created on Unraid server"
    else
        success "No existing deployment found"
    fi
}

# Transfer files to Unraid
transfer_files() {
    log "Transferring EKBooks + TaxCat application to Unraid server..."

    # Use rsync for efficient transfer with progress
    if command -v rsync >/dev/null 2>&1; then
        rsync -avz --delete --progress \
            -e "ssh -i ~/.ssh/id_rsa_unraid" \
            --exclude='node_modules' \
            --exclude='.next' \
            --exclude='.git' \
            "../ekbooks-website/" \
            "${UNRAID_USER}@${UNRAID_IP}:${REMOTE_PATH}/"
    else
        # Fallback to scp
        scp -i ~/.ssh/id_rsa_unraid -r "../ekbooks-website" "${UNRAID_USER}@${UNRAID_IP}:${REMOTE_PATH}"
    fi

    success "Application transferred successfully"
}

# Set up permissions and prepare for deployment
setup_permissions() {
    log "Setting up permissions on Unraid server..."

    ssh -i ~/.ssh/id_rsa_unraid "${UNRAID_USER}@${UNRAID_IP}" "
        cd '${REMOTE_PATH}'

        # Make scripts executable
        chmod +x scripts/deploy-unraid.sh
        chmod +x scripts/backup-taxcat.sh

        # Create necessary directories
        mkdir -p data/uploads
        mkdir -p data/logs
        mkdir -p config

        # Set proper permissions
        chown -R nobody:users '${REMOTE_PATH}'

        echo 'Permissions and directories set up'
    "

    success "Permissions configured"
}

# Generate production environment file
generate_env() {
    log "Generating production environment configuration..."

    # Generate secure secrets
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    JWT_SECRET=$(openssl rand -base64 32)
    ENCRYPTION_KEY=$(openssl rand -base64 32)

    # Create environment file on Unraid
    ssh -i ~/.ssh/id_rsa_unraid "${UNRAID_USER}@${UNRAID_IP}" "
        cat > '${REMOTE_PATH}/.env.production' << EOF
# EKBooks + TaxCat Production Environment
# Generated on $(date)

# Database Configuration (PostgreSQL 17)
DATABASE_URL=\"postgresql://taxcat:secure_password123@${UNRAID_IP}:5432/taxcat_prod\"

# Next Auth Configuration
NEXTAUTH_URL=\"https://ekbooks.ca\"
NEXTAUTH_SECRET=\"${NEXTAUTH_SECRET}\"

# JWT Configuration
JWT_SECRET=\"${JWT_SECRET}\"

# Application Configuration
NODE_ENV=\"production\"
PORT=\"3000\"
HOSTNAME=\"0.0.0.0\"
NEXT_PUBLIC_APP_URL=\"https://ekbooks.ca\"
NEXT_PUBLIC_SITE_URL=\"https://ekbooks.ca\"

# CMS Configuration
CMS_ADMIN_EMAIL=\"admin@ekbooks.ca\"
CMS_ADMIN_PASSWORD=\"secure_admin_password_123\"

# Security Configuration
ENCRYPTION_KEY=\"${ENCRYPTION_KEY}\"
RATE_LIMIT_MAX=\"100\"

# Logging Configuration
LOG_LEVEL=\"info\"
LOG_FILE_PATH=\"/app/logs\"

# File Upload Configuration
MAX_FILE_SIZE=\"10485760\"
UPLOAD_DIRECTORY=\"/app/uploads\"

# Redis Configuration
REDIS_URL=\"redis://:redis_password_123@${UNRAID_IP}:6379\"

# Authentik Configuration (configure these after deployment)
AUTHENTIK_URL=\"https://${SERVER_DOMAIN}/auth\"
AUTHENTIK_CLIENT_ID=\"ekbooks-client\"  # You'll create this OAuth2 provider in Authentik
AUTHENTIK_CLIENT_SECRET=\"your-authentik-secret-here\"  # Replace with your actual secret from Authentik

# Optional Services (configure as needed)
STRIPE_SECRET_KEY=\"\"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\"\"
STRIPE_WEBHOOK_SECRET=\"\"

# Email Configuration
SMTP_HOST=\"\"
SMTP_PORT=\"587\"
SMTP_USER=\"\"
SMTP_PASSWORD=\"\"

# Monitoring
SENTRY_DSN=\"\"

# Next.js
NEXT_TELEMETRY_DISABLED=\"1\"
EOF

        echo 'Production environment file created'
    "

    success "Production environment configured with secure secrets"
}

# Configure reverse proxy
configure_reverse_proxy() {
    log "Configuring reverse proxy..."

    # SWAG configuration
    ssh -i ~/.ssh/id_rsa_unraid "${UNRAID_USER}@${UNRAID_IP}" "
        # Copy nginx configuration if SWAG exists
        if [ -d '/mnt/user/appdata/swag/nginx/proxy-confs' ]; then
            cp '${REMOTE_PATH}/nginx/taxcat.subdomain.conf' '/mnt/user/appdata/swag/nginx/proxy-confs/ekbooks.subdomain.conf'
            echo 'SWAG configuration copied'
        fi

        # Copy Traefik configuration if Traefik exists
        if [ -d '/mnt/user/appdata/traefik/config' ]; then
            cp '${REMOTE_PATH}/traefik-taxcat.yml' '/mnt/user/appdata/traefik/config/ekbooks.yml'
            echo 'Traefik configuration copied'
        fi
    "

    success "Reverse proxy configurations copied"
}

# Run deployment
run_deployment() {
    log "Running deployment on Unraid server..."

    ssh -i ~/.ssh/id_rsa_unraid "${UNRAID_USER}@${UNRAID_IP}" "
        cd '${REMOTE_PATH}'

        echo 'Starting deployment...'
        ./scripts/deploy-unraid.sh
    "

    success "Deployment completed on Unraid server"
}

# Final verification
verify_deployment() {
    log "Verifying deployment..."

    # Check if container is running
    if ssh -i ~/.ssh/id_rsa_unraid "${UNRAID_USER}@${UNRAID_IP}" "docker ps | grep -q ekbooks"; then
        success "EKBooks container is running"
    else
        warning "EKBooks container not found. Check deployment logs."
    fi

    # Check health endpoint
    if ssh -i ~/.ssh/id_rsa_unraid "${UNRAID_USER}@${UNRAID_IP}" "curl -f -s http://${UNRAID_IP}:3000/api/health >/dev/null 2>&1"; then
        success "Application health check passed"
    else
        warning "Health check failed. Application may still be starting."
    fi
}

# Main deployment function
main() {
    echo "🚀 EKBooks + TaxCat Deployment to Unraid Server"
    echo "==============================================="
    echo ""
    echo "Target Server: ${UNRAID_IP}"
    echo "Target User: ${UNRAID_USER}"
    echo "Project Path: ${REMOTE_PATH}"
    echo ""

    # Pre-deployment checks
    check_directory
    check_ssh_connection

    # Deployment steps
    create_backup
    transfer_files
    setup_permissions
    generate_env
    configure_reverse_proxy
    run_deployment
    verify_deployment

    echo ""
    success "EKBooks + TaxCat deployment completed successfully!"
    echo ""
    echo "Next Steps:"
    echo "1. Update your DNS to point ekbooks.ca to your public IP"
    echo "2. Configure SSL certificates in SWAG/Traefik"
    echo "3. Update Authentik configuration in .env.production"
    echo "4. Test the application at https://ekbooks.ca"
    echo "5. Set up automated backups with ./scripts/backup-taxcat.sh"
    echo ""
    echo "Application URLs:"
    echo "- Marketing Site: https://ekbooks.ca"
    echo "- TaxCat App: https://ekbooks.ca/app"
    echo "- Health Check: http://${UNRAID_IP}:3000/api/health"
}

# Show usage if help requested
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
    echo "EKBooks + TaxCat Deployment Script"
    echo ""
    echo "This script transfers the integrated EKBooks + TaxCat application"
    echo "to your Unraid server and performs the initial deployment."
    echo ""
    echo "Before running, update these variables in the script:"
    echo "  UNRAID_IP=\"192.168.2.125\""
    echo "  UNRAID_USER=\"root\"  # or your SSH user"
    echo ""
    echo "Requirements:"
    echo "  - SSH access to Unraid server"
    echo "  - SSH key authentication configured"
    echo "  - EKBooks website directory in parent folder"
    echo ""
    exit 0
fi

# Run main function
main "$@"