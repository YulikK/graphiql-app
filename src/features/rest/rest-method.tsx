import { MenuItem, Select } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { HttpMethod, HttpMethodType } from '@/shared/models/http-methods';
import { setRestMethod } from '@/shared/store/slices/rest-slice';

const httpMethods = Object.values(HttpMethod).filter(
  value => typeof value === 'string'
);

export default function RestMethod() {
  const method = useAppSelector(state => state['rest-slice'].method);

  const dispatch = useAppDispatch();

  return (
    <Select
      size="small"
      defaultValue={method}
      value={method}
      onChange={e => dispatch(setRestMethod(e.target.value as HttpMethodType))}
    >
      {httpMethods.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
}
