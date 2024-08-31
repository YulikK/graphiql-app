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
    const data = await fetch(url, {
      method,
      headers: method === 'GET' ? {} : headers,
      body: method === 'GET' ? null : body,
    });
    const result = await data.json();
    return result;
  } catch (e) {
    if (e instanceof Error && 'message' in e) {
      return e.message;
    }
    return 'Error. Invalid URL';
  }
};

export default async function RestResult({ params, searchParams = {} }: Props) {
  const [method = '', url = '', body = ''] = params.slug.map((item) =>
    decodeURIComponent(item)
  );
  const decodedUrl = decodeFromBase64(url);
  const decodeBody = decodeFromBase64(body);

  const result = await makeRequest({
    body: decodeBody,
    method,
    url: decodedUrl,
    headers: searchParams,
  });

  return <ResponseViewer value={result || ''} />;
}
