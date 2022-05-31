export interface RoomStoreInterface {
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
