import Image from 'next/image';

import { Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface HighlightProps {
  title: string;
  description: string;
  icon: string;
}

export default function Highlight(props: HighlightProps) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
      <Paper
        className="item"
        sx={{
          flexGrow: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          padding: '25px',
        }}
      >
        <Image src={props.icon} alt={`${props.title}`} width={80} height={80} />
        <Typography variant="h5" textAlign={'center'} fontWeight={600}>
          {props.title}
        </Typography>
        <Typography variant="body1" textAlign={'center'} marginTop={'auto'}>
          {props.description}
        </Typography>
      </Paper>
    </Grid>
  );
}
