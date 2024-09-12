import { RootState } from '../models/redux-types';

import encodeToBase64 from './encode-to-base64';
import insertVariables from './insert-variables';
import sanitizeJsonString from './sanitize-json-string';

const buildRestUrl = (
  { body, headers, method, url, variables, textMode }: RootState['rest-slice'],
  locale: string
) => {
  if (!url) {
    window.history.replaceState(null, '', `/${locale}/${method}`);

    return;
  }

  const codedUrl = encodeToBase64(
    `${insertVariables(url, variables).trim().replaceAll(' ', '')}`
  );

  const bodyWithVariables = insertVariables(body, variables);

  const codedBody = textMode
    ? encodeToBase64(bodyWithVariables)
    : encodeToBase64(sanitizeJsonString(bodyWithVariables));

  const codedHeaders = new URLSearchParams(
    Object.fromEntries(headers.filter(([key, value]) => key && value))
  ).toString();

  const address = [method, codedUrl, codedBody]
    .filter(value => value)
    .join('/');

  return `/${locale}/${address}${codedHeaders ? `?${codedHeaders}` : ''}`;
};

export default buildRestUrl;
