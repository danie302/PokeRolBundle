#!/bin/bash

# Script to backup MongoDB database from Docker container
# Usage: ./scripts/backup-db.sh [database_name]
# If no database name is provided, backs up all databases

# MongoDB connection details from docker-compose.yml
MONGO_USERNAME="poke-master"
MONGO_PASSWORD="pokeplayer321"
MONGO_HOST="poke-rol-db"
MONGO_PORT="27017"
CONTAINER_NAME="poke-rol-db"

# Database name (optional - if not provided, backs up all databases)
DB_NAME=${1:-}

# Create backups directory if it doesn't exist
BACKUP_DIR="./backups"
mkdir -p "$BACKUP_DIR"

# Generate timestamp for backup filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Check if container is running
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    echo "❌ Error: MongoDB container '$CONTAINER_NAME' is not running!"
    echo "   Start it with: ./scripts/start.sh"
    exit 1
fi

echo "📦 Starting MongoDB backup..."

if [ -z "$DB_NAME" ]; then
    # Backup all databases
    BACKUP_PATH="$BACKUP_DIR/mongodb_all_$TIMESTAMP"
    echo "   Backing up all databases..."
    
    docker exec "$CONTAINER_NAME" mongodump \
        --host localhost \
        --port "$MONGO_PORT" \
        --username "$MONGO_USERNAME" \
        --password "$MONGO_PASSWORD" \
        --authenticationDatabase admin \
        --out /tmp/mongodb_backup
    
    # Copy backup from container to host
    docker cp "$CONTAINER_NAME:/tmp/mongodb_backup" "$BACKUP_PATH"
    
    # Clean up backup in container
    docker exec "$CONTAINER_NAME" rm -rf /tmp/mongodb_backup
    
    echo "✅ Backup completed: $BACKUP_PATH"
else
    # Backup specific database
    BACKUP_PATH="$BACKUP_DIR/mongodb_${DB_NAME}_$TIMESTAMP"
    echo "   Backing up database: $DB_NAME"
    
    docker exec "$CONTAINER_NAME" mongodump \
        --host localhost \
        --port "$MONGO_PORT" \
        --username "$MONGO_USERNAME" \
        --password "$MONGO_PASSWORD" \
        --authenticationDatabase admin \
        --db "$DB_NAME" \
        --out /tmp/mongodb_backup
    
    # Copy backup from container to host
    docker cp "$CONTAINER_NAME:/tmp/mongodb_backup" "$BACKUP_PATH"
    
    # Clean up backup in container
    docker exec "$CONTAINER_NAME" rm -rf /tmp/mongodb_backup
    
    echo "✅ Backup completed: $BACKUP_PATH"
fi

# Compress the backup
echo "🗜️  Compressing backup..."
cd "$BACKUP_DIR" || exit 1
TARBALL="${BACKUP_PATH##*/}.tar.gz"
tar -czf "$TARBALL" "${BACKUP_PATH##*/}" && rm -rf "${BACKUP_PATH##*/}"
cd - > /dev/null || exit 1

echo "✅ Backup compressed: $BACKUP_DIR/$TARBALL"
echo ""
echo "📊 Backup size: $(du -h "$BACKUP_DIR/$TARBALL" | cut -f1)"
echo ""
echo "💡 To restore this backup, use: ./scripts/restore-db.sh $BACKUP_DIR/$TARBALL"

