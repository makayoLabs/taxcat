#!/bin/bash

# TaxCat Website Deployment Script for Unraid
# Usage: ./deploy.sh [build|deploy|both]

set -e

# Configuration
CONTAINER_NAME="taxcat-website"
IMAGE_NAME="taxcat-website"
PORT="9847"
ENV_FILE=".env.production"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on Unraid
check_environment() {
    log_info "Checking environment..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed or not in PATH"
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        log_error "Docker daemon is not running"
        exit 1
    fi
    
    log_success "Environment check passed"
}

# Build Docker image
build_image() {
    log_info "Building Docker image..."
    
    # Create production build
    log_info "Creating production build..."
    npm run build
    
    # Build Docker image
    log_info "Building Docker image: $IMAGE_NAME"
    docker build -t $IMAGE_NAME .
    
    # Tag with latest
    docker tag $IMAGE_NAME $IMAGE_NAME:latest
    
    log_success "Docker image built successfully"
}

# Stop and remove existing container
cleanup_container() {
    log_info "Cleaning up existing container..."
    
    if docker ps -a | grep -q $CONTAINER_NAME; then
        log_info "Stopping existing container..."
        docker stop $CONTAINER_NAME || true
        
        log_info "Removing existing container..."
        docker rm $CONTAINER_NAME || true
    fi
    
    log_success "Container cleanup completed"
}

# Deploy container
deploy_container() {
    log_info "Deploying container..."
    
    cleanup_container
    
    # Run new container
    log_info "Starting new container: $CONTAINER_NAME"
    docker run -d \
        --name $CONTAINER_NAME \
        --restart unless-stopped \
        -p $PORT:3000 \
        -e NODE_ENV=production \
        -e PORT=3000 \
        -e HOSTNAME=0.0.0.0 \
        $IMAGE_NAME
    
    # Wait for container to start
    log_info "Waiting for container to start..."
    sleep 5
    
    # Check if container is running
    if docker ps | grep -q $CONTAINER_NAME; then
        log_success "Container deployed successfully"
        log_info "Website is available at: http://localhost:$PORT"
    else
        log_error "Container failed to start"
        log_info "Container logs:"
        docker logs $CONTAINER_NAME
        exit 1
    fi
}

# Health check
health_check() {
    log_info "Performing health check..."
    
    # Wait a bit more for the app to fully start
    sleep 10
    
    # Check if the website responds
    if curl -f -s http://localhost:$PORT > /dev/null; then
        log_success "Health check passed - website is responding"
    else
        log_warning "Health check failed - website may still be starting"
        log_info "Check logs with: docker logs $CONTAINER_NAME"
    fi
}

# Show status
show_status() {
    log_info "Deployment Status:"
    echo "===================="
    echo "Container Name: $CONTAINER_NAME"
    echo "Image: $IMAGE_NAME"
    echo "Port: $PORT"
    echo "Status: $(docker ps --filter name=$CONTAINER_NAME --format 'table {{.Status}}')"
    echo "Website URL: http://localhost:$PORT"
    echo "===================="
}

# Main deployment function
main() {
    local action=${1:-both}
    
    log_info "Starting TaxCat website deployment..."
    log_info "Action: $action"
    
    check_environment
    
    case $action in
        "build")
            build_image
            log_success "Build completed successfully"
            ;;
        "deploy")
            deploy_container
            health_check
            show_status
            log_success "Deployment completed successfully"
            ;;
        "both")
            build_image
            deploy_container
            health_check
            show_status
            log_success "Build and deployment completed successfully"
            ;;
        *)
            log_error "Invalid action: $action"
            echo "Usage: $0 [build|deploy|both]"
            exit 1
            ;;
    esac
    
    log_success "TaxCat website deployment script completed!"
}

# Run main function
main "$@" 