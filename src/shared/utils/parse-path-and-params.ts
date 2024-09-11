export default function parsePathAndParams(path: string, searchParams: string) {
  const [method, url, body] = path.split('/').slice(2);
  const params = searchParams
    .toString()
    .split('&')
    .map(item => {
      const [key, value] = item.split('=');

      return [key, decodeURIComponent(value)];
    });

  return { method, url, body, params };
}
