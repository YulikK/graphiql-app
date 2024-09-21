import { useTranslations } from 'next-intl';

import { Button } from '@mui/material';

import useRestUrl from '@/shared/hooks/use-rest-url';

export default function RestSubmit() {
  const makeRequest = useRestUrl();

  const t = useTranslations('RestPage');

  return (
    <Button size="small" variant="contained" onClick={() => makeRequest()}>
      {t('send')}
    </Button>
  );
}
