import checkLastTuple from './check-last-tuple';

export default function updateUlrAndQuery(
  url: string,
  query: string[][]
): [string, string[][]] {
  const newUrl = `${url.split('?').shift()}?`;
  const newQuery = checkLastTuple(query.filter(([key, value]) => key || value));
  const newUrlWithQuery = `${newUrl}${newQuery.map((tuple) => tuple.join('=')).join('&')}`;

  return [newUrlWithQuery, newQuery];
}
