
export enum AppTab {
  HOME = 'HOME',
  BOOKING = 'BOOKING'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  groundingChunks?: any[];
  isError?: boolean;
}
