import { Box, Typography } from '@mui/material';

interface GraphDescriptionProps {
  query: string;
  variables: string;
}

export default function GraphDescription(props: GraphDescriptionProps) {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
      {props.variables && <Typography variant="h6">Variables</Typography>}
      {props.variables && <pre>{props.variables}</pre>}
      {props.query && <Typography variant="h6">Body</Typography>}
      {props.query && <pre>{props.query}</pre>}
    </Box>
  );
}
