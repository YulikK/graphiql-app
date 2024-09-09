import { useLocale } from 'next-intl';

import { useRouter } from 'next/navigation';

import encodeToBase64 from '../utils/encode-to-base64';

import { useAppSelector } from './redux-hooks';

export default function useGraphRequest() {
  const router = useRouter();

  const locale = useLocale();

  const { url, headers, variables, query } = useAppSelector(
    state => state['graphql-slice']
  );

  const body = JSON.stringify({
    query: query,
    variables: variables ? JSON.parse(variables) : '',
  });

  const makeRequest = () => {
    if (!url) return;

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
