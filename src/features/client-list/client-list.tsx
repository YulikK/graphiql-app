import { useTranslations } from 'next-intl';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, IconButton, Stack, TextField } from '@mui/material';

import ChangeVariableItem from '@/shared/models/change-variable-item';

interface Props {
  dataList: string[][];
  deleteAction: (index: number) => void;
  changeItem: (object: ChangeVariableItem) => void;
}

export default function ClientList({
  dataList,
  deleteAction,
  changeItem,
}: Props) {
  const dataIsArray = Array.isArray(dataList);
  const t = useTranslations('Common');

  return (
    <Stack>
      {dataIsArray &&
        dataList.map(([key, value], index) => (
          <Box key={index} display={'flex'} alignItems={'center'} gap={1}>
            <IconButton onClick={() => deleteAction(index)}>
              <DeleteForeverIcon />
            </IconButton>
            <TextField
              placeholder={t('key')}
              variant="standard"
              value={key || ''}
              sx={{ flexGrow: 1 }}
              onInput={(e) =>
                changeItem({
                  index,
                  keyOrValue: 0,
                  newValue: (e.target as HTMLInputElement).value,
                })
              }
            />
            <TextField
              placeholder={t('value')}
              variant="standard"
              value={value || ''}
              sx={{ flexGrow: 1 }}
              onInput={(e) =>
                changeItem({
                  index,
                  keyOrValue: 1,
                  newValue: (e.target as HTMLInputElement).value,
                })
              }
            />
          </Box>
        ))}
    </Stack>
  );
}
