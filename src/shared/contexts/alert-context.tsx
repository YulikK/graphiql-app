'use client';
import { Alert, Snackbar } from '@mui/material';
import { createContext, ReactNode, useState } from 'react';

type AlertContextType = {
  setError: (message: string | null) => void;
};

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <AlertContext.Provider value={{ setError }}>
      {children}
      <Snackbar
        open={!!error}
        onClose={() => setError(null)}
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
