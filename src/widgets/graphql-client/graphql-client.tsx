'use client';

import { useTranslations } from 'next-intl';

import { Card } from '@mui/material';

import { GraphQuery } from '@/features/client-query/client-query';
import { Loader } from '@/features/loader/loader';
import { ResizeHorizontal } from '@/features/resize-horizontal/resize-horizontal';
import { ResizeVertical } from '@/features/resize-vertical/resize-vertical';
import type { GraphTabValueType } from '@/features/tab-list/graph/graph-tabs';
import { GraphTabs } from '@/features/tab-list/graph/graph-tabs';
import { usePrivateRedirect } from '@/shared/hooks/use-private-redirect';
import { SettingsTab } from '@/widgets/settings-tab/settings-tab';

type GraphqlClientProps = {
  children: React.ReactNode;
};

export default function GraphqlClient({ children }: GraphqlClientProps) {
  const { isLoggedIn, loading } = usePrivateRedirect();

  const t = useTranslations('GraphqlPage');

  GraphTabs.forEach(tab => {
    tab.location = t(tab.name as GraphTabValueType);
  });

  if (loading) {
    return <Loader />;
  }

  return (
    isLoggedIn && (
      <ResizeHorizontal
        pane1={<SettingsTab tabPanelList={GraphTabs} isGraph={true} />}
        pane2={
          <Card
            sx={{ display: 'flex', height: '100%', width: '100%' }}
            className="item"
          >
            <ResizeVertical pane1={<GraphQuery />} pane2={children} />
          </Card>
        }
      />
    )
  );
}
