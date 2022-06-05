import {
  equalTo,
  get,
  orderByKey,
  push,
  query,
  update,
} from 'firebase/database';

import db from '@/database/helper';
import { RoomInterface } from '@/database/types/Rooms';
import { RoomStoreInterface } from '@/types/RoomStore.interface';

import Model from './Model';

export default class Rooms extends Model {
  constructor() {
    super();
    this.table = 'rooms';
  }

  getRoom = async (roomUid: string): Promise<RoomInterface> =>
    await this.find(roomUid);

  getSpecificRooms = async (roomsUidArray: any[]): Promise<RoomInterface[]> => {
    const rooms: RoomInterface[] = [];

    await Promise.all(
      roomsUidArray.map(async ({ uid }) => {
        const room = await get(db.connectTo(`rooms/${uid}`));

        rooms.push({ ...room.val(), uid: uid });
      }),
    );

    return rooms;
  };

  createRoom = async (
    talkerUid: string,
    listenerUid: string,
    room: RoomInterface,
  ): Promise<void> => {
    const userRoomsArray = await get(db.connectTo(`users/${talkerUid}/rooms`));

    if (userRoomsArray.val()) {
      const membersRef = db.connectTo('members');
      await Promise.all(
        Object.keys(userRoomsArray.val()).map(async userRoomUid => {
          const roomMembersrRef = query(
            membersRef,
            orderByKey(),
            equalTo(userRoomUid),
          );

          const roomMembers = await get(roomMembersrRef);

          if (roomMembers.val()) {
            const doRoomAlreadyExists = Object.keys(
              roomMembers.val()[userRoomUid],
            )
              .map(userUid => userUid === listenerUid)
              .some(e => e);

            if (doRoomAlreadyExists)
              throw new Error('La conversation existe déjà');
          }
        }),
      );
    }

    const roomUid = push(db.connectTo(this.table), room).key;
    // Firebase's like array
    const members = {
      [talkerUid]: true,
      [listenerUid]: true,
    };

    const updates: any = {};
    updates[`members/${roomUid}`] = members;
    updates[`messages/${roomUid}`] = true;

    Object.keys(members).forEach(key => {
      updates[`users/${key}/rooms/${roomUid}`] = true;
    });

    await update(db.connectTo(), updates);
  };

  updateRoom = async (roomUid: string, data: RoomInterface) =>
    await db.update(`${this.table}/${roomUid}`, data);

  setActive = async (roomUid: string) => {
    const room = await this.find(roomUid);

    if (!room) throw new Error('Conversation introuvable');

    await db.update(`${this.table}/${roomUid}`, {
      isActive: true,
    });
  };

  deleteNonActiveRooms = async (
    rooms: RoomStoreInterface[],
    userUid: string,
  ) => {
    const formattedRooms: RoomStoreInterface[] = rooms.filter(
      room => !room.isActive,
    );
    if (!formattedRooms.length)
      throw new Error("L'utilisateur n'a pas d'autres conversation");

    await Promise.all(
      formattedRooms.map(async (room: RoomStoreInterface) =>
        this.deleteRoom(room, userUid),
      ),
    );
  };

  accept = async (roomUid: string) => {
    const room = await this.find(roomUid);

    if (!room) throw new Error('Room not found');

    await db.update(`${this.table}/${roomUid}`, {
      isAccepted: true,
    });
  };

  deleteRoom = async (room: RoomStoreInterface, currentUserUid: string) => {
    const { roomUid, otherUserData } = room;

    const updates: any = {};
    updates[`${this.table}/${roomUid}`] = null;
    updates[`messages/${roomUid}`] = null;
    updates[`members/${roomUid}`] = null;
    updates[`users/${otherUserData.uid}/rooms/${roomUid}`] = null;
    updates[`users/${currentUserUid}/rooms/${roomUid}`] = null;

    await update(db.connectTo(), updates);
  };

  deleteAllRooms = async (
    rooms: RoomStoreInterface[],
    currentUserUid: string,
  ) => {
    await Promise.all(
      rooms.map(async room => await this.deleteRoom(room, currentUserUid)),
    );
  };
}
