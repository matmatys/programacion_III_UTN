#!/bin/sh
set -e

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
