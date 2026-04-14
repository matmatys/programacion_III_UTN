# Angular Services and Models Reference (Class 09)

## 1) Why models
Models define the data contract used in components and services.

```ts
export interface Conversation {
  id: string;
  title: string;
  archived: boolean;
  messages: Message[];
}
```

## 2) Why services
Services centralize state and behavior so components stay focused on UI.

```ts
@Injectable({ providedIn: 'root' })
export class ChatService { }
```

## 3) Mock backend in frontend
A `MockBackendService` simulates backend operations in memory.

```ts
listConversations(): Conversation[]
createConversation(title: string): Conversation
createMessage(conversationId: string, content: string)
```

## 4) Separation of responsibilities
- Component: render and UI events.
- Service: state and business flow.
- Model: typed contracts.

## Class scope
- No HttpClient yet.
- No real backend integration yet.
- Next class moves this to async flows.
