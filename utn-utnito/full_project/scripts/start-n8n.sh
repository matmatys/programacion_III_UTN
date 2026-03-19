#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
DOCKER_DIR="${PROJECT_DIR}/chat-docker"
COMPOSE_FILE="${DOCKER_DIR}/docker-compose.yml"
N8N_PORT=5690

log_info() {
  printf '[INFO] %s\n' "$1"
}

log_warn() {
  printf '[WARN] %s\n' "$1"
}

wait_for_http() {
  local url="$1"
  local label="$2"
  local attempts=20
  local delay_seconds=2
  local attempt=1

  if ! command -v curl >/dev/null 2>&1; then
    log_warn "curl not available. Skipping ${label} endpoint check."
    return 0
  fi

  while (( attempt <= attempts )); do
    if curl -fsS "${url}" >/dev/null 2>&1; then
      log_info "${label} is reachable at ${url}."
      return 0
    fi

    sleep "${delay_seconds}"
    attempt=$((attempt + 1))
  done

  log_warn "${label} did not become reachable at ${url} after $((attempts * delay_seconds)) seconds."
  return 1
}

log_info "Running diagnostics before startup (n8n mode)."
"${SCRIPT_DIR}/doctor.sh" n8n

log_info "Starting n8n service."
docker compose -f "${COMPOSE_FILE}" up -d chat-n8n

log_info "Current container status:"
docker compose -f "${COMPOSE_FILE}" ps

wait_for_http "http://localhost:${N8N_PORT}" "chat-n8n" || true

log_info "utn-utnito n8n service is running."
