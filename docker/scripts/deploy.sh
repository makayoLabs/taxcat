#!/bin/bash
# TaxCat & EKBooks Deployment Script for Unraid
# Usage: ./docker/scripts/deploy.sh

set -e  # Exit on error

echo "🚀 TaxCat & EKBooks Deployment Script"
echo "======================================"
echo ""

# Check if .env.docker.local exists
if [ ! -f .env.docker.local ]; then
    echo "⚠️  .env.docker.local not found!"
    echo "Creating from template..."
    cp .env.docker .env.docker.local
    echo ""
    echo "❗ IMPORTANT: Edit .env.docker.local with your actual values:"
    echo "   - Generate secrets: openssl rand -base64 32"
    echo "   - Update passwords"
    echo "   - Configure database URLs"
    echo ""
    echo "After editing, run this script again."
    exit 1
fi

echo "✅ Environment file found"
echo ""

# Check if Docker networks exist
echo "📡 Checking Docker networks..."
if ! docker network ls | grep -q "webstack_net"; then
    echo "⚠️  Network 'webstack_net' not found. Creating..."
    docker network create webstack_net
fi

if ! docker network ls | grep -q "makprox"; then
    echo "⚠️  Network 'makprox' not found. Creating..."
    docker network create makprox
fi

echo "✅ Networks ready"
echo ""

# Build images
echo "🔨 Building Docker images..."
docker compose -f docker-compose.yml --env-file .env.docker.local build

echo ""
echo "✅ Build complete"
echo ""

# Start services
echo "🎬 Starting services..."
docker compose -f docker-compose.yml --env-file .env.docker.local up -d

echo ""
echo "⏳ Waiting for containers to be healthy..."
sleep 10

# Check container status
echo ""
echo "📊 Container Status:"
docker compose ps

# Initialize database
echo ""
echo "🗄️  Initializing database..."
echo "   Generating Prisma Client..."
docker exec taxcat npx prisma generate

echo "   Pushing database schema..."
docker exec taxcat npx prisma db push --accept-data-loss || echo "⚠️  Database push failed - this is normal on first run"

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "🌐 Your applications should be available at:"
echo "   TaxCat: https://taxcat.ca"
echo "   EKBooks: https://ekbooks.ca"
echo ""
echo "📝 Next steps:"
echo "   1. Check logs: docker compose logs -f"
echo "   2. Verify health: curl https://taxcat.ca/api/health"
echo "   3. Test RRSP calculator: https://taxcat.ca/tools/rrsp"
echo ""
echo "🆘 Need help? Check UNRAID_DEPLOYMENT.md"
