'use client';
import { json } from '@codemirror/lang-json';
import ReactCodeMirror from '@uiw/react-codemirror';

import convertToJsonString from '@/shared/utils/convert-to-json-string';

interface Props {
  value: string;
}

export default function ResponseViewer({ value }: Props) {
  return (
    <ReactCodeMirror
      value={convertToJsonString(value)}
      extensions={[json()]}
      height="100%"
      maxHeight="200px"
      editable={false}
      style={{ fontSize: '18px', backgroundColor: 'transparent' }}
    />
  );
}
