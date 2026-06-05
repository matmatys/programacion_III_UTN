# Clase 20 - n8n automation AI mock

## 1. Problema
- El backend no deberia mezclar chat, persistencia y logica de AI en el mismo service.
- Antes de conectar AI real, necesitamos un contrato estable.

## 2. Conceptos base
- Orquestacion
- Webhook
- Contrato entre servicios
- Payload de entrada
- Respuesta normalizada
- Separacion de responsabilidades

## 3. Step 1
- Crear `AiService`.
- Crear `MockAiProvider`.
- Delegar respuesta del asistente desde `MessageService`.
- `AI_PROVIDER=mock`.

## 4. Step 2
- Crear `N8nAiProvider`.
- Agregar `@nestjs/axios`.
- Enviar payload al webhook.
- Leer `data.assistantMessage`.
- Mantener provider mock por defecto hasta tener workflow.

## 5. Step 3
- Agregar `chat-n8n` a Compose.
- Importar workflow mock.
- Activar workflow.
- Cambiar backend a `AI_PROVIDER=n8n`.
- Mostrar logs desde Docker Desktop.

## 6. Cierre
- El mensaje ya pasa por una automatizacion externa.
- La respuesta sigue siendo mock.
- La clase siguiente reemplaza el mock por prompt + AI real.
