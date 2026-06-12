# Clase 22 - Repaso final de la practica

## Slide 01 - Arquitectura final de UTNito
- UTNito termina como una aplicacion full stack de chat.
- El frontend Angular resuelve la experiencia de usuario: login, chat, estados visuales y consumo de API.
- El backend NestJS concentra contrato HTTP, auth, conversaciones, mensajes, validaciones, errores y persistencia.
- SQLite guarda el estado del producto: conversaciones y mensajes.
- n8n orquesta la integracion AI con ChatGPT u Ollama.
- Docker Compose permite levantar el sistema como un conjunto de servicios.

## Slide 02 - Flujo principal de un mensaje
- El usuario escribe un mensaje en el frontend.
- Angular llama al backend usando el contrato HTTP definido.
- NestJS valida la request, identifica la conversacion y persiste el mensaje del usuario.
- El backend arma contexto reciente y delega la respuesta AI.
- n8n recibe el webhook, llama al proveedor configurado y normaliza la respuesta.
- El backend guarda la respuesta del asistente y el frontend la muestra en el chat.

## Slide 03 - Responsabilidades por capa
- Frontend: mostrar pantallas, manejar interaccion, estados visuales y llamadas HTTP.
- Backend: proteger endpoints, aplicar reglas de negocio, persistir datos y mantener contratos.
- Base de datos: conservar conversaciones y mensajes mas alla de la memoria.
- n8n: separar orquestacion AI del codigo central del backend.
- Proveedores AI: generar respuestas a partir de prompt y contexto.
- Docker: hacer reproducible como se levanta el stack.

## Slide 04 - Version minima vs version final
- En cada clase aislamos un concepto para entenderlo sin mezclar demasiadas piezas.
- La version final integra muchos conceptos al mismo tiempo.
- No hace falta haber visto todo el `full_project` para entender su mapa.
- La clave es reconocer capas, contratos, responsabilidades y flujo de datos.

## Slide 05 - Clase 01 - Setup + Hello World (Angular)
- Entorno de desarrollo.
- Node.js, Git y Visual Studio Code.
- Primer proyecto Angular ejecutandose localmente.
- UTNito como proyecto incremental de la cursada.

## Slide 06 - Clase 01 - Que se construyo
- Se preparo el entorno comun de trabajo.
- Se clono el repositorio y se ejecuto una app Angular base.
- Frase clave: si todos pueden correr lo mismo, la clase puede avanzar.
- Frase clave: UTNito no aparece de golpe; se construye por capas.

## Slide 07 - Clase 02 - HTML Basico + Login
- HTML como estructura de una pantalla.
- Etiquetas principales, formularios, inputs y labels.
- Navegacion simple entre pantallas.
- Separacion inicial entre estructura y presentacion.

## Slide 08 - Clase 02 - Que se construyo
- Se construyo una pantalla estatica de login.
- El login quedo navegable y preparado para recibir estilos.
- Frase clave: HTML define que existe en la pantalla.
- Frase clave: una pantalla simple ya puede expresar una intencion de producto.

## Slide 09 - Clase 03 - CSS + Chat Layout (HTML/CSS)
- CSS para organizar jerarquia visual.
- Box model, selectores y Flexbox.
- Layout de chat con sidebar, header, mensajes y composer.
- Primer uso de Git aplicado al proyecto.

## Slide 10 - Clase 03 - Que se construyo
- Se maqueto la pantalla principal del chat.
- Se paso de una pantalla suelta a una interfaz con estructura de producto.
- Frase clave: CSS no es solo color; tambien es arquitectura visual.
- Frase clave: el layout del chat muestra que tipo de sistema estamos construyendo.

## Slide 11 - Clase 04 - JavaScript basico en el navegador
- JavaScript ejecutandose del lado cliente.
- DOM, eventos y preventDefault.
- Render dinamico de mensajes.
- Asincronia inicial con respuesta mock.

## Slide 12 - Clase 04 - Que se construyo
- Se conecto comportamiento real a la maqueta HTML/CSS.
- El chat pudo reaccionar a acciones del usuario y simular una respuesta.
- Frase clave: JavaScript convierte maqueta en interfaz viva.
- Frase clave: el mock permite practicar el flujo antes de tener backend.

## Slide 13 - Clase 05 - Angular minimo: migrar login + chat shell
- Angular como framework para ordenar la UI.
- Componentes como unidad principal de interfaz.
- LoginComponent y ChatComponent.
- Migracion desde HTML estatico a app Angular.

## Slide 14 - Clase 05 - Que se construyo
- Se migro el login y el shell del chat a Angular.
- La app quedo dividida en componentes visuales.
- Frase clave: un componente encapsula una parte de la interfaz.
- Frase clave: Angular da estructura para que la UI pueda crecer.

