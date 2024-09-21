import {
  buildClientSchema,
  getIntrospectionQuery,
  IntrospectionQuery,
} from 'graphql';

export async function getGraphSchemaOnServer(urlDoc: string) {
  const response = await fetch(
    `/api/graphql-schema?urlDoc=${encodeURIComponent(urlDoc)}`
  );

  if (response.status >= 400) {
    const result = await response.json();

    throw new Error(result.error);
  }

  return await response.json();
}

export async function fetchGraphSchema(url: string) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getIntrospectionQuery(),
      operationName: 'IntrospectionQuery',
    }),
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const data = await response.json();

  const introspectionJSON =
    'data' in data && (data.data as unknown as IntrospectionQuery);

  return JSON.stringify(introspectionJSON, null, 2);
}

export function getGraphSchema(schema: string) {
  if (schema === '') return null;

  return buildClientSchema(JSON.parse(schema));
}
