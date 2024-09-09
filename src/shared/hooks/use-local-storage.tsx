import { SavedGraphqlRequest, SavedRestRequest } from '../models/types';

const storageKey = 'graphiql-teamDreams';

export const useLocalStorage = () => {
  const isClient = typeof window !== 'undefined';

  const setStorage = (
    restObj: SavedRestRequest | SavedGraphqlRequest
  ): void => {
    if (isClient) {
      const requests = getStorage() || [];

      window.localStorage.setItem(
        storageKey,
        JSON.stringify([...requests, restObj])
      );
    }
  };

  const getStorage = (): (SavedRestRequest | SavedGraphqlRequest)[] | [] => {
    if (isClient) {
      const data = window.localStorage.getItem(storageKey);

      return data ? JSON.parse(data) : [];
    }

    return [];
  };

  const removeStorage = (): void => {
    if (isClient) {
      window.localStorage.removeItem(storageKey);
    }
  };

  return { setStorage, getStorage, removeStorage };
};
