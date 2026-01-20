import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.pastelocity.com.my',
        port: '', // leave empty if default 443
        pathname: '/**', // allow all paths
      },
    ],
  },
};

export default nextConfig;
