import { Box, Container, Typography } from '@mui/material';

import { CodeEditor } from '@/features/code-editor/code-editor';

interface RestDescriptionProps {
  query: string[][];
  variables: string[][];
  body?: string;
}

export default function RestDescription(props: RestDescriptionProps) {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
      {props.query.length > 1 && <Typography variant="h6">Query</Typography>}
      {props.query.map(arr => (
        <Container key={arr[0]} sx={{ display: 'flex', gap: '20px' }}>
          <Typography sx={{ flex: '1' }}>{arr[0]}</Typography>
          <Typography sx={{ flex: '1' }}>{arr[1]}</Typography>
        </Container>
      ))}
      {props.variables.length > 1 && (
        <Typography variant="h6">Variables</Typography>
      )}
      {props.variables.map(arr => (
        <Container
          key={arr[0]}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography sx={{ flex: '1' }}>{arr[0]}</Typography>
          <Typography sx={{ flex: '1' }}>{arr[1]}</Typography>
        </Container>
      ))}
      {props.body && <Typography variant="h6">Body</Typography>}
      {props.body && (
        <CodeEditor value={props.body} isGraphQl={false} isEdit={false} />
      )}
    </Box>
  );
}
