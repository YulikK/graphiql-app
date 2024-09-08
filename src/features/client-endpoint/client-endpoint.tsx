import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { InputAdornment, TextField } from '@mui/material';

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
  label?: string;
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  variant?: 'standard' | 'outlined' | 'filled';
}

export default function ClientEndpoint({
  label,
  setUrl,
  sliceKey,
  startComponent,
  endComponent,
  variant = 'outlined',
}: Props) {
  const isDoc =
    sliceKey === 'graphql-slice' &&
    setUrl === GraphqlSlice.actions.setGraphUrlDoc;

  const url = useAppSelector((state: RootState) =>
    isDoc ? state[sliceKey].urlDoc : state[sliceKey].url
  );

  const dispatch = useAppDispatch();

  return (
    <TextField
      label={label}
      size="small"
      variant={variant}
      onInput={e => dispatch(setUrl((e.target as HTMLInputElement).value))}
      value={url}
      sx={{ flexGrow: 1 }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              {startComponent ? startComponent : <InsertLinkIcon />}
            </InputAdornment>
          ),
          endAdornment: endComponent ? endComponent : undefined,
        },
      }}
    />
  );
}
