import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        hostname:"lh3.googleusercontent.com"
      },
      {hostname:"res.cloudinary.com"}
    ]
  },
  reactCompiler: true,
};

export default nextConfig;
