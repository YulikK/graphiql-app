'use client';

import { useTranslations } from 'next-intl';

import { Card } from '@mui/material';
import clsx from 'clsx';

import { GraphQuery } from '@/features/client-query/client-query';
import { ResizeHorizontal } from '@/features/resize-horizontal/resize-horizontal';
import { ResizeVertical } from '@/features/resize-vertical/resize-vertical';
import { GraphTabs, GraphTabValue } from '@/features/tab-list/graph/graph-tabs';
import { SettingsTab } from '@/widgets/settings-tab/settings-tab';

import style from './graphql-client.module.css';

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
      pane1={<SettingsTab tabHeaderList={tabList} tabPanelList={GraphTabs} />}
      pane2={
        <Card className={clsx(style['editors-card'], 'item')}>
          <ResizeVertical pane1={<GraphQuery />} pane2={children} />
        </Card>
      }
    />
  );
}
