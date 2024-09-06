import { TabContext } from '@mui/lab';
import { Box, Card } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';

import { TabListHeader } from '@/features/tab-list/header/tab-list-header';
import { TabPanelContainer } from '@/features/tab-list/tab-panel-container/tab-panel-conrainer';
import { TabsMap } from '@/shared/models/view';

import style from './settings-tab.module.css';

type SettingsTabProps = {
  tabHeaderList: string[];
  tabPanelList: TabsMap[];
};
export const SettingsTab = ({
  tabHeaderList,
  tabPanelList,
}: SettingsTabProps) => {
  const [activeTab, setActiveTab] = useState(tabPanelList[0].name);

  return (
    <Card elevation={1} className={clsx(style.container, 'item')}>
      <TabContext value={activeTab}>
        <TabListHeader tabs={tabHeaderList} setActiveTab={setActiveTab} />

        <Box className={style['tab-list']}>
          {tabPanelList.map((tab) => (
            <TabPanelContainer name={tab.name} key={tab.name}>
              {tab.component()}
            </TabPanelContainer>
          ))}
        </Box>
      </TabContext>
    </Card>
  );
};
