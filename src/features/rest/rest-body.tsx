import { json } from '@codemirror/lang-json';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Box, IconButton } from '@mui/material';
import ReactCodeMirror from '@uiw/react-codemirror';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { setRestBody } from '@/shared/store/slices/rest-slice';
import ConvertToValidJson from '@/shared/utils/convert-to-valid-json';

export default function RestBody() {
  const value = useAppSelector((state) => state['rest-slice'].body);
  const dispatch = useAppDispatch();

  const formatText = () => {
    // const format = JSON.stringify(JSON.parse(value), null, ' ');
    // dispatch(setNewBody(format));
    const result = ConvertToValidJson(value);
    console.log(result);
    console.log(JSON.stringify(result, null, ' '));
    dispatch(setRestBody(JSON.stringify(result, null, ' ')));
  };
  return (
    <Box border={'1px solid black'} position="relative">
      <IconButton
        color="info"
        onClick={formatText}
        title="Make pretty"
        aria-label="Make pretty"
        sx={{
          position: 'absolute',
          top: 5,
          right: 15,
          zIndex: 10,
        }}
      >
        <AutoFixHighIcon />
      </IconButton>
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
