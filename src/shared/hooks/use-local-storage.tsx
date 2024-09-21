import {
  GraphqlSliceType,
  RestSliceType,
  SavedGraphqlRequest,
  SavedRestRequest,
} from '../models/types';

const STORAGE_KEY = 'graphiql-teamDreams';

export const useLocalStorage = () => {
  const isClient = typeof window !== 'undefined';

  const setRequest = (
    sliceObj: RestSliceType | GraphqlSliceType,
    type: 'rest' | 'graphql',
    address: string
  ): void => {
    if (isClient) {
      const result = {
        ...sliceObj,
        type,
        status: 100,
        id: crypto.randomUUID(),
        browserUrl: address,
      };

      const requests = getStorage() || [];

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...requests, result])
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

  const removeStorage = (): void => {
    if (isClient) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return { setStorage, setRequest, getStorage, removeStorage };
};
