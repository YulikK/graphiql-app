'use client';

import { createContext, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

import { auth } from '@/shared/services/firebase/firebase';

export interface AuthContextValue {
  isLoggedIn: boolean | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, loading, error] = useAuthState(auth);
  const isLoggedIn = Boolean(user);

  if (error) {
    toast.error(error.message);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
