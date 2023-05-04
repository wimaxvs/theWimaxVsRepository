/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com","via.placeholder.com"
    ]
  }
}

module.exports = nextConfig
