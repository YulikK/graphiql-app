import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  IconButton,
  InputBase,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Allotment } from 'allotment';
import { SyntheticEvent, useState } from 'react';

import style from './settings-tab.module.css';

import { CodeEditor } from '@/features/code-editor/code-editor';
import { Header } from '@/shared/types/types';
import { Docs } from '@/widgets/docs/docs';

type SettingsTabProps = {
  url: string;
  setUrl: (value: string) => void;
  headers: Header[];
  setHeaders: (value: Header[]) => void;
  variables: string;
  setVariables: (value: string) => void;
  isSettingsHide: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
};

export const SettingsTab = ({
  url,
  setUrl,
  headers,
  setHeaders,
  variables,
  setVariables,
  isSettingsHide,
  onMaximize,
  onMinimize,
}: SettingsTabProps) => {
  const [activeTab, setActiveTab] = useState('request');

  const handleAddRow = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newRows = [...headers];
    newRows[index] = { ...newRows[index], [field]: value };
    setHeaders(newRows);
  };

  const handleJsonChange = (value: string) => {
    setVariables(value);
  };

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    event.stopPropagation();

    setActiveTab(newValue);
  };
  const handlePanelVisibleChange = () => {
    if (isSettingsHide) {
      onMaximize();
    } else {
      onMinimize();
    }
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
  };

  return (
    <Card elevation={1} className={style.container}>
      <TabContext value={activeTab}>
        <Allotment.Pane minSize={60} maxSize={60} className={style.pane}>
          <Box className={style['tab-nav']}>
            <TabList onChange={handleTabChange} aria-label="request params">
              <Tab label="Request" value="request" />
              <Tab label="Variables" value="variables" />
            </TabList>
            <Docs url={url} />
            <IconButton
              size="small"
              color="primary"
              aria-label="change panel size"
              onClick={handlePanelVisibleChange}
            >
              {isSettingsHide ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </Box>
        </Allotment.Pane>

        <Box className={style['tab-list']}>
          <TabPanel value="request" className={style['tab-panel']}>
            <Box className={style['tab-request']}>
              <Box padding={2}>
                <TextField
                  label="Endpoint"
                  placeholder="endpoint"
                  id="outlined-start-adornment"
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                />
              </Box>
              <Box padding={2}>
                <Typography variant="subtitle2" component="h3" marginLeft={2}>
                  Headers
                </Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {headers.map((row, index) => (
                        <TableRow key={index} hover={true}>
                          <TableCell>
                            <InputBase
                              value={row.key}
                              placeholder="Key"
                              onChange={(e) =>
                                handleInputChange(index, 'key', e.target.value)
                              }
                              fullWidth
                            />
                          </TableCell>
                          <TableCell sx={{ padding: 0 }}>
                            <InputBase
                              value={row.value}
                              placeholder="Value"
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  'value',
                                  e.target.value
                                )
                              }
                              fullWidth
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  variant="contained"
                  onClick={handleAddRow}
                  sx={{ marginTop: 2 }}
                >
                  Add Row
                </Button>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="variables" sx={{ padding: 2, height: '100%' }}>
            <CodeEditor value={variables} onChange={handleJsonChange} />
          </TabPanel>
        </Box>
      </TabContext>
    </Card>
  );
};
