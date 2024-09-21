import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { SavedGraphqlRequest, SavedRestRequest } from '../models/types';
import { restoreGraphState } from '../store/slices/grahpql-client';
import { restoreRestState } from '../store/slices/rest-slice';
import {
  isGraphqlRequest,
  isRestRequest,
} from '../utils/history-requests-typeguard';

import { useAppDispatch } from './redux-hooks';
import { useLocalStorage } from './use-local-storage';

export const useHistoryRequest = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { getStorage, setStorage, removeStorage } = useLocalStorage();

  const [data, setData] = useState<
    (SavedRestRequest | SavedGraphqlRequest)[] | null
  >(null);

  const handleRequest = (
    e: React.MouseEvent<HTMLElement>,
    el: SavedRestRequest | SavedGraphqlRequest
  ) => {
    e.stopPropagation();

    if (isRestRequest(el)) {
      const { type, status, browserUrl, ...slice } = el;

      dispatch(restoreRestState(slice));

      router.push(browserUrl);
    } else if (isGraphqlRequest(el)) {
      const { type, status, browserUrl, ...slice } = el;

      dispatch(restoreGraphState(slice));

      router.push(browserUrl);
    }
  };

  const handleRemoveItem = (id: string) => {
    if (data) {
      const newData = data?.filter(el => el.id !== id);
      setStorage(newData);
      setData(newData);
    }
  };

  const clearHistory = () => {
    removeStorage();

    setData([]);
  };

  useEffect(() => {
    const storedData = getStorage();

    if (storedData) {
      setData(storedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, handleRequest, handleRemoveItem, clearHistory };
};
