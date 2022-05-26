import Model from './Model';

export default class Room extends Model {
  constructor() {
    super();
    this.table = 'rooms';
  }

  findRoomsByUser = async userUid => {
    const allRooms = await this.all();
    return allRooms.filter(room => room.users.includes(userUid));
  };

  checkIfRoomAlreadyExist = async (talkerUid, listenerUid) => {
    const userRooms = await this.findRoomsByUser(talkerUid);
    return !!userRooms.filter(r => r.users.includes(listenerUid)).length;
  };

  create = async ({ talkerUid, listenerUid }) => {
    const doesRoomExist = await this.checkIfRoomAlreadyExist(
      talkerUid,
      listenerUid,
    );

    if (doesRoomExist) throw new Error('Room already exist');

    return await this.add({
      users: [talkerUid, listenerUid],
      active: false,
    });
  };

  post = async (roomUid, userUid, content) => {
    this.table = 'users';
    const user = await this.find(userUid);
    const time = new Date();

    this.table = 'rooms';
    await this.push(
      {
        user,
        content,
        time,
      },
      roomUid,
      'messages',
    );
  };

  findUserInRooms = async userUid => {
    const userRooms = await this.findRoomsByUser(userUid);

    this.table = 'users';
    const allUsers = await this.all();
    const rooms = userRooms.map(({ uid, users, active }) => ({
      uid,
      active,
      talker: allUsers.find(({ uid: user }) => user === users[0]),
      listener: allUsers.find(({ uid: user }) => user === users[1]),
    }));
    this.table = 'rooms';
    return rooms;
  };

  deleteNonActiveRooms = async userUid => {
    const userRooms = await this.findRoomsByUser(userUid);
    if (userRooms.length > 0)
      await Promise.all(
        userRooms
          .filter(r => !r.active)
          .forEach(async r => await this.delete(r.uid)),
      );
  };

  toggle = async roomUid => {
    const room = await this.find(roomUid);
    await this.update(roomUid, {
      active: !room.active,
    });
  };

  setActive = async roomUid => {
    const room = await this.find(roomUid);

    if (!room) throw new Error('Room not found');

    this.update(roomUid, {
      active: true,
    });
  };
}
