#!/bin/bash
# TaxCat + EKBooks Backup Script

BACKUP_DIR="/mnt/user/apps/taxcat-backups"
DATE=

echo "Starting backup process..."

# Create backup directory
mkdir -p 

# Database backup
echo "Backing up database..."
docker exec postgres pg_dump -U taxcat taxcat_prod > "/database_.sql"

# Application data backup
echo "Backing up application data..."
tar -czf "/data_.tar.gz" data/

# Configuration backup
echo "Backing up configuration..."
tar -czf "/config_.tar.gz" .env.production docker-compose.unraid.yml

echo "Backup completed: "
echo "Files created:"
echo "  - database_.sql"
echo "  - data_.tar.gz"
echo "  - config_.tar.gz"
