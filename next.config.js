/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'picsum.photos',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Optimize production builds
  swcMinify: true,
  // Configure environment variables
  env: {
    SITE_NAME: 'Wanderlust',
    SITE_URL: 'https://wanderlust.travel',
  },
}

module.exports = nextConfig
