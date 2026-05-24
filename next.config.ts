import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Cross-origin during dev (mobile network access)
  allowedDevOrigins: ["192.168.1.198"],
};

export default nextConfig;
