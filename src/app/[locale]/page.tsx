import { Teams } from '@/entities/teams/teams';
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
    </>
  );
}
