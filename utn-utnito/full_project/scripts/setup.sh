#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

log_info() {
  printf '[INFO] %s\n' "$1"
}

log_warn() {
  printf '[WARN] %s\n' "$1"
}

log_error() {
  printf '[ERROR] %s\n' "$1" >&2
}

require_command() {
  local command_name="$1"
  if ! command -v "${command_name}" >/dev/null 2>&1; then
    log_error "Missing required command: ${command_name}"
    exit 1
  fi
}

require_docker_compose() {
  if ! docker compose version >/dev/null 2>&1; then
    log_error "Docker Compose v2 is not available (docker compose)."
    exit 1
  fi
}

install_node_dependencies() {
  local app_dir="$1"
  local app_name="$2"

  if [[ ! -d "${app_dir}" ]]; then
    log_warn "Directory not found for ${app_name}: ${app_dir}. Skipping."
    return
  fi

  if [[ -f "${app_dir}/package-lock.json" ]]; then
    log_info "Running npm ci in ${app_name}."
    (cd "${app_dir}" && npm ci)
    return
  fi

  if [[ -f "${app_dir}/package.json" ]]; then
    log_info "Running npm install in ${app_name}."
    (cd "${app_dir}" && npm install)
    return
  fi

  log_info "No package.json found in ${app_name}. Skipping dependency install."
}

log_info "Starting setup for utn-utnito."

require_command git
require_command node
require_command npm
require_command docker
require_docker_compose

log_info "Manual tools reminder: install Docker Desktop, Visual Studio Code, and DBeaver manually."

install_node_dependencies "${PROJECT_DIR}/backend/chat-core-service" "chat-core-service"
install_node_dependencies "${PROJECT_DIR}/frontend/chat-app" "chat-app"

log_info "Running environment diagnostics."
"${SCRIPT_DIR}/doctor.sh" n8n

log_info "Setup completed."
