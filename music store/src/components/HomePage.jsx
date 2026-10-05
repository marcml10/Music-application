import { useEffect, useState } from "react";
import Hero from "./Hero";
import ProductCard from "./ProductCard";
import Categories from "./Categories";
import FilterSidebar from "./FilterSidebar";

export default function HomePage({ onNavigate, onAddToCart, onViewProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayLimit, setDisplayLimit] = useState(16);
  const [sortBy, setSortBy] = useState("featured");

  // Sidebar Filter States
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);

  // Get unique tags for the sidebar
  const uniqueTags = Array.from(new Set(products.map(p => p.tag).filter(Boolean)));

  // Reset display limit when changing categories
  useEffect(() => {
    setDisplayLimit(16);
  }, [activeCategory]);

  useEffect(() => {
    // 1. Fetch our own database products
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => res.json())
      .then(dbData => {
        setProducts(dbData);
        setLoading(false);

        // 2. Live-fetch external JSON from Headphone Zone (via our proxy to bypass CORS)
        fetch(`${import.meta.env.VITE_API_URL}/api/proxy/headphonezone`)
          .then(res => res.json())
          .then(hzData => {
            if (Array.isArray(hzData)) {
              // Append the live Headphone Zone products into our state
              setProducts(prev => {
                // Ensure no duplicates by ID (just in case)
                const existingIds = new Set(prev.map(p => p.id));
                const newProducts = hzData.filter(p => !existingIds.has(p.id));
                return [...newProducts, ...prev];
              });
            }
          })
          .catch(err => console.error("Failed to fetch Headphone Zone live data", err));
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#F3F4F6] animate-page-enter">
      {/* Hero — full width, no wrapper */}
      <Hero />

      {/* Spacer to hold the dock's static position exactly 35px below Hero */}
      <div className="w-full mt-[35px] mb-[35px] h-[60px]">
        <Categories activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
      </div>

      {activeCategory && (
        <div className="bg-[#F3F4F6] px-4 md:px-8 xl:px-12 pb-16 pt-8 animate-fade-in flex flex-col lg:flex-row items-start gap-8" style={{ minHeight: "500px" }}>
          
          {/* Sidebar utilizing the empty left space of the page */}
          <FilterSidebar 
            uniqueTags={uniqueTags}
            minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            minRating={minRating} setMinRating={setMinRating}
            selectedTags={selectedTags} setSelectedTags={setSelectedTags}
          />

          {/* Main Content Area */}
          <div className="flex-1 w-full max-w-7xl mx-auto">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">
                  {activeCategory === "All" ? "Featured Gear" : "Category"}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  {activeCategory === "All" ? "Everything you need." : activeCategory}
                </h2>
              </div>
              
              <div className="relative self-start sm:self-auto">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black text-white text-sm font-semibold pl-6 pr-10 py-3 rounded-[2px] cursor-pointer appearance-none outline-none shadow-md hover:bg-slate-800 transition-colors"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                  <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                  </svg>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 text-sm animate-pulse">Loading live inventory...</p>
              </div>
            ) : (
              (() => {
                const filteredProducts = products.filter(p => {
                  // Category Match
                  if (activeCategory !== "All" && p.category !== activeCategory) return false;
                  
                  // Price Match
                  if (minPrice && p.price < parseFloat(minPrice)) return false;
                  if (maxPrice && p.price > parseFloat(maxPrice)) return false;

                  // Rating Match
                  if (minRating > 0 && p.rating < minRating) return false;

                  // Tag Match
                  if (selectedTags.length > 0 && !selectedTags.includes(p.tag)) return false;

                  return true;
                });

                const sortedProducts = [...filteredProducts].sort((a, b) => {
                  if (sortBy === "price-low") return a.price - b.price;
                  if (sortBy === "price-high") return b.price - a.price;
                  if (sortBy === "rating") return b.rating - a.rating;
                  return 0;
                });

                if (sortedProducts.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl shadow-sm border border-slate-100">
                      <p className="text-slate-500 text-sm">No products found matching your filters.</p>
                    </div>
                  );
                }

                return (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                      {sortedProducts.slice(0, displayLimit).map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={onAddToCart}
                          onViewProduct={onViewProduct}
                        />
                      ))}
                    </div>
                    
                    {sortedProducts.length > displayLimit && (
                      <div className="flex justify-center mt-12">
                        <button
                          onClick={() => setDisplayLimit(prev => prev + 16)}
                          className="bg-slate-900 text-white px-8 py-3 rounded-[2px] font-bold text-sm shadow-md hover:bg-slate-800 hover:scale-105 transition-all duration-300"
                        >
                          Show More {activeCategory === "All" ? "Products" : activeCategory}
                        </button>
                      </div>
                    )}
                  </>
                );
              })()
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <p className="text-xl font-bold tracking-tight text-white">
                LUMA<span className="text-[#FCA5A5]">.</span>
              </p>
              <p className="text-sm text-white/60 mt-3 leading-relaxed max-w-xs">
                India's curated pro audio & music gear destination.
              </p>
              <div className="flex gap-4 mt-5">
                {[
                  { label: "Instagram", href: "https://instagram.com/lumagear.in", icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                    </svg>
                  )},
                  { label: "X", href: "https://twitter.com/lumagear", icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )},
                  { label: "YouTube", href: "https://youtube.com/@lumagear", icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )},
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    className="text-white/40 hover:text-white transition-colors">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <p className="text-xs font-semibold text-white/40 mb-4 uppercase tracking-wider">Categories</p>
              <ul className="space-y-2.5">
                {["Audio Interfaces","Cables","Amplifiers","Mixers","Microphones","Studio Monitors","Headphones & IEMs","Accessories"].map(l => (
                  <li key={l}><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <p className="text-xs font-semibold text-white/40 mb-4 uppercase tracking-wider">Info</p>
              <ul className="space-y-2.5">
                {["About LUMA","Partner Stores","Shipping Policy","Returns","Terms of Service","Privacy Policy"].map(l => (
                  <li key={l}><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-semibold text-white/40 mb-4 uppercase tracking-wider">Get in Touch</p>
              <ul className="space-y-3">
                {[
                  { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: "hello@lumagear.in", href: "mailto:hello@lumagear.in" },
                  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: "+91 98765 43210", href: null },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white/50 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
                    </svg>
                    {item.href
                      ? <a href={item.href} className="text-sm text-white/70 hover:text-white transition-colors">{item.text}</a>
                      : <span className="text-sm text-white/70">{item.text}</span>
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs text-white/40">© 2026 LUMA. All rights reserved.</p>
            <p className="text-xs text-white/40">Made with care in India 🇮🇳</p>
          </div>
        </div>
      </footer>
    </div>
  );
}