import { useTranslations } from 'next-intl';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Card,
  IconButton,
  InputLabel,
  Tab,
  TableContainer,
} from '@mui/material';
import { Allotment } from 'allotment';
import clsx from 'clsx';
import { SyntheticEvent, useState } from 'react';

import ClientEndpoint from '@/features/client-endpoint/client-endpoint';
import ClientHeaders from '@/features/client-headers/client-headers';
import { CodeEditor } from '@/features/code-editor/code-editor';
import {
  deleteGraphHeader,
  setGraphHeader,
  setGraphUrl,
  setGraphUrlDoc,
} from '@/shared/store/slices/grahpql-client';
import { Docs } from '@/widgets/docs/docs';

import style from './settings-tab.module.css';

type SettingsTabProps = {
  variables: string;
  setVariables: (value: string) => void;
  isSettingsHide: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
};

export const SettingsTab = ({
  variables,
  setVariables,
  isSettingsHide,
  onMaximize,
  onMinimize,
}: SettingsTabProps) => {
  const [activeTab, setActiveTab] = useState('url');
  const t = useTranslations('GraphqlPage');

  const handleJsonChange = (value: string) => {
    setVariables(value);
  };

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    event.stopPropagation();
    setActiveTab(newValue);
    if (isSettingsHide) {
      onMaximize();
    }
  };
  const handlePanelVisibleChange = () => {
    if (isSettingsHide) {
      onMaximize();
    } else {
      onMinimize();
    }
  };

  return (
    // <Stack>
    <Card elevation={1} className={clsx(style.container, 'item')}>
      <TabContext value={activeTab}>
        <Allotment.Pane minSize={60} maxSize={60} className={style.pane}>
          <Box className={style['tab-nav']}>
            <TabList onChange={handleTabChange} aria-label="request params">
              <Tab label={t('url')} value="url" />
              <Tab label={t('headers')} value="headers" />
              <Tab label={t('variables')} value="variables" />
            </TabList>
            <IconButton
              size="small"
              color="primary"
              aria-label="change panel size"
              onClick={handlePanelVisibleChange}
              sx={{ ml: 'auto' }}
            >
              {isSettingsHide ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </Box>
        </Allotment.Pane>

        <Box className={style['tab-list']}>
          <TabPanel value="url" className={style['tab-panel']}>
            <TableContainer component={Box} className={style['tab-request']}>
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <InputLabel>{t('endpoint')}</InputLabel>
                <ClientEndpoint sliceKey="graphql-slice" setUrl={setGraphUrl} />
              </Box>
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <InputLabel>{t('documentation')}</InputLabel>
                <ClientEndpoint
                  sliceKey="graphql-slice"
                  setUrl={setGraphUrlDoc}
                />
                <Docs url={'url'} />
              </Box>
            </TableContainer>
          </TabPanel>
          <TabPanel value="headers" className={style['tab-panel']}>
            <TableContainer component={Box} className={style['tab-request']}>
              <ClientHeaders
                sliceKey="graphql-slice"
                deleteHeader={deleteGraphHeader}
                setHeader={setGraphHeader}
              />
            </TableContainer>
          </TabPanel>
          <TabPanel value="variables" sx={{ padding: 2, height: '100%' }}>
            <CodeEditor value={variables} onChange={handleJsonChange} />
          </TabPanel>
        </Box>
      </TabContext>
    </Card>
    // </Stack>
  );
};
