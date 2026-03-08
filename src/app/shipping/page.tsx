import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <header className="w-full bg-white px-6 py-6 border-b border-zinc-100 flex items-center gap-4 sticky top-0 z-50">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-200 transition">
          <ArrowLeft className="w-5 h-5 text-zinc-600" />
        </Link>
        <h1 className="text-2xl font-bold">Informasi Pengiriman</h1>
      </header>

      <section className="max-w-3xl mx-auto w-full px-6 py-12 prose prose-zinc">
        <h2 className="text-2xl font-bold mb-4">Kebijakan Pengiriman</h2>
        <p className="text-zinc-600 mb-6 leading-relaxed">
          Kami di Altitude Computer berkomitmen untuk memberikan pengalaman belanja yang cepat dan aman. Semua laptop dan perangkat akan dikemas menggunakan standar keamanan tinggi, box tebal, dan bubble wrap ekstra untuk memastikan barang tiba dengan selamat di tangan Anda.
        </p>

        <h3 className="text-lg font-semibold mt-8 mb-3">Jadwal Pengiriman</h3>
        <ul className="list-disc list-inside text-zinc-600 space-y-2 mb-6">
          <li>Pesanan sebelum pukul 15.00 WIB akan dikirim pada hari yang sama.</li>
          <li>Pesanan setelah pukul 15.00 WIB akan dikirim pada hari kerja berikutnya.</li>
          <li>Pengiriman tidak dilakukan pada hari Minggu dan hari libur nasional.</li>
        </ul>

        <h3 className="text-lg font-semibold mt-8 mb-3">Opsi Ekspedisi</h3>
        <p className="text-zinc-600 mb-6 leading-relaxed">
          Kami bekerja sama dengan berbagai kurir terpercaya seperti JNE, SiCepat, J&T, dan GoSend/GrabExpress (untuk area Jadetabek) untuk memastikan paket Anda sampai tepat waktu.
        </p>
      </section>
    </main>
  );
}
