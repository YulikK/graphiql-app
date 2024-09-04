import { CodeEditor } from '@/features/code-editor/code-editor';
import { HttpMethod } from '@/shared/models/http-methods';
import decodeFromBase64 from '@/shared/utils/decode-from-base64';

interface Props {
  params: {
    slug: string[];
  };
  searchParams?: Record<string, string>;
}

interface RequestParams extends Pick<RequestInit, 'body' | 'headers'> {
  url: string;
}

const makeRequest = async ({ body, url, headers }: RequestParams) => {
  try {
    const response = await fetch(url, {
      method: HttpMethod.POST,
      headers: headers,
      body: body,
    });
    // TODO:  body выглядит так
    // body: JSON.stringify({
    //   query: graphqlQuery,
    //   variables: JSON.parse(variables),
    // }),
    const { status } = response;
    const result = await response.json();
    return { result, status };
  } catch (error) {
    const e = error as Error;
    return { result: e.message, status: 500 };
  }
};

export default async function RestResult({ params, searchParams = {} }: Props) {
  const [url = '', body = ''] = params.slug.map((item) =>
    decodeURIComponent(item)
  );
  const decodedUrl = decodeFromBase64(url);
  const decodedBody = decodeFromBase64(body);

  const { result, status } = await makeRequest({
    body: decodedBody,
    url: decodedUrl,
    headers: searchParams,
  });

  return <CodeEditor value={result} isEdit={false} />;
  // TODO: сделать элемент ResponseViewer переиспользуемым в обоих клиентах
  // return <ResponseViewer value={result || ''} status={status} />;
}
