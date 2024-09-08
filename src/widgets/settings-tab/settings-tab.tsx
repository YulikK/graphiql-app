import { TabContext } from '@mui/lab';
import { Box, Card } from '@mui/material';
import { useState } from 'react';

import { TabListHeader } from '@/features/tab-list/header/tab-list-header';
import { TabPanelContainer } from '@/features/tab-list/tab-panel-container/tab-panel-container';
import { TabsMap } from '@/shared/models/view';

type SettingsTabProps = {
  tabHeaderList: string[];
  tabPanelList: TabsMap[];
  isGraph?: boolean;
};

export const SettingsTab = ({
  tabHeaderList,
  tabPanelList,
  isGraph = false,
}: SettingsTabProps) => {
  const [activeTab, setActiveTab] = useState(tabPanelList[0].name);

  return (
    <Card
      elevation={1}
      sx={{ width: '100%', height: '100%' }}
      className={'item'}
    >
      <TabContext value={activeTab}>
        <TabListHeader
          tabs={tabHeaderList}
          setActiveTab={setActiveTab}
          isGraph={isGraph}
        />

        <Box
          className="scrollable"
          sx={{
            width: '100%',
            height: 'calc(100% - 48px)',
            overflowY: 'auto',
          }}
        >
          {tabPanelList.map(tab => (
            <TabPanelContainer name={tab.name} key={tab.name}>
              {tab.renderComponent()}
            </TabPanelContainer>
          ))}
        </Box>
      </TabContext>
    </Card>
  );
};
