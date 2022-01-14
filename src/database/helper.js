import { firebase } from './config';

const db = {
  connectTo: ref => firebase.database().ref(ref),

  read: async ref => await firebase.database().ref(ref).get(),

  readChild: async (ref, child) =>
    await firebase.database().ref(ref).child(child).get(),

  logUser: async (mail, password) =>
    await firebase.auth().signInWithEmailAndPassword(mail, password),

  createUser: async (mail, password) =>
    await firebase.auth().createUserWithEmailAndPassword(mail, password),

  write: (ref, data) => firebase.database().ref(ref).set(data),

  update: async (ref, updates) =>
    await firebase.database().ref(ref).set(updates),

  delete: ref => firebase.database().ref(ref).remove(),
};

export default db;
