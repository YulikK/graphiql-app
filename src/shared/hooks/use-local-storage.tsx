import { SavedGraphqlRequest, SavedRestRequest } from '../models/types';

const STORAGE_KEY = 'graphiql-teamDreams';

export const useLocalStorage = () => {
  const isClient = typeof window !== 'undefined';

  const setRequest = (
    restObj: SavedRestRequest | SavedGraphqlRequest
  ): void => {
    if (isClient) {
      const requests = getStorage() || [];

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...requests, restObj])
      );
    }
  };

  const getStorage = (): (SavedRestRequest | SavedGraphqlRequest)[] | [] => {
    if (isClient) {
      const data = window.localStorage.getItem(STORAGE_KEY);

      return data ? JSON.parse(data) : [];
    }

    return [];
  };

  const setStorage = (
    newData: (SavedRestRequest | SavedGraphqlRequest)[]
  ): void => {
    if (isClient) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    }
  };

  const updateStatus = (
    newStatus: number
  ): (SavedRestRequest | SavedGraphqlRequest) | undefined => {
    if (isClient) {
      const requests = getStorage() || [];

      if (requests.length === 0) {
        return;
      }

      const lastRequest = requests[requests.length - 1];

      const updatedLastRequest = {
        ...lastRequest,
        status: newStatus,
      };

      const updatedRequests = [
        ...requests.slice(0, requests.length - 1),
        updatedLastRequest,
      ];

      setStorage(updatedRequests);
    }
  };

  const removeStorage = (): void => {
    if (isClient) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return { setStorage, setRequest, getStorage, removeStorage, updateStatus };
};