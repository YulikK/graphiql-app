import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, IconButton, Stack, TextField } from '@mui/material';

import ChangeVariableItem from '@/shared/interfaces/change-variable-item';

interface Props {
  dataList: string[][];
  deleteAction: (index: number) => void;
  changeItem: ({ index, keyOrValue, newValue }: ChangeVariableItem) => void;
}

export default function ClientList({
  dataList,
  deleteAction,
  changeItem,
}: Props) {
  const dataIsArray = Array.isArray(dataList);
  return (
    <Stack>
      {dataIsArray &&
        dataList.map(([key, value], index) => (
          <Box key={key + value}>
            <IconButton onClick={() => deleteAction(index)}>
              <DeleteForeverIcon />
              <TextField
                id="outlined-basic"
                label="Key"
                variant="outlined"
                value={key || ''}
                onInput={(e) =>
                  changeItem({
                    index,
                    keyOrValue: 0,
                    newValue: (e.target as HTMLInputElement).value,
                  })
                }
              />
              <TextField
                id="outlined-basic"
                label="Key"
                variant="outlined"
                value={key || ''}
                onInput={(e) =>
                  changeItem({
                    index,
                    keyOrValue: 1,
                    newValue: (e.target as HTMLInputElement).value,
                  })
                }
              />
            </IconButton>
          </Box>
        ))}
    </Stack>
  );
}
