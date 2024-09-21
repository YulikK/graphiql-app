import { Box, Typography } from '@mui/material';

import { CodeEditor } from '@/features/code-editor/code-editor';

interface GraphDescriptionProps {
  query: string;
  variables: string;
}

export default function GraphDescription(props: GraphDescriptionProps) {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
      {props.variables && <Typography variant="h6">Variables</Typography>}
      {props.variables && <CodeEditor value={props.variables} isEdit={false} />}
      {props.query && <Typography variant="h6">Body</Typography>}
      {props.query && (
        <CodeEditor value={props.query} isGraphQl={true} isEdit={false} />
      )}
    </Box>
  );
}
