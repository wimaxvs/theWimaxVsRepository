/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "via.placeholder.com",
      "localhost:3000",
      "res.cloudinary.com",
    ],
    unoptimized: true,
  },
};

module.exports = (phase, { nextConfig }) => {
  return {
    ...nextConfig,
    experimental: {
      appDir: true,
    },
    images: {
      domains: [
        "lh3.googleusercontent.com",
        "via.placeholder.com",
        "localhost:3000",
        "res.cloudinary.com",
      ],
      unoptimized: true,
      webpack: (config) => {
        config.resolve = {
          ...config.resolve,
          fallback: {
            fs: false,
            path: false,
            os: false,
          },
        };
        return config;
      },
    },
  };
};
