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

export enum GraphTabValue {
  URL = 'url',
  HEADERS = 'headers',
  VARIABLES = 'variables',
}

const UrlTap = () => {
  const t = useTranslations('GraphqlPage');
  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={2}>
        <ClientEndpoint
          sliceKey="graphql-slice"
          setUrl={setGraphUrl}
          label={t('endpoint')}
          variant="standard"
        />
      </Box>
      <Box display={'flex'} alignItems={'center'} gap={2} marginTop={2}>
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
  { name: GraphTabValue.URL, component: UrlTap },
  { name: GraphTabValue.HEADERS, component: HeadersTab },
  { name: GraphTabValue.VARIABLES, component: VariablesTab },
];
