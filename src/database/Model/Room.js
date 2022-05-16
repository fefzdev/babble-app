import Model from './Model';

export default class Room extends Model {
  constructor() {
    super();
    this.table = 'rooms';
  }

  create = ({ talkerUid, listenerUid }) => {
    this.checkIfRoomAlreadyExist(talkerUid, listenerUid, roomAlreadyExist => {
      if (!roomAlreadyExist) {
        this.add({
          users: [talkerUid, listenerUid],
          active: false,
        });
      }
    });
  };

  post = (roomUid, userUid, content) => {
    this.table = 'users';
    this.find(userUid, user => {
      this.table = 'rooms';
      this.push(
        {
          user,
          content,
          time: new Date().toISOString(),
        },
        roomUid,
        'messages',
      );
    });
  };

  findRoomsByUser = (userUid, callback) => {
    this.all(data => {
      callback(data.filter(room => room.users.includes(userUid)));
    });
  };

  findUserInRooms = (userUid, callback) => {
    this.findRoomsByUser(userUid, rooms => {
      this.table = 'users';
      this.all(userArray => {
        callback(
          rooms.map(({ uid, users, active }) => ({
            uid,
            active,
            talker: userArray.find(({ uid: user }) => user === users[0]),
            listener: userArray.find(({ uid: user }) => user === users[1]),
          })),
        );
      });
      this.table = 'rooms';
    });
  };

  deleteNonActiveRooms = (userUid, callback = () => null) => {
    this.findRoomsByUser(userUid, rooms => {
      if (rooms.length > 0) {
        rooms.filter(r => !r.active).forEach(r => this.delete(r.uid));
      }
      callback();
    });
  };

  checkIfRoomAlreadyExist = (talkerUid, listenerUid, callback) => {
    this.findRoomsByUser(talkerUid, rooms => {
      callback(!!rooms.filter(r => r.users.includes(listenerUid)).length);
    });
  };

  toggle = roomUid => {
    this.find(roomUid, room => {
      this.update(roomUid, {
        active: !room.active,
      });
    });
  };

  setActive = roomUid => {
    this.find(roomUid, () => {
      this.update(roomUid, {
        active: true,
      });
    });
  };
}
