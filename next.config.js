/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix Node 20+ url.parse() warning
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'], // if using Supabase
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      url: false
    };
    return config;
  },
  // Force Node 18 (fixes most Vercel issues)
  nodeVersion: '18.17.0'
};

module.exports = nextConfig;