import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return [
      {
        // Used in the email signature. Linking via our own domain stops Gmail
        // from attaching a YouTube preview card under every email.
        // Temporary (307) so the video can be swapped without cached redirects.
        source: "/video",
        destination: "https://www.youtube.com/watch?v=U_DZSxJs_MQ",
        permanent: false,
      },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
