import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "D:\\laptrinhwebnc\\nextjs",
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;