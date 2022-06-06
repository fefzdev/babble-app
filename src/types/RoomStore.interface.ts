import { RoomInterface } from '@/database/types/Rooms';

export interface RoomStoreInterface extends RoomInterface {
  otherUserData: {
    available: boolean;
    mail: string;
    name: string;
    rooms: string[];
    type: string;
    uid: string;
  };
  roomUid: string;
}
