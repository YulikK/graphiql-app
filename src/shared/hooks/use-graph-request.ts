import { useLocale } from 'next-intl';

import { useRouter } from 'next/navigation';

import { useLocalStorage } from '@/shared/hooks/use-local-storage';

import { useHistory } from '../contexts';
import encodeToBase64 from '../utils/encode-to-base64';

import { useAppSelector } from './redux-hooks';

export default function useGraphRequest() {
  const router = useRouter();

  const locale = useLocale();

  const { setRequest } = useLocalStorage();

  const { isHistory } = useHistory();

  const {
    url,
    urlDoc,
    schema,
    isTrySchemaDownload,
    headers,
    variables,
    query,
  } = useAppSelector(state => state['graphql-slice']);

  const makeRequest = (isHistoryRequest?: boolean) => {
    if (!url) return;

    const body = JSON.stringify({
      query: query,
      variables: variables ? JSON.parse(variables) : '',
    });

    const codedUrl = encodeToBase64(url);

    const codedBody = encodeToBase64(body);

    const codedHeaders = new URLSearchParams(
      Object.fromEntries(headers.filter(([key, value]) => key && value))
    );

    const browserUrl = `/${locale}/graphql/${codedUrl}/${codedBody}${codedHeaders ? `?${codedHeaders}` : ''}`;

    isHistory.current = false;

    if (!isHistoryRequest) {
      setRequest({
        url,
        urlDoc,
        schema,
        isTrySchemaDownload,
        headers,
        variables,
        query,
        type: 'graphql',
        status: 100,
        id: crypto.randomUUID(),
        browserUrl,
      });
    }

    router.push(browserUrl);
  };

  return makeRequest;
}
