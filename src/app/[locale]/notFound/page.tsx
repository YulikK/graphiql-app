import BgContainer from '@/entities/bg-container/bg-container';
import ErrorComponent from '@/entities/error/error';

export default async function NotFound() {
  return (
    <BgContainer>
      <ErrorComponent />
    </BgContainer>
  );
}
