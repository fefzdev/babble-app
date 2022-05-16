import { onValue } from 'firebase/database';
import uuid from 'react-native-uuid';

import db from '../helper';

export default class Model {
  constructor() {
    this.table = null;
  }

  generateUid = () => {
    return uuid.v4();
  };

  purifyCollectionData = data => {
    const arrayData = [];
    for (const uid in data) {
      arrayData.push({
        uid,
        ...data[uid],
      });
    }

    return arrayData;
  };

  add = (data, uid = this.generateUid()) => {
    db.write(`${this.table}/${uid}`, data);
  };

  push = (data, uid, key) => {
    this.find(uid, find => {
      const objRetrived = find[key] ?? [];
      this.update({ [key]: [...objRetrived, data] });
    });
  };

  delete = uid => {
    db.delete(`${this.table}/${uid}`);
  };

  update = (uid, data, callback = () => ({})) => {
    this.find(uid, find => {
      delete find.uid;
      db.update(`${this.table}/${uid}`, {
        ...find,
        ...data,
      }).then(() => callback());
    });
  };

  find = async (uid, callback) => {
    const data = await db.readChild(this.table, uid);
    callback({ uid, ...data }).catch(e => console.error(e.message));
  };

  listen = callback => {
    const ref = db.connectTo(this.table);
    onValue(ref, snapshot => {
      const data = snapshot.val();
      callback(this.purifyCollectionData(data));
    });
  };

  listenForKey = (key, uid, callback) => {
    this.listen(d => {
      callback(d.find(o => o.uid === uid)[key]);
    });
  };

  all = callback => {
    db.read(this.table)
      .then(data => {
        callback(this.purifyCollectionData(data));
      })
      .catch(e => console.error(e.message));
  };
}
