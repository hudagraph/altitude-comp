"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Percent } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountPercentage?: number;
  category: string;
  image: string;
  badge: string | null;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    vga: string;
    screen: string;
    features: string[];
  };
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"cart" | "buy" | null>(null);
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
  const { addToCart } = useCart();

  const discountedPrice = product.discountPercentage
    ? product.price - (product.price * (product.discountPercentage / 100))
    : product.price;

  const handleAddToCart = () => {
    setModalType("cart");
    setIsModalOpen(true);
  };

  const handleBuyNow = () => {
    setModalType("buy");
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (modalType === "buy") {
      const message = `Halo Admin Altitude Comp, saya ingin memesan produk:\n\n*${product.name}*\nHarga: ${formatRupiah(discountedPrice)}\n\nMohon info ketersediaan dan proses pembayarannya. Terima kasih!`;
      const whatsappUrl = `https://wa.me/6285179928937?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: discountedPrice,
        image: product.image
      });
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="group flex flex-col gap-3 relative">
      {/* Area Gambar (Muted Background) */}
      <div
        onClick={() => setIsSpecModalOpen(true)}
        className="relative aspect-[4/3] bg-zinc-100 rounded-2xl flex items-center justify-center p-0 overflow-hidden transition-all group-hover:bg-zinc-200 cursor-pointer"
      >
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end z-10 pointer-events-none">
          <span className="bg-white text-zinc-600 text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm">
            {product.category}
          </span>
          {product.discountPercentage && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm animate-pulse flex items-center gap-1">
              <Percent className="w-2.5 h-2.5" /> 
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.badge && !product.discountPercentage && (
             <span className="bg-zinc-900 text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm">
               {product.badge}
             </span>
          )}
        </div>
        
        {/* Gambar Laptop */}
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Area Info Produk */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-1 md:gap-2">
          <h3 className="font-bold text-zinc-900 text-sm md:text-base leading-tight">
            {product.name}
          </h3>
          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-0 mt-1 md:mt-0">
             {product.discountPercentage && (
               <span className="text-xs text-zinc-400 line-through">
                 {formatRupiah(product.price)}
               </span>
             )}
             <p className="font-bold text-zinc-900 text-sm md:text-base whitespace-nowrap">
               {formatRupiah(discountedPrice)}
             </p>
          </div>
        </div>
        {/* Dummy Rating ala referensi */}
        <div className="flex items-center gap-1 mt-1 text-xs text-zinc-500">
          <span className="text-yellow-400">★</span>
          <span>5.0 (12rb Ulasan)</span>
        </div>
      </div>

      {/* Area Tombol */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-white border border-zinc-200 hover:border-zinc-900 text-zinc-900 text-xs font-semibold py-2.5 rounded-full transition-colors flex items-center justify-center"
        >
          Keranjang
        </button>
        <button 
          onClick={handleBuyNow}
          className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold py-2.5 rounded-full transition-colors flex items-center justify-center"
        >
          Beli
        </button>
      </div>
    </div>

    {/* Modal Konfirmasi */}
    {isModalOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        />
        
        {/* Modal Box */}
        <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mt-2">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6 mx-auto relative overflow-hidden">
               <Image src={product.image} alt={product.name} fill className="object-contain p-2 mix-blend-multiply" />
            </div>
            
            <h3 className="text-xl font-bold text-center mb-2 text-zinc-900">
              {modalType === "buy" ? "Lanjut Pembelian?" : "Tambah ke Keranjang?"}
            </h3>
            
            <p className="text-center text-sm text-zinc-500 mb-6 leading-relaxed">
              {modalType === "buy" 
                ? `Anda akan diarahkan ke WhatsApp Admin untuk menyelesaikan pemesanan laptop ${product.name}.`
                : `Masukkan ${product.name} ke dalam keranjang belanja Anda untuk dibayar nanti.`}
            </p>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-sm font-semibold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmAction}
                className="flex-1 px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {modalType === "buy" ? "Chat Admin" : "Ya, Tambahkan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Modal Spesifikasi */}
    {isSpecModalOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSpecModalOpen(false)}
        />
        
        {/* Modal Box */}
        <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
          <button 
            onClick={() => setIsSpecModalOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-500 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mt-2">
            <div className="relative aspect-video bg-zinc-100 rounded-2xl overflow-hidden mb-6 -mt-2 -mx-2">
               <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            
            <h3 className="text-xl font-black mb-1 text-zinc-900 border-b border-zinc-100 pb-4">
              {product.name}
            </h3>
            
            <div className="py-4 space-y-2 text-sm text-zinc-700">
              <p className="font-bold text-zinc-900 mb-3">Spesifikasi :</p>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="text-zinc-500">Processor</span>
                <span className="font-medium">: {product.specs.processor}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="text-zinc-500">RAM</span>
                <span className="font-medium">: {product.specs.ram}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="text-zinc-500">Storage</span>
                <span className="font-medium">: {product.specs.storage}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="text-zinc-500">VGA</span>
                <span className="font-medium">: {product.specs.vga}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="text-zinc-500">Layar</span>
                <span className="font-medium">: {product.specs.screen}</span>
              </div>
              <ul className="list-disc list-inside mt-4 text-zinc-600 space-y-1">
                {product.specs.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex gap-3 pt-4 border-t border-zinc-100">
               <button 
                  onClick={() => { setIsSpecModalOpen(false); handleAddToCart(); }}
                  className="flex-1 bg-white border border-zinc-200 hover:border-zinc-900 text-zinc-900 text-sm font-semibold py-3 rounded-xl transition-colors"
                >
                  Tambah Keranjang
                </button>
                <button 
                  onClick={() => { setIsSpecModalOpen(false); handleBuyNow(); }}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
                >
                  Beli Sekarang
                </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}