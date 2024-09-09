import { useTranslations } from 'next-intl';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import { SyntheticEvent } from 'react';

import { useResizeContext } from '@/shared/contexts';
import { TabsMap } from '@/shared/models/view';
import { Docs } from '@/widgets/docs/docs';

type ClientTabListProps = {
  tabs: TabsMap[];
  activeTab: number;
  setActiveTab: (value: number) => void;
  isGraph?: boolean;
};

export const TabListHeader = ({
  isGraph = false,
  tabs,
  setActiveTab,
  activeTab,
}: ClientTabListProps) => {
  const { onMaximize, onMinimize, isPaneHide } = useResizeContext();

  const t = useTranslations('Common');

  const handleTabClick = () => {
    if (isPaneHide) {
      onMaximize();
    }
  };

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handlePanelVisibleChange = () => {
    if (isPaneHide) {
      onMaximize();
    } else {
      onMinimize();
    }
  };

  return (
    <Box
      sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
      className="tab-header"
    >
      <Tabs value={activeTab} onChange={handleTabChange}>
        {tabs.map(tab => (
          <Tab
            label={tab.location || tab.name}
            value={tab.index}
            key={tab.index}
            onClick={handleTabClick}
          />
        ))}
      </Tabs>
      <Box sx={{ ml: 'auto' }}>
        {isGraph && <Docs />}
        <IconButton
          size="small"
          color="primary"
          aria-label={t('label-resize')}
          onClick={handlePanelVisibleChange}
        >
          {isPaneHide ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};
