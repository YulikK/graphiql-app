import { useTranslations } from 'next-intl';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { StaticImageData } from 'next/image';

import template from '@/assets/template.jpg';
import Developer from '@/entities/developer/developer';

const photos: StaticImageData[] = [template, template, template];

const tech: { [key: string]: string[] } = {
  0: [
    'React',
    'Redux',
    'React-router',
    'typescript',
    'Next.js',
    'Tailwind',
    'MUI',
    'Git',
    'Remix',
    'Linters',
  ],
  1: [
    'React',
    'Redux',
    'React-hook-form',
    'Yup',
    'Typescript',
    'Next.js',
    'MUI',
    'Git',
    'Vite',
    'Linters',
  ],
  2: [
    'React',
    'Redux',
    'React-hook-form',
    'Yup',
    'Typescript',
    'Next.js',
    'MUI',
    'Git',
    'Sass',
    'Linters',
  ],
};

export default function Developers() {
  const t = useTranslations('WelcomePage');
  const names: string[] = JSON.parse(t('developers-names').replace(/'/g, '"'));
  const roles: string[] = JSON.parse(t('developers-roles').replace(/'/g, '"'));
  const skills: string[] = JSON.parse(
    t('developers-skills').replace(/'/g, '"')
  );

  return (
    <Box
      flex={1}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={6}
      paddingBlock={14}
    >
      <Typography variant="h2" textAlign={'center'} fontWeight={400}>
        {t('developers-title')}
      </Typography>
      <Grid container spacing={2}>
        {names.map((el, i) => (
          <Developer
            key={el}
            name={el}
            role={roles[i]}
            photo={photos[i]}
            skills={skills[i]}
            tech={tech[i]}
          />
        ))}
      </Grid>
    </Box>
  );
}
