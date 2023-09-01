/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'growstory.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
};

module.exports = nextConfig;
