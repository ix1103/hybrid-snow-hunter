import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export' を削除 → Vercel ServerlessでAPIルートを有効化
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
