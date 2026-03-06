#!/bin/bash

# Script to stop all services defined in docker-compose.yml

echo "🛑 Stopping all services..."
docker-compose down

echo "✅ Services stopped!"
echo ""
echo "🚀 Start services with: ./scripts/start.sh"
