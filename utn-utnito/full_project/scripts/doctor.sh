#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
DOCKER_DIR="${PROJECT_DIR}/chat-docker"
COMPOSE_FILE="${DOCKER_DIR}/docker-compose.yml"
DOCTOR_MODE="${1:-n8n}"

FRONTEND_PORT=4300
CORE_SERVICE_PORT=4012
N8N_PORT=5690
OLLAMA_PORT=8300

log_info() {
  printf '[INFO] %s\n' "$1"
}

log_warn() {
  printf '[WARN] %s\n' "$1"
}

log_error() {
  printf '[ERROR] %s\n' "$1" >&2
}

check_command() {
  local command_name="$1"
  if command -v "${command_name}" >/dev/null 2>&1; then
    log_info "Found ${command_name}: $(command -v "${command_name}")"
    return 0
  fi

  log_error "Missing required command: ${command_name}"
  return 1
}

check_docker_compose() {
  if docker compose version >/dev/null 2>&1; then
    log_info "Docker Compose v2 is available."
    return 0
  fi

  log_error "Docker Compose v2 is not available (docker compose)."
  return 1
}

port_in_use() {
  local port="$1"
  if command -v lsof >/dev/null 2>&1; then
    lsof -iTCP:"${port}" -sTCP:LISTEN -n -P >/dev/null 2>&1
    return $?
  fi

  log_warn "lsof command not available; skipping port check for ${port}."
  return 1
}

diagnose_ports() {
  local collisions=0
  local ports=()

  if [[ "${DOCTOR_MODE}" == "full" ]]; then
    ports=("${FRONTEND_PORT}" "${CORE_SERVICE_PORT}" "${N8N_PORT}")
  elif [[ "${DOCTOR_MODE}" == "ollama" ]]; then
    ports=("${OLLAMA_PORT}")
  else
    ports=("${N8N_PORT}")
  fi

  for port in "${ports[@]}"; do
    if port_in_use "${port}"; then
      log_error "Port ${port} is already in use."
      collisions=$((collisions + 1))
    else
      log_info "Port ${port} is available."
    fi
  done

  if ((collisions > 0)); then
    log_error "Detected ${collisions} port collision(s)."
    return 1
  fi

  return 0
}

validate_compose() {
  if docker compose -f "${COMPOSE_FILE}" config -q; then
    log_info "docker-compose.yml is valid."
    return 0
  fi

  log_error "docker-compose.yml validation failed."
  return 1
}

print_versions() {
  log_info "node version: $(node -v 2>/dev/null || echo 'not available')"
  log_info "npm version: $(npm -v 2>/dev/null || echo 'not available')"
  log_info "docker version: $(docker --version 2>/dev/null || echo 'not available')"
  log_info "docker compose version: $(docker compose version 2>/dev/null || echo 'not available')"
  log_info "git version: $(git --version 2>/dev/null || echo 'not available')"
}

if [[ "${DOCTOR_MODE}" != "n8n" && "${DOCTOR_MODE}" != "full" && "${DOCTOR_MODE}" != "ollama" ]]; then
  log_error "Invalid doctor mode: ${DOCTOR_MODE}. Allowed values: n8n | full | ollama"
  exit 1
fi

log_info "Running utn-utnito doctor (mode: ${DOCTOR_MODE})."

status=0
check_command git || status=1
check_command node || status=1
check_command npm || status=1
check_command docker || status=1
check_docker_compose || status=1

if ((status != 0)); then
  exit "${status}"
fi

print_versions
validate_compose
diagnose_ports

log_info "Doctor finished successfully."
