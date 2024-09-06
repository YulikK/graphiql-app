import { useTranslations } from 'next-intl';

import { Box, InputLabel } from '@mui/material';

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
import { Docs } from '@/widgets/docs/docs';

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
        <InputLabel>{t('endpoint')}</InputLabel>
        <ClientEndpoint sliceKey="graphql-slice" setUrl={setGraphUrl} />
      </Box>
      <Box display={'flex'} alignItems={'center'} gap={2} marginTop={2}>
        <InputLabel>{t('documentation')}</InputLabel>
        <ClientEndpoint sliceKey="graphql-slice" setUrl={setGraphUrlDoc} />
        <Docs />
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
