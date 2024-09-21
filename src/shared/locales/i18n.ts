import { notFound } from 'next/navigation';

import { getRequestConfig } from 'next-intl/server';

import constants from '@/shared/locales/constants.ts';

export default getRequestConfig(async ({ locale }) => {
  if (!constants.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
