#!/bin/bash

# Script to clean up docker-compose resources
# WARNING: This will remove all containers, volumes, and images

echo "⚠️  WARNING: This will remove all containers, volumes, and images!"
echo ""
read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborted!"
    exit 1
fi

echo "🧹 Cleaning up all containers, volumes, and images..."
docker-compose down -v --rmi all

echo "✅ Cleanup complete!"
echo ""
echo "🚀 To rebuild and start: ./scripts/build.sh && ./scripts/start.sh"
