import convertToJsonString from './convert-to-json-string';

export default function ConvertToValidJsonString(value: string) {
  const variables: Record<string, string> = {};
  const stringWithPlaceholders = value.replace(
    /{{(.*?)}}/g,
    (match, p1, index) => {
      const placeholder = `"__placeholder_${index}__"`;
      variables[placeholder] = match;
      return placeholder;
    }
  );
  const formatted = stringWithPlaceholders
    .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
    .replace(/'/g, '"')
    .replace(/,\s*(?=[}\]])/g, '')
    .replace(/}\s*,\s*]/g, '}]')
    .replace(/}\s*,\s*}/g, '}}')
    .replace(/\s+/g, '')
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/([}\]])\s*,\s*$/, '$1');
  try {
    const jsonFormat = JSON.parse(formatted);
    let stringFormat = convertToJsonString(jsonFormat);
    Object.keys(variables).forEach((placeholder) => {
      stringFormat = stringFormat.replace(placeholder, variables[placeholder]);
    });
    return stringFormat;
  } catch {
    return false;
  }
}
