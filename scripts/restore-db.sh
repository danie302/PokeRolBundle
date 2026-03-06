#!/bin/bash

# Script to restore MongoDB database to Docker container
# Usage: ./scripts/restore-db.sh <backup_tarball>
# Example: ./scripts/restore-db.sh backups/mongodb_pokerol_20250306_143000.tar.gz

# MongoDB connection details from docker-compose.yml
MONGO_USERNAME="poke-master"
MONGO_PASSWORD="pokeplayer321"
MONGO_HOST="poke-rol-db"
MONGO_PORT="27017"
CONTAINER_NAME="poke-rol-db"

# Check if backup file is provided
BACKUP_FILE=${1:-}

if [ -z "$BACKUP_FILE" ]; then
    echo "❌ Error: No backup file provided!"
    echo ""
    echo "🔍 Usage: ./scripts/restore-db.sh <backup_tarball>"
    echo ""
    echo "📋 Available backups:"
    if [ -d "./backups" ]; then
        ls -lh ./backups/*.tar.gz 2>/dev/null | awk '{print "   " $9 " (" $5 ")"}' || echo "   No backups found in ./backups/"
    else
        echo "   No backups directory found"
    fi
    echo ""
    echo "💡 Example: ./scripts/restore-db.sh backups/mongodb_pokerol_20250306_143000.tar.gz"
    exit 1
fi

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Error: Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Check if container is running
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    echo "❌ Error: MongoDB container '$CONTAINER_NAME' is not running!"
    echo "   Start it with: ./scripts/start.sh"
    exit 1
fi

echo "📥 Starting MongoDB restore..."
echo "   Backup file: $BACKUP_FILE"
echo ""

# Extract backup tarball to a temporary directory
TEMP_DIR="./temp_restore"
mkdir -p "$TEMP_DIR"

echo "📦 Extracting backup..."
tar -xzf "$BACKUP_FILE" -C "$TEMP_DIR"

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to extract backup file!"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Find the extracted directory (it should contain the db dump)
EXTRACTED_DIR=$(find "$TEMP_DIR" -mindepth 1 -maxdepth 1 -type d | head -1)

if [ -z "$EXTRACTED_DIR" ]; then
    echo "❌ Error: No data found in backup archive!"
    rm -rf "$TEMP_DIR"
    exit 1
fi

echo "   Extracted to: $EXTRACTED_DIR"
echo ""

# Copy extracted backup to container
echo "📋 Copying backup to container..."
docker cp "$EXTRACTED_DIR/." "$CONTAINER_NAME:/tmp/mongodb_restore"

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to copy backup to container!"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Restore the database
echo "🔄 Restoring database..."
docker exec "$CONTAINER_NAME" mongorestore \
    --host localhost \
    --port "$MONGO_PORT" \
    --username "$MONGO_USERNAME" \
    --password "$MONGO_PASSWORD" \
    --authenticationDatabase admin \
    /tmp/mongodb_restore

RESTORE_STATUS=$?

# Clean up
echo "🧹 Cleaning up..."
docker exec "$CONTAINER_NAME" rm -rf /tmp/mongodb_restore
rm -rf "$TEMP_DIR"

if [ $RESTORE_STATUS -eq 0 ]; then
    echo ""
    echo "✅ Database restore completed successfully!"
    echo ""
    echo "💡 You may need to restart your application to see the changes:"
    echo "   ./scripts/restart.sh"
else
    echo ""
    echo "❌ Error: Database restore failed!"
    exit 1
fi
