import { useTranslations } from 'next-intl';

import { Box } from '@mui/material';

import ClientEndpoint from '@/features/client-endpoint/client-endpoint';
import ClientHeaders from '@/features/client-headers/client-headers';
import { GraphVariables } from '@/features/client-variables-graph/client-variables-graph';
import { TabsMap } from '@/shared/models/view';
import {
  deleteGraphHeader,
  setGraphHeader,
  setGraphUrl,
  setGraphUrlDoc,
} from '@/shared/store/slices/grahpql-client';

export const GraphTabValue = {
  URL: 'url',
  HEADERS: 'headers',
  VARIABLES: 'variables',
} as const;

export type GraphTabValueType =
  (typeof GraphTabValue)[keyof typeof GraphTabValue];

const UrlTap = () => {
  const t = useTranslations('GraphqlPage');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <ClientEndpoint
          sliceKey="graphql-slice"
          setUrl={setGraphUrl}
          label={t('endpoint')}
          variant="standard"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mt: 2,
        }}
      >
        <ClientEndpoint
          sliceKey="graphql-slice"
          setUrl={setGraphUrlDoc}
          label={t('documentation')}
          variant="standard"
        />
      </Box>
    </>
  );
};

const HeadersTab = () => {
  return (
    <ClientHeaders
      sliceKey="graphql-slice"
      deleteHeader={deleteGraphHeader}
      setHeader={setGraphHeader}
    />
  );
};

const VariablesTab = () => {
  return <GraphVariables />;
};

export const GraphTabs: TabsMap[] = [
  { name: GraphTabValue.URL, index: 0, renderComponent: UrlTap },
  { name: GraphTabValue.HEADERS, index: 1, renderComponent: HeadersTab },
  { name: GraphTabValue.VARIABLES, index: 2, renderComponent: VariablesTab },
];
