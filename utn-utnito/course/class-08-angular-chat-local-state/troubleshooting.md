# Troubleshooting - Clase 08

## 1) Error: Can't bind to 'ngForOf' / 'ngIf'
Causa: modulo principal mal configurado.

Solucion:
- Verificar que `BrowserModule` este importado en `AppModule`.
- Verificar que el componente esta declarado en `declarations`.

## 2) No cambia la conversacion activa al click
Causa: no se ejecuta `selectConversation(...)` o id invalido.

Solucion:
- Revisar `(click)="selectConversation(conversation.id)"`.
- Revisar `selectedConversationId` inicial y valores de ids.

## 3) No se renderizan mensajes
Causa: `activeConversation` queda en null o `visibleMessages` devuelve arreglo vacio.

Solucion:
- Revisar getter `activeConversation`.
- Revisar estructura de `conversations` con `messages`.

## 4) Send no agrega mensajes
Causa: draft vacio o submit sin `preventDefault`.

Solucion:
- Revisar `sendMessage(event)`.
- Revisar condicion `!draftMessage.trim()`.
- Confirmar que se hace `push` en `activeConversation.messages`.

## 5) Filtro no funciona
Causa: no se actualiza `conversationFilter`.

Solucion:
- Revisar `(input)="onConversationFilterInput(...)"`.
- Revisar getter `filteredConversations`.
