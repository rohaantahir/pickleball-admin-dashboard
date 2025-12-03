/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.performance = {
      maxEntrypointSize: 512 * 1024,
      maxAssetSize: 512 * 1024,
    }
    return config
  },
}

export default nextConfig
