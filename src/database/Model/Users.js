import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { setIsLoading } from '@/store/App';
import {
  setIsConnected,
  setUser,
  setUserMail,
  setUserName,
  setUserProfilePircure,
  setUserType,
  setUserUID,
} from '@/store/User';
import { setUserAvailable } from '@/store/User';

import Model from './Model';

export default class User extends Model {
  constructor() {
    super();
    this.table = 'users';
    //eslint-disable-next-line
    this.updateStore = useDispatch();
  }

  syncStore = async uid => {
    const userData = await this.find(uid);

    this.updateStore(setUser(userData.name));
    this.updateStore(setUserMail(userData.mail));
    this.updateStore(setUserUID(userData.uid));
    this.updateStore(setUserType(userData.type));
    this.updateStore(setUserProfilePircure(userData.profilePicture));
    this.updateStore(setUserName(userData.name));
    this.updateStore(setUserAvailable(userData.available));

    this.updateStore(setIsConnected(true));
    this.updateStore(setIsLoading(false));
  };

  create = async (auth, email, password, username) => {
    this.updateStore(setIsLoading(true));
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      await this.add(
        {
          role: null,
          name: username,
          mail: email,
          available: false,
        },
        user.uid,
      );
      await this.syncStore(user.uid);
    } catch (error) {
      this.updateStore(setIsLoading(false));
    }
  };

  updateData = async (uid, data) => {
    await this.update(uid, data);
    await this.syncStore(uid);
  };

  connect = async (auth, email, password) => {
    this.updateStore(setIsLoading(true));
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      await this.syncStore(user.uid);
      this.updateStore(setIsLoading(false));
    } catch (error) {
      this.updateStore(setIsLoading(false));
      throw error;
    }
  };
}
