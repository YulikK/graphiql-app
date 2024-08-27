import { TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { setRestUrl } from '@/shared/store/slices/rest-slice';

export default function ClientEndpoint() {
  const url = useAppSelector((state) => state['rest-slice'].url);
  const dispatch = useAppDispatch();
  return (
    <TextField
      variant="outlined"
      onInput={(e) =>
        dispatch(setRestUrl((e.target as HTMLInputElement).value))
      }
      value={url}
      sx={{ flexGrow: 1 }}
    />
  );
}
