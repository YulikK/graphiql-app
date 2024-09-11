import Image from 'next/image';

import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Container, Link, Typography } from '@mui/material';

import logo from '@/assets/rs-logo.svg';

const githubLinks = [
  { link: 'https://github.com/YulikK', name: 'YulikK' },
  { link: 'https://github.com/the-dmitry', name: 'the-dmitry' },
  { link: 'https://github.com/yuliya-karuk', name: 'yuliya-karuk' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      className="footer"
      sx={{
        width: '100%',
        display: 'flex',
        minHeight: '60px',
        paddingBlock: 1,
      }}
    >
      <Container
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box display={'flex'} alignItems={'center'} gap={2}>
          {githubLinks.map(el => (
            <Link
              className="github-link"
              key={el.name}
              target="_blank"
              href={el.link}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <GitHubIcon
                className="github-icon"
                sx={{ width: 30, height: 30 }}
              />
              {el.name}
            </Link>
          ))}
        </Box>
        <Typography variant="body2">&#169; 2024</Typography>
        <Link href="https://rs.school/">
          <Image
            className="rs-icon"
            src={logo}
            alt="rs-school"
            height={30}
            priority
          />
        </Link>
      </Container>
    </Box>
  );
}
