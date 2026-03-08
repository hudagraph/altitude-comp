"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import { useCart } from "@/context/CartContext";

export default function ShopPage() {
  const { cartItems, removeFromCart } = useCart();
  const cartCount = cartItems.length;
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <main className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <header className="w-full bg-white px-6 py-6 border-b border-zinc-100 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-200 transition">
            <ArrowLeft className="w-5 h-5 text-zinc-600" />
          </Link>
          <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <Image src="/logo-altitude-comp.jpeg" alt="Altitude Comp" width={28} height={28} className="rounded-sm object-cover" />
            <h1 className="text-2xl font-bold ml-2">Semua Produk</h1>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center p-2"
          >
            <ShoppingBag className="w-5 h-5 text-zinc-700 hover:text-black transition" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <section className="max-w-[1400px] mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

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
    </main>
  );
}
