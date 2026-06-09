export interface N8nAiResponse {
  action?: string;
  error?: boolean;
  data?: {
    assistantMessage?: string;
    errorMessage?: string;
    errorDetails?: string;
  };
  origin?: string;
}
