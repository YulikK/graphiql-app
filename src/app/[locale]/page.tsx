import { Container } from '@mui/material';

import { Teams } from '@/entities/teams/teams';
import AboutCourse from '@/widgets/about-course/about-course';
import Developers from '@/widgets/developers/developers';
import Highlights from '@/widgets/highlights/highlights';
import Preview from '@/widgets/preview/preview';
import Welcome from '@/widgets/welcome/welcome';

export default function WelcomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <Container>
      <Welcome locale={locale} />
      <Preview />
      <Highlights />
      <Teams />
      <Developers />
      <AboutCourse />
    </Container>
  );
}
