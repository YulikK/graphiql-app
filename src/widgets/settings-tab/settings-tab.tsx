import { Box, Card } from '@mui/material';
import { useState } from 'react';

import { TabListHeader } from '@/features/tab-list/header/tab-list-header';
import { TabPanelContainer } from '@/features/tab-list/tab-panel-container/tab-panel-container';
import { TabsMap } from '@/shared/models/view';

type SettingsTabProps = {
  tabPanelList: TabsMap[];
  isGraph?: boolean;
};

export const SettingsTab = ({
  tabPanelList,
  isGraph = false,
}: SettingsTabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card
      elevation={1}
      sx={{ width: '100%', height: '100%', maxWidth: 800, m: '0 auto' }}
      className={'item'}
    >
      <TabListHeader
        tabs={tabPanelList}
        activeTab={activeTab}
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
        {tabPanelList.map((tab, index) => (
          <TabPanelContainer value={activeTab} index={index} key={tab.index}>
            {tab.renderComponent()}
          </TabPanelContainer>
        ))}
      </Box>
    </Card>
  );
};
