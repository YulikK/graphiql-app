import { useLocale, useTranslations } from 'next-intl';

import { useRouter } from 'next/navigation';

import { useAlertBar } from '../contexts';
import encodeToBase64 from '../utils/encode-to-base64';

import { useAppSelector } from './redux-hooks';

export default function useGraphRequest() {
  const router = useRouter();

  const locale = useLocale();

  const { url, headers, variables, query } = useAppSelector(
    state => state['graphql-slice']
  );

  const { setError } = useAlertBar();

  const t = useTranslations('Common');

  const makeRequest = () => {
    if (!url) return;

    try {
      const body = JSON.stringify({
        query: query,
        variables: variables ? JSON.parse(variables) : '',
      });

      const codedUrl = encodeToBase64(url);

      const codedBody = encodeToBase64(body);

      const codedHeaders = new URLSearchParams(
        Object.fromEntries(headers.filter(([key, value]) => key && value))
      );

      router.push(
        `/${locale}/graphql/${codedUrl}/${codedBody}${codedHeaders ? `?${codedHeaders}` : ''}`
      );
    } catch (error: unknown) {
      setError(`${t('error-request')}: ${error}`);

      return;
    }
  };

  return makeRequest;
}
