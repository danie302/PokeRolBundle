#!/bin/bash

# Script to rebuild docker-compose services
# Usage: ./scripts/build.sh [service_name]

SERVICE_NAME=${1:-}

if [ -z "$SERVICE_NAME" ]; then
    echo "🔨 Rebuilding all services..."
    docker-compose build --no-cache
else
    echo "🔨 Rebuilding service: $SERVICE_NAME"
    docker-compose build --no-cache "$SERVICE_NAME"
fi

echo "✅ Build complete!"
echo ""
echo "🚀 To start services: ./scripts/start.sh"
