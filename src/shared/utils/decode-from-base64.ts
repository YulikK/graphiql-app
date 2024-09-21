export default function decodeFromBase64(value: string) {
  const base64String = value.replace(/-/g, '+').replace(/_/g, '/');

  const paddedBase64String = base64String.padEnd(
    base64String.length + ((4 - (base64String.length % 4)) % 4),
    '='
  );

  return Buffer.from(paddedBase64String, 'base64').toString('utf-8');
}
