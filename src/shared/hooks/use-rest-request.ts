import { useLocale } from 'next-intl';

import { useRouter } from 'next/navigation';

import { useAppSelector } from './redux-hooks';
import encodeToBase64 from '../utils/encode-to-base64';
import insertVariables from '../utils/insert-variables';
import sanitizeJsonString from '../utils/sanitize-json-string';

export default function useRestRequest() {
  const router = useRouter();
  const locale = useLocale();
  const { method, url, body, headers, variables, textMode } = useAppSelector(
    (state) => state['rest-slice']
  );

  const makeRequest = () => {
    if (!url) return;

    const codedUrl = encodeToBase64(
      `${insertVariables(url, variables).trim().replaceAll(' ', '')}`
    );
    const bodyWithVariables = insertVariables(body, variables, true);

    const codedBody = textMode
      ? encodeToBase64(bodyWithVariables)
      : encodeToBase64(sanitizeJsonString(bodyWithVariables));

    const codedHeaders = new URLSearchParams(
      Object.fromEntries(headers.filter(([key, value]) => key && value))
    );

    router.push(
      `/${locale}/rest/${method}/${codedUrl}/${codedBody}${codedHeaders ? `?${codedHeaders}` : ''}`
    );
  };

  return makeRequest;
}
