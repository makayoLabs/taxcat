-- TaxCat PostgreSQL Database Initialization Script
-- This script runs automatically when the PostgreSQL container starts for the first time

-- Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create database if not exists (postgres auto-creates from POSTGRES_DB env var)
-- This script runs within the taxcat database

-- Set timezone
SET timezone = 'America/Toronto';

-- Create indexes for better performance (Prisma will create tables via migrations)
-- These are pre-optimization indexes that can be added after Prisma schema push

-- Log successful initialization
DO $$
BEGIN
    RAISE NOTICE 'TaxCat database initialized successfully!';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Run: docker exec taxcat npx prisma generate';
    RAISE NOTICE '2. Run: docker exec taxcat npx prisma db push';
END$$;
