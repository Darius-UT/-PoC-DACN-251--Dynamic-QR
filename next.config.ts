import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",           // Nơi lưu các file service worker
  cacheOnFrontEndNav: true, // Cache khi chuyển trang
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,     // Tự load lại khi có mạng
  disable: false,           // Để false để test PWA (hoặc để process.env.NODE_ENV === 'development' nếu k muốn cache lúc code)
  workboxOptions: {
    disableDevLogs: true,   // Tắt log đỡ rối mắt
  },
});


const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA(nextConfig);