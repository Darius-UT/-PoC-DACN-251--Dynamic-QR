# 🎫 EvoTicket - Hệ thống Vé Dynamic QR Offline (PoC)

> **Proof of Concept:** Giải pháp soát vé sự kiện sử dụng mã QR biến đổi theo thời gian (TOTP), hoạt động hoàn toàn không cần Internet tại thời điểm soát vé.

![Status](https://img.shields.io/badge/Status-PoC%20Complete-green) ![Tech](https://img.shields.io/badge/Tech-Next.js%20%7C%20TypeScript%20%7C%20TOTP-blue)

## 📖 Giới thiệu

**EvoTicket** giải quyết hai vấn đề cốt lõi của vé điện tử truyền thống:
1.  **Vấn đề vé giả/Screenshot:** Vé QR tĩnh dễ bị chụp màn hình và gửi cho người khác. EvoTicket sử dụng **Dynamic QR** thay đổi mỗi 30 giây.
2.  **Vấn đề phụ thuộc mạng:** Các hệ thống hiện tại cần Server để validate. EvoTicket sử dụng thuật toán **TOTP (Time-based One-Time Password)** cho phép xác thực Offline ngay tại cửa soát vé.

## 🚀 Tính năng nổi bật

* **📱 100% Client-side Generation:** Mã QR được sinh ra ngay trên thiết bị người dùng, không cần gọi API liên tục.
* **⚡ Offline Verification:** Máy soát vé (Checker) kiểm tra tính hợp lệ của vé mà không cần kết nối Server.
* **🛡️ Anti-passback:** Cơ chế ngăn chặn vé sử dụng lại (Double-spending) dựa trên cập nhật trạng thái cục bộ.
* **⏱️ Time Drift Tolerance:** Chấp nhận độ lệch đồng hồ giữa các thiết bị (±30s ~ ±90s window).

## 🛠️ Công nghệ sử dụng

* **Framework:** [Next.js 14+ (App Router)](https://nextjs.org/)
* **Ngôn ngữ:** TypeScript
* **Core Algorithm:** `otpauth` (Triển khai chuẩn RFC 6238 TOTP)
* **QR Rendering:** `qrcode.react` (SVG Format)
* **Scanner:** `html5-qrcode`
* **Styling:** Tailwind CSS

## 📂 Cấu trúc dự án

```bash
src/
├── app/
│   ├── utils/
│   │   ├── totp.ts        # TRÁI TIM CỦA HỆ THỐNG (Logic sinh/check mã)
│   │   ├── mockDb.ts      # Database giả lập (Chứa Secret Seeds)
│   ├── user/              # Giao diện Khách hàng (Wallet)
│   │   └── ticket/[id]/   # Trang chi tiết vé (Dynamic QR)
│   └── checker/           # Giao diện Soát vé (Camera Scanner)