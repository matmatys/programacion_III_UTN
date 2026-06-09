# Clase 21 - Message module + AI real

## Conceptos teoricos de la clase

## 🧠 ¿Qué es un LLM?
Un LLM (Large Language Model) es un modelo de inteligencia artificial entrenado con enormes cantidades de texto.
Aprende patrones del lenguaje y puede generar respuestas similares a las de una persona.
No busca respuestas en Internet por defecto ni "piensa" como un humano.
Predice cuál es la siguiente palabra más probable según el contexto recibido.

## 🔬 ¿Cómo se descubrieron?
Los investigadores intentaban mejorar sistemas de procesamiento de lenguaje natural desde hace décadas.
Un gran avance llegó con la arquitectura Transformer presentada por Google en 2017.
Se descubrió que entrenando modelos cada vez más grandes sobre grandes volúmenes de texto aparecían nuevas capacidades.
De ahí nacieron modelos como GPT, Claude, Gemini y Llama.

## ⚙️ ¿Cómo funcionan?
Reciben texto de entrada y lo transforman en números llamados tokens.
Analizan las relaciones entre esos tokens utilizando una red neuronal enorme.
Luego generan una respuesta prediciendo token por token hasta completar el texto.
No almacenan conversaciones permanentemente; trabajan sobre el contexto que reciben en cada petición.

## 📝 ¿Qué es un Prompt?
El prompt es la instrucción que enviamos al modelo para pedir una respuesta.
Puede contener preguntas, reglas, personalidad o formato esperado.
La calidad del prompt influye mucho en la calidad de la respuesta.
Es la forma principal de comunicarnos con un modelo de IA.

## 📚 ¿Qué es el Contexto?
El contexto es toda la información adicional que acompaña al prompt.
Puede incluir mensajes anteriores, datos del usuario o información del sistema.
Le permite al modelo responder teniendo en cuenta la conversación actual.
Sin contexto, cada mensaje sería interpretado como una consulta aislada.

## 🤖 ¿Cómo lo usamos en nuestra clase?
Nuestro backend construye un prompt y agrega contexto reciente de la conversación.
Luego envía esa información a n8n mediante un contrato HTTP definido.
n8n llama al proveedor configurado (ChatGPT u Ollama) y obtiene la respuesta.
Finalmente el backend devuelve la respuesta al frontend manteniendo siempre el mismo contrato de API.

## Conceptos prácticos de la clase

## 1. Problema
- El chat ya puede pedir una respuesta a n8n.
- Ahora queremos que esa respuesta salga de un proveedor AI real.
- El modulo de mensajes no deberia depender de un proveedor concreto.

## 2. Conceptos base
- Provider strategy
- Prompt
- Contexto conversacional
- Orquestacion con n8n
- Credenciales fuera del backend
- Fallback controlado

## 3. Step 1
- Guardar primero el mensaje del usuario.
- Buscar contexto reciente.
- Crear prompt configurable.
- Mantener n8n mock.

## 4. Step 2
- Agregar provider `chatgpt`.
- Importar workflow OpenAI.
- Configurar credenciales en n8n.
- Validar respuesta real.
- Forzar error y observar fallback mock.

## 5. Step 3
- Agregar provider `ollama`.
- Levantar `chat-ollama` con Docker profile.
- Importar workflow Ollama.
- Comparar proveedor cloud vs proveedor local.

## 6. Cierre
- El frontend no cambio.
- El backend mantiene el contrato de producto.
- n8n orquesta proveedores externos.
- El modulo de mensajes sigue funcionando aunque falle AI real.
