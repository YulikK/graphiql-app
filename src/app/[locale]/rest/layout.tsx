import RestClient from '@/widgets/rest-client/rest-client';

export default function RestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RestClient />
      {children}
    </>
  );
}
