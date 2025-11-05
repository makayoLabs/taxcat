#!/bin/bash

# TaxCat + EKBooks Monitoring Script
# This script sets up monitoring and alerting for the deployed applications

set -e

# Configuration
PROJECT_DIR="/mnt/user/apps/taxcat-app"
MONITORING_DIR="/mnt/user/apps/monitoring"
UNRAID_IP="192.168.2.125"

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

# Check if running on Unraid
check_unraid() {
    if [[ ! -f "/boot/config/go" ]]; then
        error "This script is designed for Unraid systems only"
        exit 1
    fi
    success "Running on Unraid system"
}

# Create monitoring directories
create_directories() {
    log "Creating monitoring directories..."
    
    mkdir -p "$MONITORING_DIR/prometheus"
    mkdir -p "$MONITORING_DIR/grafana"
    mkdir -p "$MONITORING_DIR/grafana/provisioning/datasources"
    mkdir -p "$MONITORING_DIR/grafana/provisioning/dashboards"
    mkdir -p "$MONITORING_DIR/alerts"
    
    success "Monitoring directories created"
}

# Setup Prometheus configuration
setup_prometheus() {
    log "Setting up Prometheus configuration..."
    
    cat > "$MONITORING_DIR/prometheus/prometheus.yml" << EOF
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets: []

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'taxcat-ekbooks'
    static_configs:
      - targets: ['$UNRAID_IP:3000']
    metrics_path: '/api/metrics'
    scrape_interval: 30s

  - job_name: 'postgres'
    static_configs:
      - targets: ['$UNRAID_IP:5432']
    scrape_interval: 30s

  - job_name: 'redis'
    static_configs:
      - targets: ['$UNRAID_IP:6379']
    scrape_interval: 30s

  - job_name: 'unraid-system'
    static_configs:
      - targets: ['$UNRAID_IP:9100']
    scrape_interval: 30s
EOF

    success "Prometheus configuration created"
}

# Setup Prometheus alert rules
setup_alert_rules() {
    log "Setting up Prometheus alert rules..."
    
    cat > "$MONITORING_DIR/prometheus/alert_rules.yml" << EOF
groups:
  - name: taxcat-ekbooks
    rules:
      - alert: ApplicationDown
        expr: up{job="taxcat-ekbooks"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "TaxCat/EKBooks application is down"
          description: "The application has been down for more than 1 minute"

      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High error rate detected"
          description: "Error rate is above 10% for the last 5 minutes"

      - alert: HighResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High response time detected"
          description: "95th percentile response time is above 2 seconds"

      - alert: DatabaseConnectionFailed
        expr: up{job="postgres"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Database connection failed"
          description: "PostgreSQL database is not accessible"

      - alert: RedisConnectionFailed
        expr: up{job="redis"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Redis connection failed"
          description: "Redis cache is not accessible"

      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage"
          description: "Memory usage is above 90%"

      - alert: HighDiskUsage
        expr: (node_filesystem_size_bytes - node_filesystem_free_bytes) / node_filesystem_size_bytes > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High disk usage"
          description: "Disk usage is above 90%"
EOF

    success "Alert rules created"
}

# Setup Grafana datasource
setup_grafana_datasource() {
    log "Setting up Grafana datasource..."
    
    cat > "$MONITORING_DIR/grafana/provisioning/datasources/prometheus.yml" << EOF
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: true
EOF

    success "Grafana datasource configured"
}

# Setup Grafana dashboard
setup_grafana_dashboard() {
    log "Setting up Grafana dashboard..."
    
    cat > "$MONITORING_DIR/grafana/provisioning/dashboards/dashboard.yml" << EOF
apiVersion: 1

providers:
  - name: 'default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    allowUiUpdates: true
    options:
      path: /var/lib/grafana/dashboards
EOF

    # Create a basic dashboard JSON
    cat > "$MONITORING_DIR/grafana/dashboard.json" << 'EOF'
{
  "dashboard": {
    "id": null,
    "title": "TaxCat + EKBooks Monitoring",
    "tags": ["taxcat", "ekbooks"],
    "style": "dark",
    "timezone": "browser",
    "panels": [
      {
        "id": 1,
        "title": "Application Status",
        "type": "stat",
        "targets": [
          {
            "expr": "up{job=\"taxcat-ekbooks\"}",
            "legendFormat": "Application"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "thresholds"
            },
            "thresholds": {
              "steps": [
                {"color": "red", "value": 0},
                {"color": "green", "value": 1}
              ]
            }
          }
        },
        "gridPos": {"h": 8, "w": 12, "x": 0, "y": 0}
      },
      {
        "id": 2,
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{status}}"
          }
        ],
        "gridPos": {"h": 8, "w": 12, "x": 12, "y": 0}
      },
      {
        "id": 3,
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ],
        "gridPos": {"h": 8, "w": 12, "x": 0, "y": 8}
      },
      {
        "id": 4,
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m])",
            "legendFormat": "5xx errors"
          }
        ],
        "gridPos": {"h": 8, "w": 12, "x": 12, "y": 8}
      }
    ],
    "time": {
      "from": "now-1h",
      "to": "now"
    },
    "refresh": "30s"
  }
}
EOF

    success "Grafana dashboard created"
}

