"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, LayoutGrid, Laptop, Mouse, HardDrive, Tag, Star, Percent, ArrowLeft, ArrowRight, X, Menu, Instagram, AtSign, Store } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import { useCart } from "@/context/CartContext";

const heroSlides = [
  {
    image: '/windows-11.jpg',
    subtitle: 'Pengiriman Aman<br/>Hingga Gratis Ongkir'
  },
  {
    image: '/expedition.jpg',
    subtitle: 'Produk 100% QC<br/>Cek Kualitas Ketat'
  },
  {
    image: '/downfall.jpg',
    subtitle: 'Pembayaran Mudah<br/>Konfirmasi > Bayar > Verifikasi > Proses'
  }
];

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const [recommendedProducts, setRecommendedProducts] = useState(productsData.slice(0, 5));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setRecommendedProducts([...productsData].sort(() => 0.5 - Math.random()).slice(0, 5));
  }, []);
  const { cartItems, removeFromCart } = useCart();
  const cartCount = cartItems.length;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = productsData;
    
    // 1. Kategori Filter
    if (activeCategory !== "All") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    // 2. Search Filter
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // 3. Side Filter (Produk Baru, Terlaris, Sedang Diskon)
    // Because we use dummy data, we will simulate the logic:
    if (activeFilter === "Produk Baru") {
      // Simulate "New" by reversing the array or picking certain items
      filtered = [...filtered].reverse();
    } else if (activeFilter === "Terlaris") {
      // Simulate "Best Seller" by sorting alphabetically or price
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (activeFilter === "Sedang Diskon") {
      // Filter items that have a "Promo" or "Diskon" badge
      filtered = filtered.filter(p => p.badge && (p.badge.toLowerCase().includes("promo") || p.badge.toLowerCase().includes("diskon")));
    }

    return filtered;
  }, [activeCategory, searchQuery, activeFilter]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const scrollRecommendations = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      {/* NAVBAR */}
      <header className="w-full bg-white sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-5 h-5 text-zinc-700" />
          </button>
          <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <Image src="/logo-altitude-comp.jpeg" alt="Altitude Comp" width={80} height={24} className="rounded-sm object-contain" />
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
          <Link href="/brands" className="text-zinc-900 hover:text-black transition">Merek</Link>
          <Link href="/shop" className="hover:text-zinc-900 transition">Beli</Link>
          <Link href="/blog" className="hover:text-zinc-900 transition">Blog</Link>
        </nav>
        <div className="flex gap-5 items-center">
          <button onClick={handleFocusSearch}><Search className="w-5 h-5 text-zinc-700 hover:text-black transition" /></button>
          <button className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag className="w-5 h-5 text-zinc-700 hover:text-black transition" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-[1400px] mx-auto w-full px-6 pt-4">
        <div 
          className="relative w-full h-[250px] md:h-[350px] bg-zinc-200 rounded-3xl overflow-hidden flex items-center justify-center bg-cover bg-center transition-all duration-1000 ease-in-out" 
          style={{ backgroundImage: `url('${heroSlides[currentHeroIndex].image}')` }}
        >
           <div className="absolute inset-0 bg-black/40 transition-opacity duration-1000"></div>
           <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center gap-4">
             <h1 className="text-5xl md:text-[100px] font-black text-white tracking-tighter uppercase leading-[0.8] mix-blend-overlay">
               Altitude Comp
             </h1>
             <p 
               className="text-white text-sm md:text-xl font-medium tracking-wide leading-relaxed px-6 py-2 bg-black/20 backdrop-blur-md rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500"
               dangerouslySetInnerHTML={{ __html: heroSlides[currentHeroIndex].subtitle }}
             />
           </div>
        </div>
        
        {/* Search & Header Text */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
          <h2 className="text-2xl font-bold">Temukan Laptop Terbaik</h2>
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Cari berdasarkan merek atau model..." 
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full bg-zinc-100 rounded-full py-3 pl-10 pr-6 text-sm outline-none focus:ring-2 focus:ring-zinc-900 transition"
            />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT (SIDEBAR + GRID) */}
      <section className="max-w-[1400px] mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-10">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="flex items-center justify-between mb-2 md:mb-6">
            <h3 className="font-bold text-lg">Filter Kategori</h3>
            <button className="md:hidden flex items-center justify-center p-2 rounded-lg bg-zinc-50 border border-zinc-200" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
              {isMobileFilterOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
          
          <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} md:block transition-all duration-300`}>
            <div className="space-y-1">
              <button 
                onClick={() => { setActiveCategory("All"); setCurrentPage(1); setIsMobileFilterOpen(false); }}
              className={`w-full flex items-center justify-between text-sm font-medium px-4 py-3 rounded-xl transition ${activeCategory === "All" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"}`}
            >
              <span className="flex items-center gap-3"><LayoutGrid className="w-4 h-4" /> Semua Produk</span>
              <span className="bg-zinc-900 text-white text-[10px] px-2 py-0.5 rounded-full">{productsData.length}</span>
            </button>
            <button 
              onClick={() => { setActiveCategory("Office Laptop"); setCurrentPage(1); setIsMobileFilterOpen(false); }}
              className={`w-full flex items-center justify-between text-sm font-medium px-4 py-3 rounded-xl transition ${activeCategory === "Office Laptop" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"}`}
            >
              <span className="flex items-center gap-3"><Laptop className="w-4 h-4" /> Laptop Kantor</span>
              <span className="bg-zinc-200 text-zinc-600 text-[10px] px-2 py-0.5 rounded-full">{productsData.filter(p => p.category === "Office Laptop").length}</span>
            </button>
            <button 
              onClick={() => { setActiveCategory("Gaming Laptop"); setCurrentPage(1); setIsMobileFilterOpen(false); }}
              className={`w-full flex items-center justify-between text-sm font-medium px-4 py-3 rounded-xl transition ${activeCategory === "Gaming Laptop" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"}`}
            >
              <span className="flex items-center gap-3"><Mouse className="w-4 h-4" /> Laptop Gaming</span>
              <span className="bg-zinc-200 text-zinc-600 text-[10px] px-2 py-0.5 rounded-full">{productsData.filter(p => p.category === "Gaming Laptop").length}</span>
            </button>
            <button 
              onClick={() => { setActiveCategory("Aksesoris"); setCurrentPage(1); setIsMobileFilterOpen(false); }}
              className={`w-full flex items-center justify-between text-sm font-medium px-4 py-3 rounded-xl transition ${activeCategory === "Aksesoris" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"}`}
            >
              <span className="flex items-center gap-3"><HardDrive className="w-4 h-4" /> Aksesoris</span>
              <span className="bg-zinc-200 text-zinc-600 text-[10px] px-2 py-0.5 rounded-full">{productsData.filter(p => p.category === "Aksesoris").length}</span>
            </button>
          </div>

          <div className="mt-8 space-y-1">
            <button 
              onClick={() => { setActiveFilter(activeFilter === "Produk Baru" ? "Semua" : "Produk Baru"); setCurrentPage(1); setIsMobileFilterOpen(false); }}
              className={`w-full flex items-center gap-3 text-sm px-4 py-3 rounded-xl transition ${activeFilter === "Produk Baru" ? "bg-zinc-100 text-zinc-900 font-semibold" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 font-medium"}`}
            >
              <Star className="w-4 h-4" /> Produk Baru
            </button>
            <button 
              onClick={() => { setActiveFilter(activeFilter === "Terlaris" ? "Semua" : "Terlaris"); setCurrentPage(1); setIsMobileFilterOpen(false); }}
              className={`w-full flex items-center gap-3 text-sm px-4 py-3 rounded-xl transition ${activeFilter === "Terlaris" ? "bg-zinc-100 text-zinc-900 font-semibold" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 font-medium"}`}
            >
              <Tag className="w-4 h-4" /> Terlaris
            </button>
            <button 
              onClick={() => { setActiveFilter(activeFilter === "Sedang Diskon" ? "Semua" : "Sedang Diskon"); setCurrentPage(1); setIsMobileFilterOpen(false); }}
              className={`w-full flex items-center gap-3 text-sm px-4 py-3 rounded-xl transition ${activeFilter === "Sedang Diskon" ? "bg-red-50 text-red-600 font-semibold" : "text-zinc-500 hover:bg-zinc-50 hover:text-red-500 font-medium"}`}
            >
              <Percent className="w-4 h-4" /> Sedang Diskon
            </button>
          </div>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <div className="flex-1">
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-500 bg-zinc-50 rounded-2xl">
              <Search className="w-12 h-12 mb-4 text-zinc-300" />
              <p>Produk tidak ditemukan.</p>
              <button onClick={() => { setSearchQuery(""); setSearchInput(""); setActiveCategory("All"); }} className="mt-4 text-sm text-zinc-900 font-semibold underline">Reset Pencarian</button>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-zinc-100 text-sm font-medium">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="disabled:opacity-40 text-zinc-500 hover:text-zinc-900 transition"
              >&larr; Sebelumnya</button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition ${currentPage === i + 1 ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="disabled:opacity-40 text-zinc-500 hover:text-zinc-900 transition"
              >Selanjutnya &rarr;</button>
            </div>
          )}
        </div>

      </section>

      {/* RECOMMENDATIONS SECTION */}
      <section className="max-w-[1400px] mx-auto w-full px-6 py-12 border-t border-zinc-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Jelajahi rekomendasi kami</h2>
          <div className="flex gap-2">
            <button onClick={() => scrollRecommendations("left")} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-200 transition">
              <ArrowLeft className="w-5 h-5 text-zinc-600" />
            </button>
            <button onClick={() => scrollRecommendations("right")} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-200 transition">
              <ArrowRight className="w-5 h-5 text-zinc-600" />
            </button>
          </div>
        </div>
        
        {/* Horizontal Scroll Container */}
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide scroll-smooth">
          {recommendedProducts.map((product) => (
            <div key={`rec-${product.id}`} className="min-w-[280px] sm:min-w-[320px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* DARK CTA / NEWSLETTER SECTION */}
      <section className="max-w-[1400px] mx-auto w-full px-6 py-8">
        <div className="bg-[#242424] text-white rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
              Dapatkan Promo &<br />Produk Terbaru?
            </h2>
            <div className="relative w-full max-w-md">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="w-full bg-white text-zinc-900 rounded-full py-4 pl-6 pr-32 outline-none font-medium"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#242424] hover:bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors">
                Kirim
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/3 text-zinc-400 text-sm leading-relaxed">
            <p className="mb-4 text-white font-semibold">Altitude untuk Kebutuhan dan Pekerjaanmu</p>
            <p>
              Kami memahami kebutuhan produktivitas dan gaming Anda. Temukan laptop second rasa baru dengan jaminan kualitas terbaik yang siap mendukung semua aktivitas digitalmu.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-[1400px] mx-auto w-full px-6 py-12 mt-4">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">
          <div className="flex gap-16 md:gap-32">
            {/* About Column */}
            <div>
              <h4 className="font-bold mb-6 text-zinc-900">Tentang</h4>
              <ul className="space-y-4 text-sm text-zinc-500 font-medium">
                <li><Link href="/blog" className="hover:text-zinc-900 transition">Blog</Link></li>
                <li><Link href="/about" className="hover:text-zinc-900 transition">Tim Kami</Link></li>
                <li><Link href="/contact" className="hover:text-zinc-900 transition">Hubungi Kami</Link></li>
              </ul>
            </div>
            {/* Support Column */}
            <div>
              <h4 className="font-bold mb-6 text-zinc-900">Bantuan</h4>
              <ul className="space-y-4 text-sm text-zinc-500 font-medium">
                <li><Link href="/contact" className="hover:text-zinc-900 transition">Hubungi Kami</Link></li>
                <li><Link href="/shipping" className="hover:text-zinc-900 transition">Pengiriman</Link></li>
                <li><Link href="/returns" className="hover:text-zinc-900 transition">Pengembalian</Link></li>
                <li><Link href="/faq" className="hover:text-zinc-900 transition">FAQ</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Social Media Column */}
          <div>
            <p className="font-bold mb-4 text-sm text-zinc-400 md:text-right">Media Sosial</p>
            <div className="flex gap-3 justify-start md:justify-end">
              <a href="https://www.instagram.com/altitude.comp/" target="_blank" className="w-10 h-10 bg-[#242424] text-white rounded-full flex items-center justify-center hover:bg-black transition" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@altitude.comp" target="_blank" className="w-10 h-10 bg-[#242424] text-white rounded-full flex items-center justify-center hover:bg-black transition" title="Threads">
                <AtSign className="w-5 h-5" />
              </a>
              <a href="https://www.tokopedia.com/altitudecomp" target="_blank" className="w-10 h-10 bg-[#242424] text-white rounded-full flex items-center justify-center hover:bg-black transition" title="Tokopedia">
                <Store className="w-5 h-5" />
              </a>
              <a href="https://s.shopee.co.id/9pT3uXcYgj" target="_blank" className="w-10 h-10 bg-[#242424] text-white rounded-full flex items-center justify-center hover:bg-black transition" title="Shopee">
                <ShoppingBag className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-medium text-zinc-400 border-t border-zinc-100 pt-8">
          <p>Hak Cipta © 2026 Altitude Computer. Semua Hak Dilindungi.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-zinc-900 transition">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-zinc-900 transition">Kebijakan Privasi</a>
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="text-xl font-bold">Keranjang ({cartCount})</h2>
              <button autoFocus onClick={() => setIsCartOpen(false)} className="w-8 h-8 flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-zinc-500 h-full">
                  <ShoppingBag className="w-12 h-12 mb-4 text-zinc-200" />
                  <p>Keranjang masih kosong</p>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 border border-zinc-100 p-3 rounded-2xl items-center relative">
                    <div className="w-16 h-16 bg-zinc-50 rounded-xl relative overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-2 mix-blend-multiply" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 leading-tight mb-1">{item.name}</h4>
                      <p className="text-sm font-semibold text-zinc-900">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(item.price)}</p>
                    </div>
                    <button onClick={() => removeFromCart(idx)} className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-zinc-100 bg-zinc-50">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold text-zinc-600">Total Belanja</span>
                  <span className="font-bold text-lg text-zinc-900">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(cartItems.reduce((acc, curr) => acc + curr.price, 0))}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    const message = `Halo Admin Altitude Comp, saya ingin memesan:\n${cartItems.map(i => `- ${i.name}`).join('\n')}\n\nTotal: ${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(cartItems.reduce((acc, curr) => acc + curr.price, 0))}\n\nMohon info proses pembayarannya.`;
                    window.open(`https://wa.me/6285179928937?text=${encodeURIComponent(message)}`, "_blank");
                  }}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3.5 rounded-xl transition-colors"
                >
                  Checkout via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-start">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-full max-w-[280px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
                <Image src="/logo-altitude-comp.jpeg" alt="Altitude Comp" width={80} height={24} className="rounded-sm object-contain" />
              </div>
              <button autoFocus onClick={() => setIsMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-6 text-base font-semibold text-zinc-600">
              <Link href="/brands" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black transition">Merek</Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black transition">Beli</Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black transition">Blog</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black transition">Tentang Kami</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black transition">Hubungi</Link>
            </nav>
          </div>
        </div>
      )}
    </main>
  );
}