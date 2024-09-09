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

export type RestTabValueType = (typeof RestTabValue)[keyof typeof RestTabValue];

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
  { name: RestTabValue.QUERY, index: 0, renderComponent: QueryTap },
  { name: RestTabValue.BODY, index: 1, renderComponent: BodyTap },
  { name: RestTabValue.HEADERS, index: 2, renderComponent: HeadersTab },
  { name: RestTabValue.VARIABLES, index: 3, renderComponent: VariablesTab },
];
