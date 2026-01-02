export interface Ticket {
  tid: string;          // Ticket ID (Định danh vé duy nhất)
  secretSeed: string;   // Seed Key (Dùng để sinh TOTP)
  eventTitle: string;   // Tên sự kiện (Hiển thị UI)
  seatLoc: string;      // Vị trí ghế (Hiển thị UI)
  status: "unused" | "used"; // Trạng thái vé
}

export const MOCK_TICKETS: Ticket[] = [
  // --- Vé 1: Hợp lệ (Dùng để test thành công) ---
  {
    tid: "VE_01",
    eventTitle: "Show BlackPink 2025",
    seatLoc: "VIP-A1",
    secretSeed: "JBSWY3DPEHPK3PXP", // Key mẫu chuẩn Base32
    status: "unused"
  },

  // --- Vé 2: Đã dùng (Dùng để test báo lỗi trùng lặp) ---
  {
    tid: "VE_02",
    eventTitle: "Hội thảo AI Tech",
    seatLoc: "GATE-02",
    secretSeed: "KRSXG5CTMVRXEZLU",
    status: "used"
  },

  // --- Vé 3: Vé thường (Dùng để test hiển thị list) ---
  {
    tid: "VE_03",
    eventTitle: "Chung kết Bóng đá",
    seatLoc: "Zone B - Ghế 10",
    secretSeed: "MFRGGZDFMZTWQ2LK",
    status: "unused"
  }
];