## Slide 15 - Clase 06 - Componentes y Routing (Angular)
- Routing en una SPA.
- Rutas `/login` y `/chat`.
- Router outlet, routerLink y navegacion por codigo.
- La URL como representacion de la pantalla activa.

## Slide 16 - Clase 06 - Que se construyo
- Se conectaron login y chat usando navegacion interna.
- La app pudo cambiar de pantalla sin recargar todo el navegador.
- Frase clave: en una SPA, cambiar de pantalla no significa recargar la pagina.
- Frase clave: el router conecta URLs con componentes.

## Slide 17 - Clase 07 - Binding, eventos y formularios (Angular)
- Interpolacion y property binding.
- Event binding.
- Submit de formularios.
- Validacion minima en login y composer.

## Slide 18 - Clase 07 - Que se construyo
- Se agrego interaccion real al login y al composer del chat.
- El usuario pudo escribir, validar y disparar acciones desde la UI.
- Frase clave: una UI interactiva nace cuando datos y eventos se encuentran.
- Frase clave: un formulario bien manejado protege el flujo antes de llegar al backend.

## Slide 19 - Clase 08 - Estado local del chat (Angular)
- Estado local en memoria.
- Conversacion activa.
- Lista de conversaciones y mensajes.
- Envio local con respuesta mock.
- Filtro simple por titulo.

## Slide 20 - Clase 08 - Que se construyo
- Se construyo un chat navegable usando estado local.
- La UI pudo seleccionar conversaciones, mostrar mensajes y enviar respuestas mock.
- Frase clave: antes de pedir datos a una API, hay que saber que estado necesita la pantalla.
- Frase clave: el estado local permite descubrir el modelo mental del producto.

## Slide 21 - Clase 09 - Servicios y modelos en Angular
- Separacion entre componente, logica y datos.
- Modelos tipados.
- MockBackendService.
- AuthService y ChatService.
- Responsabilidades mas claras en frontend.

## Slide 22 - Clase 09 - Que se construyo
- Se movio logica de los componentes hacia servicios.
- Se crearon modelos para representar usuarios, conversaciones y mensajes.
- Frase clave: el componente muestra; el servicio decide y coordina.
- Frase clave: los modelos hacen explicito que datos espera manejar la aplicacion.

## Slide 23 - Clase 10 - Asincronia en Angular (HttpClient + Observables)
- HttpClient.
- Observables.
- JSON mock consumido como si fuera API.
- Estados loading, error y sending.
- Flujo asincronico de conversaciones, mensajes y envio.

## Slide 24 - Clase 10 - Que se construyo
- Se reemplazo parte del mock local por llamadas HTTP asincronicas.
- La UI empezo a representar espera, error y envio en curso.
- Frase clave: en frontend real, casi todo lo importante llega despues.
- Frase clave: una app que consume datos tiene que saber esperar.

## Slide 25 - Clase 11 - Contrato API y Swagger-first
- API-first.
- Recursos, endpoints y metodos HTTP.
- Requests y responses.
- Swagger como herramienta visual de contrato.
- Alineacion entre frontend y backend.

## Slide 26 - Clase 11 - Que se construyo
- Se definio el contrato de auth, conversaciones y mensajes.
- Se uso Swagger para visualizar como deberia hablar la API.
- Frase clave: el contrato evita que frontend y backend se adivinen.
- Frase clave: pensar la API antes de implementarla reduce sorpresas.

## Slide 27 - Clase 12 - Backend mock rapido con NestJS
- NestJS como framework backend.
- Modules, controllers y services.
- Controllers como entrada HTTP.
- Services como lugar de logica.
- Respuestas compartidas.

## Slide 28 - Clase 12 - Que se construyo
- Se implemento un backend mock respetando el contrato de la clase anterior.
- Se organizaron auth, conversaciones y mensajes en modulos.
- Frase clave: el backend tambien se organiza por responsabilidades.
- Frase clave: un mock bien armado prepara el camino para una implementacion real.

## Slide 29 - Clase 13 - Integracion frontend + backend (Angular + NestJS)
- Integracion HTTP real.
- Angular consumiendo NestJS.
- Login, conversaciones, mensajes y acciones conectadas.
- Primer flujo end-to-end.

## Slide 30 - Clase 13 - Que se construyo
- Se conecto la app Angular con el backend NestJS.
- El chat dejo de depender solo de datos locales o archivos mock.
- Frase clave: la app se vuelve sistema cuando las partes conversan por contrato.
- Frase clave: si el contrato se mantiene, la implementacion puede evolucionar.

## Slide 31 - Clase 14 - Auth JWT backend (login, me, refresh)
- Autenticacion JWT en backend.
- Login con access token y refresh token.
- Endpoints protegidos con Bearer token.
- JwtStrategy y JwtAuthGuard.

## Slide 32 - Clase 14 - Que se construyo
- Se agrego login con tokens al backend.
- Se protegieron endpoints y se incorporo refresh token.
- Frase clave: autenticarse es demostrar quien soy.
- Frase clave: autorizar es decidir que puedo hacer despues de autenticarme.

