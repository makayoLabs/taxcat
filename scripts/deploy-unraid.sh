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
