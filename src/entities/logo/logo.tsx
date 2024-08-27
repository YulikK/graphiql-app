import { useLocale } from 'next-intl';

import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/logo.svg';

export const Logo = () => {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`}>
      <Image
        src={logo}
        alt="Logo"
        style={{
          height: '40px',
          width: 'auto',
        }}
      />
    </Link>
  );
};
