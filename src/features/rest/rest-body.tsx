import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import {
  handleRestBodyMode,
  setRestBody,
} from '@/shared/store/slices/rest-slice';

import { CodeEditor } from '../code-editor/code-editor';

export default function RestBody() {
  const value = useAppSelector(state => state['rest-slice'].body);

  const textMode = useAppSelector(state => state['rest-slice'].textMode);

  const dispatch = useAppDispatch();

  const handleModeChange = (value: boolean) => {
    dispatch(handleRestBodyMode(value));
  };

  return (
    <Box
      position="relative"
      display={'flex'}
      flexDirection={'column'}
      sx={{ height: '100%' }}
    >
      <CodeEditor
        isTextMode={textMode}
        value={value}
        onChange={e => dispatch(setRestBody(e))}
        onModeChange={handleModeChange}
      />
    </Box>
  );
}
