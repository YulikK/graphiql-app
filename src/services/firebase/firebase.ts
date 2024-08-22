// const firebaseConfig = {
//   apiKey: 'AIzaSyBYCSCm_JIKP-a76FrHC6_K8-PJ1ZYIL3c',
//   authDomain: 'ast-star-wars.firebaseapp.com',
//   projectId: 'graphiql-app-6eb46',
//   storageBucket: 'ast-star-wars.appspot.com',
//   messagingSenderId: '28537298806',
//   appId: '1:28537298806:web:1ed2e00a706dc9a15e2457',
//   measurementId: 'G-T2XS9J2QSF',
// };

// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

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
