import { push, set, update } from 'firebase/database';

import db from '@/database/helper';
import { MessagesInterface } from '@/database/types/Messages';

import Model from './Model';

export default class Messages extends Model {
  constructor() {
    super();
    this.table = 'messages';
  }

  getRoomMessages = async (roomUid: string) => {
    const roomMessages = await this.find(roomUid);
    return roomMessages;
  };

  postRoomMessage = async (roomUid: string, data: MessagesInterface) => {
    const messageListRef = db.connectTo(`${this.table}/${roomUid}`);
    const newMessageRef = push(messageListRef);
    await set(newMessageRef, data);

    const lastRoomMessageUpdate: any = {};
    lastRoomMessageUpdate[`rooms/${roomUid}/lastMessage`] = data;

    await update(db.connectTo(), lastRoomMessageUpdate);
  };

  updateRoomMessage = async (
    roomUid: string,
    messageUid: string,
    data: MessagesInterface,
  ) => {
    await db.update(`${this.table}/${roomUid}/${messageUid}`, data);
  };

  deleteRoomMessage = async (roomUid: string, messageUid: string) => {
    const messageToDelete: MessagesInterface = await this.find(
      `${roomUid}/${messageUid}`,
    );
    messageToDelete.content = 'Message supprimé';

    await db.update(`${this.table}/${roomUid}/${messageUid}`, messageToDelete);
  };
}
