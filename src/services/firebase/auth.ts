import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { auth, db, provider } from './firebase';

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // можно наверное удалить нафиг
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    return user;
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    alert((err as Error).message);
  }
};
