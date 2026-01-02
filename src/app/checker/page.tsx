"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { verifyQrCode } from "@/app/utils/totp";
import { MOCK_TICKETS } from "@/app/utils/mockDb";

export default function CheckerPage() {
  const [scanResult, setScanResult] = useState<string>("");
  const [scanStatus, setScanStatus] = useState<"scanning" | "success" | "error">("scanning");
  const [ticketInfo, setTicketInfo] = useState<any>(null);

  useEffect(() => {
    // 1. Cấu hình máy quét
    // fps: Tốc độ quét (10 khung hình/giây)
    // qrbox: Vùng xanh để căn chỉnh mã QR
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    // 2. Hàm xử lý khi quét thành công
    const onScanSuccess = (decodedText: string) => {
      // Tạm dừng quét để xử lý
      scanner.clear(); 
      handleVerify(decodedText);
    };

    const onScanFailure = (error: any) => {
      // Không làm gì cả, cứ tiếp tục quét tìm mã
      // console.warn(error);
    };

    // Bắt đầu render Camera
    scanner.render(onScanSuccess, onScanFailure);

    // Dọn dẹp khi thoát trang
    return () => {
      scanner.clear().catch(err => console.error("Scanner clear error", err));
    };
  }, []);

  // 3. Logic Xác Thực (QUAN TRỌNG NHẤT)
  const handleVerify = (qrRawData: string) => {
    try {
      // A. Parse dữ liệu từ QR
      const data = JSON.parse(qrRawData); // { tid, otp, ... }
      
      // B. Tìm vé trong Database
      const ticket = MOCK_TICKETS.find(t => t.tid === data.tid);

      if (!ticket) {
        throw new Error("❌ VÉ KHÔNG TỒN TẠI (ID lạ)");
      }

      setTicketInfo(ticket); // Lưu thông tin để hiển thị

      // C. Kiểm tra trạng thái vé (Anti-passback)
      if (ticket.status === 'used') {
        throw new Error("⚠️ VÉ ĐÃ SỬ DỤNG TRƯỚC ĐÓ");
      }

      // D. Kiểm tra mã OTP (Dynamic Check)
      // Đây là lúc gọi hàm 'Trọng tài' trong file totp.ts
      const isValid = verifyQrCode(ticket.secretSeed, data.otp);

      if (isValid) {
        setScanStatus("success");
        setScanResult("HỢP LỆ - MỜI VÀO CỔNG");
      } else {
        throw new Error("⛔ MÃ QR HẾT HẠN HOẶC KHÔNG KHỚP");
      }

    } catch (error: any) {
      setScanStatus("error");
      setScanResult(error.message || "Lỗi định dạng QR");
    }
  };

  // Hàm reset để quét người tiếp theo
  const handleReset = () => {
    window.location.reload(); 
    // Mẹo: Reload trang là cách nhanh nhất để reset camera scanner sạch sẽ
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4 text-yellow-500 uppercase">
        👮 Máy Soát Vé (Checker)
      </h1>

      {/* KHUNG CAMERA */}
      {scanStatus === "scanning" && (
        <div className="w-full max-w-md bg-white rounded-lg overflow-hidden text-black">
          <div id="reader"></div>
          <p className="text-center p-2 text-sm text-gray-500">Đưa mã QR vào khung xanh</p>
        </div>
      )}

      {/* KẾT QUẢ QUÉT */}
      {scanStatus !== "scanning" && (
        <div className={`w-full max-w-md p-6 rounded-2xl text-center shadow-2xl animate-bounce-in
          ${scanStatus === "success" ? "bg-green-600" : "bg-red-600"}`
        }>
          {/* Icon trạng thái */}
          <div className="text-6xl mb-4">
            {scanStatus === "success" ? "✅" : "BX"}
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {scanStatus === "success" ? "HỢP LỆ (VALID)" : "TỪ CHỐI (INVALID)"}
          </h2>
          
          <p className="text-lg font-medium opacity-90 mb-4">{scanResult}</p>

          {/* Thông tin vé (nếu đọc được) */}
          {ticketInfo && (
            <div className="bg-black/20 p-3 rounded-lg text-sm text-left mb-6">
              <p>🎫 <b>Sự kiện:</b> {ticketInfo.eventTitle}</p>
              <p>💺 <b>Ghế:</b> {ticketInfo.seatLoc}</p>
              <p>🆔 <b>ID:</b> {ticketInfo.tid}</p>
            </div>
          )}

          {/* Nút Quét Tiếp */}
          <button 
            onClick={handleReset}
            className="w-full py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition"
          >
            QUÉT NGƯỜI TIẾP THEO ↻
          </button>
        </div>
      )}
    </div>
  );
}