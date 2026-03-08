import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <header className="w-full bg-white px-6 py-6 border-b border-zinc-100 flex items-center gap-4 sticky top-0 z-50">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-200 transition">
          <ArrowLeft className="w-5 h-5 text-zinc-600" />
        </Link>
        <span className="font-bold text-xl tracking-tighter flex items-center gap-2">
          Altitude<span className="font-medium">Comp</span>
        </span>
      </header>

      <section className="max-w-3xl mx-auto w-full px-6 py-16 text-center">
        <h1 className="text-5xl font-black tracking-tighter mb-6">Cerita Kami</h1>
        <p className="text-lg text-zinc-500 leading-relaxed mb-10">
          Berdiri sejak 2026, Altitude Computer hadir memberikan solusi komputasi cerdas untuk produktivitas dan hobi Anda. Kami mengkurasi laptop dan aksesori terbaik, memastikan performa optimal untuk setiap pengguna.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-16">
          <div className="bg-zinc-50 p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Misi</h3>
            <p className="text-zinc-600">Meningkatkan akses teknologi ke semua lapisan masyarakat dengan perangkat yang bisa diandalkan tinggi dalam segala kondisi.</p>
          </div>
          <div className="bg-zinc-50 p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Visi</h3>
            <p className="text-zinc-600">Menjadi pusat inovasi dan referensi utama untuk perangkat komputasi sekunder di seluruh Indonesia.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
