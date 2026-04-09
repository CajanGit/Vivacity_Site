// app/store/page.tsx

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
      name: "Vivacity T-Shirt",
      category: "Apparel",
      price: "$29.99",
      image: "/images/merch_placeholder_1.png",
      storeUrl: "#",
    },
    {
      id: 2,
      name: "Vivacity Hoodie",
      category: "Apparel",
      price: "$54.99",
      image: "/images/merch_placeholder_2.png",
      storeUrl: "#",
    },
    {
      id: 3,
      name: "Vivacity Cap",
      category: "Accessories",
      price: "$24.99",
      image: "/images/merch_placeholder_3.png",
      storeUrl: "#",
    },
    {
      id: 4,
      name: "Vivacity Mousepad",
      category: "Accessories",
      price: "$34.99",
      image: "/images/merch_placeholder_4.png",
      storeUrl: "#",
    },
  ]

  return (
    <div className="bg-[#111314] min-h-screen">

    {/* ── Page Header ───────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center text-center px-8 py-20 overflow-hidden">
            {/* Decorative blobs — same pattern as home page */}
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#00D4F5] opacity-20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#F5A800] opacity-20 blur-3xl pointer-events-none" />

            <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-3 relative z-10">
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

    {/* ── Giveaway ───────────────── */}
        <section className="px-6 py-16 max-w-2xl mx-auto">
        <a  
            href="https://twitter.com/VivacityOW/status/2038647441948303505?s=20"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col rounded-xl overflow-hidden border border-white/10 hover:border-[#00D4F5]/40 transition-colors bg-[#0a0b0c]"
        >
    {/* Prize image */}
        <div className="relative w-full overflow-hidden">
            <img
                src="/images/Vivacity_Keychain.png"
                alt="Giveaway prize"
                className="w-full h-auto"
            />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0c] via-[#0a0b0c]/20 to-transparent" />
    </div>

    {/* Card content */}
    <div className="flex flex-col items-center text-center p-8">
      <p className="font-aquire text-[16px] tracking-[0.18em] text-[#00D4F5] uppercase mb-2">
        Active Giveaway
      </p>
      <h2 className="text-2xl font-medium text-white mb-2">
        Vivacity Keychain
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Coming Soon
      </p>
      <span className="inline-flex items-center gap-2 text-xs text-[#00D4F5] border border-[#00D4F5]/30 px-4 py-2 rounded-full group-hover:border-[#00D4F5] transition-colors">
        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Giveaway Details
      </span>
    </div>
  </a>
  
</section>

<div className="h-px bg-white/5" />

      <div className="h-px bg-white/5" />

      {/* ── Merch ─────────────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-2">
            Official
          </p>
          <h2 className="text-2xl font-medium text-white">Merch</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors bg-[#0a0b0c]"
            >
              {/* Product image */}
              <div className="relative h-48 w-full overflow-hidden bg-white/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  {product.price}
                </p>

                {/* Buy button */}
                <a
                  href={product.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-xs border border-white/40 hover:border-white hover:bg-white/5 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Buy Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}