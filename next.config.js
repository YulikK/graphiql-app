/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/index.html',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
