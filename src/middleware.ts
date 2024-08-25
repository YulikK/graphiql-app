import createMiddleware from 'next-intl/middleware';

import constants from './shared/locales/constants.ts';

export default createMiddleware({
  locales: constants,
  defaultLocale: 'en',
  localeDetection: false,
});

export const config = {
  matcher: ['/', '/(en|ru)/:path*'],
};
