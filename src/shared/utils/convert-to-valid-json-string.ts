import convertToJsonString from './convert-to-json-string';
import sanitizeJsonString from './sanitize-json-string';

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
  const sanitized = sanitizeJsonString(stringWithPlaceholders);
  try {
    const jsonFormat = JSON.parse(sanitized);
    let stringFormat = convertToJsonString(jsonFormat);
    Object.keys(variables).forEach((placeholder) => {
      stringFormat = stringFormat.replace(placeholder, variables[placeholder]);
    });
    return stringFormat;
  } catch {
    return false;
  }
}
