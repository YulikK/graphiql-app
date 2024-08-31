import { json } from '@codemirror/lang-json';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import {
  Alert,
  Box,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
} from '@mui/material';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import {
  handleRestBodyMode,
  setRestBody,
} from '@/shared/store/slices/rest-slice';
import ConvertToValidJsonString from '@/shared/utils/convert-to-valid-json-string';

export default function RestBody() {
  const value = useAppSelector((state) => state['rest-slice'].body);
  const textMode = useAppSelector((state) => state['rest-slice'].textMode);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  const formatText = () => {
    const result = ConvertToValidJsonString(value);
    if (result) {
      dispatch(setRestBody(result));
      return;
    }
    setError(true);
  };

  const handleModeChange = (value: boolean) =>
    dispatch(handleRestBodyMode(value));

  return (
    <Box border={'1px solid black'} position="relative">
      <RadioGroup row sx={{ ml: 1 }}>
        <FormControlLabel
          value="json"
          checked={!textMode}
          control={<Radio size="small" />}
          label="JSON"
          onChange={() => handleModeChange(false)}
        />
        <FormControlLabel
          value="text"
          checked={textMode}
          control={<Radio size="small" />}
          label="Text"
          onChange={() => handleModeChange(true)}
        />
      </RadioGroup>
      {!textMode && (
        <IconButton
          color="info"
          onClick={formatText}
          title="Make pretty (JSON only)"
          aria-label="Make pretty"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          <AutoFixHighIcon />
        </IconButton>
      )}

      <ReactCodeMirror
        value={value}
        height="200px"
        extensions={[json()]}
        onChange={(e) => dispatch(setRestBody(e))}
        editable={true}
      />

      <Snackbar
        open={error}
        onClose={() => setError(false)}
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert severity="error" onClose={() => setError(false)}>
          Prettifying is available only for valid JSON
        </Alert>
      </Snackbar>
    </Box>
  );
}
