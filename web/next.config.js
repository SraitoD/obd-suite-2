/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'query', key: 'from' }],
        destination: '/',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
