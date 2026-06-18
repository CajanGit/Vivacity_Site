// app/store/page.tsx
'use client'

import React, { useState } from 'react';

export default function StorePage() {
  // ── Giveaway data ──────────────────────────────────────────────
  // Replace these with real data later (Supabase, CMS, hardcoded, etc.)
  const giveaways = [
    {
      id: 1,
      prize: "Vivacity Keychain",
      image: "/images/giveaway_placeholder_1.png",
      twitterUrl: "https://twitter.com/VivacityGG/status/placeholder1",
      endsAt: "ComingSoon",
    },
  ]

  // ── Merch data ─────────────────────────────────────────────────
  // Replace with real products + real store URLs when ready
  const products = [
    {
      id: 1,
      name: "Vivacity Hoodie",
      category: "Apparel",
      price: 4500,
      image: "/images/merch_hoodie_transparent.png",
      sizes: ["S", "M", "L", "XL", "XXL"],
    },

    { 
      id: 2,
      name: "Vivacity Hat",
      category: "Apparel",
      price: 3500,
      image: "/images/vivacity_hat_transparent.png",
    },

    { 
      id: 3,
      name: "Vivacity Keychain",
      category: "Apparel",
      price: 1000,
      image: "/images/Vivacity_Keychain.png",
    }
  ]

  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({})
  
  async function handleBuy(product: {
    id: number
    name: string
    price: number
    image: string
    sizes?: string[]
  }) {

    if (product.sizes?.length && !selectedSizes[product.id]) {
      alert('Please select a size before purchasing.')
      return
    }
    
    const res = await fetch ('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        productName: product.name,
        price: product.price,
        image: product.image,
        size: selectedSizes[product.id] ?? null,
      }),
    })

    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen">

    {/* ── Page Header ───────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center text-center px-8 py-20 overflow-hidden">

            <p className="font-aquire text-[36px] tracking-[0.18em] text-[#00D4F5] uppercase mb-3 relative z-10">
            Vivacity
            </p>
            <h1 className="text-4xl font-medium text-white mb-3 relative z-10">
            Store
            </h1>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed relative z-10">
            Giveaways, merch, and everything Vivacity. Represent the org.
            </p>
        </section>

        <div className="h-px bg-white/5" />

<div className="h-px bg-white/5" />

      <div className="h-px bg-white/5" />

      {/* ── Merch ─────────────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-2">
            Official
          </p>
          <h2 className="text-2xl font-medium text-white">Merch</h2>
          <p className="text-[10px] opacity-80"> United States and Canada Only</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors bg-[#0a0b0c]"
            >
              {/* Product image */}
              <div className="relative h-56 w-full overflow-hidden bg-white/5 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product info */}
              <div className="flex flex-col flex-1 p-4">
                <p className="text-[10px] tracking-[0.15em] text-gray-500 uppercase mb-1">
                  {product.category}
                </p>
                <h3 className="text-white text-sm font-medium mb-1 flex-1">
                  {product.name}
                </h3>
                <p className="text-[#F5A800] text-sm font-medium mb-4">
                  ${(product.price / 100).toFixed(2)}
                </p>

                {product.sizes && product.sizes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSizes((prev) => ({ ...prev, [product.id]: size}))
                      }
                      className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                        selectedSizes[product.id] === size
                          ? 'border-[#00D4F5] text-[#00D4F5] bg-[#00D4F5]/10'
                          : 'border-white/20 text-gray-400 hover:border-white/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                  </div>
                )}

                {/* Buy button */}
                <button
                  onClick={() => handleBuy(product)}
                  className="text-center text-xs border border-white/40 hover:border-white hover:bg-white/5 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}