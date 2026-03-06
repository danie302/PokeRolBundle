#!/bin/bash

# Script to view logs for docker-compose services
# Usage: ./scripts/logs.sh [service_name]

SERVICE_NAME=${1:-}

if [ -z "$SERVICE_NAME" ]; then
    echo "📝 Viewing logs for all services..."
    echo "🔍 To view logs for a specific service, run: ./scripts/logs.sh <service_name>"
    echo "   Available services: poke-rol-api, poke-rol-ui, poke-rol-db"
    echo ""
    docker-compose logs -f
else
    echo "📝 Viewing logs for service: $SERVICE_NAME"
    docker-compose logs -f "$SERVICE_NAME"
fi
