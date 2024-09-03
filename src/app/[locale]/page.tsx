import { Teams } from '@/entities/teams/teams';
import AboutCourse from '@/widgets/about-course/about-course';
import Developers from '@/widgets/developers/developers';
import Highlights from '@/widgets/highlights/highlights';
import Welcome from '@/widgets/welcome/welcome';

export default function WelcomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <>
      <Welcome locale={locale} />
      <Highlights />
      <Teams />
      <Developers />
      <AboutCourse />
    </>
  );
}
