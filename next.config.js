import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: '',
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }],
  //     },
  //   ];
  // },
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Cross-Origin-Embedder-Policy',
  //           value: 'unsafe-none',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default withNextIntl(nextConfig);
