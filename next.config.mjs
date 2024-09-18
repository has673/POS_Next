// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["nestjs-pos.s3.ap-south-1.amazonaws.com"], // Add your domain here
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  images: {
    domains: ["nestjs-pos.s3.ap-south-1.amazonaws.com"], // Your image domain
  },
};

// Properly merge withPWA and nextConfig
export default withPWA({
  ...nextConfig,
});
