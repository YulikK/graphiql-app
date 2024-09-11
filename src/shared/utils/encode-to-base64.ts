export default function encodeToBase64(value: string) {
  const base64String = Buffer.from(value, 'utf-8').toString('base64');

  return base64String
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
