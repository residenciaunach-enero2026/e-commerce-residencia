import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend-eccomerce-615t.onrender.com',
      },
    ],
  },
};

export default nextConfig;