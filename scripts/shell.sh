#!/bin/bash

# Script to open a shell in a running container
# Usage: ./scripts/shell.sh <service_name>

SERVICE_NAME=${1:-}

if [ -z "$SERVICE_NAME" ]; then
    echo "❌ Error: No service name provided!"
    echo ""
    echo "🔍 Usage: ./scripts/shell.sh <service_name>"
    echo ""
    echo "📋 Available services:"
    echo "   poke-rol-api"
    echo "   poke-rol-ui"
    echo "   poke-rol-db"
    echo ""
    echo "💡 Example: ./scripts/shell.sh poke-rol-api"
    exit 1
fi

echo "🐚 Opening shell in service: $SERVICE_NAME"
docker-compose exec "$SERVICE_NAME" /bin/sh
