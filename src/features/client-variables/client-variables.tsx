import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import ChangeVariableItem from '@/shared/models/change-variable-item';
import { SliceName } from '@/shared/models/slice-name';
import RestSlice from '@/shared/store/slices/rest-slice';

import ClientList from '../client-list/client-list';

interface Props {
  sliceKey: SliceName;
  setVariable: typeof RestSlice.actions.setRestVariables;
  deleteVariable: typeof RestSlice.actions.deleteRestVariables;
}

export default function ClientVariables({
  setVariable,
  deleteVariable,
}: Props) {
  const variables = useAppSelector(state => state['rest-slice'].variables);

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
