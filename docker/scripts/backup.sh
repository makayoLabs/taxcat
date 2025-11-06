#!/bin/bash
# TaxCat Backup Script for Unraid
# Backs up database and uploads directory

BACKUP_DIR="/mnt/user/backups/taxcat"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

echo "🗄️  Starting TaxCat backup..."
echo ""

# Backup PostgreSQL database
echo "📦 Backing up database..."
docker exec taxcat_postgres pg_dump -U taxcat taxcat | gzip > $BACKUP_DIR/db_$DATE.sql.gz

if [ $? -eq 0 ]; then
    echo "✅ Database backup saved: $BACKUP_DIR/db_$DATE.sql.gz"
else
    echo "❌ Database backup failed!"
fi

# Backup uploads directory
echo "📦 Backing up uploads..."
docker cp taxcat:/app/uploads $BACKUP_DIR/uploads_$DATE

if [ $? -eq 0 ]; then
    echo "✅ Uploads backup saved: $BACKUP_DIR/uploads_$DATE"
else
    echo "❌ Uploads backup failed!"
fi

# Backup environment config (excluding secrets)
echo "📦 Backing up configuration..."
grep -v -E "(PASSWORD|SECRET|KEY)" .env.docker.local > $BACKUP_DIR/config_$DATE.env.template

echo ""
echo "✅ Backup complete!"
echo ""
echo "📁 Backup location: $BACKUP_DIR"
echo "📊 Backup size:"
du -sh $BACKUP_DIR

# Clean old backups (keep last 30 days)
echo ""
echo "🧹 Cleaning old backups..."
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +30 -delete
find $BACKUP_DIR -type d -name "uploads_*" -mtime +30 -exec rm -rf {} + 2>/dev/null

echo "✅ Cleanup complete"
