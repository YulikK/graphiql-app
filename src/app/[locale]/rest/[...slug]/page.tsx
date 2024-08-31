import ResponseViewer from '@/features/response-viewer/response-viewer';
import decodeFromBase64 from '@/shared/utils/decode-from-base64';

interface Props {
  params: {
    slug: string[];
  };
  searchParams?: Record<string, string>;
}

interface RequestParams
  extends Pick<RequestInit, 'method' | 'body' | 'headers'> {
  url: string;
}

const makeRequest = async ({ method, url, body, headers }: RequestParams) => {
  try {
    const response = await fetch(url, {
      method,
      headers: method === 'GET' ? {} : headers,
      body: method === 'GET' ? null : body,
    });
    const { status } = response;
    const result = await response.json();
    return { result, status };
  } catch (error) {
    const e = error as Error;
    return { result: e.message, status: 500 };
  }
};

export default async function RestResult({ params, searchParams = {} }: Props) {
  const [method = '', url = '', body = ''] = params.slug.map((item) =>
    decodeURIComponent(item)
  );
  const decodedUrl = decodeFromBase64(url);
  const decodedBody = decodeFromBase64(body);

  const { result, status } = await makeRequest({
    body: decodedBody,
    method,
    url: decodedUrl,
    headers: searchParams,
  });

  return <ResponseViewer value={result || ''} status={status} />;
}
