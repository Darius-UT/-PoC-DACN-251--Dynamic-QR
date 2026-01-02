// src/app/user/page.tsx
"use client";

import Link from "next/link";
import { MOCK_TICKETS } from "../utils/mockDb";

export default function UserWalletPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header giả lập App */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ví Vé Của Tôi</h1>
        <p className="text-gray-500 text-sm">Offline Mode Ready ✅</p>
      </div>

      {/* Danh sách vé */}
      <div className="space-y-4">
        {MOCK_TICKETS.map((ticket) => (
          <Link 
            key={ticket.tid} 
            href={`/user/ticket/${ticket.tid}`} // Đường dẫn động tới trang chi tiết
            className="block"
          >
            <div className={`p-4 rounded-xl shadow-md border-l-4 bg-white transition-transform active:scale-95 ${
              ticket.status === 'used' ? 'border-gray-400 opacity-60' : 'border-blue-500'
            }`}>
              
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-lg text-gray-800">{ticket.eventTitle}</h2>
                  <p className="text-gray-600 font-medium">📍 {ticket.seatLoc}</p>
                </div>
                
                {/* Badge trạng thái */}
                <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                  ticket.status === 'used' 
                    ? 'bg-gray-200 text-gray-600' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {ticket.status === 'used' ? 'ĐÃ DÙNG' : 'CÓ HIỆU LỰC'}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-400 font-mono">ID: {ticket.tid}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer hướng dẫn */}
      <div className="mt-8 text-center text-xs text-gray-400">
        <p>Tip: Bấm vào vé để lấy mã QR vào cổng.</p>
      </div>
    </div>
  );
}