import { setIsLoading } from 'app/store/App';
import {
  setIsConnected,
  setUser,
  setUserMail,
  setUserName,
  setUserType,
  setUserUID,
} from 'app/store/User';
import { useDispatch } from 'react-redux';

import { setUserAvailable } from '../../store/User';
import db from '../helper';
import Model from './Model';

export default class User extends Model {
  constructor() {
    super();
    this.table = 'users';
    //eslint-disable-next-line
    this.updateStore = useDispatch();
  }

  syncStore = uid =>
    this.find(uid, data => {
      this.updateStore(setUser(data.name));
      this.updateStore(setUserType(data.type));
      this.updateStore(setUserMail(data.mail));
      this.updateStore(setUserName(data.name));
      this.updateStore(setUserUID(uid));
      this.updateStore(setUserAvailable(data.available));
      this.updateStore(setIsConnected(true));
    }).then(() => this.updateStore(setIsLoading(false)));

  create = (mail, password, username, handleError) => {
    this.updateStore(setIsLoading(true));
    db.createUser(mail, password)
      .then(userCredential => {
        this.add(
          {
            name: username,
            mail: userCredential.user.email,
            role: null,
            available: false,
          },
          userCredential.user.uid,
        );
        this.syncStore(userCredential.user.uid);
      })
      .catch(error => {
        handleError(error);
        this.updateStore(setIsLoading(false));
      });
  };

  updateData = (uid, data) => {
    this.update(uid, data, () => this.syncStore(uid));
  };

  connect = (mail, password, handleError) => {
    this.updateStore(setIsLoading(true));
    db.logUser(mail, password)
      .then(userCredential => {
        this.syncStore(userCredential.user.uid);
      })
      .catch(error => {
        handleError(error);
        this.updateStore(setIsLoading(false));
      });
  };
}
