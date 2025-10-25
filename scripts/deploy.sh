#!/bin/bash
set -euo pipefail

# Usage: ./deploy.sh [dev|prod] [version]

ENV=${1:-dev}
VERSION=${2:-latest}
COMPOSE_FILE="docker-compose.${ENV}.yml"
PROJECT_NAME="obd-suite-2-${ENV}"

echo "🚀 Déploiement de OBD Suite 2 (v${VERSION}) en ${ENV}..."

# Charger les variables d'environnement
set -a
source .env
set +a

# Pull des dernières images
docker compose -f ${COMPOSE_FILE} -p ${PROJECT_NAME} pull

# Stop les services existants
docker compose -f ${COMPOSE_FILE} -p ${PROJECT_NAME} down --remove-orphans

# Rebuild si nécessaire
if [ "${ENV}" = "prod" ]; then
    docker compose -f ${COMPOSE_FILE} -p ${PROJECT_NAME} build --no-cache
fi

# Démarrer les services
docker compose -f ${COMPOSE_FILE} -p ${PROJECT_NAME} up -d

# Vérification
if docker compose -f ${COMPOSE_FILE} -p ${PROJECT_NAME} ps | grep -q "Up"; then
    echo "✅ Déploiement réussi!"
    if [ "${ENV}" = "prod" ]; then
        echo "🌐 Application disponible sur: https://${DOMAIN}"
    else
        echo "🌐 Application disponible en local (port forwarding nécessaire)"
    fi
else
    echo "❌ Échec du déploiement"
    exit 1
fi
