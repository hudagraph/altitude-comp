import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const brands = [
  { name: "Asus", image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg" },
  { name: "Acer", image: "https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.png" },
  { name: "Dell", image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg" },
  { name: "Lenovo", image: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg" },
  { name: "HP", image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" },
  { name: "Razer", image: "https://upload.wikimedia.org/wikipedia/en/4/40/Razer_snake_logo.svg" },
];

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <header className="w-full bg-white px-6 py-6 border-b border-zinc-100 flex items-center gap-4 sticky top-0 z-50">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-200 transition">
          <ArrowLeft className="w-5 h-5 text-zinc-600" />
        </Link>
        <h1 className="text-2xl font-bold">Merek Kami</h1>
      </header>

      <section className="max-w-[1400px] mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link href={`/shop?brand=${brand.name.toLowerCase()}`} key={brand.name} className="group relative aspect-video bg-zinc-50 hover:bg-zinc-100 rounded-3xl flex items-center justify-center p-8 transition-colors border border-zinc-100">
              <img src={brand.image} alt={brand.name} className="max-h-12 max-w-[120px] object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
