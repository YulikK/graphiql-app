import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { setGraphVariables } from '@/shared/store/slices/grahpql-client';

import { CodeEditor } from '../code-editor/code-editor';

export const GraphVariables = () => {
  const variables = useAppSelector(state => state['graphql-slice'].variables);

  const dispatch = useAppDispatch();

  const handleJsonChange = (value: string) => {
    dispatch(setGraphVariables(value));
  };

  return <CodeEditor value={variables} onChange={handleJsonChange} />;
};
