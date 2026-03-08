"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Apakah semua laptop terjamin kualitasnya?",
    answer: "Ya. Setiap unit yang kami jual telah melewati lebih dari 30 titik pengecekan kualitas (Quality Control) ketat oleh teknisi berpengalaman sebelum dipajang untuk dijual."
  },
  {
    question: "Berapa lama garansi yang diberikan?",
    answer: "Kami memberikan garansi mesin dan fungsionalitas selama 14 hari sejak barang diterima. Jika ada masalah teknis yang bukan karena kesalahan penggunaan, kami akan bantu klaim perbaikan atau tukar unit."
  },
  {
    question: "Apakah bisa COD (Cash on Delivery)?",
    answer: "Saat ini kami hanya melayani pengiriman via ekspedisi terpercaya (JNE, SiCepat, dll) atau pengiriman instan untuk area Jadetabek. COD langsung belum tersedia."
  },
  {
    question: "Bisa tukar tambah (Trade-in)?",
    answer: "Tentu! Silakan bawa unit lama Anda ke toko fisik kami untuk ditaksir harganya, atau hubungi customer service kami jika Anda berada di luar kota."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <header className="w-full bg-white px-6 py-6 border-b border-zinc-100 flex items-center gap-4 sticky top-0 z-50">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-200 transition">
          <ArrowLeft className="w-5 h-5 text-zinc-600" />
        </Link>
        <h1 className="text-2xl font-bold">FAQ (Tanya Jawab)</h1>
      </header>

      <section className="max-w-3xl mx-auto w-full px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-4">Pertanyaan Populer</h2>
          <p className="text-zinc-500">Jawaban cepat untuk pertanyaan yang sering ditanyakan pelanggan kami.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-zinc-200 rounded-2xl overflow-hidden">
              <button 
                className="w-full flex items-center justify-between p-6 text-left bg-zinc-50 hover:bg-zinc-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-zinc-900 pr-4">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="w-5 h-5 text-zinc-500" /> : <ChevronDown className="w-5 h-5 text-zinc-500" />}
              </button>
              {openIndex === index && (
                <div className="p-6 bg-white border-t border-zinc-100">
                  <p className="text-zinc-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center p-8 bg-zinc-50 rounded-3xl">
          <p className="font-medium mb-4">Masih punya pertanyaan lain?</p>
          <Link href="/contact" className="inline-block bg-zinc-900 text-white font-semibold px-6 py-3 rounded-full hover:bg-zinc-800 transition">Hubungi Customer Service</Link>
        </div>
      </section>
    </main>
  );
}
