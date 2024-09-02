import { useContext } from 'react';

import { AuthContext } from './auth-provider';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth hook must be used within a AuthProvider');
  }

  return context;
};
