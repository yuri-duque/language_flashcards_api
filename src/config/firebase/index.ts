import firebaseAdmin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin/app';
import { initializeApp } from 'firebase/app';
import serviceAccount from '../../../service_account.json';

export const firebaseConfig = () => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  initializeApp(firebaseConfig);

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount as ServiceAccount),
  });
};