## Slide 33 - Clase 15 - JWT frontend integration (guard, interceptor, refresh)
- Token storage.
- Route guard.
- Interceptor Bearer.
- Refresh token desde frontend.
- Flujo JWT end-to-end.

## Slide 34 - Clase 15 - Que se construyo
- Se integro el frontend Angular con el backend protegido por JWT.
- El frontend pudo guardar tokens, proteger rutas y enviar Bearer en requests.
- Frase clave: el frontend participa del flujo de seguridad, pero no decide solo.
- Frase clave: el interceptor evita repetir logica de auth en cada llamada HTTP.

## Slide 35 - Clase 16 - Persistencia backend con SQLite (TypeORM)
- SQLite.
- TypeORM.
- Entidades de conversaciones y mensajes.
- Repositorios.
- Persistencia sin romper el contrato API.

## Slide 36 - Clase 16 - Que se construyo
- Se migro el backend desde arrays en memoria a base de datos.
- Conversaciones y mensajes quedaron persistidos en SQLite.
- Frase clave: persistir datos cambia el interior del backend, no necesariamente el contrato.
- Frase clave: una base de datos convierte el chat en memoria de producto.

## Slide 37 - Clase 17 - Backend Config, ValidationPipe y manejo global de errores
- Configuracion por entorno.
- ConfigService.
- ValidationPipe global.
- DTO validation.
- AllExceptionsFilter y error shape consistente.

## Slide 38 - Clase 17 - Que se construyo
- Se quitaron valores hardcodeados y se fortalecio la API.
- Se agrego validacion global y manejo centralizado de errores.
- Frase clave: una API real no solo responde cuando todo sale bien.
- Frase clave: validar y normalizar errores hace que el sistema sea mas facil de consumir.

## Slide 39 - Clase 18 - Frontend: estados de UI (loading, error, vacio)
- Loading state.
- Empty state.
- Error state.
- Retry.
- Componentes reutilizables para UX minima.

## Slide 40 - Clase 18 - Que se construyo
- Se agregaron skeleton, empty state y error state al frontend.
- La lista de conversaciones dejo de depender solo del happy path.
- Frase clave: una pantalla en blanco tambien comunica, pero comunica mal.
- Frase clave: una UI robusta muestra que esta pasando aunque la red falle.

## Slide 41 - Clase 19 - Docker basico y docker-compose
- Dockerfile.
- Imagenes y contenedores.
- Puertos y variables de entorno.
- Volumen para SQLite.
- Docker Compose, red interna y healthchecks.

## Slide 42 - Clase 19 - Que se construyo
- Se dockerizaron backend y frontend.
- Se levanto el stack con Compose usando red interna y volumen.
- Frase clave: Docker empaqueta como corre una app, no solo que codigo tiene.
- Frase clave: Compose permite pensar el sistema como un conjunto de servicios.

## Slide 43 - Clase 20 - n8n automation AI mock
- Orquestacion con n8n.
- Webhook.
- Contrato entre backend y automation.
- AiService con provider mock local.
- Provider n8n con respuesta normalizada.

## Slide 44 - Clase 20 - Que se construyo
- Se agrego n8n al stack y se conecto el backend a un workflow mock.
- El mensaje pudo pasar por una automatizacion externa antes de responder.
- Frase clave: orquestar significa delegar pasos de integracion a un flujo externo.
- Frase clave: el backend mantiene el contrato aunque la respuesta venga de otro servicio.

## Slide 45 - Clase 21 - Message module + AI real
- Prompt configurable.
- Contexto reciente de conversacion.
- Providers mock, ChatGPT y Ollama.
- Workflows n8n para AI real.
- Fallback controlado a mock.

## Slide 46 - Clase 21 - Que se construyo
- Se conecto el modulo de mensajes con ChatGPT y Ollama mediante n8n.
- El chat pudo responder con AI real sin cambiar el contrato del frontend.
- Frase clave: AI real entra al sistema como un proveedor, no como logica mezclada en toda la app.
- Frase clave: el fallback protege la experiencia cuando un proveedor externo falla.

## Slide 47 - Como leer el full_project
- Primero buscar el flujo: usuario, frontend, backend, base, n8n, proveedor AI.
- Despues identificar responsabilidades: UI, API, persistencia, automatizacion.
- Luego revisar contratos: requests, responses, errores y estados.
- Finalmente mirar detalles de implementacion solo cuando hagan falta.

## Slide 48 - Checkpoint final
- Puedo explicar la arquitectura final de UTNito.
- Puedo ubicar que parte del sistema aparecio en cada clase.
- Puedo describir el recorrido de un mensaje desde el frontend hasta una respuesta AI.
- Puedo abrir el `full_project` y reconocer capas, contratos y responsabilidades.
