import 'firebase/compat/auth';
import 'firebase/compat/database';

import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  databaseURL: process.env.DATA_BASE_URL,
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
