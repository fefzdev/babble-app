import Room from './Room';
import TestDB from './TestDB';
import User from './Users';

export default function useRepository() {
  return {
    userRepository: new User(),
    roomRepository: new Room(),
    testDbRepository: new TestDB(),
  };
}
