/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/erikfig',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ['three'],
};

export default nextConfig;
