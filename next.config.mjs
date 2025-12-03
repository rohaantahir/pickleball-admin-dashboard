/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["@radix-ui/react-*"],
  },
  webpack: (config) => {
    config.performance = {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    }
    return config
  },
}

export default nextConfig
