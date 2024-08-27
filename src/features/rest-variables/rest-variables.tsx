import ClientList from '../client-list/client-list';

import { useAppSelector, useAppDispatch } from '@/shared/hooks/redux-hooks';
import ChangeVariableItem from '@/shared/interfaces/change-variable-item';
import {
  addRestVariables,
  deleteRestVariables,
} from '@/shared/store/slices/rest-slice';

export default function RestVariables() {
  const { variables } = useAppSelector((state) => state['rest-slice']);
  const dispatch = useAppDispatch();

  const deleteItem = (index: number) => dispatch(deleteRestVariables(index));

  const changeItem = (object: ChangeVariableItem) =>
    dispatch(addRestVariables(object));
  return (
    <ClientList
      dataList={variables}
      changeItem={changeItem}
      deleteAction={deleteItem}
    />
  );
}
