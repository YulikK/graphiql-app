import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import Image, { StaticImageData } from 'next/image';

import CustomBox from '../custom-box/custom-box';

interface DeveloperProps {
  name: string;
  role: string;
  skills: string;
  photo: StaticImageData;
  tech: string[];
}

const skill = ['react', 'redux', 'next', 'css', 'html'];

export default function Developer(props: DeveloperProps) {
  return (
    <Grid
      sm={12}
      md={4}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '450px',
        '@media (max-width: 900px)': {
          height: 'unset',
        },
      }}
    >
      <Paper
        className="developer"
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '10px',
          background: 'transparent',
          '@media (max-width: 900px)': {
            flexDirection: 'row',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            fontSize: '0',
            '@media (max-width: 900px)': {
              minWidth: '100px',
              width: '15%',
              height: '100%',
            },
          }}
        >
          <Image
            className="developer-img"
            src={props.photo}
            alt={`${props.name}`}
          />
        </Box>
        <CustomBox>
          <Typography variant="h5" textAlign={'center'} fontWeight={600}>
            {props.name}
          </Typography>
          <Typography variant="body1" textAlign={'center'} marginTop={'auto'}>
            {props.role}
          </Typography>
          <Stack
            direction="row"
            flexWrap={'wrap'}
            gap={1}
            justifyContent={'center'}
          >
            {props.tech.map((sk) => (
              <Chip key={sk} label={sk} clickable={false} />
            ))}
          </Stack>
          <Typography variant="body1" textAlign={'center'} marginTop={'auto'}>
            {props.skills}
          </Typography>
        </CustomBox>
      </Paper>
    </Grid>
  );
}
