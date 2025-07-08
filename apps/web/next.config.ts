import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  transpilePackages: [
    "@1chooo/ui",
    "@1chooo/activity-calendar",
    "@1chooo/github-calendar",
  ],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/feed',
        destination: '/rss.xml',
        permanent: true
      },
      {
        source: '/rss',
        destination: '/rss.xml',
        permanent: true
      },
      {
        source: '/manifest.webmanifest',
        destination: '/manifest.json',
        permanent: true
      },
      {
        source: '/manifest',
        destination: '/manifest.json',
        permanent: true
      },
    ]
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  }
})

module.exports = withBundleAnalyzer(withMDX(nextConfig));
