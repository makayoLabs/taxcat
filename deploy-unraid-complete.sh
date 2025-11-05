#!/bin/bash

# 🚀 Complete Unraid Deployment Script for EKBooks + TaxCat
# This script handles the full deployment including Nextcloud, Authentik, and Traefik integration

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/mnt/user/appdata/taxcat"
BACKUP_DIR="/mnt/user/appdata/taxcat-backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
}

warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

# Pre-deployment checks
pre_deployment_checks() {
    log "🔍 Running pre-deployment checks..."

    # Check if running on Unraid
    if [ ! -d "/mnt/user" ]; then
        error "This script must be run on an Unraid server"
        exit 1
    fi

    # Check required directories
    if [ ! -d "$PROJECT_DIR" ]; then
        error "Project directory $PROJECT_DIR not found"
        info "Please copy the TaxCat project files to $PROJECT_DIR"
        exit 1
    fi

    # Check Docker
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed or not in PATH"
        exit 1
    fi

    # Check docker-compose
    if ! command -v docker-compose &> /dev/null; then
        error "docker-compose is not installed or not in PATH"
        exit 1
    fi

    # Check required services
    info "Checking required services..."

    if ! docker ps | grep -q "nextcloud-aio"; then
        warn "Nextcloud AIO not detected. Please ensure it's running."
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi

    if ! docker ps | grep -q "authentik"; then
        warn "Authentik not detected. Please ensure it's running."
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi

    if ! docker ps | grep -q "traefik"; then
        warn "Traefik not detected. Please ensure it's running."
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi

    log "✅ Pre-deployment checks passed"
}

# Backup existing deployment
backup_existing() {
    log "💾 Creating backup of existing deployment..."

    mkdir -p "$BACKUP_DIR"

    # Backup database if it exists
    if docker ps | grep -q "ekbooks-app"; then
        info "Backing up existing database..."
        docker exec postgresql17 pg_dump -U taxcat taxcat_prod > "$BACKUP_DIR/taxcat_db_$TIMESTAMP.sql" 2>/dev/null || warn "Could not backup database"
    fi

    # Backup environment files
    if [ -f "$PROJECT_DIR/.env.production" ]; then
        cp "$PROJECT_DIR/.env.production" "$BACKUP_DIR/.env.production.$TIMESTAMP"
    fi

    # Backup docker-compose override if exists
    if [ -f "$PROJECT_DIR/docker-compose.override.yml" ]; then
        cp "$PROJECT_DIR/docker-compose.override.yml" "$BACKUP_DIR/docker-compose.override.yml.$TIMESTAMP"
    fi

    log "✅ Backup completed: $BACKUP_DIR"
}

