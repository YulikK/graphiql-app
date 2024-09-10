'use client';

import { createContext, MutableRefObject, useRef } from 'react';

export interface HistoryContextValue {
  isHistory: MutableRefObject<boolean>;
}

export const HistoryContext = createContext<HistoryContextValue | undefined>(
  undefined
);

interface HistoryProviderProps {
  children: React.ReactNode;
}

export function HistoryProvider({ children }: HistoryProviderProps) {
  const isHistory = useRef(false);

  return (
    <HistoryContext.Provider value={{ isHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}
