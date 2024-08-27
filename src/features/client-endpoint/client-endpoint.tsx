import { TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import RestSlice from '@/shared/store/slices/rest-slice';
import { SliceName } from '@/shared/types/slice-name';

interface Props {
  sliceKey: SliceName;
  setUrl: typeof RestSlice.actions.setRestUrl;
}

export default function ClientEndpoint({ setUrl, sliceKey }: Props) {
  const url = useAppSelector((state) => state[sliceKey].url);
  const dispatch = useAppDispatch();
  return (
    <TextField
      variant="outlined"
      onInput={(e) => dispatch(setUrl((e.target as HTMLInputElement).value))}
      value={url}
      sx={{ flexGrow: 1 }}
    />
  );
}
