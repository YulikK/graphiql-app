import { useTranslations } from 'next-intl';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TabList } from '@mui/lab';
import { Box, IconButton, Tab } from '@mui/material';
import { SyntheticEvent } from 'react';

import { useResizeContext } from '@/shared/contexts';

import style from './tab-list-header.module.css';

type ClientTabListProps = {
  tabs: string[];
  setActiveTab: (value: string) => void;
};
export const TabListHeader = ({ tabs, setActiveTab }: ClientTabListProps) => {
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
    <Box className={style.container}>
      <TabList onChange={handleTabChange}>
        {tabs.map((tab) => (
          <Tab
            label={tab}
            value={tab.toLowerCase()}
            key={tab}
            onClick={handleTabClick}
          />
        ))}
      </TabList>
      <IconButton
        size="small"
        color="primary"
        aria-label={t('label-resize')}
        onClick={handlePanelVisibleChange}
        sx={{ ml: 'auto' }}
      >
        {isPaneHide ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </IconButton>
    </Box>
  );
};