# Create monitoring docker-compose file
create_monitoring_compose() {
    log "Creating monitoring docker-compose file..."
    
    cat > "$MONITORING_DIR/docker-compose.monitoring.yml" << EOF
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: monitoring-prometheus
    restart: unless-stopped
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - ./prometheus/alert_rules.yml:/etc/prometheus/alert_rules.yml:ro
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    container_name: monitoring-grafana
    restart: unless-stopped
    ports:
      - "3001:3000"
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning:ro
      - ./grafana/dashboard.json:/var/lib/grafana/dashboards/taxcat-ekbooks.json:ro
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
      - GF_USERS_ALLOW_SIGN_UP=false
    networks:
      - monitoring

  node-exporter:
    image: prom/node-exporter:latest
    container_name: monitoring-node-exporter
    restart: unless-stopped
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    networks:
      - monitoring

volumes:
  prometheus_data:
    driver: local
  grafana_data:
    driver: local

networks:
  monitoring:
    driver: bridge
EOF

    success "Monitoring docker-compose file created"
}

# Setup log monitoring
setup_log_monitoring() {
    log "Setting up log monitoring..."
    
    cat > "$MONITORING_DIR/alerts/log-monitor.sh" << 'EOF'
#!/bin/bash

# Log monitoring script
LOG_FILE="/mnt/user/apps/taxcat-app/data/logs/all.log"
ALERT_FILE="/mnt/user/apps/monitoring/alerts/latest-alerts.txt"

# Check for errors in the last 5 minutes
ERROR_COUNT=$(tail -n 1000 "$LOG_FILE" | grep -i error | wc -l)

if [[ $ERROR_COUNT -gt 10 ]]; then
    echo "$(date): High error count detected: $ERROR_COUNT errors" >> "$ALERT_FILE"
    # Send notification (implement your preferred method)
fi

# Check for critical errors
CRITICAL_COUNT=$(tail -n 1000 "$LOG_FILE" | grep -i "critical\|fatal" | wc -l)

if [[ $CRITICAL_COUNT -gt 0 ]]; then
    echo "$(date): Critical errors detected: $CRITICAL_COUNT critical errors" >> "$ALERT_FILE"
    # Send notification (implement your preferred method)
fi
EOF

    chmod +x "$MONITORING_DIR/alerts/log-monitor.sh"
    
    success "Log monitoring script created"
}

