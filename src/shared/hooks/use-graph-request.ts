import { useLocale } from 'next-intl';

import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/shared/hooks/redux-hooks';
import { useLocalStorage } from '@/shared/hooks/use-local-storage';

import encodeToBase64 from '../utils/encode-to-base64';

export default function useGraphRequest() {
  const router = useRouter();

  const locale = useLocale();

  const { setStorage } = useLocalStorage();

  const {
    url,
    urlDoc,
    schema,
    isTrySchemaDownload,
    headers,
    variables,
    query,
  } = useAppSelector(state => state['graphql-slice']);

  const body = JSON.stringify({
    query: query,
    variables: variables ? JSON.parse(variables) : '',
  });

  const makeRequest = (isHistoryRequest?: boolean) => {
    if (!url) return;

    if (!isHistoryRequest) {
      setStorage({
        url,
        urlDoc,
        schema,
        isTrySchemaDownload,
        headers,
        variables,
        query,
        type: 'graphql',
      });
    }

    const codedUrl = encodeToBase64(url);

    const codedBody = encodeToBase64(body);

    const codedHeaders = new URLSearchParams(
      Object.fromEntries(headers.filter(([key, value]) => key && value))
    );

    router.push(
      `/${locale}/graphql/${codedUrl}/${codedBody}${codedHeaders ? `?${codedHeaders}` : ''}`
    );
  };

  return makeRequest;
}
