'use client';

import { json } from '@codemirror/lang-json';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
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
} from '@mui/material';
import { materialLight } from '@uiw/codemirror-theme-material';
import ReactCodeMirror from '@uiw/react-codemirror';
import { SyntheticEvent, useState } from 'react';

export default function GraphQlPage() {
  // const [expanded, setExpanded] = useState(false);
  const [jsonBody, setJsonBody] = useState('{}');
  const [value, setValue] = useState('headers');
  const [rows, setRows] = useState([{ key: '', value: '' }]);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    event.stopPropagation();

    setValue(newValue);
  };
  const handleJsonChange = (value: string) => {
    setJsonBody(value);
  };

  const handleAddRow = () => {
    setRows([...rows, { key: '', value: '' }]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
    console.log(rows);
  };

  return (
    <Box component="section" margin="20px 0" width="100%">
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="URL"
          inputProps={{ 'aria-label': 'URL' }}
          fullWidth
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <SendIcon />
        </IconButton>
      </Paper>

      <TabContext value={value}>
        <Accordion disableGutters={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
            sx={{ margin: 0 }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                width: '100%',
              }}
            >
              <TabList onChange={handleChange} aria-label="request params">
                <Tab label="Headers" value="headers" />
                <Tab label="Body" value="body" />
              </TabList>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <TabPanel value="headers" sx={{ padding: 0 }}>
              <Box padding={2}>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
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
            </TabPanel>
            <TabPanel value="body" sx={{ padding: 0 }}>
              <ReactCodeMirror
                value={jsonBody}
                height="200px"
                extensions={[json()]}
                theme={materialLight}
                onChange={(value) => handleJsonChange(value)}
              />
            </TabPanel>
          </AccordionDetails>
        </Accordion>
      </TabContext>
    </Box>
  );
}
