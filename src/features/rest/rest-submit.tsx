import { useTranslations } from 'next-intl';

import { Button } from '@mui/material';

import useRestRequest from '@/shared/hooks/use-rest-request';

export default function RestSubmit() {
  const makeRequest = useRestRequest();
  const t = useTranslations('RestPage');

  return (
    <Button variant="contained" onClick={makeRequest}>
      {t('send')}
    </Button>
  );
}
