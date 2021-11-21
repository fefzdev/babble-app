import { useDispatch } from 'react-redux';

import { setUser, setUserMail, setUserType } from '../../store/User';
import db from '../helper';
import Model from './Model';

export default class User extends Model {
  constructor() {
    super();
    this.table = 'users';
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    this.updateStore = useDispatch();
  }

  linkStore = uid =>
    this.find(uid, data => {
      this.updateStore(setUser(data.name));
      this.updateStore(setUserType(data.role));
      this.updateStore(setUserMail(data.mail));
    });

  create = (mail, password, handleError) => {
    db.createUser(mail, password)
      .then(userCredential => {
        this.add(
          {
            name: 'Benoit',
            mail: userCredential.user.email,
            role: null,
          },
          userCredential.user.uid,
        );
        this.linkStore(userCredential.user.uid);
      })
      .catch(error => handleError(error));
  };

  connect = (mail, password, handleError) => {
    db.logUser(mail, password)
      .then(userCredential => {
        this.linkStore(userCredential.user.uid);
      })
      .catch(error => handleError(error));
  };
}
