export default function ConvertToValidJson(value: string) {
  const result = value
    .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
    .replace(/'/g, '"')
    .replace(/,\s*(?=[}\]])/g, '') // Remove trailing commas before closing brackets/braces
    .replace(/}\s*,\s*]/g, '}]') // Remove comma after } followed by ]
    .replace(/}\s*,\s*}/g, '}}') // Remove comma after } followed by }
    .replace(/\s+/g, '')
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/,\s*([}\]])/g, '$1') // Remove comma before a closing bracket/brace
    .replace(/([}\]])\s*,\s*$/, '$1');
  return JSON.parse(result);
}
