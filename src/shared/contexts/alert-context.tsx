'use client';

import { Alert, Snackbar } from '@mui/material';
import { createContext, ReactNode, useState } from 'react';

type AlertStatus = 'pending' | 'success' | 'error' | null;

type AlertContextType = {
  setError: (message: string | null) => void;
  setSuccess: (message: string | null) => void;
  setPending: (message: string | null) => void;
};

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const [status, setStatus] = useState<AlertStatus>(null);

  const setError = (message: string | null) => {
    setMessage(message);
    setStatus('error');
  };

  const setSuccess = (message: string | null) => {
    setMessage(message);
    setStatus('success');
  };

  const setPending = (message: string | null) => {
    setMessage(message);
    setStatus('pending');
  };

  const handleClose = () => {
    setMessage(null);
    setStatus(null);
  };

  return (
    <AlertContext.Provider value={{ setError, setSuccess, setPending }}>
      {children}
      <Snackbar
        open={!!message}
        onClose={handleClose}
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert
          severity={
            status === 'error'
              ? 'error'
              : status === 'success'
                ? 'success'
                : 'info'
          }
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
