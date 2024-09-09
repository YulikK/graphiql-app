import { SavedRestRequest } from '../models/types';

const storageKey = 'graphiql-teamDreams';

export const useLocalStorage = () => {
  const isClient = typeof window !== 'undefined';

  const setStorage = (restObj: SavedRestRequest): void => {
    if (isClient) {
      const requests = getStorage() || [];
      window.localStorage.setItem(
        storageKey,
        JSON.stringify([...requests, restObj])
      );
    }
  };

  const getStorage = (): SavedRestRequest[] | null => {
    if (isClient) {
      const data = window.localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : null;
    }
    return null;
  };

  const removeStorage = (): void => {
    if (isClient) {
      window.localStorage.removeItem(storageKey);
    }
  };

  return { setStorage, getStorage, removeStorage };
};
