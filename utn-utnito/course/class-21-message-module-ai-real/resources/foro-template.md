# Foro - Clase 21

## Tema
Message module + AI real con ChatGPT, Ollama y fallback.

## Consigna sugerida
Levantar el stack de clase 21, importar al menos un workflow real de n8n y responder:

1. Que informacion incluye el prompt que arma el backend?
2. Para que sirve `AI_CONTEXT_MAX_PAIRS`?
3. Que diferencia hay entre `AI_PROVIDER=chatgpt` y `AI_PROVIDER=ollama`?
4. Donde se configuran las credenciales de OpenAI?
5. Por que el backend no llama directamente a OpenAI?
6. Que forma de respuesta espera siempre el backend desde n8n?
7. Que pasa si falla ChatGPT u Ollama y `AI_ON_ERROR_FALLBACK=mock`?

## Entrega esperada
- Captura o texto de `docker compose ps`.
- Captura del workflow importado y activo en n8n.
- Mensaje enviado desde UTNito con respuesta AI real.
- Evidencia breve del fallback a mock.
- Respuestas breves a las preguntas.

## Opcional
Si probaste Ollama:
- Captura de `chat-ollama` corriendo.
- Modelo usado en `AI_OLLAMA_MODEL`.
- Comentario breve sobre tiempo de descarga/arranque del modelo.
