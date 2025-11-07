#!/bin/bash

# TaxCat + EKBooks Health Check Script
# This script performs comprehensive health checks on the deployed applications

set -e

# Configuration
UNRAID_IP="192.168.2.125"
TAXCAT_URL="https://taxcat.yourdomain.com"
EKBOOKS_URL="https://ekbooks.ca"
HEALTH_ENDPOINT="/api/health"

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

# Check Docker containers
check_containers() {
    log "Checking Docker containers..."
    
    local containers=("ekbooks-app" "postgres" "redis")
    local all_running=true
    
    for container in "${containers[@]}"; do
        if docker ps | grep -q "$container"; then
            success "Container $container is running"
        else
            error "Container $container is not running"
            all_running=false
        fi
    done
    
    if [[ "$all_running" == true ]]; then
        success "All required containers are running"
    else
        error "Some containers are not running"
        return 1
    fi
}

# Check container health
check_container_health() {
    log "Checking container health..."
    
    # Check ekbooks-app health
    if docker inspect ekbooks-app | grep -q '"Health": "healthy"'; then
        success "EKBooks application container is healthy"
    else
        warning "EKBooks application container health check failed"
        docker logs --tail 20 ekbooks-app
    fi
}

# Check database connectivity
check_database() {
    log "Checking database connectivity..."
    
    # Test PostgreSQL connection
    if docker exec postgres pg_isready -U taxcat -d taxcat_prod >/dev/null 2>&1; then
        success "PostgreSQL connection successful"
    else
        error "PostgreSQL connection failed"
        return 1
    fi
    
    # Test database queries
    if docker exec postgres psql -U taxcat -d taxcat_prod -c "SELECT 1;" >/dev/null 2>&1; then
        success "Database queries working"
    else
        error "Database queries failed"
        return 1
    fi
}

# Check Redis connectivity
check_redis() {
    log "Checking Redis connectivity..."
    
    if docker exec redis redis-cli ping >/dev/null 2>&1; then
        success "Redis connection successful"
    else
        error "Redis connection failed"
        return 1
    fi
}

# Check application endpoints
check_endpoints() {
    log "Checking application endpoints..."
    
    # Check TaxCat health endpoint
    if curl -f -s "$TAXCAT_URL$HEALTH_ENDPOINT" >/dev/null 2>&1; then
        success "TaxCat health endpoint responding"
    else
        error "TaxCat health endpoint not responding"
        echo "Trying local endpoint..."
        if curl -f -s "http://$UNRAID_IP:3000$HEALTH_ENDPOINT" >/dev/null 2>&1; then
            warning "TaxCat responding locally but not via domain"
        else
            error "TaxCat not responding locally either"
        fi
    fi
    
    # Check EKBooks health endpoint
    if curl -f -s "$EKBOOKS_URL$HEALTH_ENDPOINT" >/dev/null 2>&1; then
        success "EKBooks health endpoint responding"
    else
        error "EKBooks health endpoint not responding"
        echo "Trying local endpoint..."
        if curl -f -s "http://$UNRAID_IP:3000$HEALTH_ENDPOINT" >/dev/null 2>&1; then
            warning "EKBooks responding locally but not via domain"
        else
            error "EKBooks not responding locally either"
        fi
    fi
}

# Check SSL certificates
check_ssl() {
    log "Checking SSL certificates..."
    
    # Check TaxCat SSL
    if openssl s_client -connect taxcat.yourdomain.com:443 -servername taxcat.yourdomain.com </dev/null 2>/dev/null | grep -q "Verify return code: 0"; then
        success "TaxCat SSL certificate is valid"
    else
        warning "TaxCat SSL certificate issue"
    fi
    
    # Check EKBooks SSL
    if openssl s_client -connect ekbooks.ca:443 -servername ekbooks.ca </dev/null 2>/dev/null | grep -q "Verify return code: 0"; then
        success "EKBooks SSL certificate is valid"
    else
        warning "EKBooks SSL certificate issue"
    fi
}

