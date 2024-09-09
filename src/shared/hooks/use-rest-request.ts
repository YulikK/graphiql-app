import { useLocale, useTranslations } from 'next-intl';

import { useRouter } from 'next/navigation';

import { useAlertBar } from '../contexts';
import encodeToBase64 from '../utils/encode-to-base64';
import insertVariables from '../utils/insert-variables';
import sanitizeJsonString from '../utils/sanitize-json-string';

import { useAppSelector } from './redux-hooks';

export default function useRestRequest() {
  const router = useRouter();

  const locale = useLocale();

  const { method, url, body, headers, variables, textMode } = useAppSelector(
    state => state['rest-slice']
  );

  const { setError } = useAlertBar();

  const t = useTranslations('Common');

  const makeRequest = () => {
    if (!url) return;

    try {
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
    } catch (error: unknown) {
      setError(`${t('error-request')}: ${error}`);

      return;
    }
  };

  return makeRequest;
}
