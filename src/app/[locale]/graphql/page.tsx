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
import { graphql } from 'cm6-graphql';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
} from 'graphql';
import { SyntheticEvent, useEffect, useState } from 'react';

import { Docs } from '@/widgets/docs/docs';

type Header = {
  key: string;
  value: string;
};

const fetchSchema = async (url: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
  });
  const result = await response.json();
  const schema = buildClientSchema(result.data);
  return schema;
};

export default function GraphQlPage() {
  const [variables, setVariables] = useState('{}');
  const [graphqlQuery, setGraphqlQuery] = useState('');
  const [activeTab, setActiveTab] = useState('headers');
  const [url, setUrl] = useState(
    'https://swapi-graphql.netlify.app/.netlify/functions/index'
  );
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchSchema(`${url}?sdl`).then((newSchema) => {
      if (newSchema) {
        setSchema(newSchema);
      }
    });
  }, [url]);

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    event.stopPropagation();

    setActiveTab(newValue);
  };
  const handleJsonChange = (value: string) => {
    setVariables(value);
  };
  const handleGraphqlChange = (value: string) => {
    setGraphqlQuery(value);
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
  };

  const handleAddRow = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newRows = [...headers];
    newRows[index] = { ...newRows[index], [field]: value };
    setHeaders(newRows);
  };

  const handleSendRequest = async () => {
    const headersObject = Object.fromEntries(
      headers
        .filter((header) => header.key && header.value)
        .map((header) => [header.key, header.value])
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headersObject,
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: JSON.parse(variables),
      }),
    });
    const result = await response.json();
    setResponse(JSON.stringify(result, null, 2));
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
          size="small"
          sx={{ ml: 1, flex: 1 }}
          placeholder="endpoint"
          inputProps={{ 'aria-label': 'URL' }}
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          fullWidth
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          size="small"
          color="primary"
          sx={{ p: '10px' }}
          aria-label="directions"
          onClick={handleSendRequest}
        >
          <SendIcon />
        </IconButton>
        <Docs url={url} />
      </Paper>

      <TabContext value={activeTab}>
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
              <TabList onChange={handleTabChange} aria-label="request params">
                <Tab label="Variables" value="variables" />
                <Tab label="Headers" value="headers" />
              </TabList>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <TabPanel value="variables" sx={{ padding: 0 }}>
              <ReactCodeMirror
                value={variables}
                height="200px"
                extensions={[json()]}
                theme={materialLight}
                onChange={(value) => handleJsonChange(value)}
              />
            </TabPanel>
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
            </TabPanel>
          </AccordionDetails>
        </Accordion>
      </TabContext>
      <ReactCodeMirror
        value={graphqlQuery}
        height="200px"
        theme={materialLight}
        extensions={schema ? [graphql(schema)] : []}
        onChange={(value) => handleGraphqlChange(value)}
      />
      <ReactCodeMirror
        value={response}
        height="200px"
        extensions={[json()]}
        theme={materialLight}
        editable={false}
      />
    </Box>
  );
}
