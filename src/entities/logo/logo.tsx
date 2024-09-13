import { useLocale } from 'next-intl';

import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/logo.svg';

export const Logo = () => {
  const locale = useLocale();

  return (
    <Link href={`/${locale}`}>
      <Image
        className="logo"
        src={logo}
        priority
        alt="Logo"
        width={60}
        height={60}
      />
    </Link>
  );
};
