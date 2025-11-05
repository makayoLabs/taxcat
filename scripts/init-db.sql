-- TaxCat Database Initialization Script
-- This script runs when the PostgreSQL container starts for the first time

-- Create database if it doesn't exist
SELECT 'CREATE DATABASE taxcat'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'taxcat')\gexec

-- Connect to taxcat database
\c taxcat;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_tax_returns_user_id ON "TaxReturn"("userId");
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON "Document"("userId");
CREATE INDEX IF NOT EXISTS idx_tax_returns_year ON "TaxReturn"(year);
CREATE INDEX IF NOT EXISTS idx_tax_returns_status ON "TaxReturn"(status);

-- Create a default admin user (password: admin123)
-- In production, change this password immediately!
INSERT INTO users (id, email, password, name, "emailVerified", "createdAt", "updatedAt")
VALUES (
    'admin-' || gen_random_uuid()::text,
    'admin@taxcat.ca',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LcYx6O7gQm5d5D3Ou', -- admin123
    'System Administrator',
    NOW(),
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO taxcat;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO taxcat;

-- Log completion
DO $$
BEGIN
    RAISE NOTICE 'TaxCat database initialization completed successfully';
END
$$;
