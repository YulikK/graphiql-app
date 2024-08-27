import { json } from '@codemirror/lang-json';
import { Box } from '@mui/material';
import ReactCodeMirror from '@uiw/react-codemirror';

import { useAppSelector, useAppDispatch } from '@/shared/hooks/redux-hooks';
import { setRestBody } from '@/shared/store/slices/rest-slice';

export default function RestBody() {
  const value = useAppSelector((state) => state['rest-slice'].body);
  const dispatch = useAppDispatch();

  const formatText = () => {
    // const format = JSON.stringify(JSON.parse(value), null, ' ');
    // dispatch(setNewBody(format));
    const codedBody = `${value.trim().replaceAll(/\s+/g, '')}`.replaceAll(
      "'",
      '"'
    );
    const temp = value
      .replace(/'/g, '"')
      .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
      .replaceAll(/\s+/g, '')
      .replace(/,(\s*})/g, '$1');
    console.log(temp);
    console.log(JSON.parse(temp));
  };
  return (
    <Box border={'1px solid black'}>
      <ReactCodeMirror
        value={value}
        height="200px"
        extensions={[json()]}
        onChange={(e) => dispatch(setRestBody(e))}
        editable={true}
      />
    </Box>
  );
}
