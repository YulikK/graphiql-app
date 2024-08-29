import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import ChangeVariableItem from '@/shared/interfaces/change-variable-item';
import RestSlice from '@/shared/store/slices/rest-slice';
import { SliceName } from '@/shared/types/slice-name';

import ClientList from '../client-list/client-list';

interface Props {
  sliceKey: SliceName;
  setVariable: typeof RestSlice.actions.setRestVariables;
  deleteVariable: typeof RestSlice.actions.deleteRestVariables;
}

export default function ClientVariables({
  sliceKey,
  setVariable,
  deleteVariable,
}: Props) {
  const variables = useAppSelector((state) => state[sliceKey].variables);
  const dispatch = useAppDispatch();

  const deleteItem = (index: number) => dispatch(deleteVariable(index));

  const changeItem = (object: ChangeVariableItem) =>
    dispatch(setVariable(object));
  return (
    <ClientList
      dataList={variables}
      changeItem={changeItem}
      deleteAction={deleteItem}
    />
  );
}
