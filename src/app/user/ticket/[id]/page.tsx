"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Hook lấy tham số URL
import { QRCodeSVG } from "qrcode.react"; // Thư viện vẽ QR
import { MOCK_TICKETS } from "@/app/utils/mockDb"; // DB giả
import { generateQrCodeData } from "@/app/utils/totp"; // Hàm sinh mã vừa viết

export default function TicketDetailPage() {
  const params = useParams(); // Lấy ID từ URL
  const router = useRouter();
  
  // State quản lý dữ liệu QR và bộ đếm
  const [qrString, setQrString] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [ticket, setTicket] = useState<any>(null);

  // 1. Tìm vé trong DB dựa trên ID trên URL
  useEffect(() => {
    // params.id có thể là string hoặc array, cần check kỹ
    const ticketId = Array.isArray(params.id) ? params.id[0] : params.id;
    const foundTicket = MOCK_TICKETS.find(t => t.tid === ticketId);
    
    if (foundTicket) {
      setTicket(foundTicket);
    }
  }, [params]);

  // 2. Vòng lặp sinh mã (Trái tim của Dynamic QR)
  useEffect(() => {
    if (!ticket) return;

    // Hàm cập nhật mã QR và thanh đếm ngược
    const updateQR = () => {
      // A. Sinh chuỗi JSON mới nhất
      const newData = generateQrCodeData(ticket.tid, ticket.secretSeed);
      setQrString(newData);

      // B. Tính thời gian còn lại của chu kỳ 30s
      // Công thức: 30 - (Giây hiện tại chia lấy dư cho 30)
      const seconds = 30 - (Math.floor(Date.now() / 1000) % 30);
      setTimeLeft(seconds);
    };

    // Gọi ngay lập tức lần đầu
    updateQR();

    // Cài đặt đồng hồ chạy mỗi 1 giây (1000ms)
    const timer = setInterval(updateQR, 1000);

    // Dọn dẹp khi thoát trang
    return () => clearInterval(timer);
  }, [ticket]);

  // Nếu không tìm thấy vé (hoặc đang load)
  if (!ticket) {
    return <div className="p-10 text-center">Đang tải vé...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* Nút quay lại */}
      <button 
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-gray-400 hover:text-white"
      >
        ← Quay lại
      </button>

      {/* Tên sự kiện */}
      <h1 className="text-xl font-bold mb-2 text-center">{ticket.eventTitle}</h1>
      <p className="text-blue-400 mb-6 font-medium">{ticket.seatLoc}</p>

      {/* KHUNG MÃ QR */}
      <div className="bg-white p-4 rounded-2xl shadow-2xl relative">
        {qrString && (
          <QRCodeSVG 
            value={qrString} 
            size={250} 
            level="M" // Mức độ sửa lỗi trung bình (giúp quét nhanh hơn)
            includeMargin={true}
          />
        )}
        
        {/* Logo EvoTicket ở giữa QR (Optional - làm đẹp) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
           {/* Nếu muốn logo thì bỏ vào đây, không thì thôi */}
        </div>
      </div>

      {/* THANH ĐẾM NGƯỢC (Progress Bar) */}
      <div className="w-64 mt-8">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Đổi mã sau:</span>
          <span className="font-mono font-bold text-white">{timeLeft}s</span>
        </div>
        
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 30) * 100}%` }} // Thanh chạy thụt lùi dần
          />
        </div>
      </div>

      {/* Thông tin ID vé (Debug) */}
      <p className="mt-8 text-xs text-gray-600 font-mono">
        TID: {ticket.tid}
      </p>

      {/* Lời nhắn test */}
      <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg max-w-xs text-center">
        <p className="text-xs text-yellow-500">
          ⚡ <b>Thử nghiệm Offline:</b> Hãy thử tắt Wifi/4G ngay bây giờ. Mã QR và thanh thời gian vẫn sẽ chạy bình thường!
        </p>
      </div>
    </div>
  );
}