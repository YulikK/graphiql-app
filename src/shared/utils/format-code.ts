import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';
import parserGraphql from 'prettier/plugins/graphql';
import prettier from 'prettier/standalone';

export default async function FormatCode(value: string, isGraphQl: boolean) {
  const Language = {
    JSON: 'json',
    GRAPHQL: 'graphql',
  };

  const variables: Record<string, string> = {};

  const stringWithPlaceholders = value.replace(
    /{{(.*?)}}/g,
    (match, p1, index) => {
      const placeholder = `"__placeholder_${index}__"`;

      variables[placeholder] = match;

      return placeholder;
    }
  );

  let formatted = await prettier.format(stringWithPlaceholders, {
    parser: isGraphQl ? Language.GRAPHQL : Language.JSON,
    plugins: isGraphQl ? [parserGraphql] : [parserBabel, parserEstree],
  });

  Object.keys(variables).forEach(placeholder => {
    formatted = formatted.replace(placeholder, variables[placeholder]);
  });

  return formatted;
}
