import { get } from 'firebase/database';

import db from '@/database/helper';
import { MembersInterface } from '@/database/types/Members';

import Model from './Model';

export default class RoomMembers extends Model {
  constructor() {
    super();
    this.table = 'members';
  }

  getRoomMembers = async (roomUid: string): Promise<MembersInterface> => {
    const response = await get(db.connectTo(`members/${roomUid}`));
    return Object.keys(response.val()).map(memberUid => memberUid);
  };
  postRoomMembers = async (roomUid: string, members: MembersInterface) =>
    await db.update(`${this.table}/${roomUid}`, members);

  updateRoomMembers = async (roomUid: string, members: MembersInterface) =>
    await db.update(`${this.table}/${roomUid}`, members);

  deleteRoomMember = async (
    roomUid: string,
    userId: string,
    members: MembersInterface,
  ) => {
    const membersWhoLeft = members.filter(member => member !== userId);

    await db.update(`${this.table}/${roomUid}`, membersWhoLeft);
  };
}
