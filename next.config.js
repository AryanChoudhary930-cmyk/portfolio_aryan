/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["placeholder.svg"],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: "3dAEzeuP_iVdfwFHP",
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: "service_5u64x29",
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "template_6c5n8ir",
  },
}

module.exports = nextConfig
