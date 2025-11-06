#!/bin/bash
# TaxCat Management Script
# Common management tasks for Unraid deployment

case "$1" in
    logs)
        echo "📋 Viewing TaxCat logs (Ctrl+C to exit)..."
        docker compose logs -f taxcat
        ;;

    restart)
        echo "🔄 Restarting TaxCat..."
        docker compose restart taxcat
        echo "✅ Restarted"
        ;;

    status)
        echo "📊 Container Status:"
        docker compose ps
        echo ""
        echo "🏥 Health Checks:"
        docker inspect --format='{{.Name}}: {{.State.Health.Status}}' taxcat ekbooks 2>/dev/null || echo "No health check data"
        echo ""
        echo "💾 Resource Usage:"
        docker stats --no-stream taxcat ekbooks taxcat_postgres taxcat_redis 2>/dev/null || docker stats --no-stream taxcat ekbooks
        ;;

    update)
        echo "⬆️  Updating TaxCat..."
        echo "1. Pulling latest code..."
        git pull
        echo "2. Rebuilding images..."
        docker compose build taxcat ekbooks
        echo "3. Restarting services..."
        docker compose up -d
        echo "4. Running database migrations..."
        docker exec taxcat npx prisma db push
        echo "✅ Update complete!"
        ;;

    shell)
        echo "🐚 Opening shell in TaxCat container..."
        docker exec -it taxcat sh
        ;;

    db)
        echo "🗄️  Opening PostgreSQL shell..."
        docker exec -it taxcat_postgres psql -U taxcat -d taxcat
        ;;

    backup)
        echo "💾 Running backup..."
        ./docker/scripts/backup.sh
        ;;

    health)
        echo "🏥 Checking application health..."
        curl -s https://taxcat.ca/api/health | jq . || curl -s http://localhost:3000/api/health
        ;;

    *)
        echo "TaxCat Management Script"
        echo "========================"
        echo ""
        echo "Usage: ./docker/scripts/manage.sh [command]"
        echo ""
        echo "Commands:"
        echo "  logs     - View container logs"
        echo "  restart  - Restart TaxCat container"
        echo "  status   - Show status and resource usage"
        echo "  update   - Pull latest code and rebuild"
        echo "  shell    - Open shell in container"
        echo "  db       - Open PostgreSQL shell"
        echo "  backup   - Run backup script"
        echo "  health   - Check application health"
        echo ""
        echo "Examples:"
        echo "  ./docker/scripts/manage.sh logs"
        echo "  ./docker/scripts/manage.sh status"
        echo "  ./docker/scripts/manage.sh update"
        ;;
esac
