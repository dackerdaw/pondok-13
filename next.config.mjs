import createMDX from '@next/mdx';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    experimental: {
      serverActions: true,
    },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
 
const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);