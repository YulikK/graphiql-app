import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';

// export function getGraphSchema(schema: string) {
//   if (schema === '') return null;
//   try {
//     return buildClientSchema(JSON.parse(schema));
//   } catch (error) {
//     console.error('Error parsing schema:', error);
//     return null;
//   }
// }

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
