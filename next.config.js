/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // cleanUrls: true,
  // trailingSlash: true,
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/_next/' : '',
  // async redirects() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: '/index.html',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
