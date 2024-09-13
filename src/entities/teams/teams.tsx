import { useTranslations } from 'next-intl';

import Image from 'next/image';

import { Container, Typography } from '@mui/material';

import earth from '@/assets/earth.png';
import teams from '@/assets/teams.png';

export const Teams = () => {
  const t = useTranslations('WelcomePage');

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: '600px',
        position: 'relative',
        gap: '30px',
      }}
    >
      <Typography variant="h3" textAlign={'center'} fontWeight={400}>
        {t('welcome-teams')}
      </Typography>
      <Image
        src={teams}
        alt="Teams"
        width={300}
        height={300}
        style={{
          position: 'absolute',
          bottom: '40px',
          zIndex: 1,
          userSelect: 'none',
        }}
      />
      <Image
        src={earth}
        alt="Earth"
        width={300}
        height={300}
        className="earth"
        style={{ userSelect: 'none' }}
      />
    </Container>
  );
};
