import { useLocale } from 'next-intl';

import { useCallback, useEffect, useRef } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';

import { useLocalStorage } from './use-local-storage';
import { HttpMethodType } from '../models/http-methods';
import {
  restoreRestHeaders,
  setRestBody,
  setRestMethod,
  setRestUrl,
} from '../store/slices/rest-slice';
import buildRestUrl from '../utils/build-rest-url';
import decodeFromBase64 from '../utils/decode-from-base64';
import parsePathAndParams from '../utils/parse-path-and-params';
import replaceUrl from '../utils/replace-url';

const DELAY = 500;

export default function useRestUrl(history = false) {
  const locale = useLocale();
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const store = useAppSelector(state => state['rest-slice']);
  const { setRequest } = useLocalStorage();

  const didMount = useRef(false);

  const restoreData = useCallback(
    ({ method, url, body, params }: ReturnType<typeof parsePathAndParams>) => {
      if (!url) return;

      dispatch(setRestMethod(method.toUpperCase() as HttpMethodType));

      if (url) dispatch(setRestUrl(decodeFromBase64(url)));

      if (body) dispatch(setRestBody(decodeFromBase64(body)));

      dispatch(restoreRestHeaders(params));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;

      if (!store.url) {
        restoreData(parsePathAndParams(path, params.toString()));
      }
    }

    const replace = () => replaceUrl(buildRestUrl(store, locale));
    const handler = setTimeout(replace, DELAY);

    return () => clearTimeout(handler);
  }, [locale, params, path, restoreData, store]);

  const makeRequest = () => {
    const address = buildRestUrl(store, locale);

    if (!address) return;

    router.push(address);

    if (!history) {
      setRequest({
        ...store,
        type: 'rest',
        status: 100,
        id: crypto.randomUUID(),
      });
    }
  };

  return makeRequest;
}
