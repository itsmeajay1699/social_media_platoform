/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    EDGE_STORE_ACCESS_KEY: "6W7N1ui2eT97CcMmafGActLJUHYCr6wt",
    EDGE_STORE_SECRET_KEY: "974UGnLVYw2vJlaew7FV2JvFKYqZ9crU7CCvuwje54DCRldi",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
