#!/bin/bash

# Script to start all services defined in docker-compose.yml

echo "🚀 Starting all services..."
docker-compose up -d

echo "✅ Services started!"
echo ""
echo "📝 View logs with: ./scripts/logs.sh"
echo "🛑 Stop services with: ./scripts/stop.sh"
