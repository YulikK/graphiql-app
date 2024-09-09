import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import ChangeVariableItem from '@/shared/models/change-variable-item';
import { SliceName } from '@/shared/models/slice-name';
import GraphqlSlice from '@/shared/store/slices/grahpql-client';
import RestSlice from '@/shared/store/slices/rest-slice';

import ClientList from '../client-list/client-list';

interface Props {
  sliceKey: SliceName;
  setHeader:
    | typeof RestSlice.actions.setRestHeader
    | typeof GraphqlSlice.actions.setGraphHeader;
  deleteHeader:
    | typeof RestSlice.actions.deleteRestHeader
    | typeof GraphqlSlice.actions.deleteGraphHeader;
}

export default function ClientHeaders({
  sliceKey,
  setHeader,
  deleteHeader,
}: Props) {
  const headers = useAppSelector(state => state[sliceKey].headers);

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
