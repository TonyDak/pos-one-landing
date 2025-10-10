import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-kom.kas.asia',
        pathname: '/api/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'info.posone.ai',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