# Setup backup monitoring
setup_backup_monitoring() {
    log "Setting up backup monitoring..."
    
    cat > "$MONITORING_DIR/alerts/backup-monitor.sh" << 'EOF'
#!/bin/bash

# Backup monitoring script
BACKUP_DIR="/mnt/user/apps/taxcat-backups"
ALERT_FILE="/mnt/user/apps/monitoring/alerts/latest-alerts.txt"

# Check if backup exists from today
TODAY=$(date +%Y%m%d)
BACKUP_EXISTS=$(find "$BACKUP_DIR" -name "database_${TODAY}*.sql" -type f | wc -l)

if [[ $BACKUP_EXISTS -eq 0 ]]; then
    echo "$(date): No backup found for today ($TODAY)" >> "$ALERT_FILE"
    # Send notification (implement your preferred method)
fi

# Check backup size
LATEST_BACKUP=$(find "$BACKUP_DIR" -name "database_*.sql" -type f -printf '%T@ %p\n' | sort -n | tail -1 | cut -d' ' -f2)

if [[ -n "$LATEST_BACKUP" ]]; then
    BACKUP_SIZE=$(stat -c%s "$LATEST_BACKUP")
    MIN_SIZE=1048576  # 1MB minimum
    
    if [[ $BACKUP_SIZE -lt $MIN_SIZE ]]; then
        echo "$(date): Backup size suspiciously small: $BACKUP_SIZE bytes" >> "$ALERT_FILE"
        # Send notification (implement your preferred method)
    fi
fi
EOF

    chmod +x "$MONITORING_DIR/alerts/backup-monitor.sh"
    
    success "Backup monitoring script created"
}

# Setup cron jobs for monitoring
setup_cron_jobs() {
    log "Setting up monitoring cron jobs..."
    
    # Add monitoring cron jobs
    (crontab -l 2>/dev/null; echo "# TaxCat/EKBooks Monitoring") | crontab -
    (crontab -l 2>/dev/null; echo "*/5 * * * * $MONITORING_DIR/alerts/log-monitor.sh") | crontab -
    (crontab -l 2>/dev/null; echo "0 3 * * * $MONITORING_DIR/alerts/backup-monitor.sh") | crontab -
    
    success "Monitoring cron jobs configured"
}

# Start monitoring services
start_monitoring() {
    log "Starting monitoring services..."
    
    cd "$MONITORING_DIR"
    
    # Start monitoring stack
    docker-compose -f docker-compose.monitoring.yml up -d
    
    # Wait for services to start
    sleep 30
    
    # Check if services are running
    if docker ps | grep -q "monitoring-prometheus"; then
        success "Prometheus is running"
    else
        error "Prometheus failed to start"
    fi
    
    if docker ps | grep -q "monitoring-grafana"; then
        success "Grafana is running"
    else
        error "Grafana failed to start"
    fi
    
    if docker ps | grep -q "monitoring-node-exporter"; then
        success "Node Exporter is running"
    else
        error "Node Exporter failed to start"
    fi
}

# Main monitoring setup function
main() {
    echo "📊 TaxCat + EKBooks Monitoring Setup"
    echo "===================================="
    echo ""
    
    check_unraid
    create_directories
    setup_prometheus
    setup_alert_rules
    setup_grafana_datasource
    setup_grafana_dashboard
    create_monitoring_compose
    setup_log_monitoring
    setup_backup_monitoring
    setup_cron_jobs
    start_monitoring
    
    echo ""
    success "Monitoring setup completed successfully!"
    echo ""
    echo "Monitoring URLs:"
    echo "- Prometheus: http://$UNRAID_IP:9090"
    echo "- Grafana: http://$UNRAID_IP:3001 (admin/admin123)"
    echo "- Node Exporter: http://$UNRAID_IP:9100"
    echo ""
    echo "Next steps:"
    echo "1. Access Grafana and import the TaxCat/EKBooks dashboard"
    echo "2. Configure alert notifications (email, Slack, etc.)"
    echo "3. Set up additional monitoring rules as needed"
    echo "4. Review and customize the monitoring configuration"
}

# Run main function
main "$@"


