import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import ChangeVariableItem from '@/shared/models/change-variable-item';
import {
  deleteRestQuery,
  setRestQuery,
} from '@/shared/store/slices/rest-slice';

import ClientList from '../client-list/client-list';

export default function RestQuery() {
  const query = useAppSelector((state) => state['rest-slice'].query);
  const dispatch = useAppDispatch();
  const deleteItem = (index: number) => dispatch(deleteRestQuery(index));

  const changeItem = (value: ChangeVariableItem) =>
    dispatch(setRestQuery(value));
  return (
    <ClientList
      dataList={query}
      deleteAction={deleteItem}
      changeItem={changeItem}
    />
  );
}
