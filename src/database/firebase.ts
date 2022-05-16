import 'firebase/auth';
import 'firebase/database';

import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  databaseURL: process.env.DATA_BASE_URL,
};

const app = initializeApp(firebaseConfig);

export default app;
