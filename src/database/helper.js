import { firebase } from './config';

const db = {
  connectTo: ref => {
    return firebase.database().ref(ref);
  },
  read: async ref => {
    return await firebase.database().ref(ref).get();
  },
  readChild: async (ref, child) => {
    return await firebase.database().ref(ref).child(child).get();
  },
  logUser: async (mail, password) => {
    return await firebase.auth().signInWithEmailAndPassword(mail, password);
  },
  createUser: async (mail, password) => {
    return await firebase.auth().createUserWithEmailAndPassword(mail, password);
  },
  write: (ref, data) => {
    firebase.database().ref(ref).set(data);
  },
  delete: ref => {
    firebase.database().ref(ref).remove();
  },
};

export default db;
