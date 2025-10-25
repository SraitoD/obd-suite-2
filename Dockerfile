# Syntax=docker/dockerfile:1.4

# ----- Base -----
FROM node:18-alpine AS base
WORKDIR /app
RUN apk add --no-cache python3 py3-pip postgresql-client git openssh-client

# ----- Backend -----
FROM base AS backend
WORKDIR /app/backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
ENV PYTHONPATH=/app/backend

# Dev stage
FROM backend AS dev
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# Prod stage
FROM python:3.9-slim AS prod
WORKDIR /app/backend
COPY --from=backend /app/backend .
COPY --from=backend /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
RUN apt-get update && apt-get install -y libpq5 && rm -rf /var/lib/apt/lists/*
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]

# ----- Web -----
FROM base AS web
WORKDIR /app/web
COPY web/package.json web/package-lock.json ./
RUN npm install
COPY web/ .
RUN npm run build
EXPOSE 3000

# Dev stage
FROM web AS web-dev
CMD ["npm", "run", "dev"]

# Prod stage
FROM web AS web-prod
CMD ["npm", "start"]

# ----- Mobile -----
FROM ghcr.io/cirruslabs/flutter:stable AS mobile
WORKDIR /app/mobile
COPY mobile/pubspec.yaml mobile/pubspec.lock ./
RUN flutter pub get
COPY mobile/ .
EXPOSE 3001

# Dev stage
FROM mobile AS mobile-dev
CMD ["flutter", "run", "-d", "web-server", "--web-port", "3001", "--web-hostname", "0.0.0.0"]

# ----- Final -----
FROM alpine:latest AS final
WORKDIR /app
COPY --from=prod /app/backend ./backend
COPY --from=web-prod /app/web ./web
COPY --from=mobile /app/mobile ./mobile