# Setup environment
setup_environment() {
    log "🔧 Setting up environment..."

    cd "$PROJECT_DIR"

    # Create necessary directories
    mkdir -p data/uploads data/logs config

    # Set proper permissions
    chmod 755 scripts/*.sh
    chmod 644 .env.production

    # Generate secrets if not set
    if ! grep -q "your-32-character-secret" .env.production; then
        warn "Environment secrets appear to be configured. Skipping auto-generation."
    else
        info "Generating secure secrets..."

        # Generate NextAuth secret
        NEXTAUTH_SECRET=$(openssl rand -base64 32)
        sed -i "s/your-32-character-secret-key-here-change-this-in-production/$NEXTAUTH_SECRET/" .env.production

        # Generate JWT secret
        JWT_SECRET=$(openssl rand -base64 32)
        sed -i "s/your-jwt-secret-key-here-change-this-in-production/$JWT_SECRET/" .env.production

        # Generate encryption key
        ENCRYPTION_KEY=$(openssl rand -hex 32)
        sed -i "s/32-character-encryption-key-change-this-in-production/$ENCRYPTION_KEY/" .env.production

        log "✅ Secrets generated and saved"
    fi

    # Validate environment file
    if [ ! -f ".env.production" ]; then
        error "Environment file .env.production not found"
        exit 1
    fi

    # Check for required environment variables
    required_vars=("DATABASE_URL" "REDIS_URL" "NEXTAUTH_URL" "SMTP_USER" "SMTP_PASSWORD")
    for var in "${required_vars[@]}"; do
        if ! grep -q "^$var=" .env.production; then
            error "Required environment variable $var not found in .env.production"
            exit 1
        fi
    done

    log "✅ Environment setup completed"
}

# Deploy services
deploy_services() {
    log "🚀 Deploying services..."

    cd "$PROJECT_DIR"

    # Stop existing containers
    info "Stopping existing containers..."
    docker-compose -f docker-compose.unraid.yml down || true

    # Start mail services first
    info "Starting mail services..."
    docker-compose -f docker-compose.unraid.yml --profile mail up -d

    # Wait for mail server to be ready
    info "Waiting for mail server to initialize..."
    sleep 30

    # Check mail server health
    if docker ps | grep -q "nextcloud-aio-mailserver"; then
        log "✅ Mail server started successfully"
    else
        error "Mail server failed to start"
        exit 1
    fi

    # Start main application
    info "Starting main application..."
    docker-compose -f docker-compose.unraid.yml up -d

    # Wait for application to be ready
    info "Waiting for application to start..."
    sleep 30

    # Optional: Start monitoring
    read -p "Start monitoring services (Prometheus/Grafana)? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        info "Starting monitoring services..."
        docker-compose -f docker-compose.unraid.yml --profile monitoring up -d
    fi

    log "✅ Services deployed successfully"
}

# Post-deployment verification
verify_deployment() {
    log "🔍 Verifying deployment..."

    # Check container status
    info "Checking container status..."
    if docker ps | grep -q "ekbooks-app"; then
        log "✅ EKBooks application container is running"
    else
        error "EKBooks application container is not running"
        docker logs ekbooks-app || true
        exit 1
    fi

    # Check mail server
    if docker ps | grep -q "nextcloud-aio-mailserver"; then
        log "✅ Mail server is running"
    else
        warn "Mail server is not running - check Nextcloud AIO status"
    fi

    # Test application health
    info "Testing application health..."
    if curl -f -s https://ekbooks.ca/api/health > /dev/null 2>&1; then
        log "✅ Application health check passed"
    else
        warn "Application health check failed - this may be normal during initial startup"
        info "Check logs: docker logs ekbooks-app"
    fi

    # Test basic connectivity
    if curl -s -I https://ekbooks.ca | grep -q "200 OK\|302"; then
        log "✅ Website is accessible"
    else
        warn "Website may not be fully accessible yet"
        info "Check Traefik configuration and DNS settings"
    fi

    log "✅ Deployment verification completed"
}

# Setup monitoring and alerts
setup_monitoring() {
    log "📊 Setting up monitoring..."

    # Create health check script
    cat > "$PROJECT_DIR/health-check.sh" << 'EOF'
#!/bin/bash
# Health check script for TaxCat services

SERVICES=("ekbooks-app" "nextcloud-aio-mailserver" "authentik-server" "traefik")
ISSUES=()

for service in "${SERVICES[@]}"; do
    if ! docker ps | grep -q "$service"; then
        ISSUES+=("$service is not running")
    fi
done

# Check application health
if ! curl -f -s http://localhost:3000/api/health > /dev/null; then
    ISSUES+=("Application health check failed")
fi

# Report issues
if [ ${#ISSUES[@]} -eq 0 ]; then
    echo "✅ All services healthy"
    exit 0
else
    echo "❌ Health check issues found:"
    for issue in "${ISSUES[@]}"; do
        echo "  - $issue"
    done
    exit 1
fi
EOF

    chmod +x "$PROJECT_DIR/health-check.sh"

    # Setup log rotation
    cat > "$PROJECT_DIR/logrotate.conf" << 'EOF'
/mnt/user/appdata/taxcat/data/logs/*.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
    create 644 root root
    postrotate
        docker restart ekbooks-app
    endscript
}
EOF

    log "✅ Monitoring setup completed"
}

# Main deployment function
main() {
    log "🚀 Starting complete Unraid deployment for EKBooks + TaxCat"

    pre_deployment_checks
    backup_existing
    setup_environment
    deploy_services
    verify_deployment
    setup_monitoring

    log ""
    log "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!"
    log ""
    log "📋 Next Steps:"
    log "1. Configure Authentik application (see authentik-taxcat-config.yml)"
    log "2. Set up Nextcloud email accounts (admin@ekbooks.ca, notifications@ekbooks.ca)"
    log "3. Update DNS records for ekbooks.ca"
    log "4. Test authentication flow"
    log "5. Test contact forms and email functionality"
    log "6. Configure monitoring alerts"
    log ""
    log "🔗 Access Points:"
    log "• Website: https://ekbooks.ca"
    log "• Admin Panel: https://ekbooks.ca/admin (after login)"
    log "• Health Check: https://ekbooks.ca/api/health"
    log ""
    log "📊 Monitoring:"
    log "• View logs: docker logs ekbooks-app"
    log "• Health check: $PROJECT_DIR/health-check.sh"
    log "• Backup: $PROJECT_DIR/scripts/backup-taxcat.sh"
    log ""
    log "📞 Support:"
    log "• Check logs: docker logs -f ekbooks-app"
    log "• View status: docker ps | grep ekbooks"
    log "• Restart: docker-compose -f docker-compose.unraid.yml restart"
}

# Handle command line arguments
case "${1:-}" in
    "backup")
        backup_existing
        ;;
    "verify")
        verify_deployment
        ;;
    "health")
        "$PROJECT_DIR/health-check.sh"
        ;;
    *)
        main
        ;;
esac