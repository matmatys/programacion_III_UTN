# n8n workflows - Class 20

Import `utnito/utnito_mock_message_response.json` into n8n.

The workflow exposes:

```txt
POST /webhook/utnito-mock-message-response
```

It receives a backend payload with:
- `userMessage`
- `context.conversationId`
- `context.conversationTitle`
- `recentMessages`

It returns a normalized mock response:

```json
{
  "action": "mock_message_response",
  "error": false,
  "data": {
    "assistantMessage": "..."
  },
  "origin": "n8n"
}
```
