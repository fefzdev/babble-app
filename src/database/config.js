import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBR1jHn6Oq_f8eWFbWPWCT8_7zafO0btsE',
  authDomain: 'babble-54da8.firebaseapp.com',
  databaseURL:
    'https://babble-54da8-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'babble-54da8',
  storageBucket: 'babble-54da8.appspot.com',
  messagingSenderId: '880075374588',
  appId: '1:880075374588:ios:5802bf563c46a33cda3c79',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
