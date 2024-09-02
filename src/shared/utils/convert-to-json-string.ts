export default function convertToJsonString(value: string) {
  return JSON.stringify(value, null, ' ');
}
