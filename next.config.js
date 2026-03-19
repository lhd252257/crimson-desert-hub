/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静态导出，适合 Cloudflare Pages
  images: {
    unoptimized: true, // Cloudflare Pages 需要
  },
  trailingSlash: true, // 静态导出需要

  // 性能优化
  compress: true, // 启用 gzip 压缩
  productionBrowserSourceMaps: false, // 禁用 source maps 减小体积
  reactStrictMode: true,
}

module.exports = nextConfig
