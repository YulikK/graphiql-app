import { useAppSelector, useAppDispatch } from '@/shared/hooks/redux-hooks';
import ChangeVariableItem from '@/shared/interfaces/change-variable-item';
import {
  deleteRestQuery,
  setRestQuery,
} from '@/shared/store/slices/rest-slice';

import ClientList from '../client-list/client-list';

export default function RestQuery() {
  const query = useAppSelector((state) => state['rest-slice'].query);
  const dispatch = useAppDispatch();
  const deleteItem = (index: number) => dispatch(deleteRestQuery(index));

  const changeItem = (object: ChangeVariableItem) =>
    dispatch(setRestQuery(object));
  return (
    <ClientList
      dataList={query}
      deleteAction={deleteItem}
      changeItem={changeItem}
    />
  );
}
