export default function insertVariables(
  value: string,
  variables: string[][],
  forJson = false
) {
  return variables.reduce(
    (acc, [key, value]) =>
      acc.replaceAll(`{{${key}}}`, forJson ? `"${value}"` : value),
    value
  );
}
