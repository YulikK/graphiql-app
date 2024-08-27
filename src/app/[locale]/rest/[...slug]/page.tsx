import ResponseViewer from '@/features/response-viewer/response-viewer';

interface Props {
  params: {
    slug: string[];
  };
  searchParams?: Record<string, string>;
}

interface RequestParams {
  url: string;
  method: string;
  body: string;
  headers: Record<string, string>;
}

const makeRequest = async ({ body, method, url, headers }: RequestParams) => {
  try {
    const result = await fetch(url, {
      method,
      headers:
        method === 'GET'
          ? {}
          : {
              ...headers,
            },
      body: method === 'GET' ? null : body,
    });

    return result.json();
  } catch (e) {
    console.log('ERROR', e);
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
  const decodedUrl = Buffer.from(url, 'base64').toString('utf-8');
  const decodeBody = Buffer.from(body, 'base64').toString('utf-8');

  const decodeHeaders = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      Buffer.from(value, 'base64').toString('utf-8'),
    ])
  );
  console.log('BODY', decodeBody);
  console.log('SEARCH_PARAMS', decodeHeaders);
  const result = await makeRequest({
    body: decodeBody,
    method,
    url: decodedUrl,
    headers: decodeHeaders,
  });

  return <ResponseViewer value={result || ''} />;
}
