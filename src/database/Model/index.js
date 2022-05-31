import Messages from './Messages';
import Room from './Room';
import RoomMembers from './RoomMembers';
import Rooms from './Rooms';
import TestDB from './TestDB';
import User from './Users';

export default function useRepository() {
  return {
    userRepository: new User(),
    roomRepository: new Room(),
    testDbRepository: new TestDB(),
    rooms: new Rooms(),
    members: new RoomMembers(),
    messages: new Messages(),
  };
}
