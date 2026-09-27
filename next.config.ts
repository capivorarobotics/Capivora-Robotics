import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js "N" badge shown in the corner during `npm run dev`
  // (it never appears in production). Build/runtime errors still show.
  devIndicators: false,
};

export default nextConfig;