# Check disk space
check_disk_space() {
    log "Checking disk space..."
    
    local usage=$(df /mnt/user/apps | tail -1 | awk '{print $5}' | sed 's/%//')
    
    if [[ $usage -lt 80 ]]; then
        success "Disk space usage: ${usage}% (OK)"
    elif [[ $usage -lt 90 ]]; then
        warning "Disk space usage: ${usage}% (Warning)"
    else
        error "Disk space usage: ${usage}% (Critical)"
    fi
}

# Check memory usage
check_memory() {
    log "Checking memory usage..."
    
    local total_mem=$(free -m | awk 'NR==2{printf "%.0f", $2}')
    local used_mem=$(free -m | awk 'NR==2{printf "%.0f", $3}')
    local mem_percent=$((used_mem * 100 / total_mem))
    
    if [[ $mem_percent -lt 80 ]]; then
        success "Memory usage: ${mem_percent}% (OK)"
    elif [[ $mem_percent -lt 90 ]]; then
        warning "Memory usage: ${mem_percent}% (Warning)"
    else
        error "Memory usage: ${mem_percent}% (Critical)"
    fi
}

# Check application logs for errors
check_logs() {
    log "Checking application logs for errors..."
    
    # Check for recent errors in application logs
    local error_count=$(docker logs ekbooks-app --since 1h 2>&1 | grep -i error | wc -l)
    
    if [[ $error_count -eq 0 ]]; then
        success "No errors found in recent logs"
    elif [[ $error_count -lt 5 ]]; then
        warning "Found $error_count errors in recent logs"
    else
        error "Found $error_count errors in recent logs"
        echo "Recent errors:"
        docker logs ekbooks-app --since 1h 2>&1 | grep -i error | tail -5
    fi
}

# Check backup status
check_backups() {
    log "Checking backup status..."
    
    local backup_dir="/mnt/user/apps/taxcat-backups"
    
    if [[ -d "$backup_dir" ]]; then
        local latest_backup=$(find "$backup_dir" -name "database_*.sql" -type f -printf '%T@ %p\n' | sort -n | tail -1 | cut -d' ' -f2)
        
        if [[ -n "$latest_backup" ]]; then
            local backup_age=$(($(date +%s) - $(stat -c %Y "$latest_backup")))
            local backup_age_hours=$((backup_age / 3600))
            
            if [[ $backup_age_hours -lt 25 ]]; then
                success "Latest backup is $backup_age_hours hours old (OK)"
            else
                warning "Latest backup is $backup_age_hours hours old (Consider running backup)"
            fi
        else
            warning "No database backups found"
        fi
    else
        warning "Backup directory not found"
    fi
}

# Generate health report
generate_report() {
    log "Generating health check report..."
    
    local report_file="health-check-report-$(date +%Y%m%d_%H%M%S).txt"
    
    cat > "$report_file" << EOF
TaxCat + EKBooks Health Check Report
===================================
Date: $(date)
Server: $UNRAID_IP

Container Status:
$(docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}")

Resource Usage:
$(df -h /mnt/user/apps)
$(free -h)

Recent Application Logs:
$(docker logs ekbooks-app --since 1h --tail 20)

Database Status:
$(docker exec postgres psql -U taxcat -d taxcat_prod -c "SELECT version();" 2>/dev/null || echo "Database connection failed")

Redis Status:
$(docker exec redis redis-cli info server 2>/dev/null | grep redis_version || echo "Redis connection failed")
EOF

    success "Health check report generated: $report_file"
}

# Main health check function
main() {
    echo "🏥 TaxCat + EKBooks Health Check"
    echo "==============================="
    echo ""
    
    local overall_status=0
    
    # Run all health checks
    check_containers || overall_status=1
    check_container_health
    check_database || overall_status=1
    check_redis || overall_status=1
    check_endpoints || overall_status=1
    check_ssl
    check_disk_space
    check_memory
    check_logs
    check_backups
    
    generate_report
    
    echo ""
    if [[ $overall_status -eq 0 ]]; then
        success "Overall health check: PASSED"
        echo ""
        echo "All critical systems are functioning properly."
    else
        error "Overall health check: FAILED"
        echo ""
        echo "Some critical systems are not functioning properly."
        echo "Please review the errors above and take appropriate action."
    fi
    
    echo ""
    echo "Health check completed at: $(date)"
}

# Run main function
main "$@"




