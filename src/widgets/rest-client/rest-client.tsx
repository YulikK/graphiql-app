'use client';
import { useTranslations } from 'next-intl';

import { Box, Card } from '@mui/material';

import ClientEndpoint from '@/features/client-endpoint/client-endpoint';
import { ResizeHorizontal } from '@/features/resize-horizontal/resize-horizontal';
import { RestMethod, RestSubmit } from '@/features/rest';
import { RestTabs, RestTabValue } from '@/features/tab-list/rest/rest-tsbs';
import { setRestUrl } from '@/shared/store/slices/rest-slice';

import { SettingsTab } from '../settings-tab/settings-tab';

type RestClientProps = {
  children: React.ReactNode;
};
export default function RestClient({ children }: RestClientProps) {
  const t = useTranslations('RestPage');
  const tabList = [
    t(RestTabValue.QUERY),
    t(RestTabValue.BODY),
    t(RestTabValue.HEADERS),
    t(RestTabValue.VARIABLES),
  ];

  return (
    <>
      <Box display={'flex'}>
        <RestMethod />
        <ClientEndpoint sliceKey="rest-slice" setUrl={setRestUrl} />
        <RestSubmit />
      </Box>
      <ResizeHorizontal
        pane1={<SettingsTab tabHeaderList={tabList} tabPanelList={RestTabs} />}
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
