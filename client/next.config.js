/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
