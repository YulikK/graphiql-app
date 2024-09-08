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

export const RestTabValue = {
  QUERY: 'query',
  BODY: 'body',
  HEADERS: 'headers',
  VARIABLES: 'variables',
} as const;

const QueryTap = () => {
  return <RestQuery />;
};

const BodyTap = () => {
  return <RestBody />;
};

const HeadersTab = () => {
  return (
    <ClientHeaders
      sliceKey="rest-slice"
      deleteHeader={deleteRestHeader}
      setHeader={setRestHeader}
    />
  );
};

const VariablesTab = () => {
  return (
    <ClientVariables
      sliceKey="rest-slice"
      deleteVariable={deleteRestVariables}
      setVariable={setRestVariables}
    />
  );
};

export const RestTabs: TabsMap[] = [
  { name: RestTabValue.QUERY, renderComponent: QueryTap },
  { name: RestTabValue.BODY, renderComponent: BodyTap },
  { name: RestTabValue.HEADERS, renderComponent: HeadersTab },
  { name: RestTabValue.VARIABLES, renderComponent: VariablesTab },
];
