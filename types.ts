export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface ChatSessionConfig {
  apiKey: string;
}
