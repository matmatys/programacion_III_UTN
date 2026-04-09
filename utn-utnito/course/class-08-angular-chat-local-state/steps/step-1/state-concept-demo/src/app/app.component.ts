import { Component } from '@angular/core';

interface DemoConversation {
  id: string;
  title: string;
  text: string;
  archived: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title = 'Class 8 - Local state concept demo';
  nextConversationTitle = '';
  nextConversationText = '';
  conversationCounter = 3;

  showArchived = false;

  conversations: DemoConversation[] = [
    { id: 'conv-1', title: 'Planning', text: 'Review class 8 goals before practice.', archived: false },
    { id: 'conv-2', title: 'REST doubts', text: 'Need examples for endpoint naming.', archived: false },
    { id: 'conv-3', title: 'Old notes', text: 'Previous semester reminders.', archived: true },
  ];

  get activeConversations(): DemoConversation[] {
    return this.conversations.filter((conversation) => !conversation.archived);
  }

  get archivedConversations(): DemoConversation[] {
    return this.conversations.filter((conversation) => conversation.archived);
  }

  toggleArchived(): void {
    this.showArchived = !this.showArchived;
  }

  addConversation(event: Event): void {
    event.preventDefault();

    const title = this.nextConversationTitle.trim();
    const text = this.nextConversationText.trim();

    if (!title || !text) {
      return;
    }

    // unshift adds at the beginning of the list; push adds at the end.
    this.conversations.unshift({
      id: this.buildConversationId(),
      title,
      text,
      archived: false,
    });

    this.nextConversationTitle = '';
    this.nextConversationText = '';
  }

  toggleConversationArchived(conversationId: string): void {
    const conversation = this.conversations.find(
      (currentConversation) => currentConversation.id === conversationId,
    );

    if (!conversation) {
      return;
    }

    conversation.archived = !conversation.archived;
  }

  private buildConversationId(): string {
    this.conversationCounter += 1;
    return `conv-${Date.now()}-${this.conversationCounter}`;
  }
}
