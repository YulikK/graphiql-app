import { useLocale } from 'next-intl';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/shared/hooks/redux-hooks';
import { useLocalStorage } from '@/shared/hooks/use-local-storage';

import encodeToBase64 from '../utils/encode-to-base64';
import insertVariables from '../utils/insert-variables';
import sanitizeJsonString from '../utils/sanitize-json-string';

export default function useRestRequest() {
  const router = useRouter();

  const locale = useLocale();

  const { method, url, body, headers, variables, textMode, query } =
    useAppSelector(state => state['rest-slice']);

  const { setRequest } = useLocalStorage();

  const [shouldSubmit, setShouldSubmit] = useState(false);

  const makeRequest = (isHistoryRequest?: boolean) => {
    if (!url) return;

    if (!isHistoryRequest) {
      setRequest({
        query,
        method,
        url,
        body,
        headers,
        variables,
        textMode,
        type: 'rest',
        status: 100,
        id: crypto.randomUUID(),
      });
    }

    const codedUrl = encodeToBase64(
      `${insertVariables(url, variables).trim().replaceAll(' ', '')}`
    );

    const bodyWithVariables = insertVariables(body, variables, !textMode);

    const codedBody = textMode
      ? encodeToBase64(bodyWithVariables)
      : encodeToBase64(sanitizeJsonString(bodyWithVariables));

    const codedHeaders = new URLSearchParams(
      Object.fromEntries(headers.filter(([key, value]) => key && value))
    );

    router.push(
      `/${locale}/rest/${method}/${codedUrl}/${codedBody}${codedHeaders ? `?${codedHeaders}` : ''}`
    );

    if (isHistoryRequest) {
      setShouldSubmit(true);
    }
  };

  useEffect(() => {
    if (shouldSubmit) {
      makeRequest();
      setShouldSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSubmit]);

  return makeRequest;
}
