import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Container, Link, Typography } from '@mui/material';
import Image from 'next/image';

import logo from '../../../public/rs-logo.png';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        minHeight: '60px',
        paddingBlock: 1,
        backgroundColor: '#f8f8f8',
      }}
    >
      <Container
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Link target="_blank" href="https://github.com/YulikK">
          <GitHubIcon sx={{ width: 40, height: 40 }} />
        </Link>
        <Typography variant="body2">2024</Typography>
        <Link href="https://rs.school/">
          <Image src={logo} alt="rs-school" height={40} />
        </Link>
      </Container>
    </Box>
  );
}
