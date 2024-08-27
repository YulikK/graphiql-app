import ClientList from '../client-list/client-list';

import { useAppSelector, useAppDispatch } from '@/shared/hooks/redux-hooks';
import ChangeVariableItem from '@/shared/interfaces/change-variable-item';
import {
  deleteRestHeader,
  setRestHeader,
} from '@/shared/store/slices/rest-slice';

export default function RestHeaders() {
  const headers = useAppSelector((state) => state['rest-slice'].headers);
  const dispatch = useAppDispatch();
  const deleteItem = (index: number) => dispatch(deleteRestHeader(index));

  const changeItem = (object: ChangeVariableItem) =>
    dispatch(setRestHeader(object));
  return (
    <ClientList
      dataList={headers}
      changeItem={changeItem}
      deleteAction={deleteItem}
    />
  );
}
