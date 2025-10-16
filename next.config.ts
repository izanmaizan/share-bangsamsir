/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['103.84.208.182'],
  },
  // Enable static export for Vercel
  output: 'standalone',
}

module.exports = nextConfig