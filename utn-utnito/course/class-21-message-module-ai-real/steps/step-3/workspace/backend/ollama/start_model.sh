#!/bin/sh
set -e

unload_active_models() {
  ACTIVE_MODELS="$(ollama ps 2>/dev/null | awk 'NR > 1 && $1 != "" { print $1 }' | sort -u)"

  if [ -z "${ACTIVE_MODELS}" ]; then
    echo "[chat-ollama] No active models to unload."
    return 0
  fi

  echo "[chat-ollama] Unloading active models before startup."
  echo "${ACTIVE_MODELS}" | while IFS= read -r active_model; do
    [ -z "${active_model}" ] && continue

    echo "[chat-ollama] Stopping active model: ${active_model}"
    if ! ollama stop "${active_model}" >/dev/null 2>&1; then
      echo "[chat-ollama] Warning: failed to stop active model ${active_model}."
    fi
  done
}

ollama serve &
SERVER_PID=$!

MODEL_NAME="${MODEL_NAME:-llama3.2}"
ATTEMPT=1
MAX_ATTEMPTS=30

echo "[chat-ollama] Waiting for Ollama server..."
while ! ollama list >/dev/null 2>&1; do
  if [ "$ATTEMPT" -ge "$MAX_ATTEMPTS" ]; then
    echo "[chat-ollama] Error: Ollama server did not become ready in time."
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    exit 1
  fi

  ATTEMPT=$((ATTEMPT + 1))
  sleep 2
done

unload_active_models

echo "[chat-ollama] Ensuring model is available: ${MODEL_NAME}"
if ! ollama show "${MODEL_NAME}" >/dev/null 2>&1; then
  ollama pull "${MODEL_NAME}"
fi

if ! ollama show "${MODEL_NAME}" >/dev/null 2>&1; then
  echo "[chat-ollama] Error: model ${MODEL_NAME} is still not available after pull."
  kill "$SERVER_PID" >/dev/null 2>&1 || true
  exit 1
fi

echo "[chat-ollama] Server ready with model ${MODEL_NAME}"
wait "$SERVER_PID"
