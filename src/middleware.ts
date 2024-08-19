import createMiddleware from 'next-intl/middleware';

import locales from './constants/locales';

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localeDetection: false,
});

export const config = {
  matcher: ['/', '/(en|ru)/:path*'],
};
