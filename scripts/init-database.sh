# TaxCat + EKBooks Database Initialization Script
# This script sets up the required databases and users for both applications

set -e

# Configuration
UNRAID_IP="192.168.2.125"
POSTGRES_PORT="5432"
POSTGRES_USER="postgres"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

success() {
    echo -e "${GREEN}✓ $1${NC}"
}

error() {
    echo -e "${RED}✗ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check PostgreSQL connectivity
check_postgres() {
    log "Checking PostgreSQL connectivity..."
    
    if ! pg_isready -h "$UNRAID_IP" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" >/dev/null 2>&1; then
        error "Cannot connect to PostgreSQL at $UNRAID_IP:$POSTGRES_PORT"
        echo "Please ensure:"
        echo "1. PostgreSQL container is running"
        echo "2. PostgreSQL is accessible on port $POSTGRES_PORT"
        echo "3. User '$POSTGRES_USER' has access"
        exit 1
    fi
    
    success "PostgreSQL connection verified"
}

# Create TaxCat database and user
create_taxcat_database() {
    log "Creating TaxCat database and user..."
    
    # Generate secure password
    TAXCAT_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
    
    # Create database and user
    psql -h "$UNRAID_IP" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d postgres << EOF
-- Create TaxCat database
CREATE DATABASE taxcat_prod;

-- Create TaxCat user
CREATE USER taxcat WITH ENCRYPTED PASSWORD '$TAXCAT_PASSWORD';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE taxcat_prod TO taxcat;
GRANT CREATE ON DATABASE taxcat_prod TO taxcat;

-- Connect to TaxCat database and grant schema privileges
\c taxcat_prod;
GRANT ALL ON SCHEMA public TO taxcat;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO taxcat;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO taxcat;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO taxcat;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO taxcat;
EOF

    success "TaxCat database and user created"
    echo "TaxCat Database Password: $TAXCAT_PASSWORD"
    echo "TaxCat Database URL: postgresql://taxcat:$TAXCAT_PASSWORD@$UNRAID_IP:$POSTGRES_PORT/taxcat_prod"
}

# Create EKBooks database and user
create_ekbooks_database() {
    log "Creating EKBooks database and user..."
    
    # Generate secure password
    EKBOOKS_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
    
    # Create database and user
    psql -h "$UNRAID_IP" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d postgres << EOF
-- Create EKBooks database
CREATE DATABASE ekbooks_prod;

-- Create EKBooks user
CREATE USER ekbooks WITH ENCRYPTED PASSWORD '$EKBOOKS_PASSWORD';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE ekbooks_prod TO ekbooks;
GRANT CREATE ON DATABASE ekbooks_prod TO ekbooks;

-- Connect to EKBooks database and grant schema privileges
\c ekbooks_prod;
GRANT ALL ON SCHEMA public TO ekbooks;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ekbooks;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ekbooks;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ekbooks;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ekbooks;
EOF

    success "EKBooks database and user created"
    echo "EKBooks Database Password: $EKBOOKS_PASSWORD"
    echo "EKBooks Database URL: postgresql://ekbooks:$EKBOOKS_PASSWORD@$UNRAID_IP:$POSTGRES_PORT/ekbooks_prod"
}

# Create shared database (if using single database)
create_shared_database() {
    log "Creating shared database for both applications..."
    
    # Generate secure password
    SHARED_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
    
    # Create database and user
    psql -h "$UNRAID_IP" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d postgres << EOF
-- Create shared database
CREATE DATABASE taxcat_ekbooks_prod;

-- Create shared user
CREATE USER taxcat_ekbooks WITH ENCRYPTED PASSWORD '$SHARED_PASSWORD';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE taxcat_ekbooks_prod TO taxcat_ekbooks;
GRANT CREATE ON DATABASE taxcat_ekbooks_prod TO taxcat_ekbooks;

-- Connect to shared database and grant schema privileges
\c taxcat_ekbooks_prod;
GRANT ALL ON SCHEMA public TO taxcat_ekbooks;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO taxcat_ekbooks;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO taxcat_ekbooks;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO taxcat_ekbooks;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO taxcat_ekbooks;
EOF

    success "Shared database and user created"
    echo "Shared Database Password: $SHARED_PASSWORD"
    echo "Shared Database URL: postgresql://taxcat_ekbooks:$SHARED_PASSWORD@$UNRAID_IP:$POSTGRES_PORT/taxcat_ekbooks_prod"
}

# Test database connections
test_connections() {
    log "Testing database connections..."
    
    # Test TaxCat database
    if psql -h "$UNRAID_IP" -p "$POSTGRES_PORT" -U taxcat -d taxcat_prod -c "SELECT version();" >/dev/null 2>&1; then
        success "TaxCat database connection test passed"
    else
        error "TaxCat database connection test failed"
    fi
    
    # Test EKBooks database
    if psql -h "$UNRAID_IP" -p "$POSTGRES_PORT" -U ekbooks -d ekbooks_prod -c "SELECT version();" >/dev/null 2>&1; then
        success "EKBooks database connection test passed"
    else
        error "EKBooks database connection test failed"
    fi
}

# Create database configuration file
create_config_file() {
    log "Creating database configuration file..."
    
    CONFIG_FILE="database-config.txt"
    
    cat > "$CONFIG_FILE" << EOF
# TaxCat + EKBooks Database Configuration
# Generated on: $(date)
# PostgreSQL Server: $UNRAID_IP:$POSTGRES_PORT

# TaxCat Database
TAXCAT_DATABASE_URL=postgresql://taxcat:$TAXCAT_PASSWORD@$UNRAID_IP:$POSTGRES_PORT/taxcat_prod

# EKBooks Database
EKBOOKS_DATABASE_URL=postgresql://ekbooks:$EKBOOKS_PASSWORD@$UNRAID_IP:$POSTGRES_PORT/ekbooks_prod

# Shared Database (if using single database)
SHARED_DATABASE_URL=postgresql://taxcat_ekbooks:$SHARED_PASSWORD@$UNRAID_IP:$POSTGRES_PORT/taxcat_ekbooks_prod

# Redis Configuration (if needed)
REDIS_URL=redis://:your_redis_password@$UNRAID_IP:6379

# Instructions:
# 1. Copy the appropriate DATABASE_URL to your .env.production file
# 2. Update your docker-compose.unraid.yml with the correct DATABASE_URL
# 3. Run database migrations: npx prisma db push
# 4. Start your application: docker-compose up -d
EOF

    success "Database configuration saved to: $CONFIG_FILE"
}

# Main function
main() {
    echo "🗄️ TaxCat + EKBooks Database Setup"
    echo "=================================="
    echo ""
    
    check_postgres
    
    echo "Choose database setup option:"
    echo "1. Separate databases for TaxCat and EKBooks (recommended)"
    echo "2. Shared database for both applications"
    echo "3. Both separate and shared databases"
    echo ""
    read -p "Enter your choice (1-3): " choice
    
    case $choice in
        1)
            create_taxcat_database
            create_ekbooks_database
            test_connections
            ;;
        2)
            create_shared_database
            ;;
        3)
            create_taxcat_database
            create_ekbooks_database
            create_shared_database
            test_connections
            ;;
        *)
            error "Invalid choice. Exiting."
            exit 1
            ;;
    esac
    
    create_config_file
    
    echo ""
    success "Database setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Update your .env.production file with the database URLs"
    echo "2. Run database migrations: npx prisma db push"
    echo "3. Start your application: docker-compose up -d"
    echo ""
    echo "Database configuration saved to: database-config.txt"
}

# Run main function
main "$@"


