import 'firebase/compat/auth';
import 'firebase/compat/database';

import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  DATA_BASE_URL,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from '@env';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  databaseURL: DATA_BASE_URL,
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
