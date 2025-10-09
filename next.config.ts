import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-kom.kas.asia',
        pathname: '/api/uploads/**',
      },
    ],
  },
};

export default nextConfig;
