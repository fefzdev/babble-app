import { off, onValue } from 'firebase/database';
import uuid from 'react-native-uuid';

import db from '../helper';

export default class Model {
  constructor() {
    this.table = null;
  }

  generateUid = () => uuid.v4();

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

  add = async (data, uid = this.generateUid()) =>
    await db.write(`${this.table}/${uid}`, data);

  find = async uid => {
    try {
      const data = await db.readChild(this.table, uid);
      return { uid, ...data };
    } catch (error) {
      console.error(error);
    }
  };

  push = async (data, uid, key) => {
    try {
      const response = await this.find(uid);
      const objRetrived = response[key] ?? [];
      await this.update(uid, { [key]: [...objRetrived, data] });
    } catch (error) {
      console.error(error);
    }
  };

  delete = async uid => await db.delete(`${this.table}/${uid}`);

  update = async (uid, data) => {
    const response = await this.find(uid);
    delete response.uid;

    await db.update(`${this.table}/${uid}`, {
      ...response,
      ...data,
    });
  };

  listen = callback => {
    const ref = db.connectTo(this.table);
    onValue(ref, snapshot => {
      const data = snapshot.val();
      callback(this.purifyCollectionData(data));
    });
  };

  unlisten = () => {
    const ref = db.connectTo(this.table);
    off(ref);
  };

  listenForKey = (key, uid, callback) => {
    this.listen(d => {
      callback(d.find(o => o.uid === uid)[key]);
    });
  };

  all = async () => {
    try {
      const response = await db.read(this.table);
      return this.purifyCollectionData(response);
    } catch (e) {
      console.error(e.message);
    }
  };
}
