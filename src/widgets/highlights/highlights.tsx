import { useTranslations } from 'next-intl';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import auth from '@/assets/auth.svg';
import graphql from '@/assets/graphql.svg';
import history from '@/assets/history.svg';
import lang from '@/assets/lang.svg';
import pretty from '@/assets/pretty.svg';
import rest from '@/assets/rest.svg';
import Highlight from '@/entities/highlight/highlight';

const icons: string[] = [rest, graphql, pretty, auth, lang, history];

export default function Highlights() {
  const t = useTranslations('WelcomePage');

  const titles: string[] = JSON.parse(t('highlights-names').replace(/'/g, '"'));

  const descriptions: string[] = JSON.parse(
    t('highlights-descriptions').replace(/'/g, '"')
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
        {t('highlights-title')}
      </Typography>
      <Grid container spacing={4}>
        {titles.map((el, i) => (
          <Highlight
            key={el}
            title={el}
            description={descriptions[i]}
            icon={icons[i]}
          />
        ))}
      </Grid>
    </Box>
  );
}
