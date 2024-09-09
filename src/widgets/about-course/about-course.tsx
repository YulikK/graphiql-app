import { useTranslations } from 'next-intl';

import { Box, Button, Typography } from '@mui/material';

import Link from 'next/link';

import openEveryone from '@/assets/open-everyone.svg';
import openSource from '@/assets/open-source.svg';
import teach from '@/assets/teach.svg';
import Principle from '@/entities/principle/principle';

const icons: string[] = [openEveryone, openSource, teach];

export default function AboutCourse() {
  const t = useTranslations('WelcomePage');

  const principles: string[] = JSON.parse(
    t('welcome-principles').replace(/'/g, '"')
  );

  const principlesDesc: string[] = JSON.parse(
    t('welcome-principles-desc').replace(/'/g, '"')
  );

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={6}
      paddingBlock={14}
    >
      <Typography variant="h2" textAlign={'center'} fontWeight={400}>
        {t('about-title')}
      </Typography>
      <Typography variant="body1" width="60%" textAlign={'center'}>
        {t('about-description')}
      </Typography>
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        {principles.map((el, i) => (
          <Principle
            key={el}
            principle={el}
            description={principlesDesc[i]}
            icon={icons[i]}
          />
        ))}
      </Box>
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
        gap={1}
      >
        <Button
          variant="contained"
          LinkComponent={Link}
          href={'https://rs.school/courses'}
          sx={{ padding: '10px 20px' }}
        >
          {t('about-courses')}
        </Button>
        <Button
          variant="contained"
          LinkComponent={Link}
          href={'https://app.rs.school/login?url=%252Fregistry%252Fmentor'}
          sx={{ padding: '10px 20px' }}
        >
          {t('about-mentor')}
        </Button>
      </Box>
    </Box>
  );
}
