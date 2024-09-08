import { useTranslations } from 'next-intl';

import { Alert, Box, Snackbar } from '@mui/material';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import useRestRequest from '@/shared/hooks/use-rest-request';
import {
  handleRestBodyMode,
  setRestBody,
} from '@/shared/store/slices/rest-slice';

import { CodeEditor } from '../code-editor/code-editor';

export default function RestBody() {
  const value = useAppSelector(state => state['rest-slice'].body);

  const textMode = useAppSelector(state => state['rest-slice'].textMode);

  const [error, setError] = useState(false);

  const makeRequest = useRestRequest();

  const dispatch = useAppDispatch();

  const t = useTranslations('RestPage');

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
        onBlur={makeRequest}
        onModeChange={handleModeChange}
      />

      <Snackbar
        open={error}
        onClose={() => setError(false)}
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert severity="error" onClose={() => setError(false)}>
          {t('pretty-error')}
        </Alert>
      </Snackbar>
    </Box>
  );
}
