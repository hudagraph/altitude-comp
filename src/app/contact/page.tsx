"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <header className="w-full bg-white px-6 py-6 border-b border-zinc-100 flex items-center gap-4 sticky top-0 z-50">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-200 transition">
          <ArrowLeft className="w-5 h-5 text-zinc-600" />
        </Link>
        <h1 className="text-2xl font-bold">Hubungi Kami</h1>
      </header>

      <section className="max-w-[1000px] mx-auto w-full px-6 py-12 md:py-20 flex flex-col md:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-4">Kami Siap Membantu</h2>
            <p className="text-zinc-500 text-sm">Punya pertanyaan seputar produk, pesanan, atau kolaborasi bisnis? Jangan ragu untuk menghubungi kami melalui form di samping atau melalui kontak di bawah ini.</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center rounded-full text-zinc-600"><Phone className="w-4 h-4" /></div>
              +62 812-3456-7890
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center rounded-full text-zinc-600"><Mail className="w-4 h-4" /></div>
              hello@altitudecomp.id
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center rounded-full text-zinc-600"><MapPin className="w-4 h-4" /></div>
              Jl. Teknologi No. 12, Sudirman, Jakarta
            </div>
          </div>
        </div>

        <div className="flex-1 bg-zinc-50 p-8 rounded-3xl">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Nama Lengkap</label>
              <input type="text" className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-900 transition" placeholder="Budi Santoso" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Email</label>
              <input type="email" className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-900 transition" placeholder="budi@example.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Pesan</label>
              <textarea rows={4} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-900 transition resize-none" placeholder="Tulis pesan Anda di sini..."></textarea>
            </div>
            <button type="submit" className="w-full bg-zinc-900 text-white font-semibold py-3.5 rounded-xl hover:bg-zinc-800 transition">Kirim Pesan</button>
          </form>
        </div>
      </section>
    </main>
  );
}
