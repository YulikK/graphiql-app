import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import { useAppSelector } from '@/shared/hooks/redux-hooks';

export default function RestSubmit() {
  const router = useRouter();
  const locale = useLocale();
  const {
    method,
    url,
    body = '{}',
    headers,
    variables,
  } = useAppSelector((state) => state['rest-slice']);
  const makeRequest = () => {
    if (!url) return;
    const urlWithVariables = variables.reduce(
      (acc, [key, value]) => acc.replaceAll(`{{${key}}}`, value),
      url
    );
    const codedUrl = btoa(`${urlWithVariables.trim().replaceAll(' ', '')}`);
    const codedBody = btoa(
      `${body
        .replace(/'/g, '"')
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
        .replaceAll(/\s+/g, '')
        .replace(/,(\s*})/g, '$1')}`
    );
    const codeHeaders =
      headers.length > 1
        ? headers.reduce((acc, [key, value], index) => {
            if (!(key && value)) return acc;
            return acc + `${index ? '&' : ''}${key}=${btoa(value)}`;
          }, '?')
        : null;
    router.push(
      `/${locale}/rest/${method}/${codedUrl}/${codedBody}${codeHeaders ?? ''}`
    );
  };
  return (
    <Button variant="contained" onClick={makeRequest}>
      Send
    </Button>
  );
}
