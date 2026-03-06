# Docker Compose Scripts

This directory contains helper scripts to interact with the docker-compose services.

## Available Services

- `poke-rol-api` - API service (port 3000)
- `poke-rol-ui` - UI service (port 5173)
- `poke-rol-db` - MongoDB database (port 27017)

## Scripts

### Start Services
```bash
./scripts/start.sh
```
Starts all services in detached mode.

### Stop Services
```bash
./scripts/stop.sh
```
Stops all services and removes containers.

### Restart Services
```bash
./scripts/restart.sh
```
Restarts all running services.

### View Logs
```bash
# View all logs
./scripts/logs.sh

# View logs for a specific service
./scripts/logs.sh poke-rol-api
```

### Rebuild Services
```bash
# Rebuild all services
./scripts/build.sh

# Rebuild a specific service
./scripts/build.sh poke-rol-api
```

### Open Shell
```bash
# Open shell in a service
./scripts/shell.sh poke-rol-api
```

### Clean Everything
```bash
./scripts/clean.sh
```
Stops and removes all containers, volumes, and images. ⚠️ **Warning: This will delete all data!**

## Quick Reference

| Command | Description |
|---------|-------------|
| `./scripts/start.sh` | Start all services |
| `./scripts/stop.sh` | Stop all services |
| `./scripts/restart.sh` | Restart all services |
| `./scripts/logs.sh <service>` | View logs |
| `./scripts/build.sh` | Rebuild services |
| `./scripts/shell.sh <service>` | Open shell in service |
| `./scripts/clean.sh` | Clean up everything |
