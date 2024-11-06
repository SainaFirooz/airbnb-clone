import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //issues with leaflet in next 15, had to use this
  reactStrictMode: false,
  /* config options here */
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
