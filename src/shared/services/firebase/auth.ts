import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { auth, provider } from './firebase';

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  // можно наверное удалить нафиг
  // await addDoc(collection(db, 'users'), {
  //   uid: res.user.uid,
  //   name,
  //   authProvider: 'local',
  //   email,
  // });
  return result;
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result;
};

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const logout = async () => {
  const result = await signOut(auth);
  return result;
};
