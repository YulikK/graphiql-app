import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/shared/locales/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: '',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Accept-Language',
            value: 'en, ru',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
