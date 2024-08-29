import checkLastTuple from './check-last-tuple';

export default function updateUlrAndQuery(
  url: string,
  query: string[][]
): [string, string[][]] {
  const newUrl = `${url.split('?').shift()}?`;
  const filtered = query.filter(([key, value]) => key || value);
  const newQuery = checkLastTuple(filtered);
  const newUrlWithQuery = `${newUrl}${filtered.map((tuple) => tuple.join('=')).join('&')}`;

  return [newUrlWithQuery, newQuery];
}
