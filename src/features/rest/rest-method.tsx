import { MenuItem, Select } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { HttpMethods } from '@/shared/models/http-methods';
import { setRestMethod } from '@/shared/store/slices/rest-slice';

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
