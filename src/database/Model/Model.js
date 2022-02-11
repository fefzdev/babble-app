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
    for (const uid in data.val()) {
      arrayData.push({
        uid,
        ...data.val()[uid],
      });
    }

    return arrayData;
  };

  add = (data, uid = this.generateUid()) => {
    db.write(`${this.table}/${uid}`, data);
  };

  delete = uid => {
    db.delete(`${this.table}/${uid}`);
  };

  update = (uid, data, callback) => {
    this.find(uid, find => {
      delete find.uid;
      db.update(`${this.table}/${uid}`, {
        ...find,
        ...data,
      }).then(() => callback());
    });
  };

  find = (uid, callback) =>
    db
      .readChild(this.table, uid)
      .then(data => callback({ uid, ...data.val() }))
      .catch(e => console.error(e.message));

  listen = callback => {
    db.connectTo(this.table).on('value', data =>
      callback(this.purifyCollectionData(data)),
    );
  };

  all = callback => {
    db.read(this.table)
      .then(data => {
        callback(this.purifyCollectionData(data));
      })
      .catch(e => console.error(e.message));
  };
}
