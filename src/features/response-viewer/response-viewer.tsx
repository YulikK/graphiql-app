'use client';
import { json } from '@codemirror/lang-json';
import { Box, Typography } from '@mui/material';
import ReactCodeMirror from '@uiw/react-codemirror';

import convertToJsonString from '@/shared/utils/convert-to-json-string';

interface Props {
  value: string;
  status: number;
}

export default function ResponseViewer({ value, status }: Props) {
  return (
    <Box>
      <Typography>Status: {status}</Typography>
      <ReactCodeMirror
        value={convertToJsonString(value)}
        extensions={[json()]}
        height="200px"
        editable={false}
        style={{ fontSize: '18px' }}
      />
    </Box>
  );
}
