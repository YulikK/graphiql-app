import { TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { RootState } from '@/shared/models/redux-types';
import { SliceName } from '@/shared/models/slice-name';
import GraphqlSlice from '@/shared/store/slices/grahpql-client';
import RestSlice from '@/shared/store/slices/rest-slice';

interface Props {
  sliceKey: SliceName;
  setUrl:
    | typeof RestSlice.actions.setRestUrl
    | typeof GraphqlSlice.actions.setGraphUrl
    | typeof GraphqlSlice.actions.setGraphUrlDoc;
}

export default function ClientEndpoint({ setUrl, sliceKey }: Props) {
  const isDoc =
    sliceKey === 'graphql-slice' &&
    setUrl === GraphqlSlice.actions.setGraphUrlDoc;

  const url = useAppSelector((state: RootState) =>
    isDoc ? state['graphql-slice'].urlDoc : state[sliceKey].url
  );

  const dispatch = useAppDispatch();
  return (
    <TextField
      size="small"
      variant="outlined"
      onInput={(e) => dispatch(setUrl((e.target as HTMLInputElement).value))}
      // onChange={(e) => dispatch(setUrl((e.target as HTMLInputElement).value))}
      value={url}
      sx={{ flexGrow: 1 }}
    />
  );
}
