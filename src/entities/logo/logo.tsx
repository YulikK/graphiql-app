import { Box } from '@mui/material';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export const Logo = () => {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`}>
      <Box component="img" src="/logo.svg" alt="Logo" sx={{ height: 40 }} />
    </Link>
  );
};
