import { notFound } from 'next/navigation';

import { CodeEditor } from '@/features/code-editor/code-editor';
import { HttpMethod } from '@/shared/models/http-methods';
import decodeFromBase64 from '@/shared/utils/decode-from-base64';

interface Props {
  params: {
    locale: string;
    rest: string[];
  };
  searchParams?: Record<string, string>;
}

interface RequestParams
  extends Pick<RequestInit, 'method' | 'body' | 'headers'> {
  url: string;
}

const makeRequest = async ({ method, url, body, headers }: RequestParams) => {
  if (!url) return { result: '', status: 0 };

  try {
    const response = await fetch(url, {
      method,
      headers: headers,
      body: body ? body : null,
      cache: 'no-cache',
    });

    const { status } = response;

    const result = await response.json();

    return { result: JSON.stringify(result, null, 2), status };
  } catch (error) {
    const e = error as Error;

    return { result: e.message, status: 500 };
  }
};

export default async function RestResult({ params, searchParams = {} }: Props) {
  const [method = '', url = '', body = ''] = params.rest;

  if (!(method.toUpperCase() in HttpMethod)) {
    notFound();
  }

  const decodedUrl = decodeFromBase64(url);

  const decodedBody = decodeFromBase64(body);

  const { result, status } = await makeRequest({
    body: decodedBody,
    method,
    url: decodedUrl,
    headers: searchParams,
  });

  return <CodeEditor value={result} isEdit={false} status={status} />;
}
