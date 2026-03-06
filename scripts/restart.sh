#!/bin/bash

# Script to restart all services defined in docker-compose.yml

echo "🔄 Restarting all services..."
docker-compose restart

echo "✅ Services restarted!"
echo ""
echo "📝 View logs with: ./scripts/logs.sh"
