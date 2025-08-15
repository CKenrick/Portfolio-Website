import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Only apply basePath and assetPrefix in production
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/blog',
    assetPrefix: '/blog',
  }),
  images: {
    unoptimized: true
  }
};

export default nextConfig;
