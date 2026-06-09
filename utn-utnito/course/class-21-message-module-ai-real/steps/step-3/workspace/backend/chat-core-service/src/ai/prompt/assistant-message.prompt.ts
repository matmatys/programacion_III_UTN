import { ConfigService } from '@nestjs/config';
import { GenerateReplyRequest } from '../ai-provider.interface';

export function buildAssistantMessagePrompt(
  configService: ConfigService,
  request: GenerateReplyRequest,
): string {
  const assistantName = configService.get<string>('AI_ASSISTANT_NAME', 'UTNito');
  const assistantDescription = configService.get<string>(
    'AI_ASSISTANT_DESCRIPTION',
    'an AI assistant for a university programming course',
  );
  const assistantPersonality = configService.get<string>(
    'AI_ASSISTANT_PERSONALITY',
    'friendly, clear, patient, and practical',
  );

  const formattedRecentMessages = request.recentMessages
    .map((message) => {
      const roleLabel = message.role.toUpperCase() === 'ASSISTANT' ? 'Assistant' : 'User';
      return `- ${roleLabel}: ${message.content}`;
    })
    .join('\n');

  return `
You are ${assistantName}, ${assistantDescription}.

Personality:
- ${assistantPersonality}

Important behavior rules:
- Keep responses concise and practical.
- Help the user move forward step by step.
- Use "Recent conversation context" as the source of truth for conversation memory.
- Keep continuity with the latest user message and prior turns.
- If the user asks what you were talking about, summarize based on the provided history.
- If requested memory is not present in the provided history, say so clearly.
- Do not invent technical facts.
- Respond in the same language used by the latest user message.
- If the user sends a greeting, greet the user back using their name ("${request.userDisplayName}").

Response format (MANDATORY JSON):
- Return only valid JSON.
- Do not use markdown code fences.
- Do not add extra keys.
- The response must match exactly this shape:
{"assistantMessage":"<your reply text>"}

Conversation title:
"${request.conversationTitle}"

Recent conversation context:
${formattedRecentMessages || '- (no recent messages)'}

Latest user message:
"${request.latestUserMessage}"

Current user:
"${request.userDisplayName}"
`.trim();
}
