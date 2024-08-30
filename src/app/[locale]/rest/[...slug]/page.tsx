import ResponseViewer from '@/features/response-viewer/response-viewer';

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
      headers:
        method === 'GET'
          ? {}
          : {
              ...headers,
            },
      body: method === 'GET' ? null : body,
    });
    const result = await data.json();
    console.log(result);

    return result;
  } catch (e) {
    if (e instanceof Error && 'message' in e) {
      return e.message;
    }
    return 'Error. Invalid URL';
  }
};

export default async function RestResult({ params, searchParams = {} }: Props) {
  console.log(123);

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
  const result = await makeRequest({
    body: decodeBody,
    method,
    url: decodedUrl,
    headers: decodeHeaders,
  });

  return <ResponseViewer value={result || ''} />;
}
