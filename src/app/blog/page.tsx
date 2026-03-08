import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const posts = [
  { id: 1, title: "Tips Memilih Laptop untuk Mahasiswa Teknik", date: "12 Okt 2026", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80", category: "Panduan" },
  { id: 2, title: "Laptop Gaming Bekas, Worth It Nggak Sih?", date: "05 Okt 2026", image: "https://images.unsplash.com/photo-1600861194942-f88481073756?auto=format&fit=crop&q=80", category: "Review" },
  { id: 3, title: "Cara Merawat Baterai Laptop Agar Awet Bertahun-tahun", date: "28 Sep 2026", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80", category: "Tips" },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <header className="w-full bg-white px-6 py-6 border-b border-zinc-100 flex items-center gap-4 sticky top-0 z-50">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-200 transition">
          <ArrowLeft className="w-5 h-5 text-zinc-600" />
        </Link>
        <h1 className="text-2xl font-bold">Altitude Blog</h1>
      </header>

      <section className="max-w-[1400px] mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4">
                <img src={post.image} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-zinc-900 text-xs font-semibold px-3 py-1.5 rounded-full">{post.category}</span>
              </div>
              <p className="text-sm text-zinc-500 mb-2">{post.date}</p>
              <h3 className="text-lg font-bold group-hover:underline">{post.title}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
