/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.buzzfeed.com"]
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      tls: false,
      fs: false };
    return config;
  }
};

module.exports = nextConfig;