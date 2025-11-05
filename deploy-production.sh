#!/bin/bash

# TaxCat Production Deployment Script
# Run this on your Unraid server after updating all configuration files

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Pre-deployment checks
check_requirements() {
    log "Checking deployment requirements..."

    # Check if .env.production exists
    if [[ ! -f ".env.production" ]]; then
        error ".env.production file not found. Please copy .env.production.template and update all values."
    fi

    # Check if docker-compose.production.yml exists
    if [[ ! -f "docker-compose.production.yml" ]]; then
        error "docker-compose.production.yml not found."
    fi

    # Check if Dockerfile.production exists
    if [[ ! -f "Dockerfile.production" ]]; then
        error "Dockerfile.production not found."
    fi

    success "Requirements check passed"
}

# Validate environment variables
validate_environment() {
    log "Validating environment configuration..."

    # Check for required placeholders
    if grep -q "YOUR_" .env.production; then
        error "Please replace all YOUR_* placeholders in .env.production with actual values"
    fi

    # Check database connection
    if ! grep -q "postgresql://" .env.production; then
        error "DATABASE_URL not properly configured"
    fi

    success "Environment validation passed"
}

# Clean up previous deployment
cleanup() {
    log "Cleaning up previous deployment..."

    # Stop and remove existing containers
    docker-compose down 2>/dev/null || true

    # Remove old images
    docker image prune -f 2>/dev/null || true

    success "Cleanup completed"
}

# Build and deploy
deploy() {
    log "Starting production deployment..."

    # Build the application
    log "Building Docker image..."
    docker-compose -f docker-compose.production.yml build

    # Start the application
    log "Starting application..."
    docker-compose -f docker-compose.production.yml up -d

    success "Deployment completed"
}

# Health check
health_check() {
    log "Performing health checks..."

    # Wait for application to start
    sleep 30

    # Check if container is running
    if ! docker ps | grep -q taxcat-app; then
        error "TaxCat container is not running"
    fi

    # Check health endpoint
    local max_attempts=10
    local attempt=1

    while [[ $attempt -le $max_attempts ]]; do
        log "Health check attempt $attempt/$max_attempts..."

        if curl -f -s http://localhost:3000/api/health >/dev/null 2>&1; then
            success "Application health check passed"
            return 0
        fi

        sleep 10
        ((attempt++))
    done

    error "Application health check failed after $max_attempts attempts"
}

# Show deployment info
show_info() {
    echo ""
    echo "🎉 TaxCat Production Deployment Successful!"
    echo ""
    echo "Application URL: https://YOUR_DOMAIN.com"
    echo "Health Check: http://192.168.2.125:3000/api/health"
    echo ""
    echo "Container Status:"
    docker ps | grep taxcat
    echo ""
    echo "Logs:"
    echo "  docker logs taxcat-app"
    echo ""
    echo "Next Steps:"
    echo "1. Configure Cloudflare Tunnel"
    echo "2. Update DNS records"
    echo "3. Test the application"
    echo "4. Set up monitoring and backups"
}

# Main deployment
main() {
    echo "🚀 TaxCat Production Deployment"
    echo "==============================="
    echo ""

    check_requirements
    validate_environment
    cleanup
    deploy
    health_check
    show_info
}

# Run main function
main "$@"