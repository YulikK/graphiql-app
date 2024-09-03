export default function sanitizeJsonString(value: string) {
  return value
    .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
    .replace(/'/g, '"')
    .replace(/,\s*(?=[}\]])/g, '')
    .replace(/}\s*,\s*]/g, '}]')
    .replace(/}\s*,\s*}/g, '}}')
    .replace(/\s+/g, '')
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/([}\]])\s*,\s*$/, '$1');
}
