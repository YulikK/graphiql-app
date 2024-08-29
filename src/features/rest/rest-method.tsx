import { Select, MenuItem } from '@mui/material';

import { useAppSelector, useAppDispatch } from '@/shared/hooks/redux-hooks';
import { setRestMethod } from '@/shared/store/slices/rest-slice';
import { HttpMethods } from '@/shared/types/http-methods';

const httpMethods: HttpMethods[] = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'OPTIONS',
  'HEAD',
];

export default function RestMethod() {
  const method = useAppSelector((state) => state['rest-slice'].method);
  const dispatch = useAppDispatch();
  return (
    <Select
      defaultValue={method}
      value={method}
      label="Method"
      onChange={(e) => dispatch(setRestMethod(e.target.value as HttpMethods))}
    >
      {httpMethods.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
}
