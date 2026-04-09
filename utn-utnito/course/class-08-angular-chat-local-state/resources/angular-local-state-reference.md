# Angular Local State Reference (Class 08)

## 1) Local UI state in component
```ts
conversations = [...];
selectedConversationId = 'conv-1';
draftMessage = '';
```
State is kept in the component for this class.

## 2) Render lists with `*ngFor`
```html
<li *ngFor="let conversation of conversations">{{ conversation.title }}</li>
```

## 3) Conditional UI with `*ngIf`
```html
<p *ngIf="!visibleMessages.length">No messages yet.</p>
```

## 4) Derived state via getters
```ts
get activeConversation() {
  return this.conversations.find((c) => c.id === this.selectedConversationId) || null;
}
```

## 5) Update state from events
```ts
sendMessage(event: Event): void {
  event.preventDefault();
  // mutate local state
}
```

## Class scope
- No services.
- No backend calls.
- No message search.
