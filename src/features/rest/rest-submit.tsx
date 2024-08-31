import { useLocale } from 'next-intl';

import { Button } from '@mui/material';

import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/shared/hooks/redux-hooks';
import encodeToBase64 from '@/shared/utils/encode-to-base64';

export default function RestSubmit() {
  const router = useRouter();
  const locale = useLocale();
  const { method, url, body, headers, variables } = useAppSelector(
    (state) => state['rest-slice']
  );
  const makeRequest = () => {
    if (!url) return;
    const urlWithVariables = variables.reduce(
      (acc, [key, value]) => acc.replaceAll(`{{${key}}}`, value),
      url
    );
    const codedUrl = encodeToBase64(
      `${urlWithVariables.trim().replaceAll(' ', '')}`
    );
    const codedBody = encodeToBase64(
      `${body
        .replace(/'/g, '"')
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
        .replaceAll(/\s+/g, '')
        .replace(/,(\s*})/g, '$1')}`
    );
    const codedHeaders = new URLSearchParams(
      Object.fromEntries(headers.filter(([key, value]) => key && value))
    );

    router.push(
      `/${locale}/rest/${method}/${codedUrl}/${codedBody}${codedHeaders ? `?${codedHeaders}` : ''}`
    );
  };
  return (
    <Button variant="contained" onClick={makeRequest}>
      Send
    </Button>
  );
}
