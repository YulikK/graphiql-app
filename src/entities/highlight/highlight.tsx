import { Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import Image from 'next/image';

interface HighlightProps {
  title: string;
  description: string;
  icon: string;
}

export default function Highlight(props: HighlightProps) {
  return (
    <Grid xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
      <Paper
        className="item"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Image
          src={props.icon}
          alt={`${props.title}`}
          style={{ width: '80px', height: 'auto' }}
        />
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
