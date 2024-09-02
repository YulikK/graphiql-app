export default function decodeFromBase64(value: string) {
  return Buffer.from(value, 'base64').toString('utf-8');
}
