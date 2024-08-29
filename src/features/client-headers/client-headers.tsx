import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import ChangeVariableItem from '@/shared/interfaces/change-variable-item';
import RestSlice from '@/shared/store/slices/rest-slice';
import { SliceName } from '@/shared/types/slice-name';

import ClientList from '../client-list/client-list';

interface Props {
  sliceKey: SliceName;
  setHeader: typeof RestSlice.actions.setRestHeader;
  deleteHeader: typeof RestSlice.actions.deleteRestHeader;
}

export default function ClientHeaders({
  sliceKey,
  setHeader,
  deleteHeader,
}: Props) {
  const headers = useAppSelector((state) => state[sliceKey].headers);
  const dispatch = useAppDispatch();
  const deleteItem = (index: number) => dispatch(deleteHeader(index));

  const changeItem = (object: ChangeVariableItem) =>
    dispatch(setHeader(object));
  return (
    <ClientList
      dataList={headers}
      changeItem={changeItem}
      deleteAction={deleteItem}
    />
  );
}
