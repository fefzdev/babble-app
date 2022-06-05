import { MessagesInterface } from './Messages';

export interface RoomInterface {
  isActive: boolean;
  isAccepted: boolean;
  lastMessage: MessagesInterface;
  timestamp: number;
}
