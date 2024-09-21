'use client';

import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/shared/services/firebase/firebase';

import { useAlertBar } from './contexts';

export interface AuthContextValue {
  isLoggedIn: boolean | null;
  loading: boolean;
  userName: string;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, loading, error] = useAuthState(auth);

  const { setError } = useAlertBar();

  const userName = user?.displayName || 'Unknown';

  const isLoggedIn = Boolean(user);

  if (error) {
    setError(error.message);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, userName }}>
      {children}
    </AuthContext.Provider>
  );
}
