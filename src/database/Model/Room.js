import Model from './Model';

export default class Room extends Model {
  constructor() {
    super();
    this.table = 'room';
  }

  create = ({ talkerUid, listenerUid }) => {
    this.checkIfRoomAlreadyExist(talkerUid, listenerUid, roomAlreadyExist => {
      if (!roomAlreadyExist) {
        this.add({
          messages: {},
          users: [talkerUid, listenerUid],
          active: false,
        });
      }
    });
  };

  findRoomsByUser = (userUid, callback) => {
    this.all(data => {
      callback(data.filter(room => room.users.includes(userUid)));
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
}
