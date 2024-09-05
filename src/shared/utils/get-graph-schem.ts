import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';

export async function fetchGraphSchema(url: string) {
  const fetcher = createGraphiQLFetcher({ url: url });
  const data = await fetcher({
    query: getIntrospectionQuery(),
    operationName: 'IntrospectionQuery',
  });

  const introspectionJSON =
    'data' in data && (data.data as unknown as IntrospectionQuery);
  return JSON.stringify(introspectionJSON, null, 2);
}
