'use client';

import { useTranslations } from 'next-intl';

import { Card } from '@mui/material';

import { GraphQuery } from '@/features/client-query/client-query';
import { ResizeHorizontal } from '@/features/resize-horizontal/resize-horizontal';
import { ResizeVertical } from '@/features/resize-vertical/resize-vertical';
import { GraphTabs, GraphTabValue } from '@/features/tab-list/graph/graph-tabs';
import { SettingsTab } from '@/widgets/settings-tab/settings-tab';

type GraphqlClientProps = {
  children: React.ReactNode;
};
export default function GraphqlClient({ children }: GraphqlClientProps) {
  const t = useTranslations('GraphqlPage');
  const tabList = [
    t(GraphTabValue.URL),
    t(GraphTabValue.HEADERS),
    t(GraphTabValue.VARIABLES),
  ];
  return (
    <ResizeHorizontal
      pane1={
        <SettingsTab
          tabHeaderList={tabList}
          tabPanelList={GraphTabs}
          isGraph={true}
        />
      }
      pane2={
        <Card
          sx={{ display: 'flex', height: '100%', width: '100%' }}
          className="item"
        >
          <ResizeVertical pane1={<GraphQuery />} pane2={children} />
        </Card>
      }
    />
  );
}
