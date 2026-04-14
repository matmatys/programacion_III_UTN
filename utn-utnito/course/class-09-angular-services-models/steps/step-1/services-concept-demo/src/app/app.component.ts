import { Component } from '@angular/core';
import { DemoConversation } from './model/demo-conversation.interface';
import { DemoConversationStatus } from './model/demo-conversation-status.enum';
import { MockBackendService } from './service/mock-backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  readonly title = 'Class 9 - Services concept demo';
  readonly conversationStatus = DemoConversationStatus;

  nextConversationTitle = '';
  nextConversationText = '';
  showArchived = false;

  constructor(private readonly mockBackendService: MockBackendService) {
    //Simulates backend call
    this.mockBackendService.syncConversationsFromBackend();
  }

  get activeConversations(): DemoConversation[] {
    return this.mockBackendService.getActiveConversations();
  }

  get archivedConversations(): DemoConversation[] {
    return this.mockBackendService.getArchivedConversations();
  }

  toggleArchived(): void {
    this.showArchived = !this.showArchived;
  }

  addConversation(event: Event): void {
    event.preventDefault();

    this.mockBackendService.createConversation(this.nextConversationTitle, this.nextConversationText);
    this.nextConversationTitle = '';
    this.nextConversationText = '';
  }

  toggleConversationArchived(conversationId: string): void {
    this.mockBackendService.toggleConversationArchived(conversationId);
  }
}
