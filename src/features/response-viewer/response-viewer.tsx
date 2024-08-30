'use client';
import { json } from '@codemirror/lang-json';
import ReactCodeMirror from '@uiw/react-codemirror';

interface Props {
  value: string;
}

export default function ResponseViewer({ value }: Props) {
  return (
    <ReactCodeMirror
      value={JSON.stringify(value, null, ' ')}
      height="200px"
      extensions={[json()]}
      editable={false}
      style={{ fontSize: '18px', backgroundColor: 'transparent' }}
    />
  );
}
