import ClientHeaders from '@/features/client-headers/client-headers';
import ClientVariables from '@/features/client-variables/client-variables';
import { RestBody, RestQuery } from '@/features/rest';
import { TabsMap } from '@/shared/models/view';
import {
  deleteRestHeader,
  deleteRestVariables,
  setRestHeader,
  setRestVariables,
} from '@/shared/store/slices/rest-slice';

export enum RestTabValue {
  QUERY = 'query',
  BODY = 'body',
  HEADERS = 'headers',
  VARIABLES = 'variables',
}

const queryTap = () => {
  return <RestQuery />;
};

const bodyTap = () => {
  return <RestBody />;
};

const headersTab = () => {
  return (
    <ClientHeaders
      sliceKey="rest-slice"
      deleteHeader={deleteRestHeader}
      setHeader={setRestHeader}
    />
  );
};

const variablesTab = () => {
  return (
    <ClientVariables
      sliceKey="rest-slice"
      deleteVariable={deleteRestVariables}
      setVariable={setRestVariables}
    />
  );
};

export const RestTabs: TabsMap[] = [
  { name: RestTabValue.QUERY, component: queryTap },
  { name: RestTabValue.BODY, component: bodyTap },
  { name: RestTabValue.HEADERS, component: headersTab },
  { name: RestTabValue.VARIABLES, component: variablesTab },
];
