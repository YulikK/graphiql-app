import { useTranslations } from 'next-intl';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TabList } from '@mui/lab';
import { Box, IconButton, Tab } from '@mui/material';
import { SyntheticEvent } from 'react';

import { useResizeContext } from '@/shared/contexts';
import { Docs } from '@/widgets/docs/docs';

type ClientTabListProps = {
  tabs: string[];
  setActiveTab: (value: string) => void;
  isGraph?: boolean;
};

export const TabListHeader = ({
  isGraph = false,
  tabs,
  setActiveTab,
}: ClientTabListProps) => {
  const { onMaximize, onMinimize, isPaneHide } = useResizeContext();

  const t = useTranslations('Common');

  const handleTabClick = () => {
    if (isPaneHide) {
      onMaximize();
    }
  };

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
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
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <TabList onChange={handleTabChange}>
        {tabs.map(tab => (
          <Tab
            label={tab}
            value={tab.toLowerCase()}
            key={tab}
            onClick={handleTabClick}
          />
        ))}
      </TabList>
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
