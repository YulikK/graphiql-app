export default function insertVariables(value: string, variables: string[][]) {
  return variables.reduce(
    (acc, [key, value]) => acc.replaceAll(`{{${key}}}`, value),
    value
  );
}
