import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-2">EvoTicket 🎫</h1>
      <p className="mb-10 text-gray-400">PoC Dynamic QR Offline System</p>

      <div className="grid gap-6 w-full max-w-sm text-center">
        {/* Nút vào App Khách */}
        <Link href="/user" className="group">
          <div className="p-6 bg-blue-600 rounded-xl hover:bg-blue-500 transition shadow-lg border-2 border-transparent hover:border-blue-300">
            <div className="text-3xl mb-2">📱</div>
            <h2 className="text-xl font-bold">Khách Hàng (User)</h2>
            <p className="text-sm text-blue-200 mt-1">Xem vé & lấy mã QR</p>
          </div>
        </Link>

        {/* Nút vào App Soát Vé */}
        <Link href="/checker" className="group">
          <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition shadow-lg border-2 border-gray-600 hover:border-yellow-500">
            <div className="text-3xl mb-2">👮</div>
            <h2 className="text-xl font-bold">Soát Vé (Checker)</h2>
            <p className="text-sm text-gray-400 mt-1">Quét mã & Kiểm tra</p>
          </div>
        </Link>
      </div>

      <div className="mt-12 text-xs text-gray-500">
        Demo Version 1.0 - TOTP Offline
      </div>
    </main>
  );
}