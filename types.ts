
export enum AppTab {
  HOME = 'HOME',
  BOOKING = 'BOOKING',
  VOICE = 'VOICE'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  groundingChunks?: any[];
  isError?: boolean;
}
