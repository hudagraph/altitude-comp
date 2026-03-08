import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <header className="w-full bg-white px-6 py-6 border-b border-zinc-100 flex items-center gap-4 sticky top-0 z-50">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-200 transition">
          <ArrowLeft className="w-5 h-5 text-zinc-600" />
        </Link>
        <h1 className="text-2xl font-bold">Kebijakan Pengembalian</h1>
      </header>

      <section className="max-w-3xl mx-auto w-full px-6 py-12 prose prose-zinc">
        <h2 className="text-2xl font-bold mb-4">Garansi & Retur Barang</h2>
        <p className="text-zinc-600 mb-6 leading-relaxed">
          Semua produk purna jual yang dibeli di Altitude Computer memiliki masa garansi toko selama 14 hari sejak barang diterima. Jika ada kerusakan di luar human error (jatuh, kena air, dsb), Anda berhak menukar barang atau klaim garansi servis.
        </p>

        <h3 className="text-lg font-semibold mt-8 mb-3">Syarat Pengembalian</h3>
        <ul className="list-disc list-inside text-zinc-600 space-y-2 mb-6">
          <li>Wajib menyertakan video unboxing (tanpa terjeda) sejak paket pertama kali dibuka.</li>
          <li>Segel garansi toko pada perangkat tidak boleh rusak atau robek.</li>
          <li>Kondisi fisik perangkat tidak boleh cacat akibat kelalaian pemakaian (pecah, dent, dsb).</li>
          <li>Sertakan kelengkapan barang aslinya (baterai, charger, box/tas).</li>
        </ul>

        <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 mt-8">
          <p className="text-sm font-medium text-zinc-700">Catatan Penting:</p>
          <p className="text-sm text-zinc-500 mt-2">Biaya pengiriman kembali barang untuk proses retur ditanggung oleh pihak pembeli. Altitude Computer hanya menanggung ongkos kirim unit pengganti kembali ke rumah Anda.</p>
        </div>
      </section>
    </main>
  );
}
