import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAQNilxD4GBZxTUhmoBNjyivqwUzMxtO3A',
  authDomain: 'graphiql-app-6eb46.firebaseapp.com',
  projectId: 'graphiql-app-6eb46',
  storageBucket: 'graphiql-app-6eb46.appspot.com',
  messagingSenderId: '420389553753',
  appId: '1:420389553753:web:ea452289be80bd9dda9348',
  measurementId: 'G-GTJZ3CYJW4',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
