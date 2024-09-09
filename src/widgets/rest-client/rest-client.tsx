'use client';
import { useTranslations } from 'next-intl';

import { Box, Card } from '@mui/material';

import ClientEndpoint from '@/features/client-endpoint/client-endpoint';
import { ResizeHorizontal } from '@/features/resize-horizontal/resize-horizontal';
import { RestMethod, RestSubmit } from '@/features/rest';
import { RestTabs, RestTabValueType } from '@/features/tab-list/rest/rest-tabs';
import { setRestUrl } from '@/shared/store/slices/rest-slice';

import { SettingsTab } from '../settings-tab/settings-tab';

type RestClientProps = {
  children: React.ReactNode;
};

export default function RestClient({ children }: RestClientProps) {
  const t = useTranslations('RestPage');

  RestTabs.forEach(tab => {
    tab.location = t(tab.name as RestTabValueType);
  });

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 800, m: '0 auto', display: 'flex' }}>
        <RestMethod />
        <ClientEndpoint sliceKey="rest-slice" setUrl={setRestUrl} />
        <RestSubmit />
      </Box>
      <ResizeHorizontal
        pane1={<SettingsTab tabPanelList={RestTabs} />}
        pane2={
          <Card
            sx={{
              display: 'flex',
              height: '100%',
              width: '100%',
            }}
            className={'item'}
          >
            {children}
          </Card>
        }
      />
    </>
  );
}